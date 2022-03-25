import Item from 'antd/lib/list/Item'
import React, { useState } from 'react'
import './etDivider.css'
export interface IEtDividerProps {
  time?: string
  color?: string
  lineColor?: string
}

const EtDivider: React.FC<IEtDividerProps> = (props) => {
  const { time, color, lineColor } = props
  const [isShow, setShow] = useState(false)
  return (
    <>
      <div
        className='divider-container'
        onClick={() => {
          setShow(!isShow)
        }}
      >
        <div
          className='line'
          style={{ borderBottom: `1px solid ${lineColor}` }}
        ></div>
        <div className='divider-time' style={{ color: color }}>
          {time}
          <div style={{ height: '100%', marginLeft: '2px' }}>
            <img
              src='http://cdn.qiniu.shuyuanlab.cn/vector.png'
              style={{
                height: '10px',
                width: '10px',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              alt=''
            />
          </div>
        </div>
        <div
          className='line'
          style={{
            borderBottom: `1px solid ${lineColor}`
          }}
        ></div>
      </div>
      <div
        className='divider-pop'
        style={{
          display: isShow ? 'block' : 'none'
        }}
      >
        <div className='divider-pop-box'>
          <div className='divider-pop-title'>跳转至......</div>
          {['一小时', '三小时', '12个小时', '24小时', '3天', '7天'].map(
            (item, index) => {
              return (
                <div className='divider-pop-item' key={index}>
                  {item}
                </div>
              )
            }
          )}
        </div>
      </div>
    </>
  )
}

EtDivider.defaultProps = {
  time: '',
  color: '#1D1C1D',
  lineColor: '#DFDFDF'
}

export default EtDivider
