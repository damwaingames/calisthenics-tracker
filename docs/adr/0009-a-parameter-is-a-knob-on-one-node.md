# A parameter is a knob on one node, not a node per value

Supersedes ADR-0003 (restating its first decision unchanged; its second is replaced by ADR-0010).

Where a variation differs only by a value (incline height, band tier, box step), that is one node
with a **parameter**; a new node only where the movement itself changes character (wall, incline,
floor, deficit and decline push-ups are five nodes because hand and foot placement change, not
because the height does). A node's bodyweight contribution is a constant when it has no parameter
and a function of the parameter's value when it has one. We rejected a node per value because it
bloats a chain with entries that share history and cueing, and it collapses "step the parameter"
into "step the node", which are different kinds of progress.
