/* History: a node owns its performances (ADR-0006, 0008). The history is a map of node id to the
 * performances logged on it, in the order they were logged. Pure functions: logging returns a new
 * map and leaves the input untouched, so the store can hold the result and a plain-Node test can
 * drive it directly. A performance is one continuous effort: a date, a node, one volume. */

export function logPerformance(history, perf) {
  const list = history[perf.node] || [];
  return { ...history, [perf.node]: [...list, perf] };
}

// Newest first; a tie on date is broken by most recently logged first.
export function performancesOf(history, nodeId) {
  const list = history[nodeId] || [];
  return list.map((p, i) => [p, i])
    .sort((a, b) => (a[0].date < b[0].date ? 1 : a[0].date > b[0].date ? -1 : b[1] - a[1]))
    .map(([p]) => p);
}
