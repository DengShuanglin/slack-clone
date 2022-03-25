import './Header.css'
import React, {useState} from 'react'
import Button from '../../../../../components/src/Button/Button'
import UserAvatar from '../../../../../components/src/UserAvatar/UserAvatar'
import EtPopover from '../../../../../components/src/EtPopover/etPopover'


export default function Header() {
  const [isShowAvatarPop, setShowAvatarPop] = useState(false)
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
        <div className='top_nav_search_btn'>
          <Button
            show_icon
            iconString='#icon-search'
            width='100%'
            color='#ffffff'
            backgroundColor='#00000000'
            height='100%'
            text='搜索 新工作区'
          />
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
        <div className='top_nav_right_avatar' onClick={() => {setShowAvatarPop(!isShowAvatarPop)}}>
          <UserAvatar
            avatarCallback={() => console.log('avatar')}
            status='online'
            avatarUrl='https://img1.baidu.com/it/u=3702625202,3169032464&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500'
            borderRadius={4}
            width={26}
            height={26}
          />
        </div>
        
        {/* head头像弹出框 */}
        <div className='top_nav_right_avatar_pop' style={{
            display: isShowAvatarPop ? 'block' : 'none',
            
          }}>
            <div className='top_nav_right_avatar_pop_box'>
              <div className='top_nav_right_avatar_pop_box_uerinfo'>
                <img id='avatar' src="https://img1.baidu.com/it/u=3702625202,3169032464&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500" alt="" />
                <div className='top_nav_right_avatar_pop_box_uerinfo_right'>
                  <div id='user_name'>{'wangyuyang0313'}</div>
                  <div id='status'>
                    <img src='http://cdn.qiniu.shuyuanlab.cn/6.png'/>
                    {'在线'}
                  </div>
                </div>
              </div>

              <div className='top_nav_right_avatar_pop_box_status'>
                <img src="http://cdn.qiniu.shuyuanlab.cn/8.png" alt="" />
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
              <div className='top_nav_right_avatar_pop_box_item'>
                {'首选项'}
              </div>
              <div className='divider'></div>
              <div className='top_nav_right_avatar_pop_box_item'>
                {'登出 新工作区'}
              </div>

            </div>
        </div>

      </div>
    </div>
  )
}
