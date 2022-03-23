import React from 'react'
import './Button.css'
import { buttonProps } from './interface'

class Button extends React.Component<buttonProps> {
  render() {
    const {
      text,
      show_icon,
      backgroundColor,
      disabled,
      width,
      height,
      color,
      borderRadius,
      fontSize,
      fontWeight,
      onClickEvent,
      iconString,
      iconWidth,
      iconHeight,
      iconColor
    } = this.props
    return (
      <button
        className='component_button'
        disabled={disabled}
        onClick={(evt) => { if (onClickEvent) onClickEvent(evt) }}
        style={{
          cursor: disabled ? 'not-allowed' : '',
          backgroundColor: backgroundColor,
          width: width,
          height: height,
          color: color,
          borderRadius: borderRadius,
          fontSize: fontSize,
          fontWeight: fontWeight
        }}>
        <svg style={{ display: show_icon ? 'inline-block' : 'none', width: iconWidth, height: iconHeight, color: iconColor }} className="icon button_icon" aria-hidden="true">
          <use xlinkHref={iconString}></use>
        </svg>
        {text ? text : ''}
      </button>
    )
  }
}

export default Button
