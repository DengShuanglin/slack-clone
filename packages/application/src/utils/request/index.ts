import axios from 'axios';

enum localStorageItemName {
    ACCESS_TOKEN="SLACK_ACCESS_TOKEN",
    REFRESH_TOKEN="SLACK_REFRESH_TOKEN",
}

const request = axios.create({
    baseURL:'http://121.5.68.110:3001/api',
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
request.interceptors.response.use((config)=>{
    return config;
})

export default request;
