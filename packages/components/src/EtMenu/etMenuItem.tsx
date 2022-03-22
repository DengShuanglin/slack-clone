import React, { useState, useEffect, useContext} from "react";
import { EtMenuContext } from  './etMenu'
export interface EtMenuItemProps {
    index: number;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const EtMenuItem: React.FC<EtMenuItemProps> = (props) => {
    const contex = useContext(EtMenuContext)
    const { index, disabled, className, style, children} = props
    

    const handleClick = () => {
        if(contex.onSelect && !disabled){
            contex.onSelect(index)
        }
    }

    
    return (
        // if contex.index === index => 选中状态
        <li className={contex.index === index ? 'active menu-item' : 'menu-item'}  style={style} onClick={handleClick}>
            {children}
        </li>
    )
}

export default EtMenuItem