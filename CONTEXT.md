# Context — Calisthenics Tracker

Ubiquitous language for the codebase. Use these terms in code, comments, and review.

> **DRAFT.** These are *candidate* terms captured from the initial brief, before the domain has
> been grilled. Every entry is provisional until it's backed by an ADR in `docs/adr/`. Treat
> `_Avoid_` lists as hypotheses too.

## Domain

- **Movement pattern** — a family of exercises that train the same thing: horizontal push,
  vertical push, horizontal pull, vertical pull, squat, hinge, core/anti-extension, and so on.
  The top of the hierarchy; a **chain** belongs to one pattern. _Avoid_: muscle group (a pattern is
  defined by the movement, not the tissue).
- **Chain** — an ordered sequence of **nodes** for one **movement pattern**, from the easiest
  **regression** to the hardest **progression** (wall push-up → incline → knee → floor → decline →
  archer → one-arm). The structure that lets history on one node inform the target on its
  neighbours. May branch (a diamond and an archer push-up are both "harder than floor" but not
  ordered against each other) — whether a chain is a list or a DAG is an open question.
  _Avoid_: exercise family; level (that's a node's position).
- **Node** — one exercise *variation* at a point on a **chain** (the "incline push-up" node). What
  a session actually prescribes and what history is logged against. Carries its **bodyweight
  contribution** (a constant, or a function of its **parameter**), its **volume type** (reps or
  hold time), and cueing. _Avoid_: exercise (ambiguous: the pattern, the chain, or the node?).
- **Regression / Progression** — the neighbouring **nodes** below / above the current one on its
  **chain**. Both are first-class, routine moves — regressing is *normal* (layoff, fatigue, volume
  work), not failure. _Avoid_: "easier / harder version" as ad-hoc separate exercises.
- **Parameter** — a **node**'s continuous knob, where it has one: incline height or angle for an
  incline push-up, band thickness for an assisted pull-up, lever length for a leg raise, ring
  height for a row. Logged per **performance**; feeds the node's **bodyweight contribution**.
  Stepping the parameter is progress *within* a node, before stepping to the next node.
  _Avoid_: setting; load (the parameter is an input to load, not load itself).
- **Bodyweight contribution** — the fraction of your **bodyweight** a **node** actually loads
  (a floor push-up ≈ 0.64, a knee push-up ≈ 0.49, an incline less the higher it is). A constant
  for a fixed node, or a function of the node's **parameter**. Multiplied by measured bodyweight
  it gives the bodyweight term of **effective load**. _Avoid_: "% of 1RM"; difficulty (a fuzzier
  notion this is one input to).
- **External load** — kg added on top of the bodyweight term: a **dip belt**, a **weight vest**, a
  backpack. Positive on the load axis. **Assistance** (a band, a foot on the floor) is the *same
  axis with a negative sign*. _Avoid_: weight (ambiguous with bodyweight).
- **Effective load** — the resistance a **performance** actually worked against:
  `bodyweight × bodyweight-contribution + external load (− assistance)`. The one number that lets
  work on different **nodes** and at different bodyweights be compared. A derived readout and a
  progression *input*; its exact role in "what counts as progress" is the core open question.
- **Bodyweight** — your measured weight, tracked outside the plan (as the sibling app's
  measurements card does), *dated*, so each **performance** resolves against the bodyweight of
  its day. A background input to **effective load**, never something you "log" per set.
- **Volume** — how much of a **node** was done in one **performance**: reps, or hold time for an
  isometric (plank, L-sit, front lever hold). Two volume types, as in the sibling app.
- **Performance** — one logged effort: a date, a **node**, its **parameter** value, **external
  load** / assistance, and a **volume**. The atomic unit of history. Effective load is derived,
  not stored. _Avoid_: set.
- **Progressive overload** — doing more over time on a **chain**. Deliberately *multi-axis* here:
  more **volume** at a node, a harder **parameter**, a step up the **chain**, more **external
  load**, all against a possibly-changing **bodyweight**. Which axes the app treats as progress,
  and how it suggests a next step, is undecided — see `docs/design/open-questions.md`.
  _Avoid_: double progression (the sibling's single-load-axis rule — it may reappear as one
  *component* but is not the model).
