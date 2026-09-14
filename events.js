/* Event wiring: every click routes through a map keyed by data-action, every submit through a map
 * keyed by data-form. Handlers call a store action then re-render. */

import { ACTION, FORM } from "./actions.js";
import { addPerformance, setUi } from "./store.js";
import { render } from "./render.js";

const clicks = {
  [ACTION.openNode]: (el) => setUi({ node: el.dataset.node }),
  [ACTION.back]: () => setUi({ node: undefined }),
};

const forms = {
  [FORM.log]: (form) => {
    const data = new FormData(form);
    const reps = Number(data.get("reps"));
    if (!Number.isInteger(reps) || reps < 1) return;
    addPerformance({
      date: data.get("date"), node: form.dataset.node, volume: { type: "reps", value: reps },
    });
  },
};

export function handleClick(e) {
  const el = e.target.closest("[data-action]");
  const fn = el && clicks[el.dataset.action];
  if (!fn) return;
  fn(el);
  render();
}

export function handleSubmit(e) {
  const fn = forms[e.target.dataset.form];
  if (!fn) return;
  e.preventDefault();
  fn(e.target);
  render();
}
