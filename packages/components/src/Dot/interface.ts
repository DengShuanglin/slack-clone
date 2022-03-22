export type Status = 'online' | 'offline'
export type StatusMap = Record<Status, string>

export interface dotProps {
  type?: 'online' | 'offline',
  width?: number | string,
  height?: number | string,
  backgroundColor?: string,
  borderRadius?: number | string,
  left?: number | string,
  right?: number | string,
  bottom?: number | string,
  top?: number | string,
}