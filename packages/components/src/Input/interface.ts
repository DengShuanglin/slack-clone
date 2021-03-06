export interface inputProps {
  value?: any
  fontSize?: string | number
  type?: 'text' | 'password' | 'number'
  placeholder?: string
  disabled?: boolean
  onChangeEvent?: (e: any) => void
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  showIcon?: boolean
  maxLength?: number
}
