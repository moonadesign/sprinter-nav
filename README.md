# Sprinter naV

[ChatGPT o1-mini thread](https://chatgpt.com/share/6735879d-8e5c-8003-bdc3-3a07250d26a8)

## Nevermind

The original goal for this was to generate a script that could deterministically generate a list of sprints including dates and durations while accounting for holidays. But after a couple hours of banging my head, I have decided to just do a static version of this by simply requesting it from the LLM and so I will just document the prompts used, and that will be our deterministic method for v1.

## New strategy

Managed to resolve most of the data issues doing it manually, but it took nearly all day which means this repo doesn’t solve any long-term problems.

So what if instead of one monolith super script, we attempted this in multiple passes with Cursor instead of Codebuff?

1. Generate sprint objects including days and weeks without accounting for holidays as 6 sprints per quarter
2. Remove holidays and note the adjustment
3. Append names and emojis
4. Call each of these jobs in a single command

## Usage

Generate sprint data for current year:

```bash
node weeks.js
```

Generate sprint data for a specific year:

```bash
node weeks.js 25
```
