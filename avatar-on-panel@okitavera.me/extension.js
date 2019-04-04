const Lang = imports.lang;
const St = imports.gi.St;
const Main = imports.ui.main;
const GLib = imports.gi.GLib;
const UserManager = imports.gi.AccountsService.UserManager;

class AvatarDrawer {
  constructor() {
    this._user = UserManager.get_default().get_user(GLib.get_user_name());

    this._image = new St.Bin({ style_class: "avatar-img" });
    this._imageCanvas = new St.Bin({ style_class: "avatar-wrapper" });
    this.actor = new St.BoxLayout({
      style_class: "panel-status-indicators-box"
    });

    this._imageCanvas.add_actor(this._image);
    this.actor.add_actor(this._imageCanvas);
  }
  _update() {
    if (this._user.get_icon_file() == null) return;
    this._image.style = `background-image: url("${this._user.get_icon_file()}");`;
    this._image.width = Main.panel.actor.get_height() - 8;
    this._image.height = this._image.width;
  }
  connect() {
    this._loaded = this._user.connect(
      "notify::is-loaded",
      this._update.bind(this)
    );
    this._changed = this._user.connect("changed", this._update.bind(this));
    this._update();
    Main.panel.statusArea.aggregateMenu._indicators.add_child(this.actor);
  }
  disconnect() {
    this._user.disconnect(this._loaded);
    this._user.disconnect(this._changed);
    Main.panel.statusArea.aggregateMenu._indicators.remove_child(this.actor);
  }
}

let avatar;
function init() {}
function enable() {
  if (avatar == undefined) avatar = new AvatarDrawer();
  avatar.connect();
}
function disable() {
  if (avatar == undefined) return;
  avatar.disconnect();
  avatar = undefined;
}
