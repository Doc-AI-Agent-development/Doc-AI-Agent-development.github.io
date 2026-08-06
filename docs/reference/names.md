---
sidebar_position: 5
---

# 용어 사전

문서의 한국어 용어와 코드 이름의 대응표입니다. 본문 페이지 끝의 코드 참조 표는 이 표의
**부분집합**이며, 관련 문서 열은 그 용어를 본문으로 다루는 페이지입니다.

## 산출물

| 한국어 용어 | 상태 필드 | API 노출 이름 | 정의 위치 | 관련 문서 |
|---|---|---|---|---|
| 교육자료 (덱) | `deck` | `artifacts.presentation` | `src/schemas/education_content.py` | [교육자료 생성](../edu-material/generation.md) |
| 요약본 | `digest` | `artifacts.digest` | `src/schemas/education_content.py` | [교육자료 생성](../edu-material/generation.md) |
| 시험지 | `exam` | `artifacts.exam` | `src/schemas/exam.py` | [시험과 강의평가](../edu-material/exam.md) |
| 강의평가 설문 | `survey` | `artifacts.survey` | `src/schemas/exam.py` | [시험과 강의평가](../edu-material/exam.md) |
| 연간 계획 | `annual_plan` | `artifacts.annual_plan` | `src/schemas/training_plan.py` | [계획 생성](../annual-plan/generation.md) |
| 계획 기준선 | `checklist` | `artifacts.checklist` | `src/schemas/checklist.py` | [연간 계획표 확인](../annual-plan/plan-table.md) |
| 요건 검사 결과 | `verification` | `artifacts.verification` | `src/schemas/verification.py` | [요건 검사](../annual-plan/verification.md) |

## 핵심 개념

### 공통

| 한국어 용어 | 코드 이름 | 정의 위치 | 관련 문서 |
|---|---|---|---|
| 세션 상태 | `AppState` | `src/schemas/state.py` | [상태와 세션](../concepts/state.md) |

### 연간 교육계획 탭

| 한국어 용어 | 코드 이름 | 정의 위치 | 관련 문서 |
|---|---|---|---|
| 설문 시트 | `QuestionSheet` | `src/schemas/questions.py` | [설문과 질문 카드](../annual-plan/questions.md) |
| 결정 문서 | `EditableDoc` | `src/tabs/annual_plan/editor/schemas.py` | [대화 반영 방식](../annual-plan/edits.md) |
| 회차 계획 | `SessionPlan` | `src/schemas/checklist.py` | [연간 계획표 확인](../annual-plan/plan-table.md) |

### 교육자료 생성 탭

| 한국어 용어 | 코드 이름 | 정의 위치 | 관련 문서 |
|---|---|---|---|
| 구성 계획 | `Syllabus` | `src/schemas/syllabus.py` | [교육자료 구성 계획 수립](../edu-material/syllabus.md) |
| 교시 | `SyllabusSession` | `src/schemas/syllabus.py` | [교육자료 구성 계획 수립](../edu-material/syllabus.md) |
| 생성 설정 | `GenerationSettings` | `src/schemas/syllabus.py` | [생성 설정과 질문 카드](../edu-material/settings.md) |
| 연간 교육계획 재료 (원본 불변) | `PlanContent` / `annual_source_plan` | `src/schemas/education_content.py` | [교육자료 구성 계획 수립](../edu-material/syllabus.md) |
| 진행 시트 | `ContentSheet` | `src/schemas/content_tab.py` | [상태와 세션](../concepts/state.md) |
| 교육 작업공간 | `CourseWorkspace` | `src/schemas/state.py` | [교육 선택과 진입](../edu-material/course-entry.md) |
| 첨부 요지 | `UploadBrief` | `src/schemas/content_tab.py` | [첨부 자료 처리](../edu-material/uploads.md) |
| 근거 저장소·근거 항목 | `EvidenceStore` / `EvidenceItem` | `src/schemas/content_tab.py` | [문서 수집](../edu-material/evidence.md) |
| 수집 당시 재료 기록 (재수집 판정 기준) | `EvidenceBasis` | `src/schemas/content_tab.py` | [문서 수집](../edu-material/evidence.md) |
| 유닛 (내용 최소 단위) | `ContentUnit` 계열 | `src/schemas/education_content.py` | [교육자료 생성](../edu-material/generation.md) |
| 시험 구성 | `ExamConfig` | `src/schemas/exam.py` | [시험과 강의평가](../edu-material/exam.md) |
| 시험 문항 | `Question` | `src/schemas/exam.py` | [시험과 강의평가](../edu-material/exam.md) |
| 범위 판독 | `RevisionScope` / `SessionRevisionScope` | `src/schemas/content_tab.py` | [수정과 확정](../edu-material/revision.md) |

## 처리 주체

### 연간 교육계획 탭

| 한국어 용어 | 코드 이름 | 위치 | 관련 문서 |
|---|---|---|---|
| 연간 탭 오케스트레이터 | `AnnualRouterAgent` | `src/tabs/annual_plan/router/agent.py` | [요청 처리 흐름](../concepts/request-lifecycle.md) |
| 질문 에이전트 | `IntakeAgent` | `src/tabs/annual_plan/intake/` | [설문과 질문 카드](../annual-plan/questions.md) |
| 구상 에이전트 | `PlanTableAgent` | `src/tabs/annual_plan/plan_table/` | [연간 계획표 확인](../annual-plan/plan-table.md) |
| 편집 에이전트 | `PlanEditorAgent` | `src/tabs/annual_plan/editor/` | [대화 반영 방식](../annual-plan/edits.md) |
| 계획 작성 에이전트 | `PlanWriterAgent` | `src/tabs/annual_plan/plan_writer/` | [계획 생성](../annual-plan/generation.md) |
| 요건 검사 에이전트 | `PlanCheckerAgent` | `src/tabs/annual_plan/checker/` | [요건 검사](../annual-plan/verification.md) |
| 조회 에이전트 | `InquiryAgent` | `src/tabs/annual_plan/inquiry/` | [계획 수정과 조회](../annual-plan/revision.md) |

### 교육자료 생성 탭

| 한국어 용어 | 코드 이름 | 위치 | 관련 문서 |
|---|---|---|---|
| 오케스트레이터 | `ContentTabOrchestrator` | `src/tabs/edu_material/graph.py` | [요청 처리 흐름](../concepts/request-lifecycle.md) |
| 작업 에이전트 | `ContentIntakeAgent` | `src/tabs/edu_material/handle_request/agent.py` | [요청 처리 흐름](../concepts/request-lifecycle.md) |
| 계획 작성·수정 에이전트 | `SyllabusBuilder` / `SyllabusReviser` | `src/tabs/edu_material/syllabus/` | [교육자료 구성 계획 수립](../edu-material/syllabus.md) |
| 문서 수집 파이프라인 | `ContentEvidenceAgent` | `src/tabs/edu_material/pipelines/collect_evidence/` | [문서 수집](../edu-material/evidence.md) |
| 생성 파이프라인 | `DeckComposer` | `src/tabs/edu_material/pipelines/generate_content/` | [교육자료 생성](../edu-material/generation.md) |
| 시험 생성 파이프라인 | `ExamGenerationAgent` | `src/tabs/edu_material/pipelines/generate_exam/` | [시험과 강의평가](../edu-material/exam.md) |
| 수정 파이프라인 | `ContentRevisionAgent` | `src/tabs/edu_material/pipelines/revise_content/` | [수정과 확정](../edu-material/revision.md) |

### 공용

| 한국어 용어 | 코드 이름 | 위치 | 관련 문서 |
|---|---|---|---|
| 추천 문구 에이전트 | `SuggesterAgent` | `src/agents/suggester/` | [API 계약](./api.md) |
| 설문·평가 공용 에이전트 | `EvalSurveySummaryAgent` | `src/agents/eval_survey_summary/` | [시험과 강의평가](../edu-material/exam.md) |
