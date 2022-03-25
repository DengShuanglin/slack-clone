/* 消息列 */
import React from 'react'
import './Threads.css'
import '../../Style/index.css'

import ChatHeader from '../../Components/ChatHeader/ChatHeader'
import ChatBody from '../../Components/ChatBody/ChatBody'
import { MarkdownInput } from '@slack-pkg/components'
import { useFriendMessageRequest } from '../../../../../api/socketRequest'

export default function Threads() {
  const send = useFriendMessageRequest()
  return (
    <div className='main_chat_contents'>
      <ChatHeader title='消息列' />
      <ChatBody />
      <MarkdownInput
        onSend={(e) => {
          send &&
            send[1]({
              content: e.content,
              friend_id: 1,
              user_id: 1,
              messageType: e.type
            })
        }}
      />
    </div>
  )
}
