---
sidebar_position: 1.5
---

# 레포 구조

> AI Agent 코드 저장소(`code/`)의 디렉터리 구조입니다. FastAPI + LangGraph 기반.

```text
code/                                   # 코드 repo (git → EC2 pull)
└── src/
    ├── api/                            # FastAPI — BFF가 호출하는 경계
    │   ├── main.py                     # 앱 생성·CORS·시작 시 클라이언트 초기화
    │   ├── routes.py                   # POST /agent/invoke · GET /health
    │   ├── envelope.py                 # 요청/응답 "봉투" 형식 정의  ← 아래 용어 설명
    │   └── deps.py                     # 의존성 주입(공유 객체 제공)  ← 아래 용어 설명
    │
    ├── agents/                         # 8개 에이전트 — 모두 BaseAgent 상속
    │   ├── base_agent.py               # BaseAgent: run(state)->state + llm·tool·prompt·근거 헬퍼
    │   ├── dialog.py                   # 오케스트레이터: 분류·라우팅·패키징
    │   ├── compliance.py               # 교육 기준·실시 의무 조회
    │   ├── content_preprocess.py       # 교육 자료 구성
    │   ├── content_generation.py       # 구성안·발표 자료 생성·수정
    │   ├── exam_generation.py          # 시험·설문 생성 + 주관식 채점
    │   ├── eval_survey_summary.py      # 결과보고서·강의평가 종합
    │   ├── requirement_check.py        # 근거·요건 검증
    │   └── annual_plan.py              # 연간 교육계획 설계
    │
    ├── graphs/                         # LangGraph — 시나리오 1개 = 그래프 1개
    │   ├── registry.py                 # scope → graph 매핑 (dialog가 사용)
    │   ├── annual_plan.py
    │   ├── content_generation.py
    │   ├── grading_report.py
    │   └── revision.py
    │
    ├── tools/                          # 데이터 액세스 + LLM (인터페이스 + 구현)
    │   ├── tool.py                     # Tool 인터페이스(Protocol) — mock ↔ 실물 교체용
    │   ├── registry.py                 # tool 모음·주입
    │   ├── sql_query.py                # 컴플라이언스 DB·라우터(관계형)   [+ mock]
    │   ├── document_fetch.py           # 원문 가져오기                  [+ mock]
    │   ├── vector_search.py            # 의미검색                       [+ mock]
    │   └── llm.py                      # LLM 클라이언트 (chat·structured output)
    │
    ├── schemas/                        # 도메인 타입 (Pydantic) — BFF/백엔드 타입에 정렬
    │   ├── state.py                    # State — 모든 그래프가 공유 (= 봉투의 data.state)
    │   ├── document.py                 # EvidenceRef(교육자료 출처) · DocMeta · DocChunk
    │   ├── compliance.py               # EducationCriteria(교육 기준) · TrainingObligation(실시 의무)
    │   │                               #   · RequiredItem · EduCategory · AudienceGroup · LegalRef(법령 근거)
    │   ├── education_content.py        # EducationMaterial · Presentation · ContentPlan
    │   ├── exam.py                     # Question · ExamSheet · ExamResult · GradingResult · Survey
    │   ├── training_report.py          # ResultStats · CompletionGap · Review · ReviewSummary
    │   ├── training_plan.py            # EducationPlanItem · AnnualPlan · PlanProposal
    │   ├── revision.py                 # RevisionRequest · RevisionTarget
    │   └── verification.py             # VerificationResult · Issue
    │
    ├── prompts/                        # 프롬프트 — {agent}/{task}/system.yaml · user_template.yaml
    │
    └── core/
        ├── config.py                   # 설정(env): LLM·DB·벡터·서비스토큰
        ├── logging.py                  # 구조화 로그 (감사·근거 추적)
        └── errors.py                   # 에러 → 봉투 error{code,message} 매핑

tests/         # unit(에이전트·tools mock) · graphs(시나리오) · api(봉투)
scripts/       # setup.sh(venv·deps·env) · run.sh(uvicorn 기동)
pyproject.toml · .env.example · Dockerfile · README.md
```

## `api/` 주요 파일

`envelope.py`와 `deps.py`는 역할이 이름만으로 드러나지 않으므로 설명을 덧붙입니다.

### envelope — `api/envelope.py`

모든 요청과 응답을 같은 형식으로 감싸는 봉투입니다. 내용물(`messages`·`state`)을 일정한 바깥 구조에 담아 주고받습니다.

```python
# 요청
{ "data": { "messages": [ ... ], "state": { ... } } }

# 응답
{ "success": true, "data": { ... }, "meta": { ... } }
```

`envelope.py`는 이 형식을 Pydantic 모델로 정의합니다. 들어오는 요청을 검증하고, 나가는 응답을 같은 형식으로 직렬화합니다. 형식은 `api-guide` 계약을 따릅니다.

### deps — `api/deps.py`

라우트가 사용하는 공유 객체(그래프·도구·설정)를 한곳에서 준비해 주입합니다(dependency injection). 앱이 시작할 때 한 번 생성하고, 라우트는 FastAPI의 `Depends`로 받아 사용합니다.

```python
# deps.py
def get_graphs() -> GraphRegistry:
    return GRAPH_REGISTRY

# routes.py
@router.post("/agent/invoke")
def invoke(req: EnvelopeRequest, graphs = Depends(get_graphs)):
    ...
```

주입 대상을 교체하면 테스트에서 의존성을 격리할 수 있습니다.

---

**의존성이 쌓이는 순서** (개발도 이 순서로): `schemas/state.py` → `tools/`(인터페이스+mock) → `agents/base.py` → 각 에이전트 → `graphs/` → `api/`.
