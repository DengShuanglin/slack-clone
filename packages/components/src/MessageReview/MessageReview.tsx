import React from 'react'
import '@wangeditor/editor/dist/css/style.css'

import { Image } from 'antd'
import MarkdownReview from '../MarkdownReview'

export enum MessageType {
  TEXT = 0,
  PHOTO = 1,
  AUDIO = 2
}

export interface MessageReviewProps {
  type: MessageType
  content: string
}

const MessageReview: React.FC<MessageReviewProps> = (
  props: MessageReviewProps
) => {
  const { type, content } = props

  let reviewBody = null

  // text
  if (type === 0) {
    reviewBody = <MarkdownReview defaultHtml={content} />
  }

  // photo
  if (type === 1) {
    reviewBody = <Image width={200} src={content} />
  }

  // audio
  if (type === 2) {
    reviewBody = (
      <audio controls src={content}>
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    )
  }

  return reviewBody
}

export default MessageReview
