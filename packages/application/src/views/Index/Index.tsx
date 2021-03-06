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
  /* ???????????? */
  const openHelp = () => {
    changeOpenHelpCard(!openHelpCard)
  }
  const closeHelp = () => {
    changeOpenHelpCard(false)
  }
  /* ?????????????????? */
  const openChannelCard = () => {
    changeOpenAddChannelCard(true)
  }
  /* ?????????????????? */
  const closeChannelCard = () => {
    changeOpenAddChannelCard(false)
    changeChannelName('')
    changeChannelInfo('')
  }

  /* ????????????????????? */
  const openInviteNewMemberlCard = () => {
    changeOpenInviteNewMemberCard(true)
  }
  /* ????????????????????? */
  const closeInviteNewMemberlCard = () => {
    changeOpenInviteNewMemberCard(false)
    changeNewMemberEmail('')
  }

  /* ????????????????????????????????? */
  useEffect(() => {
    // ????????????????????????????????????????????????????????????
    if (channelName.length) changeCanCreateChannel(true)
    else changeCanCreateChannel(false)
  }, [channelName])

  /* ??????????????????info????????? */
  useEffect(() => {
    // ????????????????????????????????????????????????????????????
    if (channelInfo.length) changeCanCreateChannel(true)
    else changeCanCreateChannel(false)
  }, [channelInfo])

  /* ??????????????? */
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
          {/* ??????sidebar */}
          <Aside resizeWidth={resizeWidth} openChannelCard={() => openChannelCard()} openMemberCard={() => openInviteNewMemberlCard()} />
          {/* ???????????????????????? */}
          <div
            className='resize'
            style={{ left: resizeWidth - 5 }}
            onMouseDown={(evt) => {
              changeIsResize(true)
            }}
          >
            <input type='range' min={180} max={594} step={10} />
          </div>
          {/* ?????????????????? */}

          {/* <Route path="/index/threads" component={Threads} /> */}
          <Chat />
          {/* ???????????? */}
          <AddCard
            title='???????????????'
            onClickEvent={closeChannelCard}
            width={520}
            style={{ display: openAddChannelCard ? 'flex' : 'none' }}
          >
            <div className='add_channel_content'>
              <div className='add_chennel_info'>
                ????????????????????????????????????????????????????????????????????????????????????????????????#????????????#???
              </div>
              <label htmlFor='create_channel_title_input'>
                <strong className='create_channel_title'>??????</strong>
                <span
                  className='create_channel_title_errow'
                  style={{
                    display: channelName.length ? 'none' : 'inline-block'
                  }}
                >
                  ?????????????????????????????????
                </span>
                <span
                  className='create_channel_title_errow'
                  style={{ display: 'none' }}
                >
                  ??????????????????????????????????????????????????????
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
                  placeholder='# ??????????????????'
                  width='100%'
                  height={44}
                  borderRadius={4}
                  fontSize={18}
                />
              </div>
              <label htmlFor='create_channel_title_input'>
                <strong className='create_channel_title'>??????</strong>
                <span className='create_channel_title_info'>(??????)</span>
              </label>
              <div
                id='create_channel_title_input'
                className='create_channel_title_input'
                style={{ marginTop: '8px', marginBottom: '160px' }}
              >
                <Input
                  value={channelInfo}
                  onChangeEvent={(e) => changeChannelInfo(e.target.value)}
                  placeholder='# ??????????????????'
                  width='100%'
                  height={44}
                  borderRadius={4}
                  fontSize={18}
                />
                <span className='create_channel_title_info_bottom'>
                  ????????????????????????????????????
                </span>
              </div>
              <div className='create_channel_btn'>
                <Button
                  width={80}
                  height={36}
                  text='??????'
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
          {/* ???????????? */}
          <AddCard
            title='?????????????????? ????????????'
            onClickEvent={closeInviteNewMemberlCard}
            width={520}
            style={{ display: openInviteNewMemberCard ? 'flex' : 'none' }}
          >
            <div className='add_channel_content'>
              <label htmlFor='create_channel_title_input'>
                <strong className='create_channel_title'>???:</strong>
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
                  text='??????'
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
          {/* ?????? */}
          <Help openStatus={openHelpCard} closeHelp={closeHelp} />
        </div>
      </SocketHubProvider>
    </div>
  )
}
