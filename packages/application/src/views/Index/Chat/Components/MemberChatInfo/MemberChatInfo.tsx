import React from 'react'
import './MemberChatInfo.css'
import '../ChannelChatInfo/ChannelChatInfo.css'

export default function UserChatInfo(props: any) {
  const { UserName } = props
  return (
    <div className='channel_chat_info'>
      <div className='channel_chat_info_description'>
        <span className='channel_chat_info_type'>#</span>
        <div>
          <div className='channel_description_head'>此对话仅限你们两位之间</div>
          <div className='channel_description_body'>
            <span>
              你可以在这里向
              <span className='channel_chat_name'>@ {UserName} </span>
              发送消息并与其共享文件。
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
