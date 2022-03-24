import axios, {AxiosRequestConfig} from 'axios';
import {refreshTokenRequest} from "../../api/authRequest";

export enum localStorageItemName {
    ACCESS_TOKEN="SLACK_ACCESS_TOKEN",
    REFRESH_TOKEN="SLACK_REFRESH_TOKEN",
}

const request = axios.create({
    baseURL:'/api',
    timeout:10000,
    headers:{
        'Content-Type': 'application/json',
    }
})

request.interceptors.request.use((config)=>{
    let access_token = localStorage.getItem(localStorageItemName.ACCESS_TOKEN);
    if(access_token!==null){
        config.headers={
            "Authorization":"Bearer "+access_token,
            ...config.headers,
        }
    }
    return config;
})

let requestList:(()=>void)[]=[];
let isRefreshing=false;

request.interceptors.response.use(async(config)=>{
    return config;
},(error)=>{
    const config=error.response;

    if(config.status!==200&&config.status!==201){
        if(config.status === 401){
            if(isRefreshing){
                return new Promise((resolve, reject) => {
                    requestList.push(async () => {
                        let access_token = localStorage.getItem(localStorageItemName.ACCESS_TOKEN);
                        if(access_token!==null){
                            config.config.headers={
                                ...config.config.headers,
                                "Authorization":"Bearer "+access_token,
                            }
                        }
                        resolve(request.request(config.config));
                    })
                });
            }else{
                let refreshToken = localStorage.getItem(localStorageItemName.REFRESH_TOKEN);
                if(refreshToken===null){
                    localStorage.clear();
                    return Promise.reject(config);
                }else{
                    isRefreshing=true;
                    return refreshTokenRequest(refreshToken).then((res)=>{
                        if(res.data.result?.access_token){
                            localStorage.setItem(localStorageItemName.ACCESS_TOKEN,res.data.result?.access_token);
                            localStorage.setItem(localStorageItemName.REFRESH_TOKEN,res.data.result?.refresh_token);
                            isRefreshing=false;
                            config.config.headers={
                                ...config.config.headers,
                                "Authorization":"Bearer "+res.data.result?.access_token,
                            }
                            let r= request.request(config.config)
                            requestList.forEach(f=>f());
                            return r;
                        }else{
                            throw res;
                        }
                    }).catch((res)=>{
                        localStorage.clear();
                        return config;
                    })
                }
            }
        }else{
            return Promise.reject(config);
        }
    }else{
        return Promise.resolve(config);
    }
})

export default request;
