# The target climbs volume, then parameter, then node, and resets to the rail's floor

The suggested next step for a node is a ladder: volume climbs at a fixed parameter until every
prescribed set hits the ceiling of the node's **rail**; then the parameter steps to the next value
you own in the harder direction (ADR-0010) and volume resets to the rail's floor; when the
parameter is at its limit or the node has none, the target is the next node on the chain at the
floor of that node's rail. The first target at a new node or value is always the floor, never
blank: the app has a defensible number, and whether you hit it is what gets recorded (ADR-0008).
External load never enters the ladder on its own. We rejected a blank "feeler" first session
because it turns the new rung into a test, and rejected stepping the node before the parameter
because stepping the parameter is the cheaper move and uses kit you already own.
