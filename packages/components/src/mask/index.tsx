import style from './style.module.scss';
import {CSSProperties, Dispatch, MutableRefObject, useEffect, useRef, useState} from "react";
type MaskPropsType={
    style?:CSSProperties;
    containerRef?:MutableRefObject<HTMLElement>;
    onClick?:(state:boolean,e:MouseEvent)=>void;
    onChange?:(state:boolean)=>void;
}
export default function useMask(props?:MaskPropsType):[boolean,Dispatch<React.SetStateAction<boolean>>]{
    const [state,setState] = useState(true);
    const mask=useRef(document.createElement("div"));
    const containerRef=props?.containerRef?.current || document.documentElement;
    let classNameList=[style['mask-container']];
    if(state)classNameList.push(style['none']);
    mask.current.className=classNameList.join(' ');
    mask.current.onclick=(e)=>props?.onClick?.(state,e);
    useEffect(()=>{
        containerRef.appendChild(mask.current);
        return ()=>{
            mask.current.remove()
        }
    },[containerRef])



    return [state,setState]
}
