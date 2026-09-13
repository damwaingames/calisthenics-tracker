/* Shared constants. Imported by every other module; no dependencies of its own. */

// Bumped by hand per release.
export const APP_VERSION = "0.1.0";
export const STORAGE_KEY = "calisthenics-tracker";
// The store schema this build writes. Anything on disk at any other version resets to the
// default store (store.js); the migration chain lands with the first real migration.
export const SCHEMA_VERSION = 1;
