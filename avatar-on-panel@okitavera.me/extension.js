const St = imports.gi.St;
const Main = imports.ui.main;
const userData = imports.gi.AccountsService.UserManager.get_default().get_user(
  imports.gi.GLib.get_user_name()
);

let icon, icChanged, icLoaded, wrapper;

function update() {
  if (userData.get_icon_file() != null) {
    icon.style = `background-image: url("${userData.get_icon_file()}");`;
    icon.width = icon.height = Main.panel.actor.get_height() - 8;
  }
}

function enable() {
  icon = new St.Bin({ style_class: "avatar-indicator" });
  icLoaded = userData.connect("notify::is-loaded", update);
  icChanged = userData.connect("changed", update);
  wrapper = new St.Bin({ style_class: "avatar-indicator--wrapper" });
  wrapper.add_actor(icon);
  Main.panel.statusArea.aggregateMenu._power.indicators.add_child(wrapper);
  update();
}

function disable() {
  Main.panel.statusArea.aggregateMenu._power.indicators.remove_child(wrapper);
  userData.disconnect(icChanged);
  userData.disconnect(icLoaded);
  icon = icChanged = icLoaded = wrapper = null;
}

function init() {}
