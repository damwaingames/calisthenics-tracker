# Open questions

The design conversation that has to happen before code. Each answered question should become an
ADR in `docs/adr/` and firm up a term in `CONTEXT.md`.

## The exercise model

1. **Is a chain a list or a graph?** A strict order (wall → incline → knee → floor → decline) is
   easy to progress along. But archer, diamond, pike and pseudo-planche push-ups are all "past
   floor" without being ordered against each other. Options: (a) one linear chain per pattern and
   treat side-branches as separate short chains; (b) a DAG with explicit `harder-than` edges;
   (c) an unordered pool of nodes ranked only by their bodyweight-contribution / difficulty score.
2. **Is a node with a parameter one node or many?** "Incline push-up at 60 cm" vs "at 30 cm":
   same node with a parameter value, or two nodes? The parameter approach is cleaner for
   continuous knobs (incline, band); the many-nodes approach fits discrete kit (a 4-step
   plyo box). Possibly both, with a parameter *type* (continuous / discrete ladder).
3. **Where does bodyweight contribution come from?**
   - Per-node constants from the literature (e.g. push-up variants have published % of BW figures
     from force-plate studies — to be verified before seeding).
   - A formula of the parameter for incline / decline work (angle → fraction).
   - User-tunable override, because leverage varies with limb length and technique.
   - Which nodes have *no* sensible figure at all (a front-lever hold?) and just rank ordinally.
4. **Isometrics.** Holds progress by time, lever (tuck → advanced tuck → straddle → full), and
   sometimes load. Same chain model with time-volume, or something else?
5. **Unilateral work.** A pistol squat is a squat-chain node whose contribution is ~100% of BW on
   one leg. Log per side (as the sibling's `per-side` loading mode) or as a node property?

## Progressive overload

6. **What is "progress"?** Candidate axes: reps/hold at a node, parameter, chain step, external
   load, and effective load as the unifier. Do we (a) pick a primary axis per node (reps until a
   ceiling, then step the parameter, then step the node — a multi-level double progression),
   (b) judge only on effective load × volume, or (c) show the axes and let the human judge?
7. **What does the ghost / target look like?** When you step up a node, the history on the
   previous node is the only reference. How does the app turn "3×12 at floor" into a suggestion
   at decline? Effective-load ratio? A fixed "drop to the floor of the range" rule?
8. **Bodyweight change.** If bodyweight drops 3 kg, the same reps at the same node are *less*
   effective load. Is that a regression? A readout? Ignored for targets and shown only as a trend?
9. **Regressing on purpose.** How do we make a deliberate step down (deload, volume day) not read
   as failure — a flag on the performance, or just no judgement at all?

## Program structure

10. **Sessions / weeks / blocks.** Does the sibling's Session-of-Groups-of-Items / weekly-template
    × N-weeks structure carry over as-is, or does a skill-based calisthenics program want
    something else (e.g. daily practice of a few skills, "grease the groove")?
11. **Skill work vs strength work.** Handstand practice is time-in-position, not reps to failure.
    Is that a node with time-volume, or a different thing entirely (like the sibling's wind-down)?

## Later

12. **Loaded calisthenics** — dip belt, vest, backpack: kit tags like the sibling's equipment, or
    just an external-load number?
13. **Assistance kit** — band assistance as negative load: does the band-tier → kg table from the
    sibling transfer?
14. **Sharing a codebase with the sibling.** Any modules worth extracting (helpers, Drive backup,
    the test harness) or keep them fully separate?
