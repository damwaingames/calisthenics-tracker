/* The seeded catalogue: movement patterns, chains, and nodes (ADR-0001, 0009). Data only; the
 * queries live in catalogue.js. A chain is a strictly ordered list of node ids, easiest first. A
 * node carries what this slice needs: its name, the volume types it supports, its rail, a cue.
 * Parameters, contribution, limb share, and prerequisites arrive in their own slices. */

export const PATTERNS = [
  { id: "horizontal-push", name: "Horizontal push" },
  { id: "vertical-push", name: "Vertical push" },
];

export const CHAINS = [
  { id: "push-up", pattern: "horizontal-push", name: "Push-up",
    nodes: ["wall-push-up", "incline-push-up", "floor-push-up", "deficit-push-up",
      "decline-push-up"] },
  { id: "pike-push-up", pattern: "vertical-push", name: "Pike push-up",
    nodes: ["incline-pike-push-up", "pike-push-up", "decline-pike-push-up"] },
  { id: "handstand-push-up", pattern: "vertical-push", name: "Handstand push-up",
    nodes: ["wall-handstand-push-up", "deficit-wall-handstand-push-up"] },
];

const RAIL = { floor: 8, ceiling: 12 };
const reps = (id, name, cue) => ({ id, name, volumeTypes: ["reps"], rail: RAIL, cue });

export const NODES = [
  reps("wall-push-up", "Wall push-up",
    "Hands on the wall at chest height, body straight, elbows back."),
  reps("incline-push-up", "Incline push-up",
    "Hands on a raised surface, body straight from head to heel."),
  reps("floor-push-up", "Push-up",
    "Hands under shoulders, elbows about 45 degrees, chest to the floor."),
  reps("deficit-push-up", "Deficit push-up",
    "Hands on raised surfaces, chest below hand level at the bottom."),
  reps("decline-push-up", "Decline push-up",
    "Feet raised, hands on the floor, body straight."),
  reps("incline-pike-push-up", "Incline pike push-up",
    "Hands raised, hips high, head towards the surface."),
  reps("pike-push-up", "Pike push-up",
    "Hips high, hands on the floor, head to the floor between the hands."),
  reps("decline-pike-push-up", "Decline pike push-up",
    "Feet raised, hips over hands, head to the floor."),
  reps("wall-handstand-push-up", "Wall handstand push-up",
    "Back to the wall, lower the head to the floor under control."),
  reps("deficit-wall-handstand-push-up", "Deficit wall handstand push-up",
    "Hands on raised surfaces against the wall, head below hand level."),
];
