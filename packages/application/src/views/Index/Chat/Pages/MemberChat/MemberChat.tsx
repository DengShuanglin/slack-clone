import React, { useContext } from 'react'
import './MemberChat.css'
import '../../Style/index.css'

import ChatHeader from '../../Components/ChatHeader/ChatHeader'
import ChatBody from '../../Components/ChatBody/ChatBody'
import MemberChatInfo from '../../Components/MemberChatInfo/MemberChatInfo'
import { MarkdownInput } from '@slack-pkg/components'
import { useHistory, useParams } from 'react-router-dom'
import { useFriendMessageRequest } from '../../../../../api/socketRequest'
import { UserContext } from '../../../../../store'

export default function MemberChat() {
  const history = useHistory()
  const ctx = useContext(UserContext)
  const toSendData = useFriendMessageRequest()
  if (toSendData === undefined) {
    return null
  }
  const params = useParams<{
    id?: string
    nickname?: string
    avatar?: string
  }>()
  if (params.id == undefined) {
    history.replace('/index')
  }

  return (
    <div className='main_chat_contents'>
      <ChatHeader title='# 频道名称' />
      <MemberChatInfo UserName='UserName' />
      <ChatBody />
      <MarkdownInput
        onSend={({ type, content }) => {
          if (ctx.user_id !== undefined && params.id !== undefined) {
            toSendData[1]({
              user_id: ctx.user_id,
              friend_id: params.id,
              content: content,
              messageType: type
            })
          }
        }}
      />
    </div>
  )
}
