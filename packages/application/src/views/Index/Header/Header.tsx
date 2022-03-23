import './Header.css'
import Button from "../../../../../components/src/Button/Button"
import UserAvatar from "../../../../../components/src/UserAvatar/UserAvatar"

export default function Header() {
  return (
    <div className="index_top_nav">
      <div className="top_nav_sidebar">
        <div className='top_nav_sidebar_btn'>
          <Button show_icon iconString='#icon-shijian' iconWidth={20} iconHeight={20} borderRadius="50%" backgroundColor='#00000000' />
        </div>
      </div>
      <div className="top_nav_search_container">
        <div className='top_nav_search_btn'>
          <Button show_icon iconString='#icon-search' width='100%' color='#ffffff' backgroundColor='#00000000' height='100%' text='搜索 新工作区' />
        </div>
      </div>
      <div className="top_nav_right">
        <div className='top_nav_right_help'>
          <Button show_icon iconString='#icon-kongxinwenhao' iconWidth={20} iconHeight={20} borderRadius="50%" backgroundColor='#00000000' />
        </div>
        <UserAvatar
          avatarCallback={() => console.log('avatar')}
          status='online'
          avatarUrl='https://img1.baidu.com/it/u=3702625202,3169032464&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500'
          borderRadius={4}
          width={26}
          height={26} />
      </div>
    </div>
  )
}
