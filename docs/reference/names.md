---
sidebar_position: 5
---

# 이름 사전

문서의 한국어 용어와 코드 이름, API 응답에 노출되는 이름의 **대응표**입니다. 본문 페이지
끝의 코드 참조 표는 이 표의 **부분집합**입니다.

## 산출물

| 한국어 용어 | 상태 필드 | API 노출 이름 | 정의 위치 |
|---|---|---|---|
| 교육자료 | `deck` | `artifacts.presentation` | `src/schemas/education_content.py` |
| 요약본 | `digest` | `artifacts.digest` | `src/schemas/education_content.py` |
| 시험지 | `exam` | `artifacts.exam` | `src/schemas/exam.py` |
| 강의평가 설문 | `survey` | `artifacts.survey` | `src/schemas/exam.py` |
| 연간 계획 | `annual_plan` | `artifacts.annual_plan` | `src/schemas/training_plan.py` |
| 계획 기준선 | `checklist` | `artifacts.checklist` | `src/schemas/checklist.py` |
| 요건 검사 결과 | `verification` | `artifacts.verification` | `src/schemas/verification.py` |

## 핵심 개념

| 한국어 용어 | 코드 이름 | 정의 위치 |
|---|---|---|
| 구성 계획 | `Syllabus` | `src/schemas/syllabus.py` |
| 교시 | `SyllabusSession` | `src/schemas/syllabus.py` |
| 생성 설정 | `GenerationSettings` | `src/schemas/syllabus.py` |
| 연간 교육계획 재료 (원본 불변) | `PlanContent` / `annual_source_plan` | `src/schemas/education_content.py` |
| 근거 저장소·근거 항목 | `EvidenceStore` / `EvidenceItem` | `src/schemas/content_tab.py` |
| 근거 재료 지문 | `EvidenceBasis` | `src/schemas/content_tab.py` |
| 진행 시트 | `ContentSheet` | `src/schemas/content_tab.py` |
| 시험 구성 | `ExamConfig` | `src/schemas/exam.py` |
| 교육 작업공간 | `CourseWorkspace` | `src/schemas/state.py` |
| 첨부 요지 | `UploadBrief` | `src/schemas/content_tab.py` |
| 유닛 (내용 최소 단위) | `ContentUnit` 계열 | `src/schemas/education_content.py` |
| 설문 시트 | `QuestionSheet` | `src/schemas/questions.py` |
| 결정 문서 | `EditableDoc` | `src/tabs/annual_plan/editor/schemas.py` |
| 회차 계획 | `SessionPlan` | `src/schemas/checklist.py` |
| 세션 상태 | `AppState` | `src/schemas/state.py` |

## 처리 주체

| 한국어 용어 | 코드 이름 | 위치 |
|---|---|---|
| 오케스트레이터 | `ContentTabOrchestrator` | `src/tabs/edu_material/graph.py` |
| 작업 에이전트 | `ContentIntakeAgent` | `src/tabs/edu_material/handle_request/agent.py` |
| 계획 작성기 / 수정기 | `SyllabusBuilder` / `SyllabusReviser` | `src/tabs/edu_material/syllabus/` |
| 근거 수집 파이프라인 | `ContentEvidenceAgent` | `src/tabs/edu_material/pipelines/collect_evidence/` |
| 생성 파이프라인 | `DeckComposer` | `src/tabs/edu_material/pipelines/generate_content/` |
| 시험 생성 파이프라인 | `ExamGenerationAgent` | `src/tabs/edu_material/pipelines/generate_exam/` |
| 수정 파이프라인 | `ContentRevisionAgent` | `src/tabs/edu_material/pipelines/revise_content/` |
| 연간 탭 오케스트레이터 | `AnnualTabOrchestrator` | `src/tabs/annual_plan/graph.py` |
| 설문 에이전트 | `AnnualIntakeAgent` | `src/tabs/annual_plan/intake/` |
| 계획표 조립기 | `PlannerAgent` | `src/tabs/annual_plan/planner/` |
| 대화 반영 편집기 | `PlanEditorAgent` | `src/tabs/annual_plan/editor/` |
| 생성·수정 에이전트 | `AnnualPlanAgent` | `src/tabs/annual_plan/pipelines/generate_plan/` |
| 요건 검사기 | `PlanCheckerAgent` | `src/tabs/annual_plan/pipelines/verify/` |
| 조회 응대 에이전트 | `ConversationAgent` | `src/tabs/annual_plan/conversation/` |
| 추천 문구 에이전트 | `SuggesterAgent` | `src/agents/suggester/` |
| 설문·평가 공용 에이전트 | `EvalSurveySummaryAgent` | `src/agents/eval_survey_summary/` |
