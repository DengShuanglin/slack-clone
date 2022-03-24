import React from 'react'
import './NewMessage.css'
import '../../Style/index.css'
import ChatHeader from '../../Components/ChatHeader/ChatHeader'
import ChatBody from '../../Components/ChatBody/ChatBody'
<<<<<<< Updated upstream
import { MarkdownInput } from '@slack-pkg/components'
=======
import { MarkdownInputEditor, AudioRecord } from "@slack-pkg/components";
>>>>>>> Stashed changes

export default function NewMessage() {
  return (
    <div className='main_chat_contents'>
      <ChatHeader title='新消息' />
<<<<<<< Updated upstream
      <ChatBody />

      <MarkdownInput />
=======
      <div className="msg_to_anyone">
        <div className="destination">
          <span className='destination_prefix'>至:</span>
        </div>
        <div className="destination_content">
          <input className='destination_content_input' type="text" placeholder='#a-频道、@某人或 somebody@example.com' />
        </div>
      </div>
      <div className="no_destination_body">
        <div className="no_destination_body_info">
          <div className="no_destination_body_info_item">
            <div className="no_destination_body_info_item_title">
              <svg className="icon" style={{width: '20px', height: '20px', marginRight: '10px'}} aria-hidden="true">
                <use xlinkHref="#icon-xingxing"></use>
              </svg>
              起草消息，不受干扰</div>
            <div className="no_destination_body_info_item_content">
              你可以在这里向任何团队成员或频道发送消息。
              {/* 在上面的列表中没看到所需人员吗？ */}
              {/* <button className='add_new_member_btn'>向 简单聊 添加人员</button> */}
            </div>
          </div>
        </div>
      </div>
      {/* <ChatBody /> */}
      <AudioRecord />
      <MarkdownInputEditor style={{ flex: '162px' }} />
>>>>>>> Stashed changes
    </div>
  )
}
