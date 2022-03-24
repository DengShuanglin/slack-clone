/* 消息列 */
import React from 'react'
import './Threads.css'
import '../../Style/index.css'
<<<<<<< Updated upstream
import ChatHeader from '../../Components/ChatHeader/ChatHeader'
import { MarkdownInput } from '@slack-pkg/components'
=======
import ChatHeader from "../../Components/ChatHeader/ChatHeader"
import ChatBody from '../../Components/ChatBody/ChatBody'
import { MarkdownInputEditor, AudioRecord } from "@slack-pkg/components";
>>>>>>> Stashed changes

export default function Threads() {
  return (
    <div className='main_chat_contents'>
<<<<<<< Updated upstream
      <ChatHeader title='消息列' />
      <MarkdownInput />
=======
      <ChatHeader title="消息列" />
      <ChatBody />

      <AudioRecord />
      <MarkdownInputEditor style={{ flex: '162px' }} />
>>>>>>> Stashed changes
    </div>
  )
}
