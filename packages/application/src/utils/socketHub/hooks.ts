import { Socket } from 'socket.io-client/build/esm/socket'
import { useState } from 'react'

type ResultType<D> = {
  data: D | undefined
  status: 'ready' | 'loading' | 'finish'
}

const manualFactory = <T = any, D = any>(socket: Socket) => {
  return (
    eventName: string
  ): [ResultType<D>, (data: T) => Promise<ResultType<D>>] => {
    const [result, setResult] = useState<ResultType<D>>({
      data: undefined,
      status: 'ready'
    })

    const getResult = async (data: T) => {
      return new Promise<ResultType<D>>((resolve) => {
        setResult(() => ({
          ...result,
          status: 'loading'
        }))
        socket?.emit(eventName, data, (result: D) => {
          setResult(() => ({
            data: result,
            status: 'finish'
          }))
          resolve({
            data: result,
            status: 'finish'
          })
        })
      })
    }

    return [result, getResult]
  }
}

export default manualFactory
