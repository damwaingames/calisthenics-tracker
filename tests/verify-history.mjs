/* Pure-Node test (no browser) for History (#8): a node owns its performances. Logging is pure
 * (a new history map, the input untouched) and performances-of a node come back newest first, a
 * tie on date broken by most recently logged first. Run standalone or via run.mjs. */

import { logPerformance, performancesOf } from "../history.js";
import { ck, finish } from "./tally.mjs";

const reps = (date, value) => ({ date, node: "floor-push-up", volume: { type: "reps", value } });

const empty = {};
const one = logPerformance(empty, reps("2026-09-10", 10));
ck("logging returns a history holding the performance",
  performancesOf(one, "floor-push-up").length === 1);
ck("logging leaves the input history untouched", Object.keys(empty).length === 0);

const two = logPerformance(one, reps("2026-09-12", 8));
const three = logPerformance(two, reps("2026-09-12", 9));
const list = performancesOf(three, "floor-push-up").map((p) => `${p.date}:${p.volume.value}`);
ck("performances come back newest first, ties by most recently logged first",
  list.join(",") === "2026-09-12:9,2026-09-12:8,2026-09-10:10");
ck("an unknown node has no performances", performancesOf(three, "nope").length === 0);

finish();
