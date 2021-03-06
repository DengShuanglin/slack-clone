import './Header.css'
import React, { useContext, useEffect, useState } from 'react'
import Button from '../../../../../components/src/Button/Button'
import Input from '../../../../../components/src/Input/Input'
import UserAvatar from '../../../../../components/src/UserAvatar/UserAvatar'
import EtPopover from '../../../../../components/src/EtPopover/etPopover'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../../store'
import useRequest from '../../../utils/request/hooks'
import {
  getUserInfoRequest,
  searchUserRequest,
  updateUserInfoRequest
} from '../../../api/userRequest'
import {
  useAddFriendRequest,
  useConfirmFriendRequest
} from '../../../api/socketRequest'
import manualFactory from '../../../utils/socketHub/hooks'

export default function Header(props: any) {
  const { openHelp } = props
  const history = useHistory()
  const [_, set_] = useState(0)
  const ctx = useContext(UserContext)
  const [updateUserInfo, setUpdateUserInfo] = useState<{
    nickname: string
    avatar: string
  }>({
    nickname: ctx.userInfo?.nickname || '',
    avatar: ctx.userInfo?.avatar || ''
  })
  const [updateUserInfoResult, getUpdateUserInfoResult] = useRequest(
    updateUserInfoRequest
  )
  useEffect(() => {
    if (updateUserInfoResult.state === 'finish') {
      getUserInfoRequest().then((res) => {
        ctx.setUserData(res.data.result)
      })
    }
  }, [updateUserInfoResult])
  const __ = useAddFriendRequest()
  const ___ = useConfirmFriendRequest()
  const [searchResult, getSearchResult] = useRequest(searchUserRequest)
  const [searchParams, setSearchParams] = useState({
    email: ''
  })
  const [isShowAvatarPop, setShowAvatarPop] = useState(false)
  const [isShowSearchPop, setShowSearchPop] = useState(false)
  const [isShowFriendRequestPop, setShowFriendRequestPop] = useState(false)
  const [isShowChangInfoPop, setShowChangeInfoPop] = useState(false)

  useEffect(() => {
    if (searchParams.email.trim().length > 0) {
      getSearchResult(searchParams)
    }
  }, [searchParams])
  useEffect(() => {
    ctx.addRefreshCallback('Header', () => {
      set_((e) => e + 1)
    })
  }, [])

  console.log(__)
  const [addFriendData, toAddFriend] = __ ? __ : [{}, () => { }]
  const [confirmFriendData, toConfirmFriend] = ___ ? ___ : [{}, () => { }]

  useEffect(() => {
    if (addFriendData.status === 'finish') {
      getUserInfoRequest().then((res) => {
        ctx.setUserData(res.data.result)
      })
    }
  }, [addFriendData])
  useEffect(() => {
    if (confirmFriendData.status === 'finish') {
      getUserInfoRequest().then((res) => {
        ctx.setUserData(res.data.result)
      })
    }
  }, [confirmFriendData])

  // const toAddFriend = () => {}
  const data = [
    { imgUrl: 'http://cdn.qiniu.shuyuanlab.cn/Frame.png', text: 'theme' },
    { imgUrl: 'http://cdn.qiniu.shuyuanlab.cn/Frame.png', text: 'cscs' },
    { imgUrl: 'http://cdn.qiniu.shuyuanlab.cn/Frame.png', text: '??????' },
    { imgUrl: 'http://cdn.qiniu.shuyuanlab.cn/Frame.png', text: '??????' }
  ]
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <div className='index_top_nav'>
      <div className='top_nav_sidebar'>
        <div className='top_nav_sidebar_btn'>
          <EtPopover content={data} title='??????' trigger='click'>
            <Button
              show_icon
              iconString='#icon-shijian'
              iconWidth={20}
              iconHeight={20}
              borderRadius='50%'
              backgroundColor='#00000000'
            />
          </EtPopover>
        </div>
      </div>
      <div className='top_nav_search_container'>
        <div
          className='top_nav_search_btn'
          onClick={() => {
            setShowSearchPop(!isShowSearchPop)
          }}
        >
          <Button
            show_icon
            iconString='#icon-search'
            width='100%'
            color='#ffffff'
            backgroundColor='#00000000'
            height='100%'
            fontSize={'16px'}
            text='??????'
          />
        </div>
        {/* ??????????????? */}
        <div
          className='search_pop'
          style={{
            display: isShowSearchPop ? 'block' : 'none'
          }}
        >
          {/* ????????? */}
          <div className='search_pop_box'>
            <img
              id='search_icon'
              src='http://cdn.qiniu.shuyuanlab.cn/search.png'
            />
            <input
              type='text'
              placeholder='??????'
              value={searchParams.email}
              onChange={(e) => {
                setSearchParams({
                  email: e.target.value
                })
              }}
            />
            <img
              id='cancel_icon'
              src='http://cdn.qiniu.shuyuanlab.cn/chahca.png'
              onClick={() => {
                setShowSearchPop(false)
              }}
            />
          </div>
          <div className='divider'></div>
          {/* ????????????????????? */}
          {!searchResult?.data?.result && (
            <div className='search_result_empt'>
              <div className=''>
                <b>{'???????????????'}</b>
              </div>
            </div>
          )}
          {/* ?????????????????? */}
          {searchResult?.data?.result && (
            <div className='search_result_box'>
              {searchResult.data.result.map((value) => {
                return (
                  <div
                    key={value.id}
                    style={{
                      padding: '2px 6px 7px 10px',
                      display: 'flex',
                      flexWrap: 'nowrap',
                      alignContent: 'center',
                      justifyContent: 'flex - start',
                      alignItems: 'center'
                    }}
                  >
                    <UserAvatar
                      status='offline'
                      avatarUrl={value.avatar || ''}
                      borderRadius={4}
                      width={26}
                      height={26}
                    />
                    <span style={{ padding: '0 16px' }}>{value.nickname}</span>

                    <div
                      style={{
                        flex: 'auto',
                        textAlign: 'right'
                      }}
                    >
                      <div className='add_new_friend_btn'>
                        <Button
                          borderRadius={4}
                          onClickEvent={(e) => {
                            toAddFriend({
                              user_id: ctx.user_id || '',
                              friend_id: String(value.id)
                            })
                          }}
                          text={'???????????????'}
                          fontSize={14}
                          backgroundColor='#00000000'
                          color='#ffffff'
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          {
            //@ts-ignore
            (!searchResult?.data?.result ||
              (searchResult?.data?.result?.length || 0) === 0) && (
              <div
                style={{
                  padding: '2px 6px 7px 10px',
                  display: 'flex',
                  flexWrap: 'nowrap',
                  alignContent: 'center',
                  justifyContent: 'flex - start',
                  alignItems: 'center'
                }}
              >
                ?????????????????????
              </div>
            )
          }
        </div>
      </div>
      <div className='top_nav_right'>
        <div className='top_nav_right_help'>
          <Button
            onClickEvent={() => openHelp()}
            show_icon
            iconString='#icon-kongxinwenhao'
            iconWidth={20}
            iconHeight={20}
            borderRadius='50%'
            backgroundColor='#00000000'
          />
        </div>
        <div
          className='top_nav_right_avatar'
          onClick={() => {
            setShowAvatarPop(!isShowAvatarPop)
          }}
        >
          <UserAvatar
            avatarCallback={() => console.log('avatar')}
            status='online'
            avatarUrl={ctx.userInfo?.avatar || ''}
            borderRadius={4}
            width={26}
            height={26}
          />
        </div>

        {/* head??????????????? */}
        <div
          className='top_nav_right_avatar_pop'
          style={{
            display: isShowAvatarPop ? 'block' : 'none'
          }}
        >
          <div className='top_nav_right_avatar_pop_box'>
            <div className='top_nav_right_avatar_pop_box_uerinfo'>
              <img id='avatar' src={ctx.userInfo?.avatar} alt='' />
              <div className='top_nav_right_avatar_pop_box_uerinfo_right'>
                <div id='user_name'>{ctx.userInfo?.nickname || ''}</div>
                <div id='status'>
                  <img src='http://cdn.qiniu.shuyuanlab.cn/6.png' />
                  {'??????'}
                </div>
              </div>
            </div>

            <div className='top_nav_right_avatar_pop_box_status'>
              <img src='http://cdn.qiniu.shuyuanlab.cn/8.png' alt='' />
              {/* <img src="http://cdn.qiniu.shuyuanlab.cn/9.png" alt="" /> */}
              {'??????????????????'}
            </div>
            <div className='top_nav_right_avatar_pop_box_item'>
              {'????????? '}
              <b>{'??????'}</b>
            </div>
            <div className='top_nav_right_avatar_pop_box_item'>
              {'????????????'}
            </div>
            <div className='divider'></div>
            <div
              className='top_nav_right_avatar_pop_box_item'
              onClick={() => {
                setShowChangeInfoPop(!isShowChangInfoPop)
                setShowAvatarPop(false)
              }}
            >
              {'??????????????????'}
            </div>
            {/*<div className='top_nav_right_avatar_pop_box_item'>{'?????????'}</div>*/}
            <div
              className='top_nav_right_avatar_pop_box_item'
              onClick={() => {
                setShowFriendRequestPop(!isShowFriendRequestPop)
                console.log(isShowFriendRequestPop)
                setShowAvatarPop(false)
              }}
            >
              {'????????????'}
            </div>
            <div className='divider'></div>
            <div
              className='top_nav_right_avatar_pop_box_item'
              onClick={() => {
                localStorage.clear()
                history.push('/sign/signin')
              }}
            >
              {'??????'}
            </div>
          </div>
        </div>
        {/* ????????????????????? */}
        <div className='friend_card_container' style={{
          display: isShowFriendRequestPop ? 'flex' : 'none'
        }}>
          <div className='firend_reqest_pop_box'>
            <div className='firend_reqest_pop_box_title firend_reqest_pop_box_item'>
              {'????????????'}
              <img
                className='firend_reqest_pop_box_title_cancle'
                src='http://cdn.qiniu.shuyuanlab.cn/chahca.png'
                onClick={() => {
                  setShowFriendRequestPop(false)
                }}
              />
            </div>
            {/* ?????????????????? */}
            {[].map(() => {
              toConfirmFriend
              return (
                <div className='firend_reqest_pop_box_item'>
                  <div className='firend_reqest_pop_box_left'>
                    <UserAvatar
                      status='offline'
                      avatarUrl='http://cdn.qiniu.shuyuanlab.cn/avatar.png'
                      borderRadius={4}
                      width={26}
                      height={26}
                    />
                    <div className='firend_reqest_pop_box_name'>{'mingzi'}</div>
                  </div>
                  <div className='firend_reqest_pop_box_right firend_reqest_pop_bg'>
                    <a
                      onClick={() => {
                        toConfirmFriend({
                          user_id: ctx.user_id || '',
                          friend_id: ''
                        })
                      }}
                    >
                      {'??????'}
                    </a>
                  </div>
                </div>
              )
            })}

            <div className='firend_reqest_pop_box_item'>
              <div className='firend_reqest_pop_box_left'>
                <UserAvatar
                  status='offline'
                  avatarUrl='http://cdn.qiniu.shuyuanlab.cn/avatar.png'
                  borderRadius={4}
                  width={26}
                  height={26}
                />
                <div className='firend_reqest_pop_box_name'>{'mingzi'}</div>
              </div>
              <div className='firend_reqest_pop_box_right firend_reqest_pop_bg'>{'?????????'}</div>
            </div>

            <div className='firend_reqest_pop_box_item'>
              <div className='firend_reqest_pop_box_left'>
                <UserAvatar
                  status='offline'
                  avatarUrl='http://cdn.qiniu.shuyuanlab.cn/avatar.png'
                  borderRadius={4}
                  width={26}
                  height={26}
                />
                <div className='firend_reqest_pop_box_name'>{'mingzi'}</div>
              </div>
              <div className='firend_reqest_pop_box_right firend_reqest_pop_bg'>{'?????????'}</div>
            </div>
          </div>
        </div>

        {/* ??????????????????????????? */}
        <div className='friend_card_container' style={{
          display: isShowChangInfoPop ? 'flex' : 'none'
        }}>
          <div className='changinfo_pop_box'>
            <div className='firend_reqest_pop_box_title firend_reqest_pop_box_item'>
              {'????????????????????????'}
              <img
                className='firend_reqest_pop_box_title_cancle'
                src='http://cdn.qiniu.shuyuanlab.cn/chahca.png'
                onClick={() => {
                  setShowChangeInfoPop(false)
                }}
              />
            </div>
            {/* ?????????????????? */}
            <div className='firend_reqest_pop_box_item'>
              <div className='firend_reqest_pop_box_left'>{'??????'}</div>
              <div className='firend_reqest_pop_box_right'>
                <Input borderRadius={4} width='100%' height={30} value={updateUserInfo.nickname} onChangeEvent={(e) => {
                  setUpdateUserInfo((data) => {
                    return {
                      ...data,
                      nickname: e.target.value
                    }
                  })
                }} />
                {/* <input
                  className='change_info_input'
                  type='text'
                  value={updateUserInfo.nickname}
                  onChange={(e) => {
                    setUpdateUserInfo((data) => {
                      return {
                        ...data,
                        nickname: e.target.value
                      }
                    })
                  }}
                /> */}
              </div>
            </div>

            <div className='firend_reqest_pop_box_item'>
              <div className='firend_reqest_pop_box_left'>{'????????????'}</div>
              <div className='firend_reqest_pop_box_right'>
                <Input borderRadius={4} width='100%' height={30} value={updateUserInfo.avatar} onChangeEvent={(e) => {
                  setUpdateUserInfo((data) => {
                    return {
                      ...data,
                      avatar: e.target.value
                    }
                  })
                }} />
                {/* <input
                  className='change_info_input'
                  type='text'
                  value={updateUserInfo.avatar}
                  onChange={(e) => {
                    setUpdateUserInfo((data) => {
                      return {
                        ...data,
                        avatar: e.target.value
                      }
                    })
                  }}
                /> */}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'right',
                marginRight: '40px',
                textAlign: 'center'
              }}
            >
              <button
                className='btn confirm_info_btn'
                onClick={() => {
                  setShowChangeInfoPop(false)
                  getUpdateUserInfoResult(updateUserInfo)
                }}
              >
                ??????
              </button>
              <button
                className='btn cancel_info_btn'
                onClick={() => {
                  setShowChangeInfoPop(false)
                  setUpdateUserInfo({
                    avatar: ctx.userInfo?.avatar || '',
                    nickname: ctx.userInfo?.nickname || ''
                  })
                }}
              >
                ??????
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
