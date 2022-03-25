/* 提及和回复 */
import React, { useState } from 'react'
import './ActivityPage.css'
import '../../Style/index.css'
import ChatHeader from '../../Components/ChatHeader/ChatHeader'

export default function ActivityPage() {
  const [demoData, changeDemoData] = useState([
    {
      originChannel: 'Channel0',
      userAvatar:
        'https://img1.baidu.com/it/u=3702625202,3169032464&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
      userName: '小明',
      contentTime: '3 月 21 日 晚上 10:30',
      toChannel: 'Hello'
    },
    {
      originChannel: 'New Channel1',
      userAvatar:
        'https://img1.baidu.com/it/u=3702625202,3169032464&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
      userName: '小李',
      contentTime: '5 月 20 日 晚上 10:30',
      toChannel: 'Hello World'
    },
    {
      originChannel: 'New Channel2',
      userAvatar:
        'https://img1.baidu.com/it/u=3702625202,3169032464&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
      userName: '小李',
      contentTime: '5 月 20 日 晚上 10:30',
      toChannel: 'Hello World'
    },
    {
      originChannel: 'New Channel3',
      userAvatar:
        'https://img1.baidu.com/it/u=3702625202,3169032464&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
      userName: '小李',
      contentTime: '5 月 20 日 晚上 10:30',
      toChannel: 'Hello World'
    },
    {
      originChannel: 'New Channel4',
      userAvatar:
        'https://img1.baidu.com/it/u=3702625202,3169032464&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
      userName: '小李',
      contentTime: '5 月 20 日 晚上 10:30',
      toChannel: 'Hello World'
    },
    {
      originChannel: 'New Channel5',
      userAvatar:
        'https://img1.baidu.com/it/u=3702625202,3169032464&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
      userName: '小李',
      contentTime: '5 月 20 日 晚上 10:30',
      toChannel: 'Hello World'
    },
    {
      originChannel: 'New Channel6',
      userAvatar:
        'https://img1.baidu.com/it/u=3702625202,3169032464&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
      userName: '小李',
      contentTime: '5 月 20 日 晚上 10:30',
      toChannel: 'Hello World'
    },
    {
      originChannel: 'New Channel7',
      userAvatar:
        'https://img1.baidu.com/it/u=3702625202,3169032464&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
      userName: '小李',
      contentTime: '5 月 20 日 晚上 10:30',
      toChannel: 'Hello World'
    },
    {
      originChannel: 'New Channel8',
      userAvatar:
        'https://img1.baidu.com/it/u=3702625202,3169032464&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
      userName: '小李',
      contentTime: '5 月 20 日 晚上 10:30',
      toChannel: 'Hello World'
    },
    {
      originChannel: 'New Channel9',
      userAvatar:
        'https://img1.baidu.com/it/u=3702625202,3169032464&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
      userName: '小李',
      contentTime: '5 月 20 日 晚上 10:30',
      toChannel: 'Hello World'
    }
  ])

  /* 删除消息 */
  const delete_content = (index: number) => {
    let temp = [...demoData]
    temp.splice(index, 1)
    changeDemoData(temp)
  }

  return (
    <div className='main_chat_contents'>
      <ChatHeader title='提及和回复' />
      <div className='virtual_list_container'>
        <div className='virtual_list' style={{ display: demoData.length ? 'block' : 'none' }}>
          {demoData.map((item, index) => (
            <div className='virtual_list_item'>
              <div className='virtual_list_item_content'>
                <div className='virtual_list_item_content_head'>
                  <span style={{ fontWeight: 700, fontSize: '13px' }}>
                    # {item.originChannel}
                  </span>
                </div>
                <div className='virtual_list_item_content_gutter'>
                  <img className='user_avatar' src={item.userAvatar} alt='' />
                  <div className='virtual_list_item_content_gutter_right'>
                    <span className='user_name'>{item.userName}</span>
                    <span className='content_time'>{item.contentTime}</span>
                    <br />
                    <span
                      className='virtual_list_item_content_gutter_msg'
                      style={{ color: 'rgba(97,96,97,1)' }}
                    >
                      已将您添加到
                    </span>
                    <a
                      className='virtual_list_item_content_gutter_msg_href'
                      href=''
                    >
                      #{item.toChannel}
                    </a>
                  </div>
                </div>
                <div
                  className='virtual_list_item_delete'
                  onClick={() => delete_content(index)}
                >
                  <svg
                    className='icon virtual_list_item_delete_icon'
                    aria-hidden='true'
                  >
                    <use xlinkHref='#icon-plus'></use>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="virtual_list_container_empty" style={{ display: demoData.length ? 'none' : 'flex' }}>
          <div className="virtual_list_container_empty_title">实时查看新的活动</div>
          <div className="virtual_list_container_empty_description">当人员对你的消息做出回复或提及你或你的关键字时，你就会在这里看到。</div>
        </div>
      </div>
    </div>
  )
}
