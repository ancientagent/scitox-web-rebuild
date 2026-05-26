# WSL Development Setup

## Summary

SciTOX now has a WSL-native development checkout for Codex CLI work.

- WSL distro: Ubuntu 24.04.2 LTS (Noble Numbat)
- Repo path: `/home/baris/scitox-web-rebuild`
- Windows reference path: `C:\Users\baris\OneDrive\Desktop\SciTox`
- Git remote: `https://github.com/ancientagent/scitox-web-rebuild.git`
- Branch: `main`
- Latest commit at setup: `9bd2a8db0d6a1238f11a920ac5aff98ffd5faf76`
- Latest commit summary: `9bd2a8d docs: pivot SciTOX repo to custom app build`

## Tool Versions

- Node: `v22.22.0`
- npm: `10.9.4`
- Git: `git version 2.43.0`

## Install Status

No root install was run during setup.

Reason:

- The repo contains a root `package.json`.
- No root lockfile was present at setup time.
- The root `package.json` declares scripts but no dependencies.
- Running a root install would create package metadata churn without a declared dependency set.

Future agents should inspect the active package layout before installing. App implementation dependencies should live under `site/` unless the team explicitly chooses a monorepo/workspace layout.

## Verification Status

Command attempted:

```bash
npm run verify:public-site-extraction
```

Result: blocked.

The script imports `@oai/artifact-tool`, but that package is not declared in `package.json` and was not available in the public npm registry during setup.

Observed error:

```text
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@oai/artifact-tool' imported from /home/baris/scitox-web-rebuild/scripts/verify_public_site_extraction.mjs
```

Additional check:

```bash
npm view @oai/artifact-tool version
```

Result:

```text
npm error 404 Not Found - GET https://registry.npmjs.org/@oai%2fartifact-tool - Not found
```

This should be treated as a dependency/source availability issue, not as evidence that the extracted workbook outputs are invalid.

## Future Codex CLI Start Command

Use this WSL-native checkout for development:

```bash
cd /home/baris/scitox-web-rebuild
```

Then verify repo state before work:

```bash
pwd
git rev-parse --show-toplevel
git branch --show-current
git status --short
```

For implementation work, read the project instructions first:

```bash
sed -n '1,220p' AGENTS.md
sed -n '1,220p' docs/CONTINUE_HERE.md
sed -n '1,260p' docs/CUSTOM_APP_BUILD_BRIEF.md
sed -n '1,260p' docs/CUSTOM_APP_AGENT_PROMPTS.md
sed -n '1,260p' docs/plans/2026-05-12-custom-app-v1.md
```

## Path Warning

Do not develop through the OneDrive-mounted Windows path:

```text
/mnt/c/Users/baris/OneDrive/Desktop/SciTox
```

The Windows folder may be used as a reference only. Active Codex CLI development should happen in:

```text
/home/baris/scitox-web-rebuild
```

## First Recommended Implementation Task

Scaffold the Next.js app under `site/` using:

```text
docs/plans/2026-05-12-custom-app-v1.md
```

Do not create public final copy, product claims, owner data, payment claims, privacy/security claims, or vendor/platform approval claims during the scaffold. Use `[OWNER DATA NEEDED]` and `[REVIEW REQUIRED]` markers where the source docs require them.

Current app update: `site/` has moved beyond the initial scaffold. Keep review/owner-data markers in internal docs, source data, backend fallbacks, tests, and QA reports, but do not render those markers, scaffold labels, or developer-facing planning text in public customer-facing UI.
