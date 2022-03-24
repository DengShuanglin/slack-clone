import React, { useEffect, useRef, useState } from 'react'
import ReactWEditor from 'wangeditor-for-react'
import AlertMenu from './AlertMenu'
import ImageButton from './ImageButton'
import styles from './index.module.less'

import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000'
})

interface MarkdownInputEditorProps {
  value: string
  onChange: (html: string) => void
  onBlur: (html: string) => void
  onFocus: (html: string) => void
}

const MarkdownInputEditor = () => {
  let editorRef = useRef(null)

  const [value, setValue] = useState()

  const upload = async () => {
    const res = await instance.get('/upload')
    console.log('res', res)
  }

  useEffect(() => {
    console.log('value', value)
  }, [value])

  return (
    <>
      <div className={styles.root}>
        <button>发送</button>
        <button onClick={upload}>img </button>
        <div>{value}</div>

        <ReactWEditor
          className={styles.editor}
          ref={editorRef}
          defaultValue={''}
          value={value}
          globalHook={{
            registerMenu: ['alertMenuKey', AlertMenu]
          }}
          config={{
            height: 120,
            showFullScreen: false,
            // TODO: add api
            uploadImgServer: '/upload',
            // customUploadImg: async (resultFiles, insertImgFn) => {
            //   console.log('resultFiles', resultFiles)
            //   // resultFiles 是 input 中选中的文件列表
            //   // insertImgFn 是获取图片 url 后，插入到编辑器的方法

            //   // 上传图片，返回结果，将图片插入到编辑器中
            //   const res = await instance.post('/upload', { data: resultFiles })
            //   console.log('res', res)
            //   insertImgFn(imgUrl)
            // },
            menus: [
              'bold',
              'italic',
              'strikeThrough',
              'link',
              'list',
              'quote',
              'code',
              'emoticon',
              'image',
              'alertMenuKey'
            ]
          }}
          linkImgCallback={(src, alt, href) => {
            // 插入网络图片的回调事件
            console.log('图片 src ', src)
            console.log('图片文字说明', alt)
            console.log('跳转链接', href)
          }}
          onChange={(html) => {
            console.log('onChange html:', html)
            setValue(html)
          }}
          onBlur={(html) => {
            // console.log('onBlur html:', html)
          }}
          onFocus={(html) => {
            // console.log('onFocus html:', html)
          }}
        />
      </div>
    </>
  )
}

export default MarkdownInputEditor
