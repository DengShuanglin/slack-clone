import React from 'react'
import './Dot.css'

import { StatusMap, dotProps } from './interface'

const status: StatusMap = {
  online: '#2BAC76',
  offline: '#39133E'
}

export class Dot extends React.Component<dotProps> {
  render() {
    const { type, left, right, top, bottom, width, height, borderRadius, backgroundColor } = this.props
    return (
      <div className='component_dot_container' style={{
        left,
        right,
        top,
        bottom,
        backgroundColor: type ? '#3F0F3F' : '',
        borderRadius
      }}>
        <div className='component_dot' style={{
          backgroundColor: backgroundColor ? backgroundColor : status[type],
          width,
          height,
          borderRadius,
          border: type == 'offline' ? '1px solid rgba(255, 255, 255, 0.7)' : ''
        }}></div>
      </div>
    )
  }
}


// const Dot: React.FC<dotProps> = ({ kind = 'online', ...rest }) => {
//   <div className='component_dot' style={{
//     backgroundColor: status[kind]
//   }} {...rest}>
//   </div>
// }

export default Dot
