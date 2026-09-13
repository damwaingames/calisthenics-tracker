import { verify } from "./harness.mjs";

/* Logging (#8): tap a node in the browser to open its view, log a rep performance dated by hand,
 * see it in the node's history newest first, and find it still there after a reload. */
verify(async ({ page, ck, reset }) => {
  await reset();

  await page.click('[data-mark-node="floor-push-up"] [data-action="open-node"]');
  ck("tapping a node opens its view",
    await page.isVisible('[data-mark-node-view="floor-push-up"]'));

  const log = async (date, reps) => {
    await page.fill('[data-mark-log-form] [name="date"]', date);
    await page.fill('[data-mark-log-form] [name="reps"]', String(reps));
    await page.click('[data-mark-log-form] button[type="submit"]');
  };
  const rows = () =>
    page.$$eval("[data-mark-performance]", (els) => els.map((e) => e.textContent.trim()));

  await log("2026-09-10", 10);
  let list = await rows();
  ck("a logged performance appears in the node's history",
    list.length === 1 && /10 reps/.test(list[0]));

  await log("2026-09-12", 8);
  list = await rows();
  ck("a later performance is listed first",
    list.length === 2 && /2026-09-12.*8 reps/.test(list[0]));

  await page.reload({ waitUntil: "load" });
  list = await rows();
  ck("the history survives a reload",
    list.length === 2 && /8 reps/.test(list[0]) && /10 reps/.test(list[1]));

  await page.click('[data-action="back"]');
  ck("back returns to the chain browser", await page.isVisible('[data-mark-chain="push-up"]'));
});
