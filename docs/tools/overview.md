---
sidebar_position: 1
---

# 데이터 액세스 툴셋

각 툴은 Anthropic Agent Skills 표준 양식(SKILL.md + 스크립트)을 따릅니다. SKILL.md는 함수 호출 명세(함수 목록·입력·출력·제약)를 담고, 실제 조회·검색은 py가 실행합니다. 툴은 호출되면 결과만 반환하고 분기 판단은 전처리 에이전트가 맡습니다.

```
data_access_toolset/
├── sql_query_tool/
├── document_fetch_tool/
├── vector_search_tool/
└── shared/              # DB·벡터스토어 커넥션, 공통 설정
```

:::info
실제 함수 구현은 완성된 DB 및 저장소 형태에 맞춥니다. 위 함수들은 우리가 스키마를 정의하는 것이 아니라, 백엔드 팀이 만든 DB·저장소에 맞춰 구현합니다.
:::
