export type userStatus = 'online' | 'offline'
export type userStatusMap = Record<userStatus, string>

export interface userAvatarProps {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  status: 'online' | 'offline'
  avatarUrl: string
  avatarCallback?: (e: MouseEvent) => void
}
