# Sprint Generation Prompts

## Complete Sprint List for 2024
To generate a complete JSON file with all sprints for 2024, accounting for holidays:

Prompt:
"Generate a JSON file containing all sprints for 2024. Each sprint should:
- Start on Monday and end on Friday
- Include startDate and endDate in YYYY-MM-DD format
- Include workDays count (5)
- Account for these US holidays by adjusting dates:
  - New Year's Day (Jan 1)
  - Martin Luther King Jr. Day (Jan 15)
  - Presidents' Day (Feb 19)
  - Memorial Day (May 27)
  - Juneteenth (June 19)
  - Independence Day (July 4)
  - Labor Day (Sept 2)
  - Columbus Day (Oct 14)
  - Veterans Day (Nov 11)
  - Thanksgiving (Nov 28)
  - Christmas (Dec 25)
- When a holiday falls on a sprint day, adjust that sprint's dates accordingly
- Run from first Monday of 2024 through end of year"

## New strategy

Managed to resolve most of the data issues doing it manually, but it took nearly all day which means this repo doesn't solve any long-term problems.

So what if instead of one monolith super script, we attempted this in multiple passes with Cursor instead of Codebuff?

1. Generate sprint objects including days and weeks without accounting for holidays as 6 sprints per quarter
2. Remove holidays and note the adjustment
3. Append names and emojis
4. Call each of these jobs in a single command

