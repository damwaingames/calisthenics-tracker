/* Shared scaffold for the browser verify-*.mjs scripts. Owns the whole lifecycle:
 * browser launch, console/pageerror capture, and the pass/fail exit (the tally itself is
 * tally.mjs, shared with the pure-Node scripts), so each script is reduced to its assertions.
 *
 * Each script stays standalone: verify() does its own launch + process.exit, so
 * `CT_URL=<live deploy> node verify-version.mjs` still works, and the runner
 * spawns each file unchanged. STORAGE_KEY is imported from source (not re-typed)
 * and passed into page.evaluate, so the storage key lives in exactly one place. */

import { chromium } from "playwright";
import { STORAGE_KEY } from "../constants.js";
import { ck, finish } from "./tally.mjs";

const url = process.env.CT_URL || "http://127.0.0.1:8765/";

export async function verify(run) {
  const errors = [];

  const browser = await chromium.launch();
  // Block the service worker so reloads never hit a stale cache.
  const context = await browser.newContext({ serviceWorkers: "block" });
  const page = await context.newPage();
  // A test can declare expected console errors (e.g. the browser logs net::ERR_FAILED for
  // a deliberately-failed request when simulating offline) so they don't fail the run.
  const ignore = [];
  const ignoreError = (substr) => ignore.push(substr);
  page.on("console", (m) => {
    if (m.type() !== "error") return;
    const t = m.text();
    if (!ignore.some((s) => t.includes(s))) errors.push("console.error: " + t);
  });
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));

  const ls = () => page.evaluate((k) => JSON.parse(localStorage.getItem(k)), STORAGE_KEY);
  // Fresh load: wipe storage then reload so the app reseeds its defaults.
  const reset = async () => {
    await page.goto(url, { waitUntil: "load" });
    await page.evaluate((k) => localStorage.removeItem(k), STORAGE_KEY);
    await page.reload({ waitUntil: "load" });
  };

  try {
    await run({ page, ck, ls, reset, url, key: STORAGE_KEY, ignoreError });
  } catch (e) {
    // A thrown assertion (e.g. a selector that vanished after a refactor) becomes
    // a normal FAIL with its stack captured, rather than an unhandled rejection.
    errors.push("threw: " + (e && e.stack ? e.stack : e));
  } finally {
    await browser.close();
  }

  finish(errors);
}
