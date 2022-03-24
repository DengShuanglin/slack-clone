import { useState } from 'react'
import { AxiosResponse } from 'axios'
import { ResponseEntity } from './types'
import { notification } from '@slack-pkg/components'

function useRequest<T = any, P = any>(
  requestFn: (t: T) => Promise<AxiosResponse<ResponseEntity<P>>>
): [
  {
    state: 'ready' | 'pending' | 'finish' | 'error'
    data?: ResponseEntity<P>
  },
  (t: T) => Promise<ResponseEntity<P>>
] {
  const [data, setData] = useState<{
    state: 'ready' | 'pending' | 'finish' | 'error'
    data?: ResponseEntity<P>
  }>({
    state: 'ready',
    data: undefined
  })
  const getData = (t: T) => {
    setData({
      data: data.data,
      state: 'pending'
    })
    return new Promise<ResponseEntity<P>>(async (resolve, reject) => {
      await requestFn(t)
        .then((res) => {
          if (res.status !== 200 && res.status !== 201) {
            setData({
              data: res.data,
              state: 'error'
            })
            reject(res)
          } else {
            setData({
              data: res.data,
              state: 'finish'
            })
            resolve(res.data)
          }
        })
        .catch((res) => {
          setData({
            data: res.data,
            state: 'error'
          })
          notification.error({
            message: res.data.message,
            description: res.data.error
          })
          reject(res)
        })
    })
  }

  return [data, getData]
}

export default useRequest
