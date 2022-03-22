import style from "../../style.module.scss";
import useMask from "@slack-pkg/components/src/mask";
import {WorkspaceContext} from "../../index";
import {useContext} from "react";

function EnterpriseList(){
    const ctx=useContext(WorkspaceContext)

    return <div>

    </div>
}

export function WorkspaceContentSideBar(){
    return <div className={style['workspace-content-side-bar']}>
        <EnterpriseList/>
        <div>

        </div>
    </div>
}

export function WorkspaceContent(){
    const [visible,setVisible]=useMask({
        onClick(){
            setVisible(!visible)
        }
    });
    return <div className={style['workspace-content']}>
        <button onClick={()=>setVisible(!visible)}>1</button>
    </div>
}

