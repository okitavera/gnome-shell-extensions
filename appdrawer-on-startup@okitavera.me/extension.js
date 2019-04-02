/* App Drawer on Startup
 * Inspired by Overview on Startup (DEPRECATED)
 * |-> https://extensions.gnome.org/extension/658/overview-on-startup/
 */
const Main = imports.ui.main;
let lmHook;

function onStartupPrepared() {
  Main.overview.viewSelector._showAppsButton.checked = true;
  return Main.overview.show();
}

function enable() {
  lmHook = Main.layoutManager.connect("startup-prepared", onStartupPrepared);
}

function disable() {
  Main.layoutManager.disconnect(lmHook);
  lmHook = null;
}
function init() {}
