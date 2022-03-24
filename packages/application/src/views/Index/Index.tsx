import Header from './Header/Header'
import Aside from './Aside/Aside'
import Chat from './Chat/Chat'
import './Index.css'
import { MarkdownInputEditor } from '@slack-pkg/components'
import { useContext, useState } from 'react'
import SocketHubProvider from '../../utils/socketHub'
import { UserContext } from '../../store'
import { useFriendMessageRequest } from '../../api/socketRequest'

export default function Index() {
  const ctx = useContext(UserContext)
  const [resizeWidth, changeResizeWidth] = useState(215)
  const [isResize, changeIsResize] = useState(false)
  const a = useFriendMessageRequest()
  if (a != undefined) {
    a[1]({
      friend_id: '',
      user_id: '',
      messageType: 1,
      content: ''
    })
  }

  if (ctx.userInfo?.friends)
    return (
      <div className='index_container'>
        <SocketHubProvider>
          <Header />
          <div
            className='index_workspace'
            style={{ gridTemplateColumns: `${resizeWidth}px auto` }}
          >
            {/* 左侧sidebar */}
            <Aside resizeWidth={resizeWidth} />
            {/* 滑块控制左侧大小 */}
            <div
              className='resize'
              style={{ left: resizeWidth - 5 }}
              onMouseDown={(evt) => {
                changeIsResize(true)
              }}
              onMouseMove={(evt) => {
                if (isResize) {
                  changeResizeWidth(evt.pageX)
                }
              }}
              onMouseOut={(evt) => {
                changeIsResize(false)
              }}
            >
              <input type='range' min={180} max={594} step={10} />
            </div>
            {/* 右侧聊天区域 */}

            {/* <Route path="/index/threads" component={Threads} /> */}
            <Chat />
          </div>
        </SocketHubProvider>
      </div>
    )
}
