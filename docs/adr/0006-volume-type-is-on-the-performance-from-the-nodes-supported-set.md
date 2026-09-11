# Volume type is on the performance, from the set its node supports

A node declares which volume types it supports (reps, hold, timed; any subset) and each
performance carries the one it was. A performance is one continuous effort with one volume, so
"glute bridge, 30 s of reps then a 30 s hold" is two performances on the one glute bridge node, and
3 × 20 s is three. We rejected a fixed volume type per node because it forces a "glute bridge hold"
node beside every dynamic node and doubles the chain. Grouping several performances as one
prescribed exercise is the program layer's job, not the node's.
