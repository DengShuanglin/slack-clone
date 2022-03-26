import request from '../utils/request'
import { AxiosResponse } from 'axios'
import { ResponseEntity } from '../utils/request/types'

const baseURL = '/user'

type GetUserInfoResponseType = {
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
  data: UpdateUserInfoRequestType
): Promise<AxiosResponse<ResponseEntity>> {
  return request.request({
    method: 'put',
    data,
    url: baseURL + '/update'
  })
}

export function searchUserRequest(params: { email: string }): Promise<
  AxiosResponse<
    ResponseEntity<
      [
        {
          id: string
          email: string
          nickname: string
          avatar: string
        }
      ]
    >
  >
> {
  return request.request({
    method: 'get',
    params,
    url: baseURL + '/search'
  })
}

export function uploadFileRequest(
  data: FormData
): Promise<AxiosResponse<ResponseEntity<string>>> {
  return request.request({
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/friend/upload'
  })
}
