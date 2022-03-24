import './Signin.css'
import '../style/index.css'
import {Input, Button} from '@slack-pkg/components'
import useRequest from "../../../utils/request/hooks";
import {getLoginCaptchaRequest, loginRequest} from "../../../api/authRequest";
import {useEffect, useState} from "react";
import {localStorageItemName} from "../../../utils/request";


export default function SignIn() {
    const [state, setState] = useState({
        email: '',
        password: '',
        verifyCode: '',
        captchaId: ''
    })
    const [data, getData] = useRequest(loginRequest);

    const [imgData, getImgData] = useRequest(getLoginCaptchaRequest);

    useEffect(() => {
        getImgData({});
    }, [])
    useEffect(() => {
        if (imgData.state === 'finish' && imgData.data?.result?.id) {
            setState({
                ...state,
                captchaId: imgData.data.result.id
            })
        }
    }, [imgData.data])
    useEffect(() => {
        if (data.state === 'finish') {
            if (data.data?.result?.user_id) {
                localStorage.setItem(localStorageItemName.ACCESS_TOKEN, data.data.result.access_token);
                localStorage.setItem(localStorageItemName.REFRESH_TOKEN, data.data.result.refresh_token);

            }
        }
    },[data] )

    return (
        <div className='register_sign_root'>
            <header className='register_sign_head'>
                <div className="register_sign_head_col_left"></div>
                <a href="#/signin" className='register_sign_logo'>
                    <img height={70}
                         src="https://img1.baidu.com/it/u=4209449786,4185436610&fm=253&fmt=auto&app=138&f=JPEG?w=1000&h=500"
                         alt=""/>
                </a>
                <div className="href_register_container">
                    <div className='href_register'>
                        刚刚开始使用 简单聊？
                        <br/>
                        <a href="#/sign/register" className="bold href_register_a">创建账户</a>
                    </div>
                </div>
            </header>
            <article className='register_sign_content'>
                <h1 className='register_sign_title'>登陆 简单聊</h1>
                <div className="register_sign_title_sub">
                    我们建议使用<strong>你的工作电子邮件地址。</strong>
                </div>
                <div className="register_sign_form">
                    <div>
                        <div style={{marginBottom: '20px'}}>
                            <Input
                                borderRadius='4px'
                                width='100%'
                                height='40px'
                                fontSize={18}
                                value={state.email}
                                onChangeEvent={e => setState((state) => ({...state, email: e?.target.value || ''}))}
                                placeholder="name@work-email.com"/>
                        </div>
                        <div style={{marginBottom: '20px'}}>
                            <Input
                                borderRadius='4px'
                                width='100%'
                                height='40px'
                                type={'password'}
                                fontSize={18}
                                value={state.password}
                                onChangeEvent={e => setState((state) => ({...state, password: e?.target.value || ''}))}
                                placeholder="your-password"/>
                        </div>
                        {imgData.data?.result?.img && (
                            <>
                                <div className="img_code_container">
                                    <div className="signin_img_code">
                                        <img style={{height: '40px'}} src={imgData.data.result.img} alt="点击刷新"  onClick={()=>{
                                            getImgData({})
                                        }}/>
                                    </div>
                                    <div style={{flex:'auto'}}>
                                        <Input
                                            borderRadius='4px'
                                            width='100%'
                                            height='40px'
                                            fontSize={18}
                                            value={state.verifyCode}
                                            onChangeEvent={e => setState((state) => ({
                                                ...state,
                                                verifyCode: e?.target.value || ''
                                            }))}
                                            placeholder="图片验证码"/>
                                    </div>
                                </div>
                                <div className="signin_manual" style={{marginBottom: '20px'}}>
                                    <svg className="icon" style={{width: '30px', height: '24px', marginRight: '4px'}}
                                         aria-hidden="true">
                                        <use xlinkHref="#icon-xingxing"></use>
                                    </svg>
                                    <span>请准确填入上图<strong>验证码</strong>。</span>
                                </div>
                            </>)}
                        <div style={{marginBottom: '20px'}}>
                            <Button
                                onClickEvent={() => {
                                    if (/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(state.email)) {
                                        getData(state);
                                    }
                                }}
                                width='100%'
                                height='44px'
                                backgroundColor='#611f69'
                                color='#ffffff'
                                fontSize={18}
                                text='登陆'
                                borderRadius='4px'
                                fontWeight={900}

              />
            </div>
          </div>
        </div>
      </article>
      <footer className='register_sign_foot'>
        <a href="">隐私权和条款</a>
        <a href="">联系我们</a>
      </footer>
    </div>
  )
}
