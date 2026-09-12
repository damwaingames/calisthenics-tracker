/* Pure-Node test (no browser) for the Store's normalise seam (#6). Anything read from disk goes
 * through normalise before it becomes the store: garbage or an unknown schema comes out as the
 * default store at the current schema version, a current store comes out untouched, and an
 * older version is walked up the migration chain. Run standalone (`node verify-store.mjs`) or via
 * run.mjs; it never launches Playwright. */

import { normalise } from "../store.js";
import { SCHEMA_VERSION } from "../constants.js";

let pass = 0, fail = 0;
const ck = (label, cond) => { (cond ? pass++ : fail++); console.log((cond ? "ok  " : "FAIL") + "  " + label); };

// ---- Unloadable input resets to the default store ----
for (const [label, input] of [["null", null], ["a string", "nope"], ["an empty object", {}], ["a future version", { version: SCHEMA_VERSION + 1 }]]) {
  const s = normalise(input);
  ck(`${label} → default store at v${SCHEMA_VERSION}`, s && s.version === SCHEMA_VERSION);
}

// ---- A current store comes out untouched ----
const current = { version: SCHEMA_VERSION, keep: "me" };
ck("a current store round-trips with its fields intact", normalise(current).keep === "me");

console.log(`\n${fail ? "FAIL" : "PASS"} (${pass} ok, ${fail} failed)`);
process.exit(fail ? 1 : 0);
