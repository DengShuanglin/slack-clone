import React from 'react'
import './Drop.css'

import { dropProps } from './interface'

export class Drop extends React.Component<dropProps> {
  state = {
    is_arrow_down: false
  }
  render() {
    const { backgroundColor, color, fontSize, width, title, arrowCallback, ellipsisCallback, plusCallback } = this.props
    return (
      <div className='component_drop_container' style={{
        backgroundColor: backgroundColor,
        color: color,
        fontSize: fontSize,
        width: width,
      }}>
        <div className='component_drop_header'>
          <span className='component_drop_header_icon' style={{ marginRight: '4px' }} onClick={(evt) => {
            if (arrowCallback) arrowCallback(evt)
            this.setState({ is_arrow_down: !this.state.is_arrow_down })
          }}>
            <svg className={this.state.is_arrow_down ? 'icon drop_arrow arrow_down' : 'icon drop_arrow'} aria-hidden="true">
              <use xlinkHref="#icon-arrow-down-filling"></use>
            </svg>
          </span>
          <span className='component_drop_title' style={{ flex: 1 }} onClick={(evt) => {
            if (arrowCallback) arrowCallback(evt)
            this.setState({ is_arrow_down: !this.state.is_arrow_down })
          }}>{title ? title : '标题'}</span>
          <span className='component_drop_header_icon component_drop_plus' onClick={(evt) => {
            if (ellipsisCallback) ellipsisCallback(evt)
          }}>
            <svg className="icon drop_icon" aria-hidden="true">
              <use xlinkHref="#icon-shenglvehao_v"></use>
            </svg>
          </span>
          <span className='component_drop_header_icon component_drop_plus' onClick={(evt) => {
            if (plusCallback) plusCallback(evt)
          }}>
            <svg className="icon drop_icon" aria-hidden="true">
              <use xlinkHref="#icon-plus"></use>
            </svg>
          </span>
        </div>
<<<<<<< Updated upstream:packages/components/src/Drop/Drop.tsx
        <div className="component_drop_content">
          {[1, 2, 3].map(_ => {
            return <div className='component_drop_content_item'>
              <div className='component_drop_content_icon'>
                <img className='drop_img' src="https://img1.baidu.com/it/u=3702625202,3169032464&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500" alt="" />
=======
        {/* <div className="component_drop_content">
          {
            list.map((item: any, index: number) =>
              <div className='component_drop_content_item' key={index} onClick={(index) => {
                console.log(index)
              }}>
                <div className='component_drop_content_icon'>
                  <img className='drop_img' src="https://img1.baidu.com/it/u=3702625202,3169032464&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500" alt="" />
                </div>
                <div className='component_drop_content_text'>{item}
                </div>
>>>>>>> Stashed changes:packages/components/Drop/Drop.tsx
              </div>
            )
          }
        </div> */}
      </div>
    )
  }
}

export default Drop
