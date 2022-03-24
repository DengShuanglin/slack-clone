import React, { ReactNode } from "react";
import './AddCard.css'

export interface addCardProps {
  trigger?: 'hover' | 'click'
  width?: string | number
  height?: string | number
  title?: string
  style?: React.CSSProperties
  children?: ReactNode,
  onClickEvent?: () => void,
}

const AddCard: React.FC<addCardProps> = (props: addCardProps) => {
  const { width, height, style, title, children, onClickEvent } = props
  return (
    <div className="card_container" style={style}>
      <div className="card_content" style={{ width: width, height: height }}>
        <div className="add_card_header">
          <div className="add_card_title_container">
            <h1 className="add_card_title">{title}</h1>
          </div>
        </div>
        {children}
        <div className="close_card" onClick={() => { if (onClickEvent) onClickEvent() }}>
          <svg className="icon close_card_icon" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default AddCard