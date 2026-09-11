# Calisthenics Tracker

A personal, client-side **bodyweight & calisthenics training tracker**, installable as an offline PWA.

Sibling of [`workout-tracker`](https://github.com/damwaingames/workout-tracker), which tracks
free-weight / band / machine training. This is **not a fork**: the two share an engineering
style (no-build vanilla-JS PWA, `localStorage`, a `CONTEXT.md` glossary + ADRs, a Playwright
harness) but deliberately *not* a domain model, because bodyweight training needs a different
philosophy of what an exercise is and what progressive overload means.

**Status: design phase.** Nothing runs yet. The domain is being worked out in
[`CONTEXT.md`](CONTEXT.md) (draft glossary) and [`docs/design/open-questions.md`](docs/design/open-questions.md)
before any code lands. Decisions get recorded as ADRs in [`docs/adr/`](docs/adr/) as they're made.

## The philosophy (why a separate app)

In the sibling app an exercise is a fixed movement and progress is **double progression**: at a
fixed load climb the reps to a ceiling, then add load. That works because the load is an external
number you can dial up in small steps. Bodyweight training breaks that model in three ways:

1. **An exercise is a node in a progression chain, not a standalone movement.**
   Incline push-up → push-up → decline push-up → pseudo-planche push-up isn't four exercises, it's
   one movement pattern at four points on a chain. Progress is often *moving along the chain*
   (a **progression**), and regressing along it is a normal, first-class thing to do (after
   a layoff, when fatigued, when building volume at an easier node). The tracker has to know the
   chain, so that history on one node informs the target on its neighbours.

2. **The load is your own bodyweight, scaled by leverage.**
   The "weight" you move on an incline push-up depends on the height of the incline; on a
   floor push-up it's roughly two-thirds of bodyweight; on a decline it's more. The tracker
   should understand each node's **bodyweight contribution**, a constant for a fixed
   variation or a function of a **parameter** (incline height / angle, band assistance,
   lever length) for a continuous one, and combine it with your measured bodyweight into an
   **effective load**. That is what lets progress be compared across nodes on a chain, and what
   makes "you got heavier / lighter" a visible part of the picture rather than noise.

3. **External load arrives late and adds on top.**
   Eventually the chain reaches loaded work: a **dip belt**, a **weight vest**, a backpack. That
   is just more effective load (bodyweight contribution + external kg), and **assistance** (a
   band, a foot on the floor, a partner) is negative load on the same axis. One axis, both signs.

So progressive overload here is **multi-axis**: reps or hold time at a node, the node's parameter
(higher/lower, longer lever), position on the chain, external load, and, as a background input,
your own bodyweight. Which axis "counts" as progress, and how the app suggests the next step, is
the core design question and is being discussed before it's modelled.

## What's carried over from the sibling (assumed, open to change)

- **Engineering style**: plain ES modules, no build step, `localStorage`, installable PWA, deployed
  to GitHub Pages on merge to `main`, a manual semver `APP_VERSION` in the footer.
- **Documentation discipline**: a `CONTEXT.md` ubiquitous-language glossary, decisions as ADRs in
  `docs/adr/`, issues + specs as GitHub issues (`docs/agents/`).
- **Testing**: an end-to-end Playwright harness in `tests/` driving the real DOM.
- **A few domain ideas that transfer**: an exercise *owns its history* (the container never does);
  measured bodyweight lives outside the training plan; tonnage-style figures are readouts, never
  the judge of progress.

## What's explicitly *not* carried over

- The exercise model (fixed movement, kg / band-tier / level load metric).
- Double progression on a per-placement rep rail as *the* progress rule.
- Anything nutrition-, class-, or Health-Connect-shaped.
