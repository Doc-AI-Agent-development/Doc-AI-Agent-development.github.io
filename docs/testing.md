---
sidebar_position: 7
---

# 테스트

테스트는 **LLM 없이 실행되는 유닛테스트**와, **실제 LLM으로 대화 전체를 실행하는 시나리오
러너**의 두 층입니다. 유닛테스트는 결정적 동작을 고정하고, 시나리오 러너는 요구가 실제 대화에서
반영되는지를 확인합니다.

## 유닛테스트 (`tests/unit`)

교육자료 생성 탭 관련 테스트 파일과 각각이 고정하는 동작입니다.

| 파일 | 고정하는 동작 |
|---|---|
| `test_content_intake.py` | 작업 에이전트의 결정적 경로 전반 — 후보 표, 번호 즉시 진입, 카드→계획 이동, 질문 카드 문법 |
| `test_syllabus_model.py` | 교시 번호 재부여와 출처 교시 기록(병합·분할·신설·삭제) |
| `test_syllabus_settings.py` | 카드 답변의 단방향 이동 |
| `test_syllabus_entry.py` / `test_syllabus_wiring.py` | 계획 재료 조립과 계획 생성 경로의 단일화 |
| `test_evidence_selection.py` | 검색 질의·후보 처리·본문 중복 제거 |
| `test_evidence_supply.py` | 근거 전문 확보의 폴백 순서와 예산 조정 |
| `test_evidence_basis.py` | 수집 당시 재료 대조(재수집 게이트) |
| `test_deck_packing.py` | 실측 기반 페이지 분할의 경계 규칙(주제 경계·분할·그림 고립 방지) |
| `test_deck_supply.py` | 생성 LLM이 받는 입력의 원천(근거 전문·배정 문서) |
| `test_session_refine.py` | 교시 단위 정리 단계의 입력·실패 폴백·보존 규칙 |
| `test_digest_document.py` | 요약본 분량 해석·생성 조건·노출 형태 |
| `test_content_volume.py` | 분량 요구의 전달과 완료 보고의 실측 사실 |
| `test_exam_supply.py` | 시험 생성 입력(자료 본문 전문)과 필수 변수 |
| `test_content_revision.py` | 부분 수정의 재계산·전환·기록과 확정 턴의 응시 링크 처리 |
| `test_image_annotate.py` | 이미지 판독 캐시의 실패 격리 |
| `test_round_toc.py` | 회차 통합 문서의 상위 목차 렌더 |
| `test_stage_dump.py` | 생성 중간 산출물 덤프의 온·오프 |
| `test_generation_prompts.py` | 생성 프롬프트의 핵심 문구 회귀 방지 |
| `test_tool_loop.py` | 도구 루프의 중복 차단과 거부 접두 재시도 경계 |
| `test_turns.py` | 세션당 턴 하나의 동시성 불변식 |

테스트 기본 환경은 **모의 도구와 빈 데이터 조회**로 설정되어 있어 외부 자원 없이
실행됩니다.

유닛테스트 폴더 밖에도 테스트가 있습니다 — API 계약(`tests/api`), 그래프
구성(`tests/graphs`), 렌더 조각 회귀(Chrome 실측 필요), 스토리지·첨부 이미지 처리
테스트가 `tests/` 하위에 나뉘어 있습니다.

## 대화 시나리오 러너

`tests/run_content_scenario.py`는 서버를 기동해 교육 선택부터 확정까지 다단계 대화를
HTTP로 수행합니다. 실제 LLM을 호출하므로 비용과 시간이 들며, 중간에 서버를 재시작해
**체크포인트 복원**을 함께 검증합니다.

## 검증 기준

유닛테스트 통과는 결정적 부품의 검증일 뿐, **기능 검증의 완료가 아닙니다**. 요구가
발화·생성·수정까지 실제로 반영되는지는 시나리오 대화로 확인합니다. 검증 시나리오는
이상적인 단일 경로가 아니라 **실제 사용에서 겹치는 조합**(내용 지정과 분량 축소의 결합,
연쇄 수정, 다른 교육으로 전환 후 복귀, 기존 세션 이어쓰기)으로 구성합니다.
