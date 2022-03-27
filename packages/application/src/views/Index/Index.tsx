import Header from './Header/Header'
import Aside from './Aside/Aside'
import Chat from './Chat/Chat'
import Help from './Help/Help'
import AddCard from '../../../../components/src/AddCard/AddCard'
import Input from '../../../../components/src/Input/Input'
import Button from '../../../../components/src/Button/Button'
import './Index.css'
import { useContext, useState, useEffect } from 'react'
import SocketHubProvider from '../../utils/socketHub'
import { UserContext } from '../../store'
import { useFriendMessageRequest } from '../../api/socketRequest'
import { useHistory } from 'react-router-dom'
import useRequest from '../../utils/request/hooks'
import { getUserInfoRequest } from '../../api/userRequest'
import { localStorageItemName } from '../../utils/request'

export default function Index() {
  const ctx = useContext(UserContext)

  const history = useHistory()
  const [_, set_] = useState(0)
  const [data, getData] = useRequest(getUserInfoRequest)
  useEffect(() => {
    ctx.addRefreshCallback('IndexRoute', () => {
      set_(_ + 1)
    })
    getData({})
    return () => {
      delete ctx.callbackMap['IndexRoute']
    }
  }, [])
  useEffect(() => {
    if (data.state === 'finish') {
      if (data.data !== undefined) {
        ctx.setUserData(data.data.result)
      } else {
        ctx.setUserData()
        history.push('/sign/signin')
      }
    }
    if (data.state === 'error') {
      ctx.setUserData()
      history.push('/sign/signin')
    }
  }, [data.state])

  const [resizeWidth, changeResizeWidth] = useState(215)
  const [isResize, changeIsResize] = useState(false)
  const [channelName, changeChannelName] = useState('')
  const [channelInfo, changeChannelInfo] = useState('')
  const [newMemberEmail, changeNewMemberEmail] = useState('')
  const [canCreateChannel, changeCanCreateChannel] = useState(false)
  const [canInviteNewMember, changeCanInviteNewMember] = useState(false)
  const [openAddChannelCard, changeOpenAddChannelCard] = useState(false)
  const [openHelpCard, changeOpenHelpCard] = useState(false)
  const [openInviteNewMemberCard, changeOpenInviteNewMemberCard] =
    useState(false)

  // const a = useFriendMessageRequest()
  // if (a != undefined) {
  //   a[1]({
  //     friend_id: '',
  //     user_id: '',
  //     messageType: 1,
  //     content: ''
  //   })
  // }

  if (ctx.userInfo?.friends) {
  }
  /* 打开帮助 */
  const openHelp = () => {
    changeOpenHelpCard(!openHelpCard)
  }
  const closeHelp = () => {
    changeOpenHelpCard(false)
  }
  /* 打开新建频道 */
  const openChannelCard = () => {
    changeOpenAddChannelCard(true)
  }
  /* 关闭新建频道 */
  const closeChannelCard = () => {
    changeOpenAddChannelCard(false)
    changeChannelName('')
    changeChannelInfo('')
  }

  /* 打开邀请新成员 */
  const openInviteNewMemberlCard = () => {
    changeOpenInviteNewMemberCard(true)
  }
  /* 关闭邀请新成员 */
  const closeInviteNewMemberlCard = () => {
    changeOpenInviteNewMemberCard(false)
    changeNewMemberEmail('')
  }

  /* 检测新建频道名称输入框 */
  useEffect(() => {
    // 检测频道输入框是否有值且无冲突的频道名称
    if (channelName.length) changeCanCreateChannel(true)
    else changeCanCreateChannel(false)
  }, [channelName])

  /* 检测新建频道info输入框 */
  useEffect(() => {
    // 检测频道输入框是否有值且无冲突的频道名称
    if (channelInfo.length) changeCanCreateChannel(true)
    else changeCanCreateChannel(false)
  }, [channelInfo])

  /* 添加新成员 */
  useEffect(() => {
    if (newMemberEmail.length) changeCanInviteNewMember(true)
    else changeCanInviteNewMember(false)
  }, [newMemberEmail])

  const confirmCreateChannelBtn = () => {
    console.log(channelName, channelInfo)
  }

  const confirmInviteNewMemberBtn = () => {
    console.log(newMemberEmail)
  }

  if (localStorage.getItem(localStorageItemName.ACCESS_TOKEN) === null) {
    history.push('/sign/signin')
    return null
  }
  if (ctx.user_id === undefined) return null
  return (
    <div
      className='index_container'
      onMouseMove={(evt) => {
        if (isResize) {
          changeResizeWidth(Math.min(Math.max(evt.pageX, 200), 500))
        }
      }}
      onMouseUp={(evt) => {
        changeIsResize(false)
      }}
      onMouseLeave={(evt) => {
        changeIsResize(false)
      }}
    >
      <SocketHubProvider>
        <Header openHelp={() => openHelp()} />
        <div
          className='index_workspace'
          style={{
            gridTemplateColumns: `${resizeWidth}px auto ${openHelpCard ? '340px' : ''}`,
            gridTemplateAreas: `workspace_aside workspace_chat ${openHelpCard ? 'help_container' : ''}`
          }}
        >
          {/* 左侧sidebar */}
          <Aside resizeWidth={resizeWidth} openChannelCard={() => openChannelCard()} openMemberCard={() => openInviteNewMemberlCard()} />
          {/* 滑块控制左侧大小 */}
          <div
            className='resize'
            style={{ left: resizeWidth - 5 }}
            onMouseDown={(evt) => {
              changeIsResize(true)
            }}
          >
            <input type='range' min={180} max={594} step={10} />
          </div>
          {/* 右侧聊天区域 */}

          {/* <Route path="/index/threads" component={Threads} /> */}
          <Chat />
          {/* 添加频道 */}
          <AddCard
            title='添加新频道'
            onClickEvent={closeChannelCard}
            width={520}
            style={{ display: openAddChannelCard ? 'flex' : 'none' }}
          >
            <div className='add_channel_content'>
              <div className='add_chennel_info'>
                频道是你的团队进行通信的地方。围绕主题进行组织时其效果最佳，例如#市场营销#。
              </div>
              <label htmlFor='create_channel_title_input'>
                <strong className='create_channel_title'>名称</strong>
                <span
                  className='create_channel_title_errow'
                  style={{
                    display: channelName.length ? 'none' : 'inline-block'
                  }}
                >
                  别忘了给你的频道命名。
                </span>
                <span
                  className='create_channel_title_errow'
                  style={{ display: 'none' }}
                >
                  该名称已被频道、用户名或用户组使用。
                </span>
              </label>
              <div
                id='create_channel_title_input'
                className='create_channel_title_input'
                style={{ marginTop: '8px', marginBottom: '20px' }}
              >
                <Input
                  value={channelName}
                  onChangeEvent={(e) => changeChannelName(e.target.value)}
                  placeholder='# 例如套餐预算'
                  width='100%'
                  height={44}
                  borderRadius={4}
                  fontSize={18}
                />
              </div>
              <label htmlFor='create_channel_title_input'>
                <strong className='create_channel_title'>描述</strong>
                <span className='create_channel_title_info'>(选填)</span>
              </label>
              <div
                id='create_channel_title_input'
                className='create_channel_title_input'
                style={{ marginTop: '8px', marginBottom: '160px' }}
              >
                <Input
                  value={channelInfo}
                  onChangeEvent={(e) => changeChannelInfo(e.target.value)}
                  placeholder='# 例如套餐预算'
                  width='100%'
                  height={44}
                  borderRadius={4}
                  fontSize={18}
                />
                <span className='create_channel_title_info_bottom'>
                  这个频道是关于哪方面的？
                </span>
              </div>
              <div className='create_channel_btn'>
                <Button
                  width={80}
                  height={36}
                  text='创建'
                  backgroundColor={canCreateChannel ? '#007a5a' : '#dddddd'}
                  color={canCreateChannel ? '#ffffff' : '#1d1c1dbf'}
                  fontSize={15}
                  fontWeight={900}
                  borderRadius={4}
                  onClickEvent={
                    canCreateChannel ? confirmCreateChannelBtn : () => { }
                  }
                />
              </div>
            </div>
          </AddCard>
          {/* 添加成员 */}
          <AddCard
            title='邀请人员加入 新工作区'
            onClickEvent={closeInviteNewMemberlCard}
            width={520}
            style={{ display: openInviteNewMemberCard ? 'flex' : 'none' }}
          >
            <div className='add_channel_content'>
              <label htmlFor='create_channel_title_input'>
                <strong className='create_channel_title'>至:</strong>
              </label>
              <div
                id='create_channel_title_input'
                className='create_channel_title_input'
                style={{ marginTop: '8px', marginBottom: '120px' }}
              >
                <Input
                  value={newMemberEmail}
                  onChangeEvent={(e) => changeNewMemberEmail(e.target.value)}
                  placeholder='name@gmail.com'
                  width='100%'
                  height={44}
                  borderRadius={4}
                  fontSize={18}
                />
              </div>
              <div className='create_channel_btn'>
                <Button
                  width={80}
                  height={36}
                  text='发送'
                  backgroundColor={canInviteNewMember ? '#007a5a' : '#dddddd'}
                  color={canInviteNewMember ? '#ffffff' : '#1d1c1dbf'}
                  fontSize={15}
                  fontWeight={900}
                  borderRadius={4}
                  onClickEvent={
                    canInviteNewMember ? confirmInviteNewMemberBtn : () => { }
                  }
                />
              </div>
            </div>
          </AddCard>
          {/* 帮助 */}
          <Help openStatus={openHelpCard} closeHelp={closeHelp} />
        </div>
      </SocketHubProvider>
    </div>
  )
}
