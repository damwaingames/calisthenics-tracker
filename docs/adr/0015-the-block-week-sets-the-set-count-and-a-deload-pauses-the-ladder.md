# The block's week plan sets the set count, and a deload week pauses the ladder

A block is N weeks of some number of sessions a week in whatever split the program wants, and it
carries a week plan: each week says how many sets a placement gets and whether it is a deload.
The target reads its set count off the current week; the reps ladder (ADR-0011) runs unchanged
inside that. A deload week is fewer sets with targets frozen and the ladder paused, so it consumes
none of the gates. This is what gives a new block its feel-your-way start (week 1 is 2 sets
whatever last block reached) and gives periodisation and deloads from one concept. We rejected
earning sets as a rung of the ladder because it makes the ladder four deep and collides with the
two-session node gate (ADR-0012); a program type where sets are genuinely earned (a beginner
program) is a later enhancement, not this model.
