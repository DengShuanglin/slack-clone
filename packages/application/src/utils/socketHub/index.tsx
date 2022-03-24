import { io } from 'socket.io-client'
import { createContext, ReactNode, useContext, useEffect, useMemo } from 'react'
import { Socket } from 'socket.io-client/build/esm/socket'
import { UserContext } from '../../store'
import { localStorageItemName } from '../request'

const baseURL = 'ws://121.5.68.110:3001?/user_id='

type SocketHubContextValueType = {
  socketClient: null | Socket
  status:
    | 'beforeReady'
    | 'ready'
    | 'connecting'
    | 'connected'
    | 'disconnect'
    | 'shutdown'
  eventCallback: {
    [eventKey: string]: {
      [callBackKey: string]: Function
    }
  }
  registerCallback: (
    eventKey: string | string[],
    callBackKey: string,
    fn: Function
  ) => void
}

const SocketHubContext = createContext<SocketHubContextValueType>({
  socketClient: null,
  eventCallback: {},
  status: 'beforeReady',
  registerCallback: () => {}
})

type SocketHubProviderPropsType = {
  children?: ReactNode
}

function SocketHubProvider(props: SocketHubProviderPropsType) {
  const cache = useMemo<SocketHubContextValueType>(() => {
    return {
      socketClient: null,
      eventCallback: {
        disconnect: {
          reConnect: () => {
            if (cache.status !== 'shutdown') {
              cache.socketClient?.connect()
            }
          }
        }
      },
      status: 'beforeReady',
      registerCallback: () => {}
    }
  }, [])
  const userCtx = useContext(UserContext)

  useEffect(() => {
    if (cache.socketClient !== null) {
      cache.socketClient.removeAllListeners()
      for (let eventCallbackKey in cache.eventCallback) {
        cache.socketClient.on(eventCallbackKey, (data, fn) => {
          for (let eventCallbackElementKey in cache.eventCallback[
            eventCallbackKey
          ] || {}) {
            cache.eventCallback[eventCallbackKey][eventCallbackElementKey]?.(
              data,
              fn
            )
          }
        })
      }
    }
  }, [cache.socketClient])

  useEffect(() => {
    if (cache.socketClient == null) {
      cache.status = 'beforeReady'
      cache.socketClient = io(baseURL + userCtx.userId, {
        extraHeaders: {
          Authorization:
            'Bearer ' + localStorage.getItem(localStorageItemName.ACCESS_TOKEN)
        },
        auth: {
          Authorization:
            'Bearer ' + localStorage.getItem(localStorageItemName.ACCESS_TOKEN)
        },
        autoConnect: false
      })
      cache.status = 'ready'
    }
    cache.socketClient.removeAllListeners()
    cache.registerCallback = (eventCallbackKey, eventKey, fn) => {
      ;[eventCallbackKey].flat(9999999).forEach((value) => {
        cache.eventCallback[value] = {
          ...cache.eventCallback[value],
          [eventKey]: fn
        }
      })
    }
    cache.status = 'connecting'
    cache.socketClient.connect()
    return () => {
      cache.status = 'shutdown'
      cache.socketClient?.disconnect()
    }
  }, [])
  return (
    <SocketHubContext.Provider value={cache}>
      {props.children}
    </SocketHubContext.Provider>
  )
}

export default SocketHubProvider
export { SocketHubContext }
