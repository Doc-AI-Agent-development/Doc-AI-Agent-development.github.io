---
sidebar_position: 2
---

# 상태와 세션

세션 상태는 **단일 상태 모델**에 담겨 **턴 사이에 유지**됩니다. 이 페이지는 두 대화형 탭이
사용하는 상태 필드와 저장·복원 방식, 동시성 제어를 다룹니다.

## 상태 모델

전체 탭이 하나의 상태 모델을 공유하되, **탭별 필드는 분리**되어 있습니다. 아래는
두 탭이 사용하는 필드의 요약이며, 전체 필드 정의는 스키마
파일(`src/schemas/state.py`)에 있습니다.

```python
class AppState(BaseModel):
    """세션 상태 — 전체 탭이 공유하는 단일 모델. 아래는 교육자료 생성 탭이 쓰는 필드."""

    content_sheet: ContentSheet | None    # 진행 시트 — 선택 교육·처리한 첨부·질문 카드 답·제외 지정
    syllabus: Syllabus | None             # 구성 계획 (교육자료 구성 계획 수립 문서 참조)
    plan_content: PlanContent | None      # 연간 교육계획에서 조립한 구성 계획 재료 — 원본 서술 포함, 불변
    evidence_store: EvidenceStore | None  # 수집된 근거 원문 발췌와 수집 당시 재료 기록
    exam_config: ExamConfig | None        # 시험 구성 — None이면 이 회차는 시험을 만들지 않음
    deck: Deck | None                     # 교육자료
    digest: CondensedDeck | None          # 요약본 — 완성된 교육자료 본문이 원천
    exam: Exam | None                     # 시험지
    survey: Survey | None                 # 강의평가 설문
    verification: Verification | None     # 요건 검사 결과 — 연간 탭이 채움 (교육자료 탭에는 채우는 경로 없음)
    workspaces: list[CourseWorkspace]     # 보관된 교육 작업공간 목록
    upload_briefs: list[UploadBrief]      # 첨부 요지 캐시 — 세션 수준(교육 전환과 무관)
    messages: list[ChatMessage]           # 대화 메시지 — 표시용 텍스트만
    context: dict                         # 화면 컨텍스트 + 내부 전용 키
```

```python
class AppState(BaseModel):
    """(계속) 연간 교육계획 탭이 쓰는 필드."""

    question_sheet: QuestionSheet | None   # 설문 시트 — 교육 목록·질문 답·과정별 결정
    checklist: TrainingChecklist | None    # 계획 기준선 — 회차·시간·주제 배분 (계획표의 원천)
    annual_plan: AnnualPlan | None         # 연간 계획 — 회차 단위 행과 상세 내용
    missing_fields: list[MissingField]     # 미정 값 되물음 목록
    awaiting: str | None                   # 대기 상태 — 질문·승인·되물음 게이트
```

## 체크포인트

턴이 끝나면 **상태 전체**가 내장 DB(단일 파일)에 세션 식별자 기준으로 기록됩니다. 같은
식별자의 후속 요청은 상태 전체를 복원한 뒤, 이번 요청이 전달한 컨텍스트만 덮어씁니다.
서비스 재시작 후에도 세션이 유지됩니다.

복원 범위에 포함되지 않는 것이 있습니다 — 턴 내부의 도구 호출·결과 기록은 저장되지
않으므로, 다음 턴의 LLM은 이전 턴의 조회 결과를 기억하지 못합니다. 상태 모델에 새 필드가
추가되어도 이전 체크포인트는 기본값으로 복원되므로 **마이그레이션이 필요 없습니다**.

세션은 **탭 단위로 분리**됩니다. 하나의 세션 식별자가 두 탭에서 사용되지 않는다는 것이
화면과의 전제입니다.

## 교육 작업공간

한 세션에서 복수의 교육을 작업하기 위해, 작업 관련 필드 묶음(시트·계획·근거·산출물·시험
구성)이 **교육 단위로 보관·복원**됩니다. 보관 필드 목록은 상태 모델과 작업공간 구조 양쪽에
**동일한 이름으로 존재해야 합니다** — 이 제약은 [불변식](../maintenance/invariants.md)에서
다룹니다.

## 턴 동시성 제어

같은 세션에 요청이 겹치면 진행 중인 턴을 취소하고, 그 턴이 커밋한 체크포인트 기록을
시작 시점으로 되돌린 뒤 새 턴을 시작합니다. **세션당 실행 중인 턴은 항상 하나**입니다.
취소·되돌림은 턴 취소 API에서도 같은 경로로 동작합니다.

## 단일 프로세스 전제

턴 실행 장부와 진행 상태 스냅샷은 **프로세스 메모리**에 보관됩니다. 서비스를 다중
프로세스로 배포하려면 이 두 저장소를 외부로 이관해야 합니다.

## 코드 참조

| 구성 요소 | 코드 이름 | 모듈 경로 |
|---|---|---|
| 상태 모델 | `AppState` | `src/schemas/state.py` |
| 진행 시트·근거 저장 구조 | `ContentSheet` / `EvidenceStore` | `src/schemas/content_tab.py` |
| 연간 탭 상태 구조 | `QuestionSheet` / `TrainingChecklist` / `AnnualPlan` | `src/schemas/questions.py` · `checklist.py` · `training_plan.py` |
| 작업공간 구조·보관 필드 목록 | `CourseWorkspace` / `WORK_FIELDS` | `src/schemas/state.py` / `src/tabs/edu_material/handle_request/workspace.py` |
| 체크포인트 열기 | — | `src/api/main.py` |
| 턴 동시성 제어·되돌림 | `begin_exclusive_turn` | `src/api/turns.py` |
| 진행 상태 스냅샷 | — | `src/api/progress.py` |
