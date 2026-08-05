---
sidebar_position: 1
---

# API 계약

AI 서비스와 화면(BFF) 사이의 HTTP 계약입니다. **모든 응답은 HTTP 200**과 함께 동일한 구조의
**봉투**로 반환되며, 오류도 봉투의 오류 필드로 전달됩니다.

## 엔드포인트

| 메서드·경로 | 기능 |
|---|---|
| `POST /agent/invoke` | 대화 턴 처리 — 유일한 대화 진입점 |
| `GET /tabs` | 탭 목록과 준비 상태 조회 |
| `DELETE /agent/threads/{thread_id}` | 세션 삭제. 세션의 첨부 이미지 캐시도 함께 정리 |
| `POST /agent/threads/{thread_id}/cancel` | 진행 중인 턴 취소와 체크포인트 되돌림. 진행 중인 턴이 없으면 아무 동작 없이 성공 |
| `GET /agent/progress/{thread_id}` | 처리 진행 상태 폴링 |
| `POST /agent/documents/uploaded` / `deleted` | 문서함 변경 알림 — 현재는 수신만 하는 스텁이며 재색인은 수행하지 않음 |
| `GET /health` | 서비스 상태 확인 |

## 요청 구조

```json
{
  "data": {
    "messages": [{"role": "user", "text": "3번으로 해줘"}],
    "state": {
      "thread_id": "t-0101",
      "context": {
        "tab": "edu_material",
        "team_id": "T-100",
        "team_name": "생산1팀",
        "user_id": "u-01",
        "files": [{"file_id": "…", "name": "작업허가_안내.pdf"}]
      }
    }
  }
}
```

요청의 상태는 **델타로만 병합**됩니다 — 세션의 누적 상태는 체크포인트에서 복원되고, 요청이
전달하는 것은 세션 식별자와 컨텍스트뿐입니다. 세션 식별자가 없으면 입력 오류로
응답합니다.

## 컨텍스트 키

탭별로 사용하는 키가 다릅니다.

**BFF가 제공하는 키 — 교육자료 생성 탭**

| 키 | 의미 |
|---|---|
| `tab` | 대상 탭 식별자 (필수) |
| `team_id` / `team_name` | 담당 팀 식별자·표시명. 팀 식별자가 없으면 최초 진입이 환영 안내로 처리됨 |
| `user_id` | 스토리지 조회용 사용자 식별자 |
| `files` | 세션의 첨부 파일 전체 목록 — 파일이 있는 한 매 턴 반복 제공됨. 원소는 스토리지 경로와 원본 파일명 |
| `content_status` | 교육별 자료 작성 현황 — 후보 표의 작성 완료 표시에 사용 |
| `exam_url` | 백엔드가 발급한 시험 응시 링크 — 확정 턴에 사용 |
| `year` | 교육 후보 조회의 대상 연도 필터 (선택) |

**BFF가 제공하는 키 — 연간 교육계획 탭**

| 키 | 의미 |
|---|---|
| `tab` | 대상 탭 식별자 (필수) |
| `dept_cd` (또는 `team_id`) / `team_name` | 대상 부서 코드·표시명 — 부서가 없으면 진행하지 않고 선택을 안내 |
| `year` | 계획 연도 — 없으면 올해 |
| `user_id` / `user_name` | 사용자 식별자·표시명 |
| `mode` | `auto`이면 일괄 생성 호출 — 대화 없이 기본값으로 생성까지 진행 |

**내부 전용 키** — 탭이 턴 안과 턴 사이에 내부 신호를 나르는 언더스코어 키(`_fresh_artifacts`,
`_generate_request`, `_exam_request_notes`)가 컨텍스트에 존재합니다. BFF는 이 키들을
보내지 않아야 하며, **값을 해석해서도 안 됩니다**.

## 응답 봉투

```json
{
  "success": true,
  "data": {
    "state": {"thread_id": "t-0101", "current_scenario": "content_gen"},
    "messages": [{"role": "assistant", "text": "…"}],
    "artifacts": {"presentation": {"…": "…"}}
  },
  "error": null,
  "meta": {"awaiting": "questions", "questions": {"…": "…"}, "suggestions": ["…"]}
}
```

- `data.messages` — 대화 메시지 최근 일부.
- `data.artifacts` — 산출물. **해당 턴에 생성·변경된 산출물만 포함됩니다.** 교육자료는
  회차·교시 구성과 교시별 HTML, 페이지별로 사용한 근거(종류 라벨·제목·발췌)를
  포함합니다. 요약본·시험지·설문은 각각의 HTML과 요약 정보를 포함합니다.
- `meta.questions` — 미답 질문 카드 정보.
- `meta.suggestions` — 다음 발화 추천 문구. 별도 에이전트가 생성하며, 오류 응답에는
  **추천이 실리지 않습니다**(빈 목록이거나 키 없음).
- 처리 중 오류가 발생하면 `success`가 거짓이 되고 `error`에 코드·메시지가 실립니다.

## 질문 카드 렌더 계약

응답 발화 본문에서 질문 카드는 `:::q` 블록으로 표시되며, 화면은 이 블록을 답변 요청
카드로 렌더합니다. 이미 답변된 항목은 **카드 블록으로 다시 출력되지 않고** 확정 값
요약으로만 표시됩니다 — 답한 카드를 다시 그리면 화면이 답변 요청을 재소환하기 때문입니다.

## 오류 코드

| 코드 | 의미 |
|---|---|
| `INVALID_INPUT` | 세션 식별자·탭 누락 등 요청 형식 오류 |
| `LLM_ERROR` | LLM 호출 구성 오류(자격 미설정, 프롬프트 변수 오류)와 계획 생성 실패 |
| `TOOL_ERROR` | 도구 실행 오류 — 예약 코드(현재 발생 경로 없음, 도구 오류는 루프가 흡수) |
| `STATE_NOT_FOUND` | 존재하지 않는 세션에 대한 삭제 요청 |
| `CANCELLED` | 취소되거나 새 요청에 밀려 중단된 턴 |
| `AGENT_TIMEOUT` | 처리 시간 초과 — 예약 코드(현재 발생 경로 없음) |
| `INTERNAL_ERROR` | 미분류 내부 오류 |

## 코드 참조

| 구성 요소 | 코드 이름 | 모듈 경로 |
|---|---|---|
| 엔드포인트 정의 | — | `src/api/routes.py` |
| 봉투 스키마·변환 | — | `src/api/envelope.py` / `src/api/converters.py` |
| 오류 코드 정의 | — | `src/core/errors.py` |
| 추천 문구 생성 | `SuggesterAgent` | `src/agents/suggester/agent.py` |
