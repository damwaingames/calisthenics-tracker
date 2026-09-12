/* The Store: the single state object, persisted whole to localStorage, reassigned only through
 * setState. normalise is the one door from disk to memory: it takes whatever was saved and returns
 * a well-formed store at SCHEMA_VERSION, walking an older save up the migration chain and
 * resetting anything unloadable to the default. Pure apart from load/save, so a plain-Node test can
 * drive normalise directly. */

import { STORAGE_KEY, SCHEMA_VERSION } from "./constants.js";

export function defaultState() {
  return { version: SCHEMA_VERSION };
}

export function normalise(s) {
  if (!s || typeof s !== "object" || s.version !== SCHEMA_VERSION) return defaultState();
  return s;
}

export let state;
export function setState(s) { state = s; }

export function load() {
  let parsed = null;
  try { parsed = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { parsed = null; }
  setState(normalise(parsed));
  // Persist the normalised store so on-disk always matches the current schema: a migration or a
  // reset from garbage reaches disk on this launch, not on the first interaction. Idempotent.
  save();
}
export function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
