import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import ReactWEditor from 'wangeditor-for-react'
import AlertMenu from './AlertMenu'
import styles from './index.module.less'

import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000'
})

const SendIcon = () => (
  <svg
    t='1648127882321'
    class='icon'
    viewBox='0 0 1024 1024'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    p-id='2177'
    width='42'
    height='42'
  >
    <path
      d='M946.773333 93.198222c-24.832-32.398222-70.087111-43.932444-120.917333-30.336L147.100444 244.295111c-46.449778 12.458667-77.297778 38.940444-86.840888 74.581333-9.628444 35.939556 4.053333 74.709333 38.528 109.169778l253.411555 253.411556 243.882667 243.868444c27.079111 27.107556 57.045333 41.415111 86.613333 41.415111 45.866667 0 82.218667-33.607111 97.336889-89.912889l180.920889-678.229333c11.136-41.543111 6.115556-78.976-14.179556-105.400889z m-40.775111 90.695111L725.048889 862.136889c-3.854222 14.321778-15.687111 47.715556-42.368 47.715555-13.966222 0-30.449778-8.775111-46.392889-24.746666L412.529778 661.347556l170.965333-170.979556a28.444444 28.444444 0 1 0-40.220444-40.220444L372.309333 621.127111 139.008 387.84c-19.214222-19.214222-27.889778-38.983111-23.808-54.229333 4.010667-14.961778 21.006222-27.491556 46.620444-34.346667L840.590222 117.831111a103.992889 103.992889 0 0 1 26.581334-3.84c10.894222 0 25.699556 2.389333 34.474666 13.838222 9.272889 12.074667 10.808889 31.971556 4.352 56.064z'
      fill='currentColor'
      p-id='2178'
    ></path>
    <path
      d='M742.855111 621.084444a14.307556 14.307556 0 0 0-17.365333 10.197334l-1.464889 5.589333a14.250667 14.250667 0 0 0 27.548444 7.182222l1.464889-5.603555a14.250667 14.250667 0 0 0-10.183111-17.365334zM732.145778 662.357333a14.222222 14.222222 0 0 0-17.351111 10.197334l-30.321778 116.750222a14.222222 14.222222 0 1 0 27.534222 7.139555l30.336-116.750222a14.236444 14.236444 0 0 0-10.197333-17.336889z'
      fill='currentColor'
      p-id='2179'
    ></path>
  </svg>
)

interface MarkdownInputEditorProps {
  style?: CSSProperties
  value?: string
  defaultValue?: string
  onChange?: (html: string) => void
  onBlur?: (html: string) => void
  onFocus?: (html: string) => void
  onSend?: (html: string) => void
  loading?: boolean
}

const MarkdownInputEditor = (props: MarkdownInputEditorProps) => {
  const {
    style,
    value = '',
    defaultValue = '',
    onChange,
    onBlur,
    onFocus,
    onSend,
    loading = false
  } = props

  let editorRef = useRef(null)

  const [inputValue, setInputValue] = useState<string>(value)

  const upload = async () => {
    const res = await instance.get('/upload')
    console.log('res', res)
  }

  const handleSend = () => {
    onSend && onSend(inputValue)
  }

  return (
    <div className={styles.root} style={style}>
      <ReactWEditor
        className={styles.editor}
        ref={editorRef}
        defaultValue={defaultValue}
        value={inputValue}
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
            'image'
          ]
        }}
        linkImgCallback={(src, alt, href) => {
          // 插入网络图片的回调事件
          console.log('图片 src ', src)
          console.log('图片文字说明', alt)
          console.log('跳转链接', href)
        }}
        onChange={(html) => {
          onChange && onChange(html)
          setInputValue(html)
        }}
        onBlur={(html) => {
          onBlur && onBlur(html)
        }}
        onFocus={(html) => {
          onFocus && onFocus(html)
        }}
      />
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

export default MarkdownInputEditor
