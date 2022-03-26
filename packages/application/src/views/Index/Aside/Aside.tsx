import './Aside.css'
import Button from '../../../../../components/src/Button/Button'
import Drop from '../../../../../components/src/Drop/Drop'
import UserAvatar from '../../../../../components/src/UserAvatar/UserAvatar'
import AddCard from '../../../../../components/src/AddCard/AddCard'
import { SetStateAction, useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../store'
import { useHistory, useParams } from 'react-router-dom'

export default function Aside(props: any) {
  const ctx = useContext(UserContext)
  const history = useHistory()
  const [_, set_] = useState(0)
  useEffect(() => {
    ctx.addRefreshCallback('Aside', () => {
      set_((e) => e + 1)
    })
  }, [])
  const params = useParams<any>()
  const { resizeWidth, openChannelCard, openMemberCard } = props
  const [msgList, changeMsgList] = useState([
    {
      id: 0,
      icon: '#icon-xiaoxixianxing',
      title: '消息列',
      url: '/index/threads'
    },
    {
      id: 1,
      icon: '#icon-aite',
      title: '提及和回复',
      url: '/index/activity-page'
    }
    // {
    //   id: 2,
    //   icon: '#icon-shenglvehao_v',
    //   title: '更多'
    // }
  ])
  const [msgListTargetIndex, changeMsgListTargetIndex] = useState(99999)
  const [channelTargetIndex, changeChannelTargetIndex] = useState(99999)
  const [memberTargetIndex, changeMemberTargetIndex] = useState(99999)
  const [closeChannel, changeCloseChannel] = useState(false)
  const [closeMember, changeCloseMember] = useState(false)

  const workspaceAsideMsgItem = (
    item:
      | { id: number; icon: string; title: string; url: string }
      | { id: number; icon: string; title: string; url?: undefined },
    index: number
  ) => {
    if (item.url) {
      history.push(item.url)
    }
    changeMsgListTargetIndex(index)
    changeChannelTargetIndex(99999)
    changeMemberTargetIndex(99999)
  }
  const clickChannelItem = (item: string, index: SetStateAction<number>) => {
    /* 进入对应频道 */
    history.push('/index/channelchat', {
      id: item
    })
    changeChannelTargetIndex(index)
    changeMsgListTargetIndex(99999)
    changeMemberTargetIndex(99999)
  }
  const clickMemberItem = (item: any, index: number) => {
    /* 进入对应用户聊天 */
    history.push('/index/memberchat', item)
    changeMemberTargetIndex(index)
    changeMsgListTargetIndex(99999)
    changeChannelTargetIndex(99999)
  }

  return (
    <div className='workspace_aside' style={{ width: resizeWidth }}>
      <div className='workspace_aside_header'>
        <div className='workspace_aside_header_button'>
          <div className='workspace_aside_header_button_info'>
            <Button
              text='WorkSpace'
              backgroundColor='#00000000'
              fontWeight={900}
              fontSize={18}
              color='#ffffff'
            />
          </div>
        </div>
      </div>
      {/* 消息列表 */}
      <div className='workspace_aside_channel'>
        <ul
          className='workspace_aside_channel_list'
          style={{ marginTop: '20px' }}
        >
          {msgList.map((item, index) => (
            <li
              className='workspace_aside_msg_item'
              key={index}
              onClick={() => workspaceAsideMsgItem(item, index)}
              style={{
                backgroundColor: msgListTargetIndex == index ? '#1164A3' : ''
              }}
            >
              <svg
                className='icon workspace_aside_msg_item_icon'
                aria-hidden='true'
              >
                <use xlinkHref={item.icon}></use>
              </svg>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
        {/* channel */}
        <div className='workspace_aside_user_channel'>
          <div
            className='workspace_aside_user_channel_item'
            style={{ margin: '20px 0' }}
          >
            <Drop
              width='100%'
              title={'频道(' + (ctx.userInfo?.channels.length || 0) + ')'}
              plusCallback={() => {
                if (openChannelCard) openChannelCard()
              }}
              arrowCallback={() => {
                changeCloseChannel(!closeChannel)
              }}
            />
            <ul style={{ marginTop: '10px' }}>
              {/* 频道队列 */}
              {/* 循环创建 */}
              {ctx.userInfo?.channels.map((item, index) => (
                <li
                  className='workspace_aside_msg_item'
                  style={{
                    display:
                      closeChannel && channelTargetIndex != index
                        ? 'none'
                        : 'flex',
                    paddingLeft: '30px',
                    backgroundColor:
                      channelTargetIndex == index ? '#1164A3' : ''
                  }}
                  onClick={() => clickChannelItem(item, index)}
                >
                  #<span style={{ marginLeft: '10px' }}>{item}</span>
                </li>
              ))}
              {/* 添加队列 */}
              <li
                className='workspace_aside_msg_item'
                style={{ paddingLeft: '20px' }}
                onClick={() => {
                  if (openChannelCard) openChannelCard()
                }}
              >
                <div className='workspace_add_msg_item'>
                  <svg className='icon' aria-hidden='true'>
                    <use xlinkHref='#icon-plus'></use>
                  </svg>
                </div>
                <span style={{ marginLeft: '10px' }}>添加频道</span>
              </li>
            </ul>
          </div>
          <div
            className='workspace_aside_user_channel_item'
            style={{ margin: '20px 0' }}
          >
            <Drop
              width='100%'
              title={'好友(' + (ctx.userInfo?.friends.length || 0) + ')'}
              plusCallback={() => {
                if (openMemberCard) openMemberCard()
              }}
              arrowCallback={() => {
                changeCloseMember(!closeMember)
              }}
            />
            <ul style={{ marginTop: '10px' }}>
              {/* 私信队列 */}
              {ctx.userInfo?.friends.map((item, index) => (
                <li
                  className='workspace_aside_msg_item'
                  style={{
                    paddingLeft: '20px',
                    position: 'relative',
                    backgroundColor:
                      memberTargetIndex == index ? '#1164A3' : '',
                    display:
                      closeMember && memberTargetIndex != index
                        ? 'none'
                        : 'flex'
                  }}
                  onClick={() => clickMemberItem(item, index)}
                >
                  <UserAvatar
                    status={'offline'}
                    avatarUrl={item.avatar}
                    borderRadius={4}
                    width={20}
                    height={20}
                  />
                  <span
                    className='workspace_aside_msg_user_name'
                    style={{ margin: '0 16px 0 10px' }}
                  >
                    {item.nickname}
                  </span>
                  <svg
                    className='icon workspace_aside_msg_item_del'
                    aria-hidden='true'
                  >
                    <use xlinkHref='#icon-plus'></use>
                  </svg>
                </li>
              ))}
              {/* 添加团队成员 */}
              <li
                className='workspace_aside_msg_item'
                style={{ paddingLeft: '20px' }}
                onClick={() => {
                  if (openMemberCard) openMemberCard()
                }}
              >
                <div className='workspace_add_msg_item'>
                  <svg className='icon' aria-hidden='true'>
                    <use xlinkHref='#icon-plus'></use>
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
