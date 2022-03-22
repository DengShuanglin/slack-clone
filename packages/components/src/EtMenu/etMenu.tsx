import React, { useState, useEffect, createContext} from "react";

type EtMenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: number) => void;
export interface IEtMenuProps {
    defaultIndex?: number;
    className?: string;
    mode?: EtMenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
}

interface IEtMenuContext {
   index: number;
   onSelect?: SelectCallback;
}

export const EtMenuContext = createContext<IEtMenuContext>({index: 0})

const EtMenu:React.FC<IEtMenuProps> = (props) => {
   const { className, mode, style, children, defaultIndex, onSelect} = props;
   const [ currentActive, setActive] = useState(defaultIndex)
   
   const handleClick = (index: number) => {
       setActive(index)
       if(onSelect){
        onSelect(index)
       }
   }

    const passedContext: IEtMenuContext = {
       index:currentActive ? currentActive : 0,
       onSelect: handleClick,
    }
   
    return (
       <ul className="menu-group" style={style}>
           <EtMenuContext.Provider value={passedContext}>
                {children}
           </EtMenuContext.Provider>
       </ul>
    )
   
}

EtMenu.defaultProps = {
    defaultIndex: 0,
    mode: 'horizontal'
}

export default EtMenu