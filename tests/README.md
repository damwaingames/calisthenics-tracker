# Tests

Two seams, as in the sibling app:

- **Pure Node** `verify-*.mjs` that import a domain module and assert on plain data. No browser.
  `verify-store`, `verify-catalogue`.
- **Playwright** `verify-*.mjs` that drive the real DOM through `harness.mjs` and fail on any
  `console.error` or `pageerror`. `verify-boot`, `verify-version`, `verify-darkmode`,
  `verify-browser` so far.

`tally.mjs` is the shared check tally (`ck`, `finish`); a pure-Node script is imports plus
assertions plus `finish()`, and the harness wraps the same tally around a browser.

`run.mjs` serves the repo root on an ephemeral port and runs every `verify-*.mjs` against it.

```bash
cd tests
npm install   # once; postinstall fetches Chromium
npm test
```

To run one browser script you need a server up: `python3 -m http.server 8765` from the repo root,
then `node verify-boot.mjs` in `tests/`. `CT_URL` points a script at another origin, including the
live deploy. Scripts wipe `localStorage` for the origin they hit, in a throwaway browser context.

Adding a slice? Drop a `verify-<thing>.mjs` next to these; the runner globs it. Pure logic gets a
pure-Node script, behaviour goes through the harness. `STORAGE_KEY`, `APP_VERSION`, and
`SCHEMA_VERSION` are imported from source, never retyped here.
