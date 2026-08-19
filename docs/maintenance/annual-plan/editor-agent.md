---
sidebar_position: 4
---

# 편집 에이전트

편집 에이전트가 맡는 기능(발화를 값으로 옮기는 규칙, 반영 보고, 총칭 범위, 사람 이름)을
고칠 때 손대는 자리입니다. 동작은 [사용하기 장의 편집 에이전트](../../annual-plan/editor-agent.md)에
있습니다.

## 고칠 자리

**발화에서 값을 읽는 규칙** (프롬프트)

시간(회당·연간), 회차 수, 교육방법·평가방법, 강사, 수시 편성, 메모, 질문 답 기록,
진행 의사가 전부 한 프롬프트에 있습니다.

- 자리: `src/tabs/annual_plan/editor/prompts/apply/`
- 함께 볼 곳: 옮겨 적는 병합 규칙(`src/tabs/annual_plan/editor/projection.py`). 프롬프트가 가르치는 출력 형태와 한 벌
- 테스트: 단계 스모크(목록·설문, 계획표, 생성 후) + 배터리

**뭉뚱그린 지칭(전부·나머지)이 가리키는 범위** (프롬프트 + 코드)

- 자리: 같은 프롬프트의 화면 범위 절과, 호출하는 세 에이전트의 화면 설명 함수(`src/tabs/annual_plan/`의 `intake/agent.py` · `plan_table/agent.py` · `plan_writer/agent.py`)
- 함께 볼 곳: 화면 설명은 "보이는 교육 구분"과 "본문 생성 여부"를 밝혀야 함
- 테스트: 목록 단계 스모크

**강사 값에 직책 글자가 들어가지 않게 하는 규칙** (프롬프트)

등록된 실명으로 바꿔 적고, 등록에 없는 지칭은 되묻습니다.

- 자리: 같은 프롬프트의 사람 값 절
- 함께 볼 곳: 부서 정보 한 줄을 만드는 코드(`src/tabs/annual_plan/plan_table/agent.py`)
- 테스트: 스모크

**반영 보고("✅ 반영: …")의 판정과 문구** (코드)

- 자리: `src/tabs/annual_plan/editor/projection.py`의 비교·문구 함수
- 테스트: 단위 테스트

**옮겨 적기의 안전 규칙** (코드)

빠진 교육은 무변경, 없는 번호는 무시, 범위 밖 값은 그 칸만 무시, 시간 정합.

- 자리: `src/tabs/annual_plan/editor/projection.py`
- 함께 볼 곳: 위 프롬프트
- 테스트: 단위 테스트

**LLM이 읽는 결정 문서의 칸 설명** (코드의 필드 설명)

- 자리: `src/tabs/annual_plan/editor/schemas.py`
- 함께 볼 곳: 필드 설명란의 글만 LLM에 전달됨(일반 주석은 전달되지 않음)
- 테스트: 스모크

**교육방법·평가방법으로 허용하는 표준 라벨 목록** (프롬프트)

- 자리: 같은 프롬프트의 값 규칙 절
- 함께 볼 곳: 백엔드 공통코드와 일치해야 저장이 됨
- 테스트: 실서버 공통코드 대조

## 주의: 프롬프트와 병합 규칙은 한 벌

프롬프트가 "회차 수만 바꾸는 요구면 회차 시간 칸을 비워 두라"고 가르치면, 병합 규칙은
비워진 시간 칸을 "명시 없음"으로 읽어 연간 시간을 새 회차 수로 다시 나눕니다. 프롬프트만
바꾸고 병합 규칙을 그대로 두면 오류 없이 값이 어긋납니다. 출력 규칙을 바꾸는 프롬프트
수정은 **병합 규칙과 같은 변경 단위로** 검토합니다. 문장을 교체할 때는 원래 문장이 지키고
있던 계약을 먼저 나열하고 새 문장이 전부 담는지 대조합니다
([프롬프트와 설정 수정](../prompts-and-settings.md)).

## 코드 참조

| 구성 요소 | 코드 이름 | 모듈 경로 |
|---|---|---|
| 편집 호출 | `PlanEditorAgent` | `src/tabs/annual_plan/editor/agent.py` |
| 결정 문서·반영 결과 모델 | `EditableDoc` / `EditResult` | `src/tabs/annual_plan/editor/schemas.py` |
| 옮겨 적기·전후 비교 | `merge_into_sheet` / `merge_into_checklist` / `render_diffs` | `src/tabs/annual_plan/editor/projection.py` |
| 부서 정보 한 줄 | `_dept_people_of` | `src/tabs/annual_plan/plan_table/agent.py` |
