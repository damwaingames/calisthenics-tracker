/* Pure-Node test (no browser) for the Catalogue (#7): the queries over the seeded patterns, chains,
 * and nodes (ADR-0001, 0009), and two invariants over the seed itself. Run standalone
 * (`node verify-catalogue.mjs`) or via run.mjs; it never launches Playwright. */

import {
  chainOf, regressionOf, progressionOf, nodesOf, PATTERNS, CHAINS, NODES,
} from "../catalogue.js";
import { ck, finish } from "./tally.mjs";

// ---- Queries, against the push-up chain ----
ck("floor push-up sits on the push-up chain", chainOf("floor-push-up")?.id === "push-up");
ck("floor push-up regresses to incline", regressionOf("floor-push-up")?.id === "incline-push-up");
ck("floor push-up progresses to deficit", progressionOf("floor-push-up")?.id === "deficit-push-up");
ck("wall push-up has no regression", regressionOf("wall-push-up") === undefined);
ck("decline push-up has no progression", progressionOf("decline-push-up") === undefined);
ck("an unknown node has no chain", chainOf("nope") === undefined);
ck("nodes of the push-up chain come back in order",
  nodesOf("push-up").map((n) => n.id).join(",") ===
  "wall-push-up,incline-push-up,floor-push-up,deficit-push-up,decline-push-up");

// ---- Seed invariants ----
const chainCount = {};
for (const c of CHAINS) for (const id of c.nodes) chainCount[id] = (chainCount[id] || 0) + 1;
const allNodes = NODES;
ck("every node belongs to exactly one chain",
  allNodes.every((n) => chainCount[n.id] === 1)
    && Object.keys(chainCount).length === allNodes.length);
const patternIds = new Set(PATTERNS.map((p) => p.id));
ck("every chain's pattern exists", CHAINS.every((c) => patternIds.has(c.pattern)));

finish();
