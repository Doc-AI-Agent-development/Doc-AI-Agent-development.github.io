---
sidebar_position: 3
---

# 디렉터리 구조

저장소의 디렉터리 구조와 각 영역의 역할, 그리고 해당 코드를 다루는 문서 페이지의
**대응표**입니다. 코드를 처음 열 때 이 페이지에서 시작하십시오.

## 저장소 루트

```text
저장소 루트/
├─ src/                서비스 코드 전부. 실행되는 것은 여기에만 있습니다
├─ tests/              테스트와 검증 도구
├─ scripts/            설치·기동 스크립트와 운영 보조 도구
├─ config/             운영자가 직접 편집하는 설정 파일
├─ data/               서버가 실행 중에 만드는 파일이 쌓이는 자리(저장소에는 폴더만)
├─ Dockerfile          컨테이너 이미지 정의
├─ pyproject.toml      패키지 정보와 의존성 선언, 도구 설정
├─ requirements.txt    설치할 의존성의 고정 버전 목록
└─ .env.example        환경 변수 서식. 실값은 .env 에 넣습니다
```

## src 아래

각 폴더의 상세는 폴더마다 있는 README에 있습니다.

```text
src/
├─ api/         화면의 요청을 받아 응답으로 돌려주는 바깥 경계입니다. 업무 판단은 하지
│               않고, 요청을 해당 탭에 넘기고 결과를 정해진 형식으로 포장합니다
├─ core/        설정값과 로그, 오류 종류의 정의입니다. 모든 코드가 여기에 기댑니다
├─ schemas/     주고받는 데이터의 모양 정의입니다. 대화 상태, 계획, 산출물처럼 코드
│               곳곳에서 쓰는 자료 구조가 한곳에 모여 있습니다
├─ agents/      어느 탭에도 속하지 않는 공용 부품입니다. 모든 에이전트가 물려받는
│               기반과, 추천 답변 칩, 요약 생성이 여기 있습니다
├─ tools/       LLM을 부르는 창구와, 조회 기능을 LLM이 쓸 수 있는 도구로 포장하는 곳입니다
├─ skills/      바깥에서 데이터를 읽어 오는 곳입니다. 교육 데이터(백엔드 API), 사내 문서
│               검색, 담당자가 올린 파일 세 갈래이며 쓰기는 하지 않습니다
├─ graphs/      어떤 탭이 있는지 등록하고, 대화 상태를 저장할 곳을 연결합니다
└─ tabs/        탭별 코드입니다. 탭 하나가 폴더 하나이고 서로 코드를 공유하지 않습니다
```

## 탭 아래

```text
src/tabs/
├─ annual_plan/        연간 교육계획 탭. 폴더 하나가 에이전트 하나입니다
│  ├─ graph.py         단계를 잇는 배선. 곁가지 대화 뒤 하던 화면을 다시 그리는 일도 합니다
│  ├─ router/          들어온 말을 계획 작업·조회·범위 밖 셋으로 가르고, 범위 밖은 거절합니다
│  ├─ intake/          어느 화면부터 시작할지 정하고, 교육 목록 확정과 설문을 진행합니다
│  ├─ plan_table/      계획표(회차·시행월·시간·강사)를 짜고 확인받습니다. 실시월 배정
│  │                   규칙과 저장된 계획을 불러오는 변환도 여기 있습니다
│  ├─ plan_writer/     회차마다 교육 내용 본문을 씁니다. 생성된 뒤의 수정도 담당합니다
│  ├─ checker/         완성된 계획을 법정 기준과 대조해 경고합니다. 막지는 않습니다
│  ├─ editor/          담당자의 말을 계획에 반영합니다. 설문·계획표·본문 담당이 각자
│  │                   불러 쓰는 부품이라 어느 화면에서 말하든 반영 방식이 같습니다
│  └─ inquiry/         질문에 답만 합니다. 계획은 고치지 않습니다
└─ edu_material/       교육자료 생성 탭
   ├─ graph.py         탭 그래프와 요청 분류
   ├─ handle_request/  대화 하나가 도구를 골라 쓰는 곳. 교육 선택부터 생성·수정·확정까지
   ├─ syllabus/        무엇을 몇 교시로 만들지의 구성 계획. 계획을 고치는 유일한 자리입니다
   └─ pipelines/       정해진 순서로 도는 절차
      ├─ collect_evidence/   근거로 쓸 사내 문서를 찾아 모읍니다
      ├─ generate_content/   교육자료와 요약본을 만듭니다(조각·실측·렌더 포함)
      ├─ generate_exam/      시험을 만들고 시험지를 조판합니다
      └─ revise_content/     만들어진 산출물의 부분 수정
```

## 코드 ↔ 문서 대응

| 코드 영역 | 다루는 문서 |
|---|---|
| `src/api/` | [API 계약](../reference/api.md), [상태와 세션](./state.md), [요청 처리 흐름](./request-lifecycle.md) |
| `src/core/` | [설정 항목](../reference/config.md) |
| `src/schemas/` | [구성 계획](../edu-material/syllabus.md), [상태와 세션](./state.md), [용어 사전](../reference/names.md) |
| `src/agents/` | [LLM 호출 지도](../reference/llm-calls.md), [개요](../overview.md)의 공유 기반 |
| `src/tools/` | [LLM 호출 지도](../reference/llm-calls.md), [설정 항목](../reference/config.md) |
| `src/skills/` | [외부 의존](../reference/external-services.md) |
| `src/graphs/` | [요청 처리 흐름](./request-lifecycle.md), [개요](../overview.md)의 탭 구조 |
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

내려받은 저장소에 위 목록에 없는 디렉터리가 보인다면 **과거 구조의 흔적**입니다. 저장소에
등록되어 있지 않고 파이썬 실행 캐시만 들어 있으므로 지워도 됩니다.
