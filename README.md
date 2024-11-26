# Sprinter naV

[ChatGPT o1-mini thread](https://chatgpt.com/share/6735879d-8e5c-8003-bdc3-3a07250d26a8)

## Strategy

Managed to resolve most of the data issues doing it manually, but it took nearly all day which means this repo doesn’t solve any long-term problems.

So what if instead of one monolith super script, we attempted this in multiple passes with Cursor instead of Codebuff?

1. Generate sprint objects including days and weeks without accounting for holidays as 6 sprints per quarter
2. Remove holidays and note the adjustment
3. Append names and emojis
4. Call each of these jobs in a single command

## Usage

Generate sprint data for current year:

```bash
node weeks
```

Generate sprint data for a specific year:

```bash
node weeks 25
```
