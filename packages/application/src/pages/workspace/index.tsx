import style from './style.module.scss'
import {createContext, useContext} from "react";


function WorkspaceHeader(){
    return <div className={style['workspace-header']}>

    </div>
}
function WorkspaceContentSideBar(){
    return <div className={style['workspace-content-side-bar']}>

    </div>
}
function WorkspaceContent(){
    return <div className={style['workspace-content']}>

    </div>
}

const WorkspaceContext=createContext({});

export default function Workspace(){
    return <WorkspaceContext.Provider value={{}}>
        <div className={style['workspace-container']}>
            <WorkspaceHeader></WorkspaceHeader>
            <div className={style['workspace-body']}>
                <WorkspaceContentSideBar/>
                <WorkspaceContent/>
            </div>
        </div>
    </WorkspaceContext.Provider>

}
