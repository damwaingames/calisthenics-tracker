import { verify } from "./harness.mjs";

/* Dark mode, driven by prefers-color-scheme: the palette lives in CSS custom
 * properties, and a @media (prefers-color-scheme: dark) block re-points them. This asserts two
 * things: (1) the wiring, body + a card surface follow the emulated scheme, so the media query
 * reaches the variables; and (2) integrity, every palette token resolves to a non-empty value in
 * both schemes. A self-referential or mistyped var() computes to "" (guaranteed-invalid), which a
 * background-only check sails right past (the sibling's PR #34 shipped exactly that: two
 * self-referential border tokens broke light-mode borders while every background stayed correct).
 * The token list is read from the sheet's top-level :root rule, never retyped: the light block is
 * the full set by design and the dark block only re-points, so a token added to the sheet is
 * guarded the moment it exists. */

verify(async ({ page, ck, reset }) => {
  const bodyBg = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const channel = (rgb) => Number(rgb.match(/\d+/g)[0]); // red channel, enough to tell light from dark
  const cssVar = (name) => page.evaluate((n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim(), name);

  await reset();

  const TOKENS = await page.evaluate(() => {
    const names = new Set();
    for (const sheet of document.styleSheets) for (const rule of sheet.cssRules)
      if (rule.selectorText === ":root") for (const p of rule.style) if (p.startsWith("--")) names.add(p);
    return [...names];
  });
  ck("palette tokens found in :root (" + TOKENS.length + ")", TOKENS.length > 0);

  // ---- The wiring: body + a card surface follow the emulated scheme ----
  await page.emulateMedia({ colorScheme: "light" });
  await page.waitForTimeout(50);
  const light = await bodyBg();
  ck("light scheme → light background (" + light + ")", channel(light) > 200);

  await page.emulateMedia({ colorScheme: "dark" });
  await page.waitForTimeout(50);
  const dark = await bodyBg();
  ck("dark scheme → dark background (" + dark + ")", channel(dark) < 60);

  const cardBg = await page.evaluate(() => {
    const el = document.querySelector(".card");
    return el ? getComputedStyle(el).backgroundColor : null;
  });
  ck("a card surface is dark under dark scheme (" + cardBg + ")", cardBg !== null && channel(cardBg) < 70);

  // ---- Integrity: every palette token resolves (non-empty) in both schemes ----
  for (const scheme of ["light", "dark"]) {
    await page.emulateMedia({ colorScheme: scheme });
    await page.waitForTimeout(20);
    for (const t of TOKENS) {
      ck(`${t} resolves (${scheme})`, (await cssVar(t)) !== "");
    }
  }
});
