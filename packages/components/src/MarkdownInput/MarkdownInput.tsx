import React, { useState, useEffect, CSSProperties } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IToolbarConfig, IEditorConfig } from '@wangeditor/editor'
import styles from './index.module.less'

import AudioRecord from '../audio-record'

const SendIcon = () => (
  <svg
    t='1648137415527'
    className='icon'
    viewBox='0 0 1024 1024'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    p-id='2179'
    width='40'
    height='40'
  >
    <path
      d='M900 386.016v-192q0-16.992-11.488-28.512t-28-11.488-28.512 11.488-12 28.512v192q0 92-64.992 156.992T598.016 608H258.016l112.992-112q11.008-12 11.008-28.512t-11.488-28-28-11.488-28.512 12L136 618.016q-12 12-12 28.512t12 28.512l183.008 183.008q12 12 28.512 12t28.512-11.488 12-28-12-28.512l-114.016-114.016h336q124.992 0 213.504-88.512t88.512-213.504z'
      p-id='2180'
    ></path>
  </svg>
)

export interface MarkdownInputProps {
  toolbarStyle?: CSSProperties
  editorStyle?: CSSProperties
  defaultHtml?: string
  loading?: boolean
  onSend?: (html: string) => void
  onChange?: (html: string) => void
  onFocus?: (html: string) => void
  onBlur?: (html: string) => void
}

const MarkdownInput: React.FC<MarkdownInputProps> = (
  props: MarkdownInputProps
) => {
  const {
    toolbarStyle = {},
    editorStyle = {},
    defaultHtml = '',
    loading = false,
    onSend,
    onChange,
    onFocus,
    onBlur
  } = props

  const [editor, setEditor] = useState<IDomEditor | null>(null) // 存储 editor 实例

  // `defaultContent` (JSON 格式) 和 `defaultHtml` (HTML 格式) 二选一
  // const defaultContent = [
  //   { type: 'paragraph', children: [{ text: '一行文字' }] }
  // ]
  // const defaultHtml = '<p>一行文字</p>'

  const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys: [
      'bold',
      'italic',
      'through',
      '|',
      'insertLink',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'blockquote',
      '|',
      'code',
      'codeBlock',
      '|',
      'emotion',
      'uploadImage'
      // 'audio'
    ]
  }

  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        customInsert(res: any, insertFn: any) {
          // res 即服务端的返回结果
          console.log('res')
          // 从 res 中找到 url alt href ，然后插图图片
          insertFn(url, alt, href)
        }
      }
    },
    onCreated(editor: IDomEditor) {
      // 记录下 editor 实例，重要！
      setEditor(editor)
    },
    onChange(editor: IDomEditor) {
      // editor change
    },
    onFocus(editor: IDomEditor) {
      // editor focused
    },
    onBlur(editor: IDomEditor) {
      // editor blur
    }
  }

  const handleSend = () => {
    const content = editor?.getHtml()
    console.log('content', content)
    onSend && onSend(content || '')
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <div className={styles.root}>
      <div className={styles.record}>
        <AudioRecord />
      </div>
      <div
        style={{
          border: '1px solid #c9d8db',
          zIndex: 100,
          flex: 1,
          ...toolbarStyle
        }}
      >
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode='simple '
          style={{ borderBottom: '1px solid #c9d8db' }}
        />
        <Editor
          defaultConfig={editorConfig}
          // defaultContent={defaultContent}
          defaultHtml={defaultHtml}
          mode='simple '
          style={{
            height: '140px',
            overflowY: 'hidden',
            borderBottom: '1px solid #c9d8db',
            ...editorStyle
          }}
        />
      </div>
      <button
        disabled={loading}
        className={styles.sendBtn}
        onClick={handleSend}
      >
        <SendIcon />
      </button>
    </div>
  )
}

export default MarkdownInput
