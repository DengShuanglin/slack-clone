import React from 'react'
import './NewMessage.css'
import '../../Style/index.css'
import ChatHeader from "../../Components/ChatHeader/ChatHeader"

export default function NewMessage() {
  return (
    <div className='main_chat_contents'>
      <ChatHeader title="新消息" />
    </div>
  )
}
