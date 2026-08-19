---
sidebar_position: 7
---

# 요건 검사 에이전트

요건 검사 에이전트가 맡는 기능(검토 기준·말투, 시점, 결과 데이터)을 고칠 때 손대는
자리입니다. 동작은 [사용하기 장의 요건 검사 에이전트](../../annual-plan/checker-agent.md)에
있습니다.

## 고칠 자리

| 고치고 싶은 것 | 층 | 자리 | 함께 볼 곳 | 확인 |
|---|---|---|---|---|
| 검사가 짚는 기준·개수·말투(재지적 금지, 침묵 기본) | 프롬프트 | `src/tabs/annual_plan/checker/prompts/check/` | 계획표 경고와 같은 내용을 반복하지 않는 규칙 — 경고 함수의 문구를 바꾸면 이 프롬프트의 "이미 표시된 경고" 입력도 바뀜 · 결과 칸 설명(`checker/agent.py`의 결과 모델) | 검사 단계 스모크 |
| 검사를 수행하는 시점 | 코드 | 구상 에이전트의 호출 두 곳(계획표 첫 제시·수정 반영 턴, `plan_table/agent.py`)과 그래프 배선의 검사 노드(`graph.py`) | 생성 후 수정 턴은 계획 작성 에이전트의 "이번 턴 변경" 신호가 있어야 재지적 금지가 성립 | 스모크 |
| 검사 결과 데이터의 모양(통과 고정·경고 수준) | 코드 | `src/tabs/annual_plan/checker/agent.py`의 결과 조립 · `src/schemas/verification.py` | 화면 계약 — 바꾸면 프론트 확인 | 단위 테스트 |
| 검사 결과 안내 문구 | 코드 | `src/tabs/annual_plan/checker/agent.py` | — | 단위 테스트 |

## 주의

검사 호출은 부가 기능이라 **실패하면 침묵**합니다. 프롬프트를 고친 뒤 검사가 아무것도
짚지 않으면 기준 때문인지 호출 실패 때문인지 로그로 구분하십시오. 기준을 넓힐 때는 과거에
오탐이 잦아 차단 검사를 없앤 이력이 있다는 점을 고려합니다 — 확실한 것만, 막지 않고.

## 코드 참조

| 구성 요소 | 코드 이름 | 모듈 경로 |
|---|---|---|
| 요건 검사 에이전트 | `PlanCheckerAgent` | `src/tabs/annual_plan/checker/agent.py` |
| 검사 결과 모델 | `CheckNotes` / `Verification` | `src/tabs/annual_plan/checker/agent.py` / `src/schemas/verification.py` |
