import style from './style.module.scss'
import {createContext, useMemo, useRef} from "react";
import {WorkspaceHeader} from "./compontents/workspace-header";
import {WorkspaceContent, WorkspaceContentSideBar} from "./compontents/workspace-content";

const WorkspaceContext=createContext<any>({});
export {
    WorkspaceContext
}
export default function Workspace(){
    const ref=useRef(null);
    const cache=useMemo(()=>({
        rootRef:ref
    }),[ref])


    return <WorkspaceContext.Provider value={cache}>
        <div className={style['workspace-container']}>
            <WorkspaceHeader/>
            <div className={style['workspace-body']}>
                <WorkspaceContentSideBar/>
                <WorkspaceContent/>
            </div>
        </div>
    </WorkspaceContext.Provider>

}
