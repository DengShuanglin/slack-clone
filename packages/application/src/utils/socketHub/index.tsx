import {io} from "socket.io-client";
import {createContext, ReactNode, useMemo} from "react";

const SocketHubContext = createContext({});

type SocketHubProviderPropsType = {
    children?: ReactNode
}

function SocketHubProvider(props: SocketHubProviderPropsType) {
    const cache = useMemo(() => {
        return {}
    }, [])
    return <SocketHubContext.Provider value={cache}></SocketHubContext.Provider>
}
