/* 消息列 */
import React, { useContext } from 'react'
import './Threads.css'
import '../../Style/index.css'

import ChatHeader from '../../Components/ChatHeader/ChatHeader'
import ChatBody from '../../Components/ChatBody/ChatBody'
import { MarkdownInput } from '@slack-pkg/components'
import { useFriendMessageRequest } from '../../../../../api/socketRequest'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../../../../store'

export default function Threads() {
  const send = useFriendMessageRequest()
  const history = useHistory()
  const ctx = useContext(UserContext)
  const toSendData = useFriendMessageRequest()
  return (
    <div className='main_chat_contents'>
      <ChatHeader title='消息列' />
      <ChatBody />
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
    </div>
  )
}
