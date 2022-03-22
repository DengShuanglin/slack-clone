import React from "react";
import E from "wangeditor";

const { $, BtnMenu, DropListMenu, PanelMenu, DropList, Panel, Tooltip } = E;

class AlertMenu extends BtnMenu {
  constructor(editor) {
    const $elem = $(
      `<div class="w-e-menu" data-title="Alert">
        <button>alert</button>
      </div>`
    );
    super($elem, editor);
  }

  clickHandler() {
    alert("hello world");
  }

  tryChangeActive() {
    this.active();
    // this.unActive()
  }
}

export default AlertMenu;
