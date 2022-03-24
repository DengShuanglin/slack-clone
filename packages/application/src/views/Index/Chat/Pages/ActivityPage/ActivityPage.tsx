/* 提及和回复 */
import React from 'react'
import './ActivityPage.css'
import '../../Style/index.css'
import ChatHeader from "../../Components/ChatHeader/ChatHeader"

export default function ActivityPage() {
  return (
    <div className='main_chat_contents'>
      <ChatHeader title="提及和回复" />
    </div>
  )
}
