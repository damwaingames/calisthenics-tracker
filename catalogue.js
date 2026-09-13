/* The Catalogue: queries over the seeded patterns, chains, and nodes (ADR-0001, 0009). A node
 * belongs to exactly one chain; its regression and progression are its chain neighbours, undefined
 * at the ends. Pure functions over seed.js, so a plain-Node test drives them directly. */

import { PATTERNS, CHAINS, NODES } from "./seed.js";

const nodeById = Object.fromEntries(NODES.map((n) => [n.id, n]));
const chainByNode = {};
for (const c of CHAINS) for (const id of c.nodes) chainByNode[id] = c;

export function patterns() { return PATTERNS; }
export function chains() { return CHAINS; }
export function nodes() { return NODES; }
export function node(id) { return nodeById[id]; }
export function chainOf(nodeId) { return chainByNode[nodeId]; }
export function nodesOf(chainId) {
  const c = CHAINS.find((x) => x.id === chainId);
  return c ? c.nodes.map((id) => nodeById[id]) : [];
}
export function chainsOf(patternId) { return CHAINS.filter((c) => c.pattern === patternId); }

function neighbour(nodeId, offset) {
  const c = chainByNode[nodeId];
  if (!c) return undefined;
  return nodeById[c.nodes[c.nodes.indexOf(nodeId) + offset]];
}
export function regressionOf(nodeId) { return neighbour(nodeId, -1); }
export function progressionOf(nodeId) { return neighbour(nodeId, 1); }
