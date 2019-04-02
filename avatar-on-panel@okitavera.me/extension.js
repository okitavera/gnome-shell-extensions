const St = imports.gi.St;
const Main = imports.ui.main;
const Userdata = imports.gi.AccountsService.UserManager.get_default().get_user(
  imports.gi.GLib.get_user_name()
);

let im, im_changed, im_loaded, avatar;

function update() {
  if (Userdata.get_icon_file() != null) {
    im.style = `background-image: url("${Userdata.get_icon_file()}");`;
  }
}

function init() {
  let im_canva = new St.Bin({ style_class: "avatar-indicator--wrapper" });
  avatar = new St.BoxLayout({ style_class: "panel-status-indicators-box" });
  im = new St.Bin({ style_class: "avatar-indicator" });
  im_canva.add_actor(im);
  avatar.add_actor(im_canva);
  im.width = im.height = Main.panel.actor.get_height() - 8;
}

function enable() {
  Main.panel.statusArea.aggregateMenu._indicators.add_child(avatar);
  im_loaded = Userdata.connect("notify::is-loaded", update);
  im_changed = Userdata.connect("changed", update);
}

function disable() {
  Main.panel.statusArea.aggregateMenu._indicators.remove_child(avatar);
  Userdata.disconnect(im_changed);
  Userdata.disconnect(im_loaded);
  avatar = null;
}
