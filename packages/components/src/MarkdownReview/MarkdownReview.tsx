import React from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Editor } from '@wangeditor/editor-for-react'
import { IEditorConfig } from '@wangeditor/editor'
import styles from './index.module.less'

export interface MarkdownReviewProps {
  defaultHtml: string
}

const MarkdownReview: React.FC<MarkdownReviewProps> = (
  props: MarkdownReviewProps
) => {
  const { defaultHtml } = props

  const editorConfig: Partial<IEditorConfig> = {
    readOnly: true
  }

  return (
    <div className={styles.root}>
      <Editor
        defaultConfig={editorConfig}
        defaultHtml={defaultHtml}
        mode='simple '
        style={{
          overflowY: 'hidden',
          borderBottom: '1px solid #c9d8db'
        }}
      />
    </div>
  )
}

export default MarkdownReview
