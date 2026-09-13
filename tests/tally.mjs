/* The check tally every verify script shares: ck records one pass/fail line, finish prints the
 * summary and exits non-zero on any failure. Pure-Node scripts use it directly; harness.mjs wraps
 * it around a browser. */

let pass = 0, fail = 0;
export const ck = (label, cond) => { (cond ? pass++ : fail++); console.log((cond ? "ok  " : "FAIL") + "  " + label); };
export function finish(errors = []) {
  if (errors.length) console.log("\nERRORS:\n" + errors.join("\n"));
  const ok = fail === 0 && errors.length === 0;
  console.log("\n" + (ok ? "PASS" : `FAIL (${fail} checks, ${errors.length} errors)`) + ` (${pass} ok)`);
  process.exit(ok ? 0 : 1);
}
