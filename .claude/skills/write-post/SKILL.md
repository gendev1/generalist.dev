---
name: write-post
description: Write a blog post for generalist.dev — correct frontmatter, site voice, code-view-aware markdown in content/blog/. Use when asked to write, draft, or edit a blog post for this site.
---

# Writing a post for generalist.dev

Posts are markdown files in `content/blog/<slug>.md`. The site renders them as
"commits" on a GitHub-PR-themed blog; CI publishes and cross-posts them on merge.

## File + frontmatter contract

Slug: kebab-case, short, from the title. It becomes the URL (`/blog/<slug>`).

```yaml
---
title: "Plain sentence. Punchy. Can contain code terms"
summary: "One line, ≤ ~90 chars. The thesis, not a teaser. Shown on the commit card and used as description/subtitle when cross-posting."
date: "YYYY-MM-DD"        # today, absolute
tag: "feat(ai-native): part 1/3"   # conventional-commit style label shown on the card
tagType: "feat"           # feat | rant | perf | chore — picks the timeline dot color
---
```

Do NOT add a `hash:` field — hashes are assigned by CI (`content/commits.json`)
when the post merges to main. Unmerged posts correctly show `draft`.

tagType semantics: `feat` = building/how-to (green), `rant` = opinion piece
(red), `perf` = war story with numbers (purple), `chore` = meta/housekeeping
(gray).

## Voice

Terse senior backend engineer (Golang, TypeScript, Kafka, fintech) who ships
production code with coding agents. No filler intros, no "in this post we
will", no conclusion that restates the post. Dry humor earns its place. Short
paragraphs. Concrete numbers over adjectives ("3.0s → 0.02s", not "much
faster"). Never fabricate employer-confidential specifics — stay at the level
a public engineering blog would.

## Body conventions

- No H1 — the page renders the title. Structure with `##` and `###`.
- GitHub-flavored markdown only. No HTML, no JSX.
- Technical posts need at least 3 fenced code blocks with language tags
  (` ```go `, ` ```typescript `, ` ```yaml `…). Code must be realistic and
  consistent with the argument — it gets shiki highlighting, line numbers,
  and a copy button, so it will be read closely.
- ` ```diff ` fences get full-width red/green row tints — use one when
  showing a before/after change; lines start with `+` / `-`.
- GFM tables render styled — good for benchmark comparisons.
- Images: put files in `public/images/<slug>/` and reference them as
  `![alt](/images/<slug>/name.png)`. SVG *files* work the same way; inline
  `<svg>` markup does NOT render (raw HTML is escaped). Root-relative paths
  are fine — syndication rewrites them to absolute URLs automatically.
- Inline formatting is fine on-site, but cross-posting to X flattens bold,
  italics, and links to plain text — don't let meaning depend on formatting,
  and prefer bare URLs or "name (url)" for links that must survive.
- 700–1100 words for a normal post; shorter is fine when the point is made.

## Lifecycle (context, not action)

Merging to main triggers CI: the post's add-commit sha lands in
`content/commits.json` (site shows it, linked to the GitHub commit), the site
deploys, and the post auto-publishes to dev.to and Hashnode (full markdown,
canonical URL back to the site) and X (as an Article via converted blocks).
Publishing is not part of writing a post — never run those steps manually.

## Before finishing

1. Frontmatter parses and has exactly: title, summary, date, tag, tagType.
2. `npm run build` passes — the new post must appear in the SSG route list
   (`/blog/<slug>`).
3. Reread for voice: delete any sentence that only warms up the next one.
