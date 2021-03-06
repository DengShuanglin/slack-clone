import { CSSProperties } from 'react'

export interface buttonProps {
  text?: string
  backgroundColor?: string
  disabled?: boolean
  width?: string | number
  height?: string | number
  color?: string
  style?: CSSProperties
  borderRadius?: string | number
  show_icon?: boolean
  fontSize?: string | number
  fontWeight?: number
  iconString?: string
  iconWidth?: string | number
  iconHeight?: string | number
  iconColor?: string
  onClickEvent?: (e: React.MouseEvent<HTMLButtonElement>) => void
}
