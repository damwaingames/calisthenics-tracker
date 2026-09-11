# CLAUDE.md

Guidance for agents working in this repo. The calisthenics-tracker is (will be) a
dependency-light, no-build-step vanilla-JS PWA, a sibling of `workout-tracker` with a
deliberately different domain model. Read `CONTEXT.md` (the domain glossary — currently a
DRAFT), `docs/design/open-questions.md`, and the ADRs in `docs/adr/` before working in an area.

**Status: design phase.** Domain decisions are being made before code. Don't build app code
until the relevant open question has an ADR.

## Agent skills

### Issue tracker

Issues and specs live as GitHub issues, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles, each label string equal to its name (`needs-triage`,
`needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
