import './Chat.css'
import { useState } from 'react'
import { Route } from 'react-router-dom'
import Threads from './Pages/Threads/Threads'
import ActivityPage from './Pages/ActivityPage/ActivityPage'
import NewMessage from './Pages/NewMessage/NewMessage'
import ChannelChat from './Pages/ChannelChat/ChannelChat'
import MemberChat from './Pages/MemberChat/MemberChat'

export default function Chat() {
  const [show, changeShow] = useState(false)
  return (
    <div className='main_chat_area'>
      <Route path='/index/threads' component={Threads} />
      <Route path='/index/activity-page' component={ActivityPage} />
      <Route path='/index/new-message' component={NewMessage} />
      {/* 进入频道动态路由 */}
      <Route path='/index/channelchat' component={ChannelChat} />
      <Route path='/index/memberchat' component={MemberChat} />
    </div>
  )
}
