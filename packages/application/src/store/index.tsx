import {createContext, ReactNode, useMemo, useState} from "react";

type UserInfoType={
    user_id:number;
    nickname:string;
    avatar:string;
    channels:string[];
    friends:Array<{
        id:number;
        nickname:string;
        avatar:string;
    }>
}


type UserContextValueType = {
    userInfo?:UserInfoType;
    userId?:number;
}


const UserContext=createContext<UserContextValueType>({});

type UserContextProvider = {
    children?:ReactNode;
}

function UserContextProvider(props:UserContextProvider){
    const cache = useMemo(()=>({

    }),[])

    return <UserContext.Provider value={cache}>
        {props.children}
    </UserContext.Provider>
}

export default UserContextProvider;

export {
    UserContext
}
