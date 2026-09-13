/* Pure-Node test (no browser) for the Store's normalise seam (#6). Anything read from disk goes
 * through normalise before it becomes the store: garbage or any version but the current one
 * comes out as the default store at SCHEMA_VERSION, and a current store comes out untouched. No
 * migration chain is asserted here; it arrives with the first real migration. Run standalone
 * (`node verify-store.mjs`) or via run.mjs; it never launches Playwright. */

import { normalise } from "../store.js";
import { SCHEMA_VERSION } from "../constants.js";
import { ck, finish } from "./tally.mjs";

// ---- Unloadable input resets to the default store ----
const unloadable = [
  ["null", null], ["a string", "nope"], ["an empty object", {}],
  ["a future version", { version: SCHEMA_VERSION + 1 }],
];
for (const [label, input] of unloadable) {
  const s = normalise(input);
  ck(`${label} → default store at v${SCHEMA_VERSION}`, s && s.version === SCHEMA_VERSION);
}

// ---- A current store comes out untouched ----
const current = { version: SCHEMA_VERSION, keep: "me" };
ck("a current store round-trips with its fields intact", normalise(current).keep === "me");

finish();
