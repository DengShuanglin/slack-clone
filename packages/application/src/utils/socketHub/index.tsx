import {io} from "socket.io-client";
import {createContext, ReactNode, useEffect, useMemo} from "react";
import {Socket} from "socket.io-client/build/esm/socket";

const baseURL = ''

type SocketHubContextValueType = {
    socketClient: null | Socket
    eventCallback: {
        [eventKey: string]: {
            [callBackKey: string]: Function
        }
    },
    registerCallback: (eventKey: string | string[], callBackKey: string, fn: Function) => void;
}

const SocketHubContext = createContext<SocketHubContextValueType>({
    socketClient: null,
    eventCallback: {},
    registerCallback:()=>{}
});

type SocketHubProviderPropsType = {
    children?: ReactNode
}

function SocketHubProvider(props: SocketHubProviderPropsType) {
    const cache = useMemo<SocketHubContextValueType>(() => {
        return {
            socketClient: null,
            eventCallback: {},
            registerCallback:()=>{},
        }
    }, [])
    useEffect(() => {
        if(cache.socketClient==null)cache.socketClient = io(baseURL, {})
        cache.registerCallback=(eventCallbackKey,eventKey,fn)=>{
            [eventCallbackKey].flat(9999999).forEach((value)=>{
                cache.eventCallback[value]={
                    ...cache.eventCallback[value],
                    [eventKey]:fn
                }
            })
        }
        return
    }, [])
    useEffect(()=>{
        if(cache.socketClient!==null){
            for (let eventCallbackKey in cache.eventCallback) {
                cache.socketClient.on(eventCallbackKey,(...data)=>{
                    for (let eventCallbackElementKey in (cache.eventCallback[eventCallbackKey]||{})) {
                        cache.eventCallback[eventCallbackKey][eventCallbackElementKey]?.(eventCallbackKey,data);
                    }
                })
            }
        }
    },[cache.socketClient])
    return <SocketHubContext.Provider value={cache}>
        {props.children}
    </SocketHubContext.Provider>
}

export default SocketHubProvider
export {SocketHubContext}
