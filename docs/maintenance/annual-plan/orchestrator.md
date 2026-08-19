---
sidebar_position: 2
---

# 오케스트레이터

오케스트레이터가 맡는 기능(발화 분류, 거절, 환영, 재시작, 진행 문구)을 고칠 때 손대는
자리입니다. 동작은 [사용하기 장의 오케스트레이터](../../annual-plan/orchestrator.md)에
있습니다.

## 고칠 자리

| 고치고 싶은 것 | 층 | 자리 | 함께 볼 곳 | 확인 |
|---|---|---|---|---|
| 발화를 작업·조회·범위 밖으로 가르는 기준(제안형 표현, 설문 중 결정/물음 구분, 섞인 발화) | 프롬프트 | `src/tabs/annual_plan/router/prompts/classify/` | 분류 결과의 칸(`src/schemas/dialog.py`의 분류 결과 모델) — 새 관찰 값을 받으려면 칸부터 | 실 LLM 배터리(분류는 모든 판에서 돌아감) |
| 범위 밖 발화의 거절 안내 말투 | 프롬프트 | `src/tabs/annual_plan/router/prompts/decline/` | 호출 실패 시 쓰는 고정 문구(`src/tabs/annual_plan/router/agent.py`) | 실제 대화 |
| 탭 첫 진입 환영 문구 | 코드 | `src/tabs/annual_plan/router/agent.py`의 환영 문구 상수 | 환영 턴을 고정하는 단위 테스트 | 단위 테스트 |
| "처음부터 다시"로 볼 발화의 기준 | 프롬프트 | 분류 프롬프트의 재시작 절 | 재시작 때 비우는 상태 목록(같은 파일의 재시작 처리) | 실제 대화 |
| 진행 표시 — 발화에서 뽑는 한 줄 | 프롬프트 | 분류 프롬프트의 진행 문구 절 | — | 진행 상태 조회로 실측 |
| 진행 표시 — 단계별 고정 라벨 | 코드 표 | `src/api/progress.py`의 라벨 표 | 키가 그래프 노드 이름 — 노드 이름을 바꾸면 표도 | 진행 상태 조회로 실측 |
| 질문에 답한 뒤 붙는 "변경은 아직 반영 전" 고지 문구 | 코드 | `src/tabs/annual_plan/graph.py`의 고지 상수 | 고지를 붙일지는 분류 결과의 관찰 값이 정함 | 실제 대화 |

## 주의

분류 프롬프트는 **전체 대화 이력**을 받습니다. 분류 기준을 바꾸고 확인할 때는 한 문장
발화가 아니라 진행 중인 대화 한가운데(설문 중·계획표 확인 중)에서 같은 발화가 어떻게
갈리는지 함께 보십시오. 거절 안내 호출에는 도구를 연결하지 않습니다 — 거절 프롬프트에
조회를 요구하는 문장을 넣어도 실행되지 않습니다.

## 코드 참조

| 구성 요소 | 코드 이름 | 모듈 경로 |
|---|---|---|
| 오케스트레이터 | `AnnualRouterAgent` | `src/tabs/annual_plan/router/agent.py` |
| 분류 결과 모델 | `AnnualRouteIntent` | `src/schemas/dialog.py` |
| 조회 뒤 재제시·고지 | `resume_gate` / `_DEFERRED_CHANGE_NOTICE` | `src/tabs/annual_plan/graph.py` |
| 진행 라벨 표 | `LABELS` / `EXEC_NODES` | `src/api/progress.py` |
