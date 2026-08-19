---
sidebar_position: 8
---

# 조회 에이전트

조회 에이전트가 맡는 기능(정보 질문 응대, 조회 도구, 상태 요약)을 고칠 때 손대는
자리입니다. 동작은 [사용하기 장의 조회 에이전트](../../annual-plan/inquiry-agent.md)에
있습니다.

## 고칠 자리

**응대 규칙** (프롬프트)

무엇을 기준으로 답하고, 어떤 절차를 안내하지 않는지입니다.

- 자리: `src/tabs/annual_plan/inquiry/prompts/annual/`
- 함께 볼 곳: 응대 프롬프트가 상태 요약의 부분 이름을 그대로 부르므로, 요약 구성을 바꾸면 함께 고침
- 테스트: 실 LLM 배터리

**조회 도구 안내문** (도구 설명)

LLM이 언제 어떤 인자로 도구를 부를지 배우는 글입니다.

- 자리: `src/skills/edu_ai/*.md`(도구 이름과 같은 파일)
- 함께 볼 곳: 도구 등록과 인자 모델(`src/tools/data_tools.py`). 설명 파일이 없거나 이름이 겹치면 도구 구성 시점에 오류
- 테스트: 단위 테스트 전체(도구 구성이 실패하면 기동·API 테스트가 깨짐) + 실제 대화

**조회 도구 추가** (코드 + 도구 설명)

- 자리: 조회 메서드(`src/skills/edu_ai/queries.py`와 조회 계약 `src/tools/tool.py`) · 등록(`src/tools/data_tools.py`) · 설명 파일
- 함께 볼 곳: 응대 프롬프트의 "내용 질문은 어느 도구" 안내 문장
- 테스트: 단위 테스트 + 실제 대화

**도구 호출 한도** (코드)

한 턴에 조회 도구를 몇 번까지 부를 수 있는지입니다.

- 자리: `src/tabs/annual_plan/inquiry/agent.py`의 루프 호출
- 함께 볼 곳: 도구 루프 단위 테스트
- 테스트: 단위 테스트

**상태 요약 구성** (코드)

조회 응대·추천 문구가 받는 현재 상태(계획표·경고·설문 답·본문 분량)입니다.

- 자리: `src/agents/suggester/agent.py`의 연간 탭 상태 요약
- 함께 볼 곳: 추천 문구 에이전트와 **같은 함수**라서 한쪽만 고칠 수 없음
- 테스트: 실제 대화

**본문 조회 도구** (코드)

생성된 교육 내용을 대화에서 읽어 줍니다.

- 자리: `src/tabs/annual_plan/inquiry/agent.py`의 본문 조회 도구
- 테스트: 실서버 대화

**목록 조회 축약 길이** (코드)

전체 교육 목록을 조회할 때 긴 원문을 줄이는 길이입니다.

- 자리: `src/tools/data_tools.py`의 축약 래퍼
- 테스트: 단위 테스트

## 코드 참조

| 구성 요소 | 코드 이름 | 모듈 경로 |
|---|---|---|
| 조회 에이전트 | `InquiryAgent` | `src/tabs/annual_plan/inquiry/agent.py` |
| 본문 조회 도구 | `lookup_generated_content` | `src/tabs/annual_plan/inquiry/agent.py` |
| 상태 요약 | `_annual_caps` | `src/agents/suggester/agent.py` |
| 도구 등록·설명 로더 | `build_conversation_tools` / `skill_description` | `src/tools/data_tools.py` |
| 조회 계약 | `EduAiQueries` | `src/tools/tool.py` |
