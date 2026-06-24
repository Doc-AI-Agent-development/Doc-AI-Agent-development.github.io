---
sidebar_position: 2
---

# SQL 조회 툴

컴플라이언스 DB와 라우터 레이어를 **미리 정의된 함수로만** 조회합니다. 에이전트는 SQL을 직접 쓰지 못하고 함수만 호출합니다(자유 SQL·자율 탐색 금지).

## 조회 함수

| 함수 | 반환 |
| :-- | :-- |
| `lookup_user_team(user_id)` | 사용자의 소속 팀 |
| `lookup_team_obligations(team_id)` | 팀의 실시 의무 목록 (교육 메타 inline: 과정명·구분·주기·법정시간·대상·근거) |
| `lookup_education_criteria(edu_id)` | 한 교육의 기준 — 메타는 `team_obligations`에서, 필수항목은 `education_checklist`에서 |
| `lookup_education_documents(edu_id)` | 교육에 매핑된 문서 목록 (라우터 레이어) |
| `lookup_document_meta(doc_id)` | 문서 메타 |
| `lookup_annual_plan(team_id, year)` | 작성된 연간계획 |

> 평탄 스키마라 `lookup_education_criteria`는 별도 criteria 테이블이 아니라 `team_obligations`에서 교육 메타를 집어옵니다. → [컴플라이언스 DB](../data/compliance-db.md)

## 구현

```text
tools/
├── sql_query.py      # 파라미터화 조회(SQL이 나가는 유일한 곳) — Live(읽기전용) + Mock
├── data_tools.py     # 위 함수를 LangChain StructuredTool로 노출(에이전트가 호출)
└── skills/*.md        # 각 함수의 설명(LLM이 '언제/어떻게' 쓸지 판단하는 근거)
```

- `sql_query.py`: 실제 파라미터화 SQL, 읽기전용 커넥션, 결과 직렬화. 외부 DB로 교체 시 여기 내부만 변경(어댑터).
- `data_tools.py`: 함수를 도구로 묶어 에이전트에 주입. 각 도구 설명 = `skills/{name}.md` 본문.
- 에이전트는 도구가 **조립해 돌려준 결과**만 받습니다 — 스키마가 평탄이든 정규화든 에이전트 코드는 영향받지 않습니다.
