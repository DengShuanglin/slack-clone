import React, { ReactNode, useState} from "react";
import './etMessage.css'

export interface IEtMessageProps {
    avatarUrl?: string
    userId: string
    userName?: string
    creatTime?: string
    repliesList?: []
    children?: ReactNode
}

const EtMessage:React.FC<IEtMessageProps> = (props:IEtMessageProps) => {
    const { avatarUrl, userId, userName, creatTime, repliesList, children } = props
    const [ isMouseOn, setMouse ] = useState(false)
    return (
        <div className="message-container" onMouseOver={() =>  setMouse(true)} onMouseOut={() => setMouse(false) }>
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
                    <div className="message-buttom-reply">
                        {"shuyuan,xiaoming,lihua"}
                    </div>
                    <div className="message-buttom-count">{"3 replies!"}</div>
                </div>
            </div>
            <div className="tool-group" style={{
                display: isMouseOn ? 'block' : 'none'
            }}>
                <div className="tool-group-box">
                    <img src="http://cdn.qiniu.shuyuanlab.cn/3.png" alt="" />
                    <img src="http://cdn.qiniu.shuyuanlab.cn/2.png" alt="" />
                    <img src="http://cdn.qiniu.shuyuanlab.cn/4.png" alt="" />
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