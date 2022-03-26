/* 消息列 */
import React, { useContext } from 'react'
import './Threads.css'
import '../../Style/index.css'

import ChatHeader from '../../Components/ChatHeader/ChatHeader'
import ChatBody from '../../Components/ChatBody/ChatBody'
import { MarkdownInput, MessageReview } from '@slack-pkg/components'
import { useFriendMessageRequest } from '../../../../../api/socketRequest'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../../../../store'

export default function Threads() {
  const send = useFriendMessageRequest()
  const history = useHistory()
  const ctx = useContext(UserContext)
  const toSendData = useFriendMessageRequest()

  const temp1 = `<p><strong>123123123</strong>123&nbsp;a<em>sdfas</em>df&nbsp;阿<s>斯顿发</s>斯蒂芬&nbsp;&nbsp;&nbsp;<a href="123" target="_blank">123</a>&nbsp;</p><ol><li>123</li><li>3123</li></ol><blockquote>123123</blockquote><p><code>asdf</code>&nbsp;&nbsp;asdfasdf</p><p><br></p><pre><code class="language-xml">asdfasdf</code></pre><p><br></p>`

  return (
    <div className='main_chat_contents'>
      {/* <ChatHeader title='消息列' />
      <ChatBody /> */}

      <MarkdownInput
      // onSend={(e) => {
      //   send &&
      //     send[1]({
      //       content: e.content,
      //       friend_id: 1,
      //       user_id: 1,
      //       messageType: e.type
      //     })
      // }}
      />

      {/* <MessageReview type={0} content={temp1} /> */}
    </div>
  )
}
