import React, {Children, ReactNode, useState} from "react";
import './etPopover.css'

export interface IContentProps {
    imgUrl: string
    text: string
}

export interface IEtPopoverProps {
    trigger?: 'hover' | 'click'
    title?: string
    content?: Array<IContentProps>
    placement?: 'bottom' | 'left' | 'right' | 'top'
    style?: React.CSSProperties
}

const EtPopover:React.FC<IEtPopoverProps> = (props) => {
    const { trigger, title, content, placement, style, children } = props
    const contentList  = content as Array<IContentProps>

    // 设置默认over状态
    const [ isMouseOn, setMouse ] = useState(false)
   
    const popItemOnClick = (index:number) => {
        console.log(index)
    }

    return (
        <div className="container-container" style={style} onMouseOver={() => trigger === 'hover' ? setMouse(true) : {}} onMouseOut={() => trigger === 'hover' ? setMouse(false) : {}}>
            <div className="children-group"  onClick={() => setMouse(!isMouseOn)} >
                {children} 
            </div>
            { 
               <div className="popover-content" style={{
                   display: isMouseOn ? 'block' : 'none'
               }}>
                    <div className="popover-title">{title}</div>
                    {
                    contentList.map((item: any, index: number) => 
                         <div className="popover-content-item" key={index} onClick={() => popItemOnClick(index)}>
                                    <img src="http://cdn.qiniu.shuyuanlab.cn/Frame.png"/>
                                    {/* <img src={item.imgUrl}/> */}
                                    {item}          
                            </div>
                        )
                    }  
               </div>    
            }
        </div>
    )
}

EtPopover.defaultProps = {
    trigger: 'click'
}

export default EtPopover