import manualFactory from '../utils/socketHub/hooks'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { SocketHubContext } from '../utils/socketHub'

enum SocketResponseCodeEnum {
  FAIL = 1,
  SUCCESS = 0
}

type SocketDataEntity<T = any> = {
  code: SocketResponseCodeEnum
  msg: string
  data?: T
}

type AddFriendRequestType = {
  user_id: string
  friend_id: string
}

export function useAddFriendRequest() {
  const ctx = useContext(SocketHubContext)
  if (ctx.socketClient != null) {
    return manualFactory<AddFriendRequestType, SocketDataEntity>(
      ctx.socketClient
    )('addFriend')
  } else {
    return undefined
  }
}

type ConfirmFriendRequestType = {
  friend_id: string
  nickname: string
  avatar: string
}
type ConfirmFriendResponseType = {
  user_id: string
  friend_id: string
}

export function useConfirmFriendListener() {
  const ctx = useContext(SocketHubContext)
  const ref = useMemo<any>(() => [null, null], [])
  const [_, set_] = useState(0)
  useEffect(() => {
    ctx.eventCallback['confirmFriend'] = {
      ...ctx.eventCallback['confirmFriend'],
      response: (
        data: SocketDataEntity<ConfirmFriendRequestType>,
        fn: Function
      ) => {
        ref[0] = data
        ref[1] = (result: ConfirmFriendResponseType) => {
          fn(result)
        }
        set_(_ + 1)
      }
    }
  }, [])
  return ref
}

type JoinFriendSocketRequestType = {
  user_id: string
  friend_id: string
}

type JoinFriendSocketResponseType = { friend_id: string; user_id: string }

export function useJoinFriendSocketRequest() {
  const ctx = useContext(SocketHubContext)
  if (ctx.socketClient != null) {
    return manualFactory<
      JoinFriendSocketRequestType,
      SocketDataEntity<JoinFriendSocketResponseType>
    >(ctx.socketClient)('joinFriendSocket')
  } else {
    return undefined
  }
}

enum MessageType {
  TEXT = 0,
  PHOTO = 1,
  AUDIO = 2
}

type FriendMessage = {
  user_id: string
  friend_id: string
  messageType: MessageType
  content: string
}

export function useFriendMessageRequest() {
  const ctx = useContext(SocketHubContext)
  if (ctx.socketClient != null) {
    return manualFactory<
      FriendMessage,
      SocketDataEntity<FriendMessage & { time: string }>
    >(ctx.socketClient)('friendMessage')
  } else {
    return undefined
  }
}
export function useFriendMessageListener() {
  const ctx = useContext(SocketHubContext)
  const ref = useMemo<any>(() => [null, null], [])
  const [_, set_] = useState(0)
  useEffect(() => {
    ctx.eventCallback['friendMessage'] = {
      ...ctx.eventCallback['friendMessage'],
      response: (
        data: SocketDataEntity<FriendMessage & { time: string }>,
        fn: Function
      ) => {
        ref[0] = data
        ref[1] = (result: FriendMessage) => {
          fn(result)
        }
        set_(_ + 1)
      }
    }
  }, [])
  return ref
}
