import React from 'react'
import './MemberChat.css'
import '../../Style/index.css'

import ChatHeader from '../../Components/ChatHeader/ChatHeader'
import ChatBody from '../../Components/ChatBody/ChatBody'
import MemberChatInfo from '../../Components/MemberChatInfo/MemberChatInfo'
import { MarkdownInput } from '@slack-pkg/components'

export default function MemberChat() {
  return (
    <div className='main_chat_contents'>
      <ChatHeader title='# 频道名称' />
      <MemberChatInfo UserName="UserName" />
      <ChatBody />
      <MarkdownInput />
    </div>
  )
}
