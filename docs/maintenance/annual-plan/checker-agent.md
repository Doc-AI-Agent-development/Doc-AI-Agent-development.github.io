---
sidebar_position: 7
---

# 요건 검사 에이전트

요건 검사 에이전트가 맡는 기능(검토 기준·말투, 시점, 결과 데이터)을 고칠 때 손대는
자리입니다. 동작은 [사용하기 장의 요건 검사 에이전트](../../annual-plan/checker-agent.md)에
있습니다.

## 고칠 자리

**검토 기준·말투** (프롬프트)

무엇을 몇 개까지 짚는지입니다. 시킨 변경은 다시 짚지 않고, 확실치 않으면 침묵합니다.

- 자리: `src/tabs/annual_plan/checker/prompts/check/`
- 함께 볼 곳: 계획표 경고와 같은 내용을 반복하지 않는 규칙(경고 문구를 바꾸면 "이미 표시된 경고" 입력도 바뀜) · 결과 칸 설명(`src/tabs/annual_plan/checker/agent.py`의 결과 모델)
- 테스트: 검사 단계 스모크

**검사 시점** (코드)

- 자리: 구상 에이전트의 호출 두 곳(계획표 첫 제시·수정 반영 턴, `src/tabs/annual_plan/plan_table/agent.py`)과 그래프 배선의 검사 노드(`src/tabs/annual_plan/graph.py`)
- 함께 볼 곳: 생성 후 수정 턴은 계획 작성 에이전트가 남기는 "이번 턴에 바뀐 값" 신호가 있어야 시킨 변경을 걸러낼 수 있음
- 테스트: 스모크

**결과 데이터 형태** (코드)

- 자리: `src/tabs/annual_plan/checker/agent.py`의 결과 조립 · `src/schemas/verification.py`
- 함께 볼 곳: 화면과의 약속이므로 바꾸면 화면 담당과 확인
- 테스트: 단위 테스트

**결과 안내 문구** (코드)

- 자리: `src/tabs/annual_plan/checker/agent.py`
- 테스트: 단위 테스트

## 주의

검사 호출은 부가 기능이라 **실패하면 침묵**합니다. 프롬프트를 고친 뒤 검사가 아무것도
짚지 않으면 기준 때문인지 호출 실패 때문인지 로그로 구분하십시오. 기준을 넓힐 때는 과거에
오탐이 잦아 차단 검사를 없앤 이력이 있다는 점을 고려합니다. 확실한 것만 짚고, 막지
않습니다.

## 코드 참조

| 구성 요소 | 코드 이름 | 모듈 경로 |
|---|---|---|
| 요건 검사 에이전트 | `PlanCheckerAgent` | `src/tabs/annual_plan/checker/agent.py` |
| 검사 결과 모델 | `CheckNotes` / `Verification` | `src/tabs/annual_plan/checker/agent.py` / `src/schemas/verification.py` |
