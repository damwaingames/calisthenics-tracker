/* Pure render: functions from the catalogue and store to markup. No event wiring, no persistence.
 * Elements a test or handler must find carry a data-mark-* attribute, never a CSS class (classes
 * are for styling only). Action names come from actions.js. */

import { PATTERNS, chainsOf, nodesOf, regressionOf, progressionOf, nodeById } from "./catalogue.js";
import { performancesOf } from "./history.js";
import { state } from "./store.js";
import { ACTION, FORM } from "./actions.js";
import { today } from "./helpers.js";

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ESC[c]);

function nodeRow(n) {
  const down = regressionOf(n.id), up = progressionOf(n.id);
  return `<li class="node-row" data-mark-node="${esc(n.id)}">
    <button class="node-name link" data-action="${ACTION.openNode}" data-node="${esc(n.id)}">
      ${esc(n.name)}
    </button>
    <span class="node-neighbours muted small">
      <span data-mark-regression>${down ? "↓ " + esc(down.name) : ""}</span>
      <span data-mark-progression>${up ? "↑ " + esc(up.name) : ""}</span>
    </span>
  </li>`;
}

function chainCard(c) {
  return `<div class="chain" data-mark-chain="${esc(c.id)}">
    <h3>${esc(c.name)}</h3>
    <ol class="nodes">${nodesOf(c.id).map(nodeRow).join("")}</ol>
  </div>`;
}

function renderBrowser() {
  return PATTERNS.map((p) => `<section class="card" data-mark-pattern="${esc(p.id)}">
    <h2>${esc(p.name)}</h2>
    ${chainsOf(p.id).map(chainCard).join("")}
  </section>`).join("");
}

const volumeText = (v) => `${v.value} reps`;

function renderNode(n) {
  const perfs = performancesOf(state.history, n.id);
  return `<section class="card" data-mark-node-view="${esc(n.id)}">
    <button class="ghost" data-action="${ACTION.back}">← Chains</button>
    <h2>${esc(n.name)}</h2>
    <p class="muted small">${esc(n.cue)}</p>
    <form class="log-form" data-form="${FORM.log}" data-node="${esc(n.id)}" data-mark-log-form>
      <label>Date <input type="date" name="date" value="${today()}" required></label>
      <label>Reps
        <input type="number" name="reps" min="1" step="1" inputmode="numeric" required>
      </label>
      <button type="submit">Log</button>
    </form>
    <ol class="history" data-mark-history>
      ${perfs.map((p) =>
        `<li data-mark-performance>${esc(p.date)} · ${volumeText(p.volume)}</li>`).join("")}
    </ol>
  </section>`;
}

export function render() {
  const n = state.ui.node && nodeById[state.ui.node];
  document.getElementById("main-view").innerHTML = n ? renderNode(n) : renderBrowser();
}
