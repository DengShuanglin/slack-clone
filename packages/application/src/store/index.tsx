import { createContext, ReactNode, useMemo, useState } from 'react'
import { set } from 'husky'

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
  setUserData: (data?: UserInfoType) => void
  refresh?: () => void
  callbackMap: {
    [key: string]: Function
  }
  addRefreshCallback: (ket: string, fn: Function) => void
}

const UserContext = createContext<UserContextValueType>({
  setUserData: () => {},
  callbackMap: {},
  addRefreshCallback: () => {}
})

type UserContextProvider = {
  children?: ReactNode
}

function UserContextProvider(props: UserContextProvider) {
  const cache = useMemo<UserContextValueType>(
    () => ({
      setUserData(data) {
        if (data === undefined) {
          cache.user_id = undefined
          cache.userInfo = undefined
          localStorage.clear()
        } else {
          cache.user_id = data.user_id
          cache.userInfo = { ...data }
        }
        cache.refresh?.()
      },
      refresh() {
        for (let callbackMapKey in cache.callbackMap) {
          cache.callbackMap[callbackMapKey]?.()
        }
      },
      callbackMap: {},
      addRefreshCallback: (key, fn) => {
        cache.callbackMap[key] = fn
      }
    }),
    []
  )

  return (
    <UserContext.Provider value={cache}>{props.children}</UserContext.Provider>
  )
}

export default UserContextProvider

export { UserContext }
