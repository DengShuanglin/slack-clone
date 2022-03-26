import './Header.css'
import React, { useContext, useEffect, useState } from 'react'
import Button from '../../../../../components/src/Button/Button'
import UserAvatar from '../../../../../components/src/UserAvatar/UserAvatar'
import EtPopover from '../../../../../components/src/EtPopover/etPopover'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../../store'
import useRequest from '../../../utils/request/hooks'
import { searchUserRequest } from '../../../api/userRequest'
import { useAddFriendRequest } from '../../../api/socketRequest'

export default function Header() {
  const history = useHistory()
  const ctx = useContext(UserContext)
  // const __ =useAddFriendRequest();
  const [searchResult, getSearchResult] = useRequest(searchUserRequest)
  const [searchParams, setSearchParams] = useState({
    email: ''
  })
  const [isShowAvatarPop, setShowAvatarPop] = useState(false)
  const [isShowSearchPop, setShowSearchPop] = useState(false)
  const [isShowFirendReqestPop, setShowFirendRequestPop] = useState(false)

  useEffect(() => {
    if (searchParams.email.trim().length > 0) {
      getSearchResult(searchParams)
    }
  }, [searchParams])

  // const [addFriendData,toAddFriend] = __?__:[{},()=>{}];
  const toAddFriend = () => {}
  const data = [
    { imgUrl: 'http://cdn.qiniu.shuyuanlab.cn/Frame.png', text: 'theme' },
    { imgUrl: 'http://cdn.qiniu.shuyuanlab.cn/Frame.png', text: 'cscs' },
    { imgUrl: 'http://cdn.qiniu.shuyuanlab.cn/Frame.png', text: '全体' },
    { imgUrl: 'http://cdn.qiniu.shuyuanlab.cn/Frame.png', text: '随机' }
  ]
  return (
    <div className='index_top_nav'>
      <div className='top_nav_sidebar'>
        <div className='top_nav_sidebar_btn'>
          <EtPopover content={data} title='最近' trigger='click'>
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
            text='搜索'
          />
        </div>
        {/* 搜索弹出框 */}
        <div
          className='search_pop'
          style={{
            display: isShowSearchPop ? 'block' : 'none'
          }}
        >
          {/* 搜索框 */}
          <div className='search_pop_box'>
            <img
              id='search_icon'
              src='http://cdn.qiniu.shuyuanlab.cn/search.png'
            />
            <input
              type='text'
              placeholder='搜索'
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
          {/* 无搜索结果占位 */}
          {!searchResult?.data?.result && (
            <div className='search_result_empt'>
              <div className=''>
                <b>{'搜索联系人'}</b>
              </div>
            </div>
          )}
          {/* 搜索结果列表 */}
          {searchResult?.data?.result && (
            <div className='search_result_box'>
              {searchResult.data.result.map((value) => {
                return (
                  <div
                    style={{
                      padding: '2px 6px',
                      display: 'flex',
                      'flex-wrap': 'nowrap',
                      'align-content': 'center',
                      'justify-content': 'flex - start',
                      'align-items': 'center'
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
                      <Button
                        borderRadius='50%'
                        onClickEvent={(e) => {
                          toAddFriend({
                            user_id: ctx.user_id || '',
                            friend_id: value.id
                          })
                        }}
                        text={'添加为好友'}
                        fontSize={'16px'}
                        backgroundColor='#00000000'
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
      <div className='top_nav_right'>
        <div className='top_nav_right_help'>
          <Button
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

        {/* head头像弹出框 */}
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
                <div id='user_name'>{'wangyuyang0313'}</div>
                <div id='status'>
                  <img src='http://cdn.qiniu.shuyuanlab.cn/6.png' />
                  {'在线'}
                </div>
              </div>
            </div>

            <div className='top_nav_right_avatar_pop_box_status'>
              <img src='http://cdn.qiniu.shuyuanlab.cn/8.png' alt='' />
              {/* <img src="http://cdn.qiniu.shuyuanlab.cn/9.png" alt="" /> */}
              {'更新你的状态'}
            </div>
            <div className='top_nav_right_avatar_pop_box_item'>
              {'设置为 '}
              <b>{'离线'}</b>
            </div>
            <div className='top_nav_right_avatar_pop_box_item'>
              {'暂停通知'}
            </div>
            <div className='divider'></div>
            <div className='top_nav_right_avatar_pop_box_item'>
              {'个人档案'}
            </div>
            <div className='top_nav_right_avatar_pop_box_item'>{'首选项'}</div>
            <div
              className='top_nav_right_avatar_pop_box_item'
              onClick={() => {
                setShowFirendRequestPop(!isShowFirendReqestPop)
                console.log(isShowFirendReqestPop)
                setShowAvatarPop(false)
              }}
            >
              {'好友申请'}
            </div>
            <div className='divider'></div>
            <div
              className='top_nav_right_avatar_pop_box_item'
              onClick={() => {
                localStorage.clear()
                history.push('/sign/signin')
              }}
            >
              {'登出'}
            </div>
          </div>
        </div>
        {/* 好友申请弹出框 */}
        <div
          className='firend_reqest_pop_box'
          style={{
            display: isShowFirendReqestPop ? 'flex' : 'none'
          }}
        >
          <div className='firend_reqest_pop_box_title firend_reqest_pop_box_item'>
            {'好友申请:'}
            <img
              className='firend_reqest_pop_box_title_cancle'
              src='http://cdn.qiniu.shuyuanlab.cn/chahca.png'
              onClick={() => {
                setShowFirendRequestPop(false)
              }}
            />
          </div>
          {/* 好友申请信息 */}
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
            <div className='firend_reqest_pop_box_right'>
              <a>{'同意'}</a>
              &nbsp;&nbsp;
              <a>{'拒绝'}</a>
            </div>
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
            <div className='firend_reqest_pop_box_right'>{'已同意'}</div>
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
            <div className='firend_reqest_pop_box_right'>{'已拒绝'}</div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
