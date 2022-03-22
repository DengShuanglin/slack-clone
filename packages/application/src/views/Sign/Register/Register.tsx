import './Register.css'
import '../style/index.css'
import Input from '../../../../../components/src/Input/Input'
import Button from '../../../../../components/src/Button/Button'

export default function Register() {
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
        <h1 className='register_sign_title'>首先，输入你的电子邮件</h1>
        <div className="register_sign_title_sub">
          我们建议使用<strong>你的工作电子邮件地址。</strong>
        </div>
        <form action="" className="register_sign_form">
          <div>
            <div style={{ marginBottom: '20px' }}>
              <Input
                borderRadius='4px'
                width='100%'
                height='40px'
                fontSize={18}
                placeholder="name@work-email.com">
              </Input>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <Button
                width='100%'
                text='继续'
                backgroundColor='#611f69'
                color='#ffffff'
                height='44px'
                borderRadius='4px'
                fontSize={18}
                fontWeight={900}>
              </Button>
            </div>
          </div>
          <div>
            <label htmlFor="email_misc_checkbox" className="register_email">
              <input type="checkbox" id='email_misc_checkbox' checked className='register_checkbox' />
              <span>可以向我发送有关 Slack 的电子邮件。</span>
            </label>
          </div>
          <div className="register_form__ts_and_cs">
            选择继续，代表你同意我们的
            <a href="">《客户服务条款》</a>、
            <a href="">《用户服务条款》</a>、
            <a href="">《隐私权政策》</a>、
            <a href="">《Cookie 政策》</a>
          </div>
        </form>
      </article>
      <footer className='register_sign_foot'>
        <a href="">隐私权和条款</a>
        <a href="">联系我们</a>
      </footer>
    </div>
  )
}
