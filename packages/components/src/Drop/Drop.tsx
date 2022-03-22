import React from 'react'
import './Drop.css'

import { dropProps } from './interface'

export class Drop extends React.Component<dropProps> {
  state = {
    show_drop_content: true
  }
  render() {
    const { backgroundColor, color, fontSize, width, title } = this.props
    return (
      <div className='component_drop_container' style={{
        backgroundColor: backgroundColor,
        color: color,
        fontSize: fontSize,
        width: width,
      }}>
        <div className='component_drop_header'>
          <span className='component_drop_header_icon' style={{
            marginRight: '4px'
          }} onClick={() => {
            this.setState({
              show_drop_content: !this.state.show_drop_content
            })
          }}>
            <svg className="icon drop_arrow" aria-hidden="true">
              <use xlinkHref="#icon-arrow-down-filling"></use>
            </svg>
          </span>
          <span className='component_drop_title' style={{ flex: 1 }} onClick={() => {
            this.setState({
              show_drop_content: !this.state.show_drop_content
            })
          }}>{title ? title : '标题'}</span>
          <span className='component_drop_header_icon component_drop_plus'>
            <svg className="icon drop_icon" aria-hidden="true">
              <use xlinkHref="#icon-shenglvehao_v"></use>
            </svg>
          </span>
          <span className='component_drop_header_icon component_drop_plus'>
            <svg className="icon drop_icon" aria-hidden="true">
              <use xlinkHref="#icon-plus"></use>
            </svg>
          </span>
        </div>
        <div className="component_drop_content">
          {[1, 2, 3].map(_ => {
            return <div className='component_drop_content_item'>
              <div className='component_drop_content_icon'>
                <img className='drop_img' src="https://img1.baidu.com/it/u=3702625202,3169032464&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500" alt="" />
              </div>
              <div className='component_drop_content_text'>文字内容
              </div>
            </div>
          })}
        </div>
      </div>
    )
  }
}

export default Drop
