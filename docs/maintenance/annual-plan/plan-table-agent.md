---
sidebar_position: 5
---

# 구상 에이전트

구상 에이전트가 맡는 기능(회차 골격, 시간 배분, 실시월 배정, 주제 배분, 부서 특성, 경고,
계획표, 승인 게이트)을 고칠 때 손대는 자리입니다. 동작은
[사용하기 장의 구상 에이전트](../../annual-plan/plan-table-agent.md)에 있습니다.

## 고칠 자리

**주기별 기본 회차 수** (코드)

- 자리: `src/tabs/annual_plan/plan_table/schedule_rules.py`의 주기 해석
- 함께 볼 곳: 법정 최소 회차 경고가 같은 값을 기준으로 함
- 테스트: 단위 테스트

**시간 설정 답 적용 방식** (코드)

정기교육 대상 판정, 사무직·무재해 감면의 기준 시간 조정, 시간 분할 답의 회차 수가
여기 있습니다.

- 자리: `src/tabs/annual_plan/plan_table/agent.py`의 시간 설정 답 적용
- 함께 볼 곳: 설문 보기([질문 에이전트](./question-agent.md))
- 테스트: 단위 테스트

**회차 시간 분할 방식** (코드)

연간 시간을 회차에 균등하게 나누고 남는 시간을 처리합니다.

- 자리: `src/tabs/annual_plan/plan_table/agent.py`의 회차 마무리
- 함께 볼 곳: 병합 규칙의 시간 정합([편집 에이전트](./editor-agent.md))
- 테스트: 단위 테스트

**실시월 배정 규칙 문구** (코드 상수)

반기 집중·연중 분산·과거 관성 규칙의 정본 문구입니다.

- 자리: `src/tabs/annual_plan/plan_table/schedule_rules.py`
- 함께 볼 곳: 아래 "실시월 배정 규칙 수정" 절
- 테스트: 조립 단계 스모크

**월별 배정 상한** (설정)

연중 분산 배정에서 한 달에 넣는 교육 수의 상한입니다.

- 자리: 설정 키([환경 변수](../../reference/config.md)의 연간 계획 생성)
- 테스트: 단위 테스트

**실시월 배정 방식(요구 반영)** (프롬프트)

월에 대한 요구가 말로 들어왔을 때는 규칙 코드 대신 LLM이 배정합니다.

- 자리: `src/tabs/annual_plan/plan_table/prompts/assign_months/`
- 함께 볼 곳: 규칙 문구 상수가 프롬프트에 함께 실림 · 결과 검증 코드(지정된 월은 바꾸지 않음, 1~12 범위만)
- 테스트: 조립 단계 스모크

**회차별 주제 배분 기준** (프롬프트 + 검증 코드)

여러 회차로 나뉜 교육에서 어느 회차가 어느 주제를 다룰지입니다.

- 자리: `src/tabs/annual_plan/plan_table/prompts/split_sessions/` · `src/tabs/annual_plan/plan_table/agent.py`의 배분 검증
- 함께 볼 곳: 검증에 실패하면 균등 분배로 대체
- 테스트: 스모크

**핵심주제 추출** (프롬프트)

교육과정의 학습 내용에서 핵심주제 제목을 뽑습니다. "1. 제목" 같은 번호 목록이면
그대로 쓰고, 번호 목록이 아닌 글일 때만 LLM이 이 프롬프트로 뽑습니다.

- 자리: `src/tabs/annual_plan/plan_table/prompts/extract_topics/`
- 테스트: 스모크

**부서별 위험 특성 표** (설정 파일)

- 자리: `config/dept_risk_profiles.md`
- 함께 볼 곳: 경로 설정 키 · 기동 후 1회 읽어 보관하므로 표를 고치면 재기동
- 테스트: 본문에 반영되는지 실제 대화

**위험 특성의 교육 배정 기준** (프롬프트)

부서의 위험 특성을 어느 교육 내용에 반영할지입니다.

- 자리: `src/tabs/annual_plan/plan_table/prompts/assign_dept_focus/`
- 테스트: 스모크

**경고 4종 판정·문구** (코드)

법정 제외, 회차 미달, 시간 미달, 기준 미상 경고입니다.

- 자리: `src/tabs/annual_plan/plan_table/agent.py`의 경고 함수들
- 함께 볼 곳: 계획표 제시·요건 검사 결과·저장 계획 복원 제시·조회 응대 상태 요약 **네 화면이 한 함수를 공유**
- 테스트: 단위 테스트

**계획표 칸·문구** (코드)

- 자리: `src/tabs/annual_plan/plan_table/agent.py`의 계획표 렌더
- 함께 볼 곳: 조회 응대·추천 문구의 상태 요약이 같은 렌더를 씀
- 테스트: 단위 테스트

**경고 시 승인 보류 정책** (코드)

경고가 새로 생긴 턴에는 진행 동의가 와도 한 번 더 확인받습니다.

- 자리: `src/tabs/annual_plan/plan_table/agent.py`의 확인 게이트
- 테스트: 계획표 단계 스모크

**추가·복원 교육의 값 채움 규칙** (코드)

계획표에서 교육을 추가하거나 되살렸을 때 빈 칸이 채워지는 규칙입니다.

- 자리: `src/tabs/annual_plan/plan_table/agent.py`의 추가·완성 함수
- 함께 볼 곳: 조립과 같은 규칙을 재사용(조립 규칙을 바꾸면 함께 바뀜)
- 테스트: 스모크

**호출 동시 실행·제한 시간** (설정)

주제 배분·추출·재배분 호출이 몰릴 때의 조절 값입니다.

- 자리: 설정 키 3쌍([환경 변수](../../reference/config.md)의 기능별 LLM 호출 조절)
- 테스트: 값을 바꿔 실측

## 실시월 배정 규칙 수정

배정 규칙의 문구는 상수 하나가 정본이며 배정 프롬프트와 편집 프롬프트 두 곳에
주입됩니다. 버튼 답만으로 진행된 경우에는 같은 규칙을 **코드가 직접 수행**하므로, 문구를
바꾸면 규칙 코드의 동작과 편집 프롬프트의 화면 한정 조정 문장을 함께 맞춥니다.

| 수정 위치 | 내용 |
|---|---|
| `src/tabs/annual_plan/plan_table/schedule_rules.py` | 규칙 문구 상수와 규칙 코드(집중·분산·관성·빈 칸 채움) |
| `src/tabs/annual_plan/plan_table/prompts/assign_months/` | 자유 발화 요구가 있을 때의 배정 호출 |
| `src/tabs/annual_plan/editor/prompts/apply/` | 수정 턴에서 빈 월을 채우는 문장과 과거 실시월 부재 시의 조정 문장 |

## 코드 참조

| 구성 요소 | 코드 이름 | 모듈 경로 |
|---|---|---|
| 구상 에이전트 | `PlanTableAgent` | `src/tabs/annual_plan/plan_table/agent.py` |
| 경고 함수·계획표 렌더 | `plan_warning_block` / `plan_table` | `src/tabs/annual_plan/plan_table/agent.py` |
| 주기 해석·배정 규칙 | `classify_period` / `MONTH_RULES` / `assign_months` / `fill_missing_months` | `src/tabs/annual_plan/plan_table/schedule_rules.py` |
| 부서 위험 특성 로더 | `dept_risk_profiles` | `src/skills/_common.py` |
