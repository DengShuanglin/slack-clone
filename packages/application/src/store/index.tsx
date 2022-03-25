import { createContext, ReactNode, useMemo, useState } from 'react'

type UserInfoType = {
  nickname: string
  avatar: string
  user_id: string
  channels: string[]
  friends: Array<{
    id: string
    nickname: string
    avatar: string
  }>
}

type UserContextValueType = {
  userInfo?: UserInfoType
  user_id?: string
}

const UserContext = createContext<UserContextValueType>({})

type UserContextProvider = {
  children?: ReactNode
}

function UserContextProvider(props: UserContextProvider) {
  const cache = useMemo(() => ({}), [])

  return (
    <UserContext.Provider value={cache}>{props.children}</UserContext.Provider>
  )
}

export default UserContextProvider

export { UserContext }
