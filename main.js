/* Entry point: load the store, do the first render, stamp the version. Module scripts are
 * deferred, so the DOM is parsed by the time this runs. */

import { APP_VERSION } from "./constants.js";
import { load } from "./store.js";
import { render } from "./render.js";

load();
render();
document.getElementById("version-tag").textContent = "v" + APP_VERSION;
