import React from 'react'
import './UserAvatar.css'
import { userAvatarProps, userStatusMap } from './interface'

const statusList: userStatusMap = {
  online: '#2BAC76',
  offline: '#999999'
}

export default class UserAvatar extends React.Component<userAvatarProps> {
  render() {
    const { width, height, borderRadius, status, avatarUrl, avatarCallback } = this.props
    return (
      <div className='component_user_avatar' onClick={(evt) => {
        if (avatarCallback) avatarCallback(evt)
      }}>
        <img style={{ width: width, height: height, borderRadius: borderRadius }} className='user_avatar_img' src={avatarUrl} alt="" />
        <i className='user_status_stroke'></i>
        <i className='user_status' style={{
          backgroundColor: statusList[status]
        }}></i>
      </div>
    )
  }
}

