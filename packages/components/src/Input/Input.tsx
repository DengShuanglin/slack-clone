import React from 'react'
import './Input.css'
import { inputProps } from './interface'


export class Input extends React.Component<inputProps> {
  state = {
    isFocus: false
  }

  render() {
    const { value, maxLength, type, placeholder, disabled, width, height, borderRadius, showIcon, fontSize } = this.props
    return (
      <div className={this.state.isFocus ? 'component_input_container component_input_focus' : 'component_input_container'} style={{ borderRadius: borderRadius }}>
        {
          showIcon ? <svg className="icon input_icon" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg> : ''
        }
        <input
          maxLength={maxLength}
          style={{ height: height, width: width, fontSize: fontSize }}
          className='component_input'
          onChange={(evt) => {
            if (this.props.onChangeEvent) this.props.onChangeEvent(evt.target.value)
          }}
          onFocus={() => {
            this.setState({
              isFocus: true
            })
          }}
          onBlur={() => {
            this.setState({
              isFocus: false
            })
          }}
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          value={value} />
      </div>
    )
  }
}

export default Input




// export default function Input() {
//   const [isFocus, setIsFocus] = useState(false)
//   const { value, type, placeholder, disabled, width, height, borderRadius } = this.props
//   return (
//     <div className={this.state.isFocus ? 'component_input_container component_input_focus' : 'component_input_container'} style={{ borderRadius: borderRadius }}>
//       <svg className="icon input_icon" aria-hidden="true">
//         <use xlinkHref="#icon-search"></use>
//       </svg>
//       <input
//         style={{ height: height, width: width }}
//         className='component_input'
//         onChange={(evt) => {
//           if (this.props.onChangeEvent) this.props.onChangeEvent(evt.target.value)
//         }}
//         onFocus={() => {
//           this.setState({
//             isFocus: true
//           })
//         }}
//         onBlur={() => {
//           this.setState({
//             isFocus: false
//           })
//         }}
//         disabled={disabled}
//         type={type}
//         placeholder={placeholder}
//         value={value} />
//     </div>
//   )
// }
