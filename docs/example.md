---
sidebar_position: 2
---

# Example Page

This page shows the Markdown features you can use in any doc. Copy it as a
starting point, or delete it once you have your own content.

## Headings, text, and lists

Use `##` and `###` for sections. Inline **bold**, _italic_, and `code` work
as expected.

- Bullet lists
- Nested items
  - like this
- Numbered lists work too:

1. First
2. Second
3. Third

## Code blocks

```python
class Agent:
    def __init__(self, name: str):
        self.name = name

    def act(self, observation):
        return self.policy(observation)
```

## Tables

| Component | Role                       |
| --------- | -------------------------- |
| Planner   | Decides the next action    |
| Memory    | Stores prior context       |
| Tools     | External capabilities      |

## Admonitions

:::tip
Use admonitions to highlight important notes.
:::

:::warning
This is a warning callout.
:::

## Links and images

Link to [the introduction](./intro.md). Images go in `static/img/` and are
referenced from the site root, e.g. `![alt](/img/logo.svg)`.
