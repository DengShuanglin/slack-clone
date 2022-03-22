import React, { Children } from "react";
import './etMessage.css'

export interface IEtMessageProps {
    avatarUrl?: string
    userId: string
    userName?: string
    creatTime?: string
    repliesList?: []
}

const EtMessage:React.FC<IEtMessageProps> = (props) => {
    const { avatarUrl, userId, userName, creatTime, repliesList, children } = props

    return (
        <div className="message-container">
            <div className="left-group">
                <img src={avatarUrl} alt={userName} />
            </div>
            <div className="right-group">
                <div className="message-top-group">
                    <div className="name">{userName}</div>
                    <div className="creat-time">{creatTime}</div>
                </div>
                <div className="message-info">
                    {children}
                </div>
                <div className="message-buttom-group">
                    {/* 回复功能 */}
                </div>
            </div>
        </div>
    )
}

EtMessage.defaultProps = {
    avatarUrl: 'http://cdn.qiniu.shuyuanlab.cn/Image50px.png',
    creatTime: '6:49 PM'
}

export default EtMessage