import { verify } from "./harness.mjs";
import { SCHEMA_VERSION } from "../constants.js";

/* Boot and persistence (#6): a fresh load writes the store to disk at the current schema version and
 * it survives a reload; garbage on disk boots to the default store with no page errors (the harness
 * fails the run on any pageerror / console.error). */
verify(async ({ page, ck, ls, reset, url, key }) => {
  await reset();
  ck(`fresh load persists a store at v${SCHEMA_VERSION}`, (await ls())?.version === SCHEMA_VERSION);

  await page.reload({ waitUntil: "load" });
  ck("the store survives a reload", (await ls())?.version === SCHEMA_VERSION);

  await page.evaluate((k) => localStorage.setItem(k, "{not json"), key);
  await page.reload({ waitUntil: "load" });
  ck("garbage on disk boots to the default store", (await ls())?.version === SCHEMA_VERSION);
  ck("the page still renders after recovery", await page.isVisible("#version-tag"));
});
