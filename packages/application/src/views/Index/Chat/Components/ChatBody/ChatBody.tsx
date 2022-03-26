import React, { useContext } from 'react'
import './ChatBody.css'
import EtMessage from '../../../../../../../components/src/EtMessage/etMessage'
import { UserContext } from '../../../../../store'
import { MessageType } from '../../Pages/NewMessage/NewMessage'

type ChatBodyPropsType = {
  friend_id: string
  msgs?: Array<{
    messageType: MessageType
    content: string
    time: number
    user_id: string
  }>
}

const ChatBody: React.FC<ChatBodyPropsType> = (props: ChatBodyPropsType) => {
  const ctx = useContext(UserContext)
  let friendUserInfo: { id: string; nickname: string; avatar: string } | null =
    null
  ctx.userInfo?.friends.forEach((value) => {
    if (props.friend_id === value.id) {
      friendUserInfo = value
    }
  })
  return (
    <div className='chat_body'>
      {props.msgs?.map((value) => {
        return (
          <EtMessage
            key={value.time}
            userId={value.user_id}
            userName={
              value.user_id === friendUserInfo?.id
                ? friendUserInfo.nickname
                : ctx.userInfo?.nickname
            }
            avatarUrl={
              value.user_id === friendUserInfo?.id
                ? friendUserInfo.avatar
                : ctx.userInfo?.avatar
            }
          >
            {value.messageType === MessageType.TEXT && (
              <div dangerouslySetInnerHTML={{ __html: value.content }} />
            )}
            {value.messageType === MessageType.AUDIO && (
              <audio src={value.content} controls={true} />
            )}
            {value.messageType === MessageType.PHOTO && (
              <img
                src={value.content}
                alt={value.content}
                style={{
                  maxWidth: '100%'
                }}
              />
            )}
          </EtMessage>
        )
      })}
    </div>
  )
}

export default ChatBody
