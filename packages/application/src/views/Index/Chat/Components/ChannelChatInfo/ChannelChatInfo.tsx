import React from 'react'
import './ChannelChatInfo.css'

interface ChannelChatInfo {
  channelName: string,
  channelDescription: string,
}

export default function ChannelChatInfo(props: any) {
  const { channelName, channelDescription } = props
  return (
    <div className='channel_chat_info'>
      <div className="channel_chat_info_description">
        <span className='channel_chat_info_type'>#</span>
        <div>
          <div className="channel_description_head">
            你正在查看<span className='channel_chat_name'> # {channelName} </span>频道
          </div>
          <div className="channel_description_body">
            <span>{channelDescription}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
