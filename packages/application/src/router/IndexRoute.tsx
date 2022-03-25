import {Component, useContext, useEffect, useState} from 'react'
import {HashRouter, Route, Redirect, useHistory} from 'react-router-dom'
import Index from '../views/Index/Index'
import NotFound from '../views/NotFound/NotFound'
import {getUserInfoRequest} from "../api/userRequest";
import {UserContext} from "../store";
import useRequest from "../utils/request/hooks";

export default function IndexRoute() {
    const ctx=useContext(UserContext);
    const history=useHistory();
    const [data,getData]= useRequest(getUserInfoRequest);
    const [_,set_]=useState(0);
    useEffect(()=>{
        getData({});
    },[])
    useEffect(()=>{
        if(data.state==='finish'){
            if(data.data!==undefined){
                ctx.userInfo=data.data.result;
                ctx.user_id=data.data.result?.user_id
                set_(_+1);
            }else{
                localStorage.clear();
                history.push('/sign/signin')
            }
        }
        if(data.state === 'error'){
            history.push('/sign/signin')
        }
    },[data]);
    return (
        <Route path='/index'>
            {
                data.state=== 'finish'?<Index/>:null
            }
        </Route>
    )
}
