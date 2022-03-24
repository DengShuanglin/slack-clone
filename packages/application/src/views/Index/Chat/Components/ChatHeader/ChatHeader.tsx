import React from 'react'
import './ChatHeader.css'

export default function ChatHeader(props: any) {
  const { title } = props
  return (
    <div className='chat_header'>
      <div className="chat_header_title">
        {title}
        <div className="chat_header_info">1 分钟前</div></div>
    </div>
  )
}
