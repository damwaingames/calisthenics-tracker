/* The routing vocabulary, declared once and used by both sides: render emits these names, events
 * dispatches on them. A data-action that stops matching its handler is silent, which is why the
 * spelling lives here and nowhere else. */

export const ACTION = {
  openNode: "open-node",
  back: "back",
};
export const FORM = {
  log: "log",
};
