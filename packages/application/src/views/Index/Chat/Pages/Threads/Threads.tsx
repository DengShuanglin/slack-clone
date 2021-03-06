/* 消息列 */
import React, { useContext, useEffect } from 'react'
import './Threads.css'
import '../../Style/index.css'

import ChatHeader from '../../Components/ChatHeader/ChatHeader'
import ChatBody from '../../Components/ChatBody/ChatBody'
import { MarkdownInput } from '@slack-pkg/components'
import {
  useFriendMessageListener,
  useFriendMessageRequest,
  useJoinFriendSocketRequest
} from '../../../../../api/socketRequest'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { UserContext } from '../../../../../store'
import { randString } from '../../../../../utils/randString'
import { uploadFileRequest } from '../../../../../api/userRequest'

export default function Threads() {
  const history = useHistory()
  const location = useLocation<any>()
  const params = useParams<{
    id: string | undefined
  }>()
  //@ts-ignored

  const friend_id = location.state.id || ''
  const ctx = useContext(UserContext)
  const _1 = useFriendMessageRequest()
  const _2 = useJoinFriendSocketRequest()

  if (_1 === undefined || _2 === undefined) return null
  useFriendMessageListener(() => {
    getThreadData({
      friend_id: friend_id,
      user_id: ctx.user_id || ''
    })
  })

  const [sendResult, toSendMessage] = _1
  const [threadData, getThreadData] = _2
  useEffect(() => {
    getThreadData({
      friend_id: friend_id,
      user_id: ctx.user_id || ''
    })
  }, [])
  useEffect(() => {
    getThreadData({
      friend_id: friend_id,
      user_id: ctx.user_id || ''
    })
  }, [sendResult])
  useEffect(() => {}, [threadData])

  return (
    <div className='main_chat_contents'>
      <ChatHeader title='消息列' />
      <ChatBody friend_id={friend_id} msgs={threadData.data?.data?.msgs} />
      <MarkdownInput
        onSend={(e) => {
          toSendMessage &&
            toSendMessage({
              messageType: e.type,
              content: e.content,
              friend_id: friend_id,
              user_id: ctx.user_id || ''
            })
          return true
        }}
        onSaveFile={(blob: Blob): Promise<string> => {
          let form = new FormData()
          form.set('img', blob, randString() + '.wav')
          return uploadFileRequest(form).then((res) => {
            return res.data.result || ''
          })
        }}
      />
    </div>
  )
}
