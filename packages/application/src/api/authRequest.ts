import request from "../utils/request";
import {AxiosResponse} from "axios";
import {ResponseEntity} from "../utils/request/types";

const baseURL='/auth'

type RegisterRequestType={
    email:string;
    password:string;
    verifyCode:string;
    codeId:string;
}

export function registerRequest(data:RegisterRequestType):Promise<AxiosResponse<ResponseEntity>>{
    return request.request({
        method:'post',
        data,
        url:baseURL+'/register'
    })
}
type GetMailCaptchaRequestType={
    email:string;
}
type GetMailCaptchaResponseType={
    codeId:string
}
export function getMailCaptchaRequest(data:GetMailCaptchaRequestType):Promise<AxiosResponse<ResponseEntity<GetMailCaptchaResponseType>>>{
    return request.request({
        method:'post',
        data,
        url:baseURL+'/captcha/code'
    })
}

type LoginRequestType={
    email:string;
    password:string;
    verifyCode:string;
    captchaId:string;
}
type LoginResponseType={
    user_id:number;
    access_token:string;
    refresh_token:string;
}
export function loginRequest(data:LoginRequestType):Promise<AxiosResponse<ResponseEntity<LoginResponseType>>>{
    return request.request({
        method:'post',
        data,
        url:baseURL+'/login'
    })
}

type GetLoginCaptchaRequestType= {
    width?:number;
    height?:number
}
type GetLoginCaptchaResponseType= {
    img:string;
    id:string;
}
export function getLoginCaptchaRequest(params:GetLoginCaptchaRequestType):Promise<AxiosResponse<ResponseEntity<GetLoginCaptchaResponseType>>>{
    return request.request({
        method:'get',
        params,
        url:baseURL+'/captcha/img'
    })
}
type RefreshTokenResponseType={
    access_token:string;
    refresh_token:string;
}
export function refreshTokenRequest(refresh_token:string):Promise<AxiosResponse<ResponseEntity<RefreshTokenResponseType>>>{

    return request.request({
        method:'get',
        headers:{
             "Authorization":"Bearer "+refresh_token,
        },
        url:baseURL+'/refreshToken'
    })
}
