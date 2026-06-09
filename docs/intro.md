---
sidebar_position: 2
---

# Introduction

Welcome to **Doc-AI-Agent-development** — a documentation site built with
[Docusaurus](https://docusaurus.io/) and deployed to GitHub Pages.

## How to add a document

1. Create a Markdown file anywhere under the `docs/` folder, e.g.
   `docs/guides/my-first-agent.md`.
2. Add a title with a top-level heading (`# My title`).
3. Commit and push to `main`. GitHub Actions builds and publishes the site
   automatically — the new page appears in the sidebar.

```markdown
---
sidebar_position: 2
sidebar_label: My First Agent
---

# My First Agent

Your content here...
```

## Controlling the sidebar

The sidebar is generated from the folder tree under `docs/`, so you do not
need to edit any config to add a page. To fine-tune it:

- **Order** — add `sidebar_position: <n>` to a doc's front matter.
- **Label** — add `sidebar_label: 'Short name'`.
- **Folder grouping** — drop a `_category_.json` into a subfolder:

  ```json
  {
    "label": "Guides",
    "position": 2,
    "collapsed": false
  }
  ```
