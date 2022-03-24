import React from 'react'
import './NewMessage.css'
import '../../Style/index.css'
import ChatHeader from '../../Components/ChatHeader/ChatHeader'
import ChatBody from '../../Components/ChatBody/ChatBody'
import { MarkdownInput } from '@slack-pkg/components'
import { useFriendMessageRequest } from '../../../../../api/socketRequest'

export enum MessageType {
  TEXT = 0,
  PHOTO = 1,
  AUDIO = 2
}

export default function NewMessage() {
  // const a = useFriendMessageRequest()
  // if (a != undefined) {
  //   a[1]({
  //     friend_id: '',
  //     user_id: '',
  //     messageType: 1,
  //     content: ''
  //   })
  // }

  const handleSend = ({
    type,
    content
  }: {
    type: MessageType
    content: string
  }) => {
    // TODO: 调用发送消息事件
    console.log(type, content)
  }
  return (
    <div className='main_chat_contents'>
      <ChatHeader title='新消息' />
      <div className='msg_to_anyone'>
        <div className='destination'>
          <span className='destination_prefix'>至:</span>
        </div>
        <div className='destination_content'>
          <input
            className='destination_content_input'
            type='text'
            placeholder='#a-频道、@某人或 somebody@example.com'
          />
        </div>
      </div>
      <div className='no_destination_body'>
        <div className='no_destination_body_info'>
          <div className='no_destination_body_info_item'>
            <div className='no_destination_body_info_item_title'>
              <svg
                className='icon'
                style={{ width: '20px', height: '20px', marginRight: '10px' }}
                aria-hidden='true'
              >
                <use xlinkHref='#icon-xingxing'></use>
              </svg>
              起草消息，不受干扰
            </div>
            <div className='no_destination_body_info_item_content'>
              你可以在这里向任何团队成员或频道发送消息。
              {/* 在上面的列表中没看到所需人员吗？ */}
              {/* <button className='add_new_member_btn'>向 简单聊 添加人员</button> */}
            </div>
          </div>
        </div>
      </div>
      {/* <ChatBody /> */}
      <MarkdownInput onSend={handleSend} />
    </div>
  )
}
