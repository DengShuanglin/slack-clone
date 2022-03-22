import './ConfirmEmail.css'
import '../style/index.css'

export default function ConfirmEmail() {
  return (
    <div className='register_sign_root'>
      <header className='register_sign_head'>
        <div className="register_sign_head_col_left"></div>
        <a href="#/signin" className='register_sign_logo'>
          <img height={70} src="https://img1.baidu.com/it/u=4209449786,4185436610&fm=253&fmt=auto&app=138&f=JPEG?w=1000&h=500" alt="" />
        </a>
        <div className="register_sign_head_col_right"></div>
      </header>
      <article className='register_sign_content'>
        <h1 className='register_sign_title'>查看你的电子邮件获取代码</h1>
        <div className="register_sign_title_sub">
          我们已将 6 位代码发送至 <strong>你的工作电子邮件地址</strong>。该验证码即将过期，请尽快输入。
        </div>
        {/* 输入验证码 */}
        <form action="" className="register_sign_form" style={{ maxWidth: '500px' }}>
          <div className='email_code_container'>
            <div className="email_code_left" style={{ display: "flex" }}>
              <div className='email_code_item'>
                <input type="text" maxLength={1} />
              </div>
              <div className='email_code_item'>
                <input type="text" maxLength={1} />
              </div>
              <div className='email_code_item'>
                <input type="text" maxLength={1} />
              </div>
            </div>
            <div className="email_code_line">—</div>
            <div className="email_code_right" style={{ display: "flex" }}>
              <div className='email_code_item'>
                <input type="text" maxLength={1} />
              </div>
              <div className='email_code_item'>
                <input type="text" maxLength={1} />
              </div>
              <div className='email_code_item'>
                <input type="text" maxLength={1} />
              </div>
            </div>
          </div>
        </form>
        {/* 验证码通过，显示加载 */}
        <div className="email_loading_container">
          <svg className="icon email_loading_icon" aria-hidden="true">
            <use xlinkHref="#icon-loading"></use>
          </svg>
          <span className='email_loading_text'>正在加载你的工作区···</span>
        </div>
        <div className='email_code_hint'>找不到您的代码吗？请检查你的垃圾邮件文件夹！</div>
      </article>
      <footer className='register_sign_foot'>
        <a href="">隐私权和条款</a>
        <a href="">联系我们</a>
      </footer>
    </div>
  )
}
