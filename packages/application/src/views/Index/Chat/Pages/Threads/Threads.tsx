/* 消息列 */
import React from 'react'
import './Threads.css'
import '../../Style/index.css'

import ChatHeader from '../../Components/ChatHeader/ChatHeader'
import ChatBody from '../../Components/ChatBody/ChatBody'
import { MarkdownInput } from '@slack-pkg/components'

export default function Threads() {
  return (
    <div className='main_chat_contents'>
      <ChatHeader title='消息列' />
      <ChatBody />
      <MarkdownInput />
    </div>
  )
}
