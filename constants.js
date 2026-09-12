/* Shared constants. Imported by every other module; no dependencies of its own. */

// Bumped by hand per release, in lockstep with CACHE in sw.js (see README, Updating).
export const APP_VERSION = "0.1.0";
export const STORAGE_KEY = "calisthenics-tracker";
// The store schema this build writes. A saved store at an older version walks the migration
// chain in store.js; anything newer or unrecognised resets to the default store.
export const SCHEMA_VERSION = 1;
