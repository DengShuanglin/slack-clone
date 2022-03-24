import React from 'react'
import './NewMessage.css'
import '../../Style/index.css'
import ChatHeader from '../../Components/ChatHeader/ChatHeader'
import ChatBody from '../../Components/ChatBody/ChatBody'
import { MarkdownInputEditor } from '@slack-pkg/components'

export default function NewMessage() {
  return (
    <div className='main_chat_contents'>
      <ChatHeader title='新消息' />
      <ChatBody />

      <MarkdownInputEditor style={{ flex: '162px' }} />
    </div>
  )
}
