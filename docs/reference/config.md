---
sidebar_position: 4
---

# 설정 사전

동작을 조절하는 설정 키의 목록입니다. 설정은 **환경 변수로 재정의**할 수 있으며, 정의와
기본값은 **설정 모듈**(`src/core/config.py`)이 기준입니다. 이 페이지는 키의 존재와 역할만
안내하고 **값은 싣지 않습니다** — 값은 코드를 확인하십시오.

## 교육자료 생성 탭이 직접 읽는 키

| 키 | 조절하는 것 |
|---|---|
| `evidence_supply_max_chars` | 생성·시험 입력에 공급하는 근거 전문의 합계 예산 |
| `conversation_evidence_max_chars` | 대화 중 근거·문서 조회의 응답 예산 |
| `candidate_review_chars` | 요약 없는 검색 후보의 본문 검토 범위 |
| `doc_search_top_k` | 검색 질의당 후보 수 상한 |
| `doc_select_max` | 교시당 채택 근거 수 상한 |
| `document_source_dir` | 사내 문서 원문 루트 경로 |
| `upload_summary_concurrency` | 첨부 요지 추출의 동시 호출 상한 |
| `generation_stage_dump_dir` | 생성 중간 산출물 덤프 경로 — 값을 지정하면 교시별 중간 결과가 파일로 남음 (진단용) |

## 공유 기반·스킬을 거쳐 읽히는 키

| 키 | 조절하는 것 |
|---|---|
| `backend_api_base` | 백엔드 교육 데이터 API 주소 |
| `storage_api_base` | 파일 스토리지 서비스 주소 |
| `opensearch_host` / `opensearch_port` / `opensearch_index` | 검색 엔진 접속 정보와 색인 이름 |
| `doc_index_body_max_chars` | 문서 본문 적재 상한 |
| `upload_image_dir` | 첨부 이미지 로컬 캐시 경로 |
| `agent_state_db` | 체크포인트 DB 파일 경로 |
| `tool_mode` | 도구 모드 — 실제 자원 사용 / 모의 도구 |
| `data_backend` | 교육 데이터 조회 모드 — API 사용 / 빈 결과를 반환하는 모의 모드 |
| `azure_openai_*` | LLM 자격·배포 구성 |
| `token_usage_log` | 토큰 사용 기록 파일 경로 |
| `dept_risk_profiles_path` | 부서 위험 특성 표(운영 편집 파일) 경로 — 연간 계획 생성의 부서 맞춤 재료 |

## 선언만 있고 읽는 코드가 없는 키

다음 키는 설정에 선언되어 있으나 **현재 읽는 코드가 없습니다**. 새 기능을 이 키에 기대어
설계하기 전에 읽는 코드가 없다는 사실을 확인하십시오.

| 키 | 비고 |
|---|---|
| `search_enabled` / 임베딩 관련 키 | 의미 검색 미사용 — 검색은 키워드 기반뿐 |
| `bff_base_url` | 읽는 코드 없음 |
| `vision_images_per_doc_max` | 읽는 코드 없음 |
| `doc_queries_per_module_max` | 읽는 코드 없음 |
| `component_asset_base` | 실서비스 경로 미사용 — 시뮬레이션 전용 렌더 모듈만 참조 |
| 직접 DB 접속 계열 키 | 주석으로 보존된 과거 구현 전용 — 현행 경로 미사용 |
