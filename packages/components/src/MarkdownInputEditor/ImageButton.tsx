import React from 'react'
import E from 'wangeditor'

const { $, BtnMenu, DropListMenu, PanelMenu, DropList, Panel, Tooltip } = E

class ImageButton extends BtnMenu {
  constructor(editor) {
    const $elem = $(
      `<div class="w-e-menu" data-title="发送图片">
        <i class="w-e-icon-image"></i>
      </div>`
    )
    super($elem, editor)
  }

  clickHandler() {
    alert('发送图片')
  }

  tryChangeActive() {
    this.active()
    // this.unActive()
  }
}

export default ImageButton
