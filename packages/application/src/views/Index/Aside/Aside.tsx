import './Aside.css'
import Button from "../../../../../components/src/Button/Button"
import Drop from "../../../../../components/src/Drop/Drop"
import UserAvatar from "../../../../../components/src/UserAvatar/UserAvatar"
import { useState } from 'react'

export default function Aside(props: any) {
  const { resizeWidth } = props
  const [msgList, changeMsgList] = useState([
    {
      icon: '#icon-xiaoxixianxing',
      title: '消息列'
    },
    {
      icon: '#icon-aite',
      title: '提及和回复'
    },
    {
      icon: '#icon-shenglvehao_v',
      title: '更多'
    },
  ])

  return (
    <div className="workspace_aside" style={{ width: resizeWidth }}>
      <div className="workspace_aside_header">
        <div className="workspace_aside_header_button">
          <div className="workspace_aside_header_button_info">
            <Button text='新工作区' backgroundColor='#00000000' fontWeight={900} fontSize={18} color='#ffffff' />
          </div>
        </div>
        <div className='new_massage_btn'>
          <Button
            show_icon
            iconString='#icon-shuxie'
            backgroundColor='#ffffff'
            iconColor='#3f0e40'
            iconHeight={24}
            iconWidth={24}
            borderRadius='50%' />
        </div>
      </div>
      {/* 消息列表 */}
      <div className="workspace_aside_channel">
        <ul className="workspace_aside_channel_list" style={{ marginTop: '20px' }}>
          {
            msgList.map((item, index) =>
              <li className="workspace_aside_msg_item" key={index}>
                <svg className="icon workspace_aside_msg_item_icon" aria-hidden="true">
                  <use xlinkHref={item.icon}></use>
                </svg>
                <span>{item.title}</span>
              </li>
            )
          }
        </ul>
        {/* channel */}
        <div className='workspace_aside_user_channel'>
          <div className="workspace_aside_user_channel_item" style={{ margin: '20px 0' }}>
            <Drop width='100%' title="频道" />
            <ul style={{ marginTop: '10px' }}>
              {/* 频道队列 */}
              <li className='workspace_aside_msg_item' style={{ paddingLeft: '30px' }}>
                #
                <span style={{ marginLeft: '10px' }}>频道名称</span>
              </li>
              {/* 添加队列 */}
              <li className='workspace_aside_msg_item' style={{ paddingLeft: '20px' }}>
                <div className="workspace_add_msg_item">
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-plus"></use>
                  </svg>
                </div>
                <span style={{ marginLeft: '10px' }}>添加频道</span>
              </li>
            </ul>
          </div>
          <div className="workspace_aside_user_channel_item" style={{ margin: '20px 0' }}>
            <Drop width='100%' title="私信" />
            <ul style={{ marginTop: '10px' }}>
              {/* 私信队列 */}
              <li className='workspace_aside_msg_item' style={{ paddingLeft: '20px', position: 'relative' }}>
                <UserAvatar
                  status='online'
                  avatarUrl='https://img1.baidu.com/it/u=3702625202,3169032464&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500'
                  borderRadius={4}
                  width={20}
                  height={20} />
                <span className='workspace_aside_msg_user_name' style={{ margin: '0 16px 0 10px' }}>用户名称</span>
                <svg className="icon workspace_aside_msg_item_del" aria-hidden="true">
                  <use xlinkHref="#icon-plus"></use>
                </svg>
              </li>
              {/* 添加团队成员 */}
              <li className='workspace_aside_msg_item' style={{ paddingLeft: '20px' }}>
                <div className="workspace_add_msg_item">
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-plus"></use>
                  </svg>
                </div>
                <span style={{ marginLeft: '10px' }}>添加团队成员</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
