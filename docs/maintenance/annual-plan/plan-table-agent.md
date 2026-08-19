---
sidebar_position: 5
---

# 구상 에이전트

구상 에이전트가 맡는 기능(회차 골격, 시간 배분, 실시월 배정, 주제 배분, 부서 특성, 경고,
계획표, 승인 게이트)을 고칠 때 손대는 자리입니다. 동작은
[사용하기 장의 구상 에이전트](../../annual-plan/plan-table-agent.md)에 있습니다.

## 고칠 자리

| 고치고 싶은 것 | 층 | 자리 | 함께 볼 곳 | 확인 |
|---|---|---|---|---|
| 주기(반기·연간·정기)별 기본 회차 수 | 코드 | `src/tabs/annual_plan/plan_table/schedule_rules.py`의 주기 해석 | 법정 최소 회차 경고가 같은 값을 기준으로 함 | 단위 테스트 |
| 정기교육 대상 판정, 사무직·무재해 감면이 기준 시간을 바꾸는 방식, 시간 분할 답의 회차 수 | 코드 | `src/tabs/annual_plan/plan_table/agent.py`의 시간축 답 적용 | 설문 보기([질문 에이전트](./question-agent.md)) | 단위 테스트 |
| 연간 시간을 회차에 나누는 방식(균등·반올림 잔차) | 코드 | `src/tabs/annual_plan/plan_table/agent.py`의 회차 마무리 | 병합 규칙의 시간 정합(편집 에이전트) | 단위 테스트 |
| 실시월 배정 규칙 문구(반기 집중·연중 분산·과거 관성) | 코드 상수 | `src/tabs/annual_plan/plan_table/schedule_rules.py` | 아래 "실시월 배정 규칙 수정" 절 | 조립 단계 스모크 |
| 한 달에 배정하는 교육 수 상한 | 설정 | 설정 키([환경 변수](../../reference/config.md)의 연간 계획 생성) | — | 단위 테스트 |
| 자유 발화 요구가 있을 때의 실시월 배정(LLM) | 프롬프트 | `src/tabs/annual_plan/plan_table/prompts/assign_months/` | 규칙 문구 상수가 변수로 주입됨 · 반환 검증 코드(지정 월 불가침·범위) | 조립 단계 스모크 |
| 여러 회차로 나뉜 교육의 회차별 주제 배분 | 프롬프트 + 검증 코드 | `src/tabs/annual_plan/plan_table/prompts/split_sessions/` · `plan_table/agent.py`의 배분 검증 | 검증 실패 시 균등 폴백 | 스모크 |
| 학습 주제 추출(정형 목차가 아닌 학습 내용) | 프롬프트 | `src/tabs/annual_plan/plan_table/prompts/extract_topics/` | 1차는 번호 목차 정규식(코드) | 스모크 |
| 부서별 위험 특성 표 | 설정 파일 | `config/dept_risk_profiles.md` | 경로 설정 키 · 기동 후 1회 읽어 보관 — 표를 고치면 재기동 | 본문에 반영되는지 실제 대화 |
| 부서 특성을 어느 교육에 붙일지 | 프롬프트 | `src/tabs/annual_plan/plan_table/prompts/assign_dept_focus/` | — | 스모크 |
| 경고 4종의 판정과 문구 | 코드 | `src/tabs/annual_plan/plan_table/agent.py`의 경고 함수들 | 계획표 제시·요건 검사 결과·저장 계획 복원 제시·조회 응대 상태 요약 **네 화면이 한 함수를 공유** | 단위 테스트 |
| 계획표의 칸·제시 문구 | 코드 | `src/tabs/annual_plan/plan_table/agent.py`의 계획표 렌더 | 조회 응대·추천 문구의 상태 요약이 같은 렌더를 씀 | 단위 테스트 |
| 경고가 새로 생겼을 때 승인을 보류하는 정책 | 코드 | `src/tabs/annual_plan/plan_table/agent.py`의 확인 게이트 | — | 계획표 단계 스모크 |
| 계획표에서 교육을 추가·복원했을 때 채워지는 값 | 코드 | `src/tabs/annual_plan/plan_table/agent.py`의 추가·완성 함수 | 조립과 같은 규칙을 재사용 — 조립 규칙을 바꾸면 함께 | 스모크 |
| 배분·주제 추출·재배분 호출의 동시 실행 수·제한 시간 | 설정 | 설정 키 3쌍([환경 변수](../../reference/config.md)의 기능별 LLM 호출 조절) | — | 값을 바꿔 실측 |

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
