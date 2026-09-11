# Calisthenics Tracker

A personal bodyweight training tracker where an exercise is a node on a progression chain, the
load is your own bodyweight scaled by leverage, and progressive overload has more than one axis.

## Language

**Movement pattern**:
A family of exercises that train the same thing: horizontal push, vertical push, horizontal pull,
vertical pull, squat, hinge, lunge, gait (carries, crawls, locomotion), and core
(anti-extension, anti-rotation, rotation, anti-lateral flexion). The top of the hierarchy; holds
one or more **chains**. Unilateral is a **node**'s **limb share**, not a pattern: single-leg
hinges and single-arm pushes stay in their pattern.
_ADRs_: 0001
_Avoid_: muscle group (a pattern is defined by the movement, not the tissue)

**Chain**:
A strictly ordered, linear list of **nodes** for one **movement pattern**, easiest first (wall →
incline → floor → deficit → decline push-up). Never branches: a variant that doesn't sit on the
line is its own chain. May name a **prerequisite** on another chain.
_ADRs_: 0001
_Avoid_: exercise family; level (that's a node's position); graph / tree

**Prerequisite**:
A **node** on another **chain** you must have reached before this chain is offered to you (HSPU
requires decline pike). Reached means one logged **performance** on that node, any volume. Gates
what the app suggests or generates, never what you can log.
_ADRs_: 0001, 0002
_Avoid_: requirement; unlock (it never locks recording)

**Node**:
One exercise variation at a point on a **chain**, where the movement changes character: the
"incline push-up" node. What a session prescribes and what history is logged against. Carries an
optional **parameter**, its **bodyweight contribution**, its **limb share**, the **volume** types
it supports, and cueing.
_ADRs_: 0005, 0006, 0009
_Avoid_: exercise (ambiguous: the pattern, the chain, or the node?); variant (a node is the
variant; a parameter value is not a new one)

**Regression / Progression**:
The neighbouring **nodes** below / above the current one on its **chain**. Both are routine,
first-class moves; regressing is normal (layoff, fatigue, volume work), not failure.
_ADRs_: 0001
_Avoid_: "easier / harder version" as ad-hoc separate exercises

**Parameter**:
A **node**'s one knob, where it has one, of a **kind** (surface height, band assistance) with a
direction the node declares (which way is harder). Its values are what your **equipment** offers
for that kind. Logged per **performance**; feeds the node's **bodyweight contribution**. Stepping
it is progress within a node.
_ADRs_: 0009, 0010
_Avoid_: setting; load (the parameter is an input to load, not load itself); a node per value;
range (values come from kit, not a scale)

**Equipment**:
Your recorded kit, each item offering values for a **parameter** kind: a bench is a surface at
45 cm, a mini step is surfaces at 10 to 40 cm, a band is its tier and its kilograms of
assistance, a vest is its load increments. The pool a **target** draws the next parameter or
**external load** value from.
_ADRs_: 0010, 0013
_Avoid_: tags (the sibling's filter-only equipment); gear

**Bodyweight contribution**:
The fraction of your **bodyweight** a **node** actually loads: a seeded constant, a seeded table
over a discrete **parameter**, a seeded function of a continuous parameter and your **body
measurements**, or absent. Multiplied by bodyweight it is the bodyweight term of **effective load**.
_ADRs_: 0004
_Avoid_: % of 1RM; difficulty (range of motion and lever make a node harder without changing
this); override (personalise through measurements, not a per-node fudge)

**Limb share**:
The fraction of a **node**'s load borne by the working limb: 0.5 for a bilateral node, 1.0 for a
one-limb node, in between for a staggered stance (b-stance ≈ 0.7). Seeded per node. A share above
0.5 means the node has a working side and is logged per side.
_ADRs_: 0005
_Avoid_: unilateral flag; per-side mode

**External load**:
Kilograms added on top of the bodyweight term: a dip belt, a weight vest, a backpack. Enters only
when a placement prescribes it; steps to the next value your **equipment** offers. Positive on the
load axis; **assistance** (a band, a foot on the floor) is the same axis with a negative sign, and a
band's kilograms live on the band in your equipment.
_ADRs_: 0013
_Avoid_: weight (ambiguous with bodyweight); loaded node (a node is never loaded, a placement is)

**Effective load**:
The resistance the working limb actually worked against in a **performance**: (bodyweight ×
bodyweight contribution + external load − assistance) × limb share. The one number that compares
work across **nodes** and across bodyweights. A readout, never the judge of progress. Derived,
never stored; undefined on a node with no contribution.
_ADRs_: 0004, 0005, 0008
_Avoid_: difficulty (range of motion and lever make a node harder without changing this)

**Body measurement**:
A dated fact about your body entered outside the plan: **bodyweight**, height, a limb length. An
input to a **node**'s **bodyweight contribution** function, never logged per set.
_ADRs_: 0004
_Avoid_: profile; stats

**Bodyweight**:
The **body measurement** every **effective load** multiplies by, resolved to the value on the
**performance**'s date.
_ADRs_: 0004

**Volume**:
How much of a **node** was done in one **performance**, in one of three types: **reps** (a counted
set), **hold** (an isometric, seconds), or **timed** (dynamic work for a duration, reps uncounted,
seconds). A node supports any subset; the performance says which it was.
_ADRs_: 0006, 0007
_Avoid_: time (ambiguous between hold and timed); AMRAP (that's timed)

**Performance**:
One continuous logged effort: a date, a **node**, its **parameter** value, **external load** or
assistance, and one **volume** (per side where the node has a working side). The atomic unit of
history; a set of reps, one hold, or one timed stretch.
_ADRs_: 0005, 0006
_Avoid_: set

**Progressive overload**:
Doing more over time on a **chain**, on any of four independent axes: more **volume** at a
**node**, a harder **parameter**, more **external load**, a further node on the chain. Each axis
runs its own double progression and each step is progress on its own; axes are never netted.
**Bodyweight** is a readout, not an axis.
_ADRs_: 0008
_Avoid_: double progression as the whole model (it is one axis's rule here)

**Rail**:
The rep or seconds range a **node** is worked in, floor to ceiling (8 to 12 reps, 20 to 30 s). A
seeded default on the node. Ceiling reached means every prescribed set hit it.
_ADRs_: 0011
_Avoid_: rep range on the program (a later per-placement override, not the home)

**Target**:
The app's suggested next step for a **placement**: the next rung of a ladder that climbs
**volume** to the **rail**'s ceiling, then steps the **parameter** to the next value your
**equipment** offers, then steps to the next **node** once the ceiling has been hit in two
sessions. Starts at the rail's floor; always a number, never blank; a suggestion, never a verdict.
_ADRs_: 0011, 0012, 0014
_Avoid_: ghost (the sibling's history reference; a target is a suggestion); prescription (what the
program asks for; a target is what the app proposes)

**Block**:
A program: N weeks of some number of **sessions** a week in whatever split fits, with a **week
plan**. Owns the plan only; a **node** owns its history, so deleting a block deletes no
**performances**.
_ADRs_: 0015
_Avoid_: cycle; mesocycle

**Week plan**:
The **block**'s per-week schedule of how many sets each **placement** gets and which weeks are a
**deload**. Where the set count of a **target** comes from.
_ADRs_: 0015
_Avoid_: periodisation (the idea; the week plan is the thing)

**Deload**:
A week in the **week plan** with fewer sets, **targets** frozen, and the ladder paused, so it
consumes no progression gate.
_ADRs_: 0015
_Avoid_: rest week (sessions still happen)

**Session**:
One training sitting in a **block**'s week: an ordered list of **groups** of **placements**, as in
the sibling app. Skill practice is an ordinary short session placed on several days.
_Avoid_: workout

**Group**:
An ordered list of **placements** done for N rounds with a rest within and a rest after; the one
rotation primitive, so straight sets, supersets, and circuits are configs, not types. Borrowed
from the sibling as-is.
_Avoid_: superset / circuit as types

**Placement**:
A **node** written into a **session** with a **parameter** value and optionally an **external
load**; its set count comes from the **week plan**. What a **target** is computed for, and what a
**performance** is logged against when done as planned. Regressing on purpose is just a placement
lower down the chain.
_ADRs_: 0013, 0014, 0015
_Avoid_: item (the sibling's word); exercise

**Frontier**:
The best you have done on each axis of a **node** (most **volume**, hardest **parameter**, most
**external load**) and of a **chain** (the furthest node reached). Belongs to the node, not to
any **placement**. Progress is the frontier moving; a performance below it is never a loss.
_ADRs_: 0008, 0014
_Avoid_: PR (the sibling's word; a frontier has several axes); score

## Example dialogue

**Dev:** So an incline push-up at 30 cm and one at 40 cm are two exercises?

**Expert:** One **node** on the horizontal-push **chain**, two **parameter** values. The values
come from your **equipment**: the mini step gives you 10 to 40 in 5s, the bench gives you 45.

**Dev:** And when I hit 3 × 12 at 30?

**Expert:** The **target** steps the parameter to 25, the next height you own, and resets you to
the **rail**'s floor. Reps to ceiling, then parameter, then node. The node step needs the ceiling
twice, though.

**Dev:** What if I'd rather go straight to the floor push-up?

**Expert:** Write a **placement** for it. The target is scoped to the placement, and the node's
**frontier** doesn't care which way you went. Same in reverse: come back from a layoff and put
incline at 40 in the new **block**, nothing flags it.

**Dev:** Does losing 2 kg count against me?

**Expert:** **Bodyweight** is a readout. **Effective load** goes down, sure, but progress is the
frontier moving on any one axis, and nothing is ever a loss. You'll see it as the chain moving a
bit faster.

**Dev:** And my 30 s glute bridge AMRAP then a 30 s hold?

**Expert:** Two **performances** on one node, a **timed** and a **hold**. The placement is what
groups them.
