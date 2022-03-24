import request from '../utils/request'
import { AxiosResponse } from 'axios'
import { ResponseEntity } from '../utils/request/types'

const baseURL = '/user'

type GetUserInfoResponseType = {
  nickname: string
  avatar: string
  channels: string[]
  friends: Array<{
    id: number
    nickname: string
    avatar: string
  }>
}

export function getUserInfoRequest(): Promise<
  AxiosResponse<ResponseEntity<GetUserInfoResponseType>>
> {
  return request.request({
    method: 'get',
    url: baseURL + '/getInfo'
  })
}

type UpdateUserInfoRequestType = {
  nickname?: string
  avatar?: string
}

export function updateUserInfoRequest(
  params: UpdateUserInfoRequestType
): Promise<AxiosResponse<ResponseEntity>> {
  return request.request({
    method: 'put',
    params,
    url: baseURL + '/update'
  })
}
