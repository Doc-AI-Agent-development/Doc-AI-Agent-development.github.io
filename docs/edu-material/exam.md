---
sidebar_position: 7
---

# 시험과 강의평가

시험지는 교육 내용의 이해도를 확인하는 문항들로 구성된 문서입니다. 교육자료와 함께
**기본으로 생성**되며, 담당자가 제외를 요청한 경우에만 생성하지 않습니다. 강의평가
설문은 **요청 시 생성**됩니다. 시험 응시와 채점, 수료 처리는 이 탭의 범위 밖이며
화면과 백엔드가 담당합니다.

## 시험 구성

시험 구성은 시험을 어떤 문항들로 만들지 정한 값입니다. 총 문항 수와 유형별 문항 수,
난이도, 출제 방침 요구가 담기며, 교육자료 구성 계획과 **별개의 값으로 관리**됩니다.
구성은 **시험 구성 카드**([생성 설정과 질문 카드](./settings.md))로 결정하며, 카드 밖의
자유 발화 요구("OX 위주로 15문항")도 구성에 반영됩니다. 위임 시의 기본 구성(문항 수와
유형 배분)은 같은 페이지의 기본값 표에 정리되어 있습니다.

- **문항 수** — 총 문항 수를 바꾸면 유형별 비율을 유지한 채 다시 배분합니다.
- **유형** — 객관식, 주관식(단답형), O/X, 표 기반 O/X 네 유형의 문항 수를 정합니다.
  표 기반 O/X는 교육자료 본문의 표를 문항에 옮겨 싣고 그 표를 근거로 참·거짓을
  판정하는 유형입니다.
- **난이도** — 따로 지정하지 않으면 교육자료의 난이도 설정을 그대로 잇습니다. 시험
  난이도를 따로 지정하면 그때부터 교육자료 난이도와 독립적으로 관리됩니다.
- **제외** — 시험을 제외하면 구성이 제거되고, **이미 생성된 시험지도 함께 내립니다**.

## 데이터 구조

시험 구성과 문항은 다음 구조로 저장됩니다. 여기에는 주요 필드만 실었으며, 전체 필드
정의는 스키마 파일(`src/schemas/exam.py`)에 있습니다.

<pre class="type-block"><code>class <span class="tname tname-exam">ExamConfig</span>(BaseModel):
    <span class="cmt">"""시험 구성 — 시험을 어떤 문항들로 만들 것인가."""</span>

    total: int                   <span class="cmt"># 총 문항 수 — 네 유형 문항 수의 합과 항상 같다</span>
    objective: int               <span class="cmt"># 객관식 문항 수 — 정답은 언제나 하나</span>
    short: int                   <span class="cmt"># 주관식(단답형) 문항 수 — 빈칸은 하나</span>
    ox: int                      <span class="cmt"># O/X 문항 수</span>
    ox_table: int                <span class="cmt"># 표 기반 O/X 문항 수</span>
    difficulty: str | None       <span class="cmt"># 출제 난이도 — 미지정이면 교육자료 난이도를 잇는다</span>
    policy_note: str             <span class="cmt"># 출제 방침 요구 — 담당자 발화의 해당 구절 그대로</span>


class <span class="tname tname-exam">Question</span>(BaseModel):
    <span class="cmt">"""시험 문항 하나."""</span>

    question_id: str             <span class="cmt"># 문항 식별자 — 문항 교체 시에도 보존된다</span>
    qtype: str                   <span class="cmt"># 유형 — objective(객관식) / short(단답형) / ox / ox_table(표 기반 O/X)</span>
    text: str                    <span class="cmt"># 발문 — 수강자가 읽고 답하는 물음</span>
    choices: list[str] | None    <span class="cmt"># 객관식 보기 목록</span>
    passage: str | None          <span class="cmt"># 발문에 앞서 읽는 보조 지문 — 상황 설명이나 판정 규칙</span>
    table: ExamTable | None      <span class="cmt"># 표 기반 O/X가 판정 기준으로 삼는 표</span>
    answer: str                  <span class="cmt"># 정답 — 단답형은 모범답안</span>
    answer_rule: str | None      <span class="cmt"># 단답형 자동채점이 정답으로 인정할 표기 목록</span>
    points: float | None         <span class="cmt"># 배점 — 100점을 문항 수로 나눈 계산값</span>
    explanation: str | None      <span class="cmt"># 해설 — 정답의 근거</span>
    source_page: int | None      <span class="cmt"># 근거가 실린 자료 페이지 번호</span>
</code></pre>

## 출제 원칙

**출제 재료는 수강자가 받는 자료 본문이 우선입니다.** 자료 본문이 있는 교시는 그
본문에서 출제합니다 — 수강자가 배우지 않은 내용이 시험에 나오지 않게 하는 원칙입니다.
본문이 없는 교시는 [문서 수집](./evidence.md)에서 채택된 문서의 전문으로 대체하고,
본문도 채택 문서도 없는 교시는 출제에서 제외됩니다.

**문항에는 출처 페이지가 기록됩니다.** 각 문항에 근거가 실린 자료의 페이지 번호가
담기며, 실제 자료의 교시별 페이지 범위와 대조해 보정됩니다.

**표 기반 O/X는 재료를 확인한 뒤 출제합니다.** 출제 재료에 표가 없으면 해당 문항 수를
다른 유형으로 옮기고, 그 사실이 완료 보고에 포함됩니다.

**부족분은 사실대로 보고됩니다.** 유형별 요청 수를 채우지 못하면 재생성을 1회
시도합니다. 그래도 부족하면 부족분이 완료 보고에 그대로 담깁니다 — **코드가 문항을
임의로 만들어 채우지 않습니다**.

**배점은 담당자가 지정하는 값이 아닙니다.** 100점을 문항 수로 나눈 균등 배점이
계산값으로 문항 데이터에 담기며, 대화의 구성 요약에는 표기하지 않습니다. 합격 점수와
재응시 정책도 이 탭이 정하지 않으며, 응시를 담당하는 화면과 백엔드의 값입니다.

## 시험지 형식

시험지는 **문항부와 정답과 해설 절**로 구성된 단일 HTML 문서입니다. 정답과 해설 절은
인쇄 시 새 면에서 시작되도록 렌더됩니다. 답란 형식은 유형별로 다릅니다 — 객관식은 보기
목록, O/X는 괄호, 단답형은 기입란입니다. 문항부와 정답과 해설 절은 다음과 같은
모양입니다(가공 예시).

```text
1. 밀폐공간에서 작업을 시작하기 전 가장 먼저 해야 하는 조치는 무엇인가?
   ① 산소·유해가스 농도 측정   ② 조명 설치   ③ 작업 도구 반입   ④ 환기팬 철거

2. 산소 농도 18% 미만인 밀폐공간에는 송기마스크 없이 진입할 수 있다. (   )

3. 밀폐공간 작업 중 출입구에 상시 배치해야 하는 인력의 명칭을 쓰시오.   답: ________

정답과 해설

1. 정답: ① 산소·유해가스 농도 측정
   해설: 진입 전 농도 측정이 모든 안전 조치의 선행 조건이다.
2. 정답: X
   해설: 산소 농도 18% 미만은 산소결핍 상태로, 송기마스크 없이 진입할 수 없다.
3. 정답: 감시인
```

## 강의평가 설문

강의평가 설문은 요청 시 기본 문항 구성으로 생성되며, 문항 추가·삭제를 지원합니다.
설문 생성은 평가·결과 탭과 공유하는 공용 에이전트가 담당합니다.

## 코드 참조

| 구성 요소 | 코드 이름 | 모듈 경로 |
|---|---|---|
| 시험 구성·문항 스키마 | `ExamConfig` / `Question` | `src/schemas/exam.py` |
| 시험 구성 카드·구성 값 조립 | — | `src/tabs/edu_material/handle_request/exam_setup.py` |
| 시험 생성 파이프라인 | `ExamGenerationAgent` | `src/tabs/edu_material/pipelines/generate_exam/agent.py` |
| 시험지 렌더 | `render_exam_paper` | `src/tabs/edu_material/pipelines/generate_exam/paper.py` |
| 시험 생성 실행 | `produce_exam` / `make_exam` | `src/tabs/edu_material/handle_request/produce.py` |
| 설문 생성(공용 에이전트) | `EvalSurveySummaryAgent` | `src/agents/eval_survey_summary/agent.py` |
