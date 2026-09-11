# A prerequisite gates suggestion and generation, never recording

A chain's prerequisite (ADR-0001) is a signpost at the logging surface: the app shows the chain
as locked and leaves it out of next-step suggestions until the prerequisite node is reached, but
never refuses to record a performance on it. At the planning surface it is authoritative: nothing
that builds a program for you may place a chain whose prerequisite you haven't met. A tracker that
refuses to log what you actually did is lying to your history; a generator that ignores the gate
hands you HSPU before you've done a pike push-up. The sibling app learned the first half of this
when exercise contexts went from gates to descriptions (its ADR-0023).
