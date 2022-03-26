import React from 'react'
import './ChannelChat.css'
import '../../Style/index.css'

import ChatHeader from '../../Components/ChatHeader/ChatHeader'
import ChatBody from '../../Components/ChatBody/ChatBody'
import ChannelChatInfo from '../../Components/ChannelChatInfo/ChannelChatInfo'
import { MarkdownInput } from '@slack-pkg/components'

export default function ChannelChat() {
  return (
    <div className='main_chat_contents'>
      <ChatHeader title='# 频道名称' />
      <ChannelChatInfo
        channelName='频道名称'
        channelDescription='此频道将一直包含全部人员。所以这是发布全团队公告和进行对话的理想地点。'
      />
      <ChatBody friend_id={''} />
      <MarkdownInput />
    </div>
  )
}
