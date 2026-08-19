---
sidebar_position: 3
---

# 질문 에이전트

질문 에이전트가 맡는 기능(진입 판정, 교육 목록, 설문, 시간 결측 처리)을 고칠 때 손대는
자리입니다. 동작은 [사용하기 장의 질문 에이전트](../../annual-plan/question-agent.md)에
있습니다.

## 고칠 자리

**설문 카드의 질문 문구·보기·기본값·값이 함께 필요한 보기 표시** (코드)

- 자리: `src/tabs/annual_plan/intake/agent.py`의 질문 정의
- 함께 볼 곳: 아래 "설문 질문·보기 수정" 절(여러 파일이 한 벌)
- 테스트: 단위 테스트 + 실제 대화

**교육방법 보기의 출처(백엔드 표준 코드)와 조회 실패 시 폴백 보기** (코드)

- 자리: `src/tabs/annual_plan/intake/agent.py`의 진입부와 질문 정의
- 함께 볼 곳: 편집 프롬프트의 표준 라벨 목록
- 테스트: 실서버 공통코드와 대조

**결재가 끝난 계획을 막는 기준(결재 단계 코드)** (코드)

- 자리: `src/tabs/annual_plan/intake/agent.py`의 진입부
- 테스트: 결재가 완료된 부서로 실제 진입 시도(단위 테스트는 허용 쪽만 고정)

**저장된 계획을 불러올 때 값이 채워지는 규칙(회차·강사·시간 기준 완화)** (코드)

- 자리: `src/tabs/annual_plan/plan_table/restore.py`
- 함께 볼 곳: 복원 뒤 붙는 설문 틀과 결측 검사(`src/tabs/annual_plan/intake/agent.py`의 진입부)
- 테스트: 단위 테스트 · 실서버에서 저장된 계획 불러오기

**일괄 생성이 쓰는 답안** (코드)

- 자리: `src/tabs/annual_plan/intake/auto.py`
- 함께 볼 곳: 설문 보기와 짝(보기를 바꾸면 함께 고침)
- 테스트: 단위 테스트

**법령 원문에서 연간 교육시간을 뽑는 기준** (프롬프트)

- 자리: `src/tabs/annual_plan/intake/prompts/extract_hours/`
- 테스트: 시간이 없는 교육이 있는 부서로 실제 대화

**설문 카드에 붙는 과거 실적 힌트(무엇을 보여줄지)** (코드)

- 자리: `src/tabs/annual_plan/intake/agent.py`의 힌트 함수
- 테스트: 실적이 있는 부서로 실제 대화

**교육 목록 표·설문 카드·확정 요약의 머리말과 안내문** (코드)

- 자리: `src/tabs/annual_plan/intake/agent.py`의 렌더 함수들
- 함께 볼 곳: 질문 카드 블록의 화면 계약(`:::q`, [API 계약](../../reference/api.md)) · 렌더를 고정하는 단위 테스트
- 테스트: 단위 테스트

**화면 버튼으로 들어오는 답의 기계 형식** (코드)

- 자리: `src/tabs/annual_plan/intake/agent.py`의 카드 답 해석
- 함께 볼 곳: 프론트 계약(형식을 바꾸면 화면도 함께)
- 테스트: 단위 테스트

**수시 교육을 기본으로 넣을지 뺄지** (코드)

- 자리: `src/tabs/annual_plan/intake/agent.py`의 목록 조립
- 함께 볼 곳: 구상 에이전트의 수시 회차 골격
- 테스트: 단위 테스트

## 설문 질문·보기 수정

설문 질문과 보기는 화면 표시와 처리 코드가 한 벌입니다. **보기의 뜻은 처리 코드에
있으므로**, 처리 코드 없이 보기만 추가하면 선택해도 아무 일도 일어나지 않는 보기가
됩니다(오류는 나지 않으며, 실제로 그런 보기가 발견되어 제거된 일이 있습니다).

| 수정 위치 | 내용 |
|---|---|
| `src/tabs/annual_plan/intake/agent.py` | 질문 문구·보기·기본값·값 필요 표시(화면에 보이는 부분 전체)와, 계획 범위 답에 따른 자율 교육 제외·단계 생략 |
| `src/tabs/annual_plan/plan_table/agent.py` | 답을 실제 값으로 옮기는 곳. 근로자 분류·감면 답의 기준 시간 조정, 시간 분할 보기의 회차 수 변환표, 교육방법·평가방법·강사 적용, 복원·추가된 교육의 빈 칸 채움 |
| `src/tabs/annual_plan/plan_table/schedule_rules.py` | 실시월 배정 방식 보기와 배정 규칙의 연결 |
| `src/tabs/annual_plan/intake/auto.py` | 일괄 생성의 답안(보기가 바뀌면 함께) |
| `src/tabs/annual_plan/editor/prompts/apply/` | 질문 답 기록 규칙: 기본값 적용 범위, 값 필요 보기의 되물음, 실시월 요구 메모 |

고친 뒤 `tests/unit/test_agents.py`를 확인합니다. 질문 문구·보기 라벨·기본값을 고정하는
단언이 여럿 있어 함께 손봐야 합니다.

보기 일부는 정의부에 고정되어 있지 않고 실행 시점에 만들어집니다. 교육방법 보기는
백엔드 표준 코드 목록에서, 강사 보기는 부서 담당자 이름으로 조립되고, 시간이 확인되지
않는 교육의 처리 질문은 결측 검사가 추가합니다. 이런 보기의 문구는 정의부에서 바꿀 수
없습니다.

## 코드 참조

| 구성 요소 | 코드 이름 | 모듈 경로 |
|---|---|---|
| 질문 에이전트 | `IntakeAgent` | `src/tabs/annual_plan/intake/agent.py` |
| 질문 정의 | `_template_questions` | `src/tabs/annual_plan/intake/agent.py` |
| 저장된 계획 복원 | `restore_saved_plan` | `src/tabs/annual_plan/plan_table/restore.py` |
| 일괄 생성 답안 | `build_auto_sheet` | `src/tabs/annual_plan/intake/auto.py` |
| 질문·보기 모델 | `SheetQuestion` / `QuestionOption` | `src/schemas/questions.py` |
