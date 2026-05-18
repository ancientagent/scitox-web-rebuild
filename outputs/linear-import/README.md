# SciTOX Linear Import

Use this folder when importing the SciTOX rebuild issues into the new SciTOX Linear workspace.

## Files

- `scitox-linear-issues-import.csv` - CSV formatted for Linear's CLI importer.

## Recommended Linear Setup

Before importing:

1. Create or select one team: `SciTOX Rebuild`
2. Create one project: `SciTOX Website Rebuild V1`
3. Import `scitox-linear-issues-import.csv` into the `SciTOX Rebuild` team.
4. After import, add all imported issues to the `SciTOX Website Rebuild V1` project if the CLI importer does not attach them automatically.

## Import Notes

Linear documentation says the CLI importer expects these CSV fields:

- `Title`
- `Description`
- `Priority`
- `Status`
- `Assignee`
- `Created`
- `Completed`
- `Labels`
- `Estimate`

The CSV intentionally does not invent assignees, estimates, product facts, claims, payment approvals, privacy/security claims, vendor acceptance, or legal conclusions.

Expected initial state:

- `Scaffold Next.js app shell under site` - Done
- `Build shared app layout and V1 route shell` - Done
- Remaining implementation and QA issues - Todo or Backlog

Source of truth:

- `docs/LINEAR_WORKSPACE_MIGRATION.md`
