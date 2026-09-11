# A parameter is a knob on one node, not a node per value

Status: superseded by ADR-0009, ADR-0010

Where a variation differs only by a number (incline height, band tier, box step), that is one node
with a **parameter**; a new node only where the movement itself changes character (wall, incline,
floor, deficit and decline push-ups are five nodes because hand and foot placement change, not
because the height does). A parameter is typed, continuous or a discrete ladder, and carries a
direction so the node knows whether up is easier or harder. A node's bodyweight contribution is a
constant when it has no parameter and a function of the parameter when it has one. We rejected a
node per value because it bloats a chain with entries that share history and cueing, and it
collapses "step the parameter" into "step the node", which are different kinds of progress. The
sibling's band tier is a load metric; here it is a parameter, because a band changes how much of
you the movement loads, not what is added on top.
