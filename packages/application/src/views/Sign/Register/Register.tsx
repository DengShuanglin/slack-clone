import './Register.css'
import '../style/index.css'
import {Button, Input} from '@slack-pkg/components'
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import useRequest from "../../../utils/request/hooks";
import {getMailCaptchaRequest} from "../../../api/authRequest";

export default function Register() {
    const [email, setEmail] = useState('');
    const [data, getData] = useRequest(getMailCaptchaRequest);
    const history = useHistory();
    const toSubmit = () => {
        if (/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
            getData({
                email
            })
        }
    }
    useEffect(()=>{
        if(data.state==='finish'){
            history.push({
                pathname:'/sign/ConfirmEmail',
                state:{
                    email,
                    id:data.data?.result?.id
                }
            })
        }
    },[data.state]);

    return (
        <div className='register_sign_root'>
            <header className='register_sign_head'>
                <div className="register_sign_head_col_left"></div>
                <a href="#/signin" className='register_sign_logo'>
                    <img height={70}
                         src="https://img1.baidu.com/it/u=4209449786,4185436610&fm=253&fmt=auto&app=138&f=JPEG?w=1000&h=500"
                         alt=""/>
                </a>
                <div className="register_sign_head_col_right"></div>
            </header>
            <article className='register_sign_content'>
                <h1 className='register_sign_title'>首先，输入你的电子邮件</h1>
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
                                value={email}
                                onChangeEvent={e => setEmail(e?.target?.value || '')}
                                placeholder="name@work-email.com"/>
                        </div>
                        <div style={{marginBottom: '20px'}}>
                            <Button
                                width='100%'
                                text='继续'
                                backgroundColor='#611f69'
                                color='#ffffff'
                                height='44px'
                                borderRadius='4px'
                                fontSize={18}
                                onClickEvent={e=>{
                                    toSubmit()
                                    e.stopPropagation();
                                }}
                                fontWeight={900}/>
                        </div>
                    </div>
                    <div className="register_form__ts_and_cs">
                        选择继续，代表你同意我们的
                        <a href="">《客户服务条款》</a>、
                        <a href="">《用户服务条款》</a>、
                        <a href="">《隐私权政策》</a>、
                        <a href="">《Cookie 政策》</a>
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
