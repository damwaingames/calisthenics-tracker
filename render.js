/* Pure render: functions from the catalogue and store to markup. No event wiring, no persistence.
 * Elements a test or handler must find carry a valueless or id-valued data-mark-* attribute,
 * never a CSS class (classes are for styling only). */

import { patterns, chainsOf, nodesOf, regressionOf, progressionOf } from "./catalogue.js";

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ESC[c]);

function nodeRow(n) {
  const down = regressionOf(n.id), up = progressionOf(n.id);
  return `<li class="node-row" data-mark-node="${esc(n.id)}">
    <span class="node-name">${esc(n.name)}</span>
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

export function renderBrowser() {
  return patterns().map((p) => `<section class="card" data-mark-pattern="${esc(p.id)}">
    <h2>${esc(p.name)}</h2>
    ${chainsOf(p.id).map(chainCard).join("")}
  </section>`).join("");
}

export function render() {
  document.getElementById("main-view").innerHTML = renderBrowser();
}
