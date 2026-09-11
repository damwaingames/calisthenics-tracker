# A parameter's values come from your equipment, and its step is the next value you own

Supersedes ADR-0003's typing of a parameter as continuous or a discrete ladder with a seeded step.

A parameter has a **kind** (surface height, band assistance, and so on) and a node declares the
kind plus which direction is harder (an incline push-up gets harder as the height falls, a
feet-elevated row as it rises). The values on offer are not a range: they are what your recorded
**equipment** provides for that kind. A flat bench is a surface at 45 cm, a mini step is surfaces
from 10 to 40 cm in 5 cm steps, a band set is its tiers. The target's parameter step is simply the
next value you own in the harder direction. We rejected a seeded step size because nobody has a
30 cm surface unless they own one, and the same equipment pool serves every node of that kind
(incline and decline push-ups, elevated rows, bench dips, step-ups) without per-node ladders.
The sibling's equipment is a set of tags that filter; here it carries values that drive the target.
