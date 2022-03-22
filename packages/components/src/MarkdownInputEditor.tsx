import React, { useEffect, useRef } from 'react'
import 'easymde/dist/easymde.min.css'
import ReactWEditor from 'wangeditor-for-react'
import AlertMenu from './AlertMenu'

const MarkdownInputEditor = () => {
  let editorRef = useRef(null)

  return (
    <ReactWEditor
      ref={editorRef}
      defaultValue={'标题'}
      globalHook={{
        registerMenu: ['alertMenuKey', AlertMenu]
      }}
      config={{
        height: 120,
        showFullScreen: false,
        menus: [
          'bold',
          'italic',
          'strikeThrough',
          'link',
          'list',
          'quote',
          'code',
          'emoticon',
          'alertMenuKey'
        ]
      }}
      linkImgCallback={(src, alt, href) => {
        // 插入网络图片的回调事件
        console.log('图片 src ', src)
        console.log('图片文字说明', alt)
        console.log('跳转链接', href)
      }}
      onlineVideoCallback={(video) => {
        // 插入网络视频的回调事件
        console.log('插入视频内容', video)
      }}
      onChange={(html) => {
        console.log('onChange html:', html)
      }}
      onBlur={(html) => {
        console.log('onBlur html:', html)
      }}
      onFocus={(html) => {
        console.log('onFocus html:', html)
      }}
    />
  )
}

export default MarkdownInputEditor
