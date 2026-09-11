# Copy useful modules from the sibling; never share code with it

The Playwright harness, the Drive backup pair, the service worker, and the small helpers are
copied across from `workout-tracker` and allowed to drift. No shared package, no submodule. Both
apps are no-build static ES modules, so sharing would cost a build step or a submodule for a few
hundred lines that change once a year, and the two apps are diverging on purpose: this one has
ideas that make no sense in the original. If they ever converge on a real shared library it gets
extracted then, from two working copies, not speculatively now.
