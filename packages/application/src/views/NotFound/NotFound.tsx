import './NotFound.css'

export default function NotFound() {
  return (
    <div id='page'>
      <div id='page_contents'>
        <div id='content'></div>
        <div className='card'>
          <h1>
            <svg className='icon warning_icon' aria-hidden='true'>
              <use xlinkHref='#icon-jinggao' />
            </svg>
            出了点小故障...
          </h1>
          <p>
            我们不太确定出了什么问题。如果你需要帮助，你可以返回，或尝试访问我们的
            <a href='/sign/signin'>登陆页</a>
          </p>
        </div>
      </div>
    </div>
  )
}
