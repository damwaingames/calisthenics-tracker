# Bodyweight contribution is optional, seeded, and personalised by body measurements

A node's bodyweight contribution comes from one of four places: a seeded constant (floor push-up;
pull-up and dip are 1.0 by definition), a seeded table over a discrete-ladder parameter (bench dip
leg position, band tier), a seeded function of a continuous parameter and your **body
measurements** (incline and decline height, using your height), or nothing at all. A node with no
figure has no effective load, undefined rather than zero, and compares only within itself and by
chain position; that is the honest answer for holds and lever work, where difficulty is torque, not
a fraction of bodyweight. Personalisation is done by dated body measurements (bodyweight, height,
limb lengths as a function needs them) entered outside the plan, the same way bodyweight already
is, not by a per-node override figure. We rejected the override because it hides why a figure is
what it is, and rejected a single flat "difficulty" score because it would mean something different
on every node.
