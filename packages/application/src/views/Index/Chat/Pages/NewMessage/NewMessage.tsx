import React from 'react'
import './NewMessage.css'
import '../../Style/index.css'
import ChatHeader from '../../Components/ChatHeader/ChatHeader'
import ChatBody from '../../Components/ChatBody/ChatBody'
import { MarkdownInput } from '@slack-pkg/components'
import { useFriendMessageRequest } from '../../../../../api/socketRequest'

export enum MessageType {
  TEXT = 0,
  PHOTO = 1,
  AUDIO = 2
}

export default function NewMessage() {
  const a = useFriendMessageRequest()
  if (a != undefined) {
    a[1]({
      friend_id: '',
      user_id: '',
      messageType: 1,
      content: ''
    })
  }

  const handleSend = ({
    type,
    content
  }: {
    type: MessageType
    content: string
  }) => {
    // TODO: 调用发送消息事件
    console.log('html', content)
  }
  return (
    <div className='main_chat_contents'>
      <ChatHeader title='新消息' />
      <ChatBody />
      <MarkdownInput onSend={handleSend} />
    </div>
  )
}
