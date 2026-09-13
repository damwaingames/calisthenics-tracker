import { verify } from "./harness.mjs";
import { PATTERNS, chainsOf, regressionOf, progressionOf } from "../catalogue.js";

/* The chain browser (#7): every seeded chain renders under its pattern with its nodes in order,
 * and each node row names its regression and progression. The expectations are read from the
 * catalogue, never retyped, so a seed edit is guarded the moment it lands. */
verify(async ({ page, ck, reset }) => {
  await reset();

  for (const p of PATTERNS) {
    const heading = await page.textContent(`[data-mark-pattern="${p.id}"] h2`);
    ck(`pattern "${p.name}" has a heading`, heading?.trim() === p.name);
    for (const c of chainsOf(p.id)) {
      const sel = `[data-mark-pattern="${p.id}"] [data-mark-chain="${c.id}"] [data-mark-node]`;
      const ids = await page.$$eval(sel, (els) => els.map((e) => e.getAttribute("data-mark-node")));
      ck(`chain "${c.name}" lists its nodes in order under ${p.name}`,
        ids.join(",") === c.nodes.join(","));
    }
  }

  const row = (id) => page.textContent(`[data-mark-node="${id}"]`);
  const floor = await row("floor-push-up");
  ck("floor push-up row names incline as its regression",
    floor.includes(regressionOf("floor-push-up").name));
  ck("floor push-up row names deficit as its progression",
    floor.includes(progressionOf("floor-push-up").name));
  const wall = await page.$eval(`[data-mark-node="wall-push-up"] [data-mark-regression]`,
    (e) => e.textContent.trim());
  ck("wall push-up shows no regression", wall === "");
});
