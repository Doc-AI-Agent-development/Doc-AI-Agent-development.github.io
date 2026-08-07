---
sidebar_position: 3
---

# 디렉터리 구조

저장소의 디렉터리 구조와 각 영역의 역할, 그리고 해당 코드를 다루는 문서 페이지의
**대응표**입니다. 코드를 처음 열 때 이 페이지에서 시작하십시오.

```text
저장소 루트/
└─ src/
   ├─ api/                     HTTP 경계 — 엔드포인트·봉투 변환·턴 동시성·진행 상태
   ├─ core/                    설정·오류 코드
   ├─ schemas/                 데이터 구조 — 상태·구성 계획·산출물·근거
   ├─ agents/                  공통 기반과 탭 공용 에이전트 (base · suggester · eval_survey_summary)
   ├─ tools/                   LLM 클라이언트·도구 레지스트리·조회 도구 구성
   ├─ skills/                  외부 자원 접근 — edu_ai(백엔드 API) · documents(검색) · storage(스토리지)
   ├─ graphs/                  탭 그래프 등록
   └─ tabs/
      ├─ annual_plan/          연간 교육계획 탭
      │  ├─ graph.py           탭 그래프와 오케스트레이터(분류·단계 배선·곁가지 재제시)
      │  ├─ intake/            진입 판정·교육 목록·설문 (일괄 생성 기본값 포함)
      │  ├─ planner/           계획표 조립·실시월 규칙·저장 계획 복원
      │  ├─ editor/            대화 반영(결정 문서 왕복·전후 비교)
      │  ├─ conversation/      조회 응대
      │  └─ pipelines/
      │     ├─ generate_plan/  회차별 상세 내용 생성·생성 후 수정
      │     └─ verify/         요건 검사
      └─ edu_material/         교육자료 생성 탭
         ├─ graph.py           탭 그래프와 오케스트레이터
         ├─ handle_request/    대화 처리 — 작업 에이전트·도구·생성/수정 실행·확정
         ├─ syllabus/          구성 계획의 생성·수정 (계획을 고치는 유일한 자리)
         └─ pipelines/
            ├─ collect_evidence/   근거 수집
            ├─ generate_content/   교육자료·요약본 생성 (조각·실측·렌더러 포함)
            ├─ generate_exam/      시험 생성·시험지 렌더
            └─ revise_content/     부분 수정
```

## 코드 ↔ 문서 대응

| 코드 영역 | 다루는 문서 |
|---|---|
| `src/api/` | [API 계약](../reference/api.md), [상태와 세션](./state.md), [요청 처리 흐름](./request-lifecycle.md) |
| `src/schemas/` | [구성 계획](../edu-material/syllabus.md), [상태와 세션](./state.md), [용어 사전](../reference/names.md) |
| `src/agents/` | [LLM 호출 지도](../reference/llm-calls.md), [개요](../overview.md)의 공유 기반 |
| `src/skills/` | [외부 의존](../reference/external-services.md) |
| `src/tabs/annual_plan/graph.py` | [요청 처리 흐름](./request-lifecycle.md), [시작과 진입](../annual-plan/entry.md) |
| `src/tabs/annual_plan/router/` | [요청 처리 흐름](./request-lifecycle.md), [시작과 진입](../annual-plan/entry.md) |
| `src/tabs/annual_plan/intake/` | [시작과 진입](../annual-plan/entry.md), [교육 목록 확정](../annual-plan/course-list.md), [설문과 질문 카드](../annual-plan/questions.md) |
| `src/tabs/annual_plan/editor/` | [대화 반영 방식](../annual-plan/edits.md) |
| `src/tabs/annual_plan/plan_table/` | [연간 계획표 확인](../annual-plan/plan-table.md) |
| `src/tabs/annual_plan/plan_writer/` | [계획 생성](../annual-plan/generation.md), [계획 수정과 조회](../annual-plan/revision.md) |
| `src/tabs/annual_plan/checker/` | [요건 검사](../annual-plan/verification.md) |
| `src/tabs/annual_plan/inquiry/` | [계획 수정과 조회](../annual-plan/revision.md) |
| `src/tabs/edu_material/graph.py` | [요청 처리 흐름](./request-lifecycle.md) |
| `src/tabs/edu_material/handle_request/` | [요청 처리 흐름](./request-lifecycle.md), [교육 선택과 진입](../edu-material/course-entry.md), [생성 설정과 질문 카드](../edu-material/settings.md), [첨부 자료 처리](../edu-material/uploads.md), [수정과 확정](../edu-material/revision.md) |
| `src/tabs/edu_material/syllabus/` | [구성 계획](../edu-material/syllabus.md) |
| `src/tabs/edu_material/pipelines/collect_evidence/` | [근거 수집](../edu-material/evidence.md) |
| `src/tabs/edu_material/pipelines/generate_content/` | [교육자료 생성](../edu-material/generation.md) |
| `src/tabs/edu_material/pipelines/generate_exam/` | [시험과 강의평가](../edu-material/exam.md) |
| `src/tabs/edu_material/pipelines/revise_content/` | [수정과 확정](../edu-material/revision.md) |

에이전트 공통 기반 디렉터리 아래에는 **과거 구조의 흔적**(내용 없는 디렉터리)이 남아 있을 수
있습니다. 현재 사용되는 것은 공통 기반과 추천 문구, 설문·평가 에이전트뿐입니다.
