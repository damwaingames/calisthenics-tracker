# The target is scoped to the placement, the frontier to the node

A placement in a program names a node, a parameter value, and optionally a load; the target's
ladder (ADR-0011) starts there at the rail's floor and climbs from what is logged on that
placement. The node keeps the frontier and the full history as a readout beside it, and the
chain's frontier stays wherever it was. This is what makes regressing on purpose free: a
placement lower down the chain is taken at face value, with no flag and no "you were at floor"
nag. A new program restarts every placement at the floor. We rejected a node-scoped target
because after a layoff it would propose the node you had just chosen to step down from. The
sibling reached the same shape (its ADR-0021, a per-placement rail).
