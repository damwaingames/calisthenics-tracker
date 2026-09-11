# Chains are linear, with cross-chain prerequisites instead of a DAG

A chain is a strictly ordered list of nodes for one movement pattern (wall → incline → floor →
deficit → decline push-up). It never branches: a variant that doesn't sit on that line (archer,
diamond, the pike line, the HSPU line) is its own chain, and a pattern can hold several chains.
Where one chain builds on another, that is a **prerequisite**: a node on another chain you must
have reached before this chain is offered (HSPU requires decline pike). We rejected a DAG with
harder-than edges because it makes "what is my regression?" ambiguous the moment a node has two
parents, and rejected ranking a flat pool by bodyweight contribution because the number can't
order archer against diamond and doesn't exist for holds. Linear chains keep exactly one
regression per node; prerequisites carry the only cross-chain relation we actually need.
