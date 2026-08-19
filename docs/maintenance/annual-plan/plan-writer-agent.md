---
sidebar_position: 6
---

# 계획 작성 에이전트

계획 작성 에이전트가 맡는 기능(교육 내용 본문 생성, 생성 뒤 수정, 되물음, 저장 안내)을
고칠 때 손대는 자리입니다. 동작은
[사용하기 장의 계획 작성 에이전트](../../annual-plan/plan-writer-agent.md)에 있습니다.

## 고칠 자리

**생성되는 교육 내용의 모듈 개수·분량·눈높이·예시 형태** (프롬프트)

- 자리: `src/tabs/annual_plan/plan_writer/prompts/describe/`
- 함께 볼 곳: 교육자료 생성 탭이 모듈 하나를 교시 하나로 읽음. 모듈 규칙을 바꾸면 교육자료의 교시 수가 바뀜
- 테스트: 생성 스모크 + 만들어진 본문을 직접 읽기

**교육 내용 본문의 형식(구분선·항목 기호·번호 규칙)** (코드)

- 자리: `src/tabs/annual_plan/plan_writer/agent.py`의 조립 함수
- 함께 볼 곳: 교육자료 생성 탭이 이 형식을 읽어 교시를 나눔
- 테스트: 단위 테스트

**첫 생성·부분 생성·재작성 호출의 동시 실행 수·제한 시간** (설정)

- 자리: 설정 키 3쌍([환경 변수](../../reference/config.md)의 기능별 LLM 호출 조절)
- 테스트: 값을 바꿔 실측

**생성에 실패한 회차의 안내 문구와 재시도** (코드)

- 자리: `src/tabs/annual_plan/plan_writer/agent.py`의 회차 생성 실행기와 응답 조립
- 테스트: 단위 테스트

**시간이 빈 교육을 되묻는 기준(공란으로 두기로 한 답은 다시 묻지 않음)** (코드)

- 자리: `src/tabs/annual_plan/plan_writer/agent.py`의 미정 값 계산
- 함께 볼 곳: 설문의 시간 처리 질문 보기
- 테스트: 단위 테스트

**회차·교육을 늘렸을 때 기존 내용을 보존하고 새 부분만 만드는 규칙** (코드)

- 자리: `src/tabs/annual_plan/plan_writer/agent.py`의 구조 동기 함수
- 함께 볼 곳: 구상 에이전트의 완성 규칙
- 테스트: 생성 후 단계 스모크

**교육 내용(본문) 수정 요청의 처리 규칙** (프롬프트 + 코드)

- 자리: `src/tabs/annual_plan/plan_writer/prompts/describe/`의 수정 모드 절 · `src/tabs/annual_plan/plan_writer/agent.py`의 재작성 함수
- 함께 볼 곳: 편집 에이전트가 넘기는 내용 수정 요구 모델
- 테스트: 생성 후 단계 스모크

**저장 요청에 대한 안내 문구** (코드 상수)

- 자리: `src/tabs/annual_plan/plan_table/agent.py`의 저장 사실 문장
- 함께 볼 곳: 조회 응대·추천 문구가 같은 문장을 받음(한 곳만 고치면 됨)
- 테스트: 단위 테스트

**저장된 계획을 불러온 직후의 제시 문구** (코드)

- 자리: `src/tabs/annual_plan/plan_writer/agent.py`의 수정 진입부
- 테스트: 실서버에서 저장된 계획 불러오기

## 주의: 본문 형식은 교육자료 탭의 입력

이 에이전트가 만드는 본문은 저장 뒤 교육자료 생성 탭이 **교시 구성을 짤 때 읽는
원문**입니다. 모듈 규칙(개수·제목·분량)이나 조립 형식을 바꾸면 교육자료 탭이 만드는
교시 수·제목이 따라 바뀝니다. 형식을 바꿀 때는 교육자료 탭 담당과 같이 확인합니다.

## 코드 참조

| 구성 요소 | 코드 이름 | 모듈 경로 |
|---|---|---|
| 계획 작성 에이전트 | `PlanWriterAgent` | `src/tabs/annual_plan/plan_writer/agent.py` |
| 본문 조립 | `assemble_curriculum` | `src/tabs/annual_plan/plan_writer/agent.py` |
| 모듈 구조 | `CourseCurriculum` / `CurriculumModule` | `src/schemas/checklist.py` |
| 저장 사실 문장 | `SAVE_FACT` | `src/tabs/annual_plan/plan_table/agent.py` |
