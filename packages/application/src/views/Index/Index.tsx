import Header from "./Header/Header"
import Aside from "./Aside/Aside"
import Chat from "./Chat/Chat"
import './Index.css'
import {MarkdownInputEditor} from '@slack-pkg/components'
import { useState } from 'react'


export default function Index() {
  const [resizeWidth, changeResizeWidth] = useState(215)
  const [isResize, changeIsResize] = useState(false)
  return (
    <div className="index_container">
      <Header />
      <div className="index_workspace" style={{ gridTemplateColumns: `${resizeWidth}px auto` }}>
        {/* 左侧sidebar */}
        <Aside resizeWidth={resizeWidth} />
        {/* 滑块控制左侧大小 */}
        <div className="resize" style={{ left: resizeWidth - 5 }}
          onMouseDown={(evt) => { changeIsResize(true) }}
          onMouseMove={(evt) => { if (isResize) { changeResizeWidth(evt.pageX) } }}
          onMouseOut={(evt) => { changeIsResize(false) }}>
          <input type="range" min={180} max={594} step={10} value={resizeWidth} />
        </div>
        {/* 右侧聊天区域 */}

        {/* <Route path="/index/threads" component={Threads} /> */}
        <Chat />
      </div>
    </div>
  )
}
