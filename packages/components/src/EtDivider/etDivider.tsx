import React from 'react';
import './etDivider.css'
export interface IEtDividerProps {
    time?: string
    color?: string
    lineColor?: string
}

const EtDivider: React.FC<IEtDividerProps> = (props) => {
    const { time, color, lineColor } = props
    return (
       <>
        <div className='divider-container'>
            <div className='line' style={{borderBottom: `1px solid ${lineColor}`,}}></div>
            <div className='divider-time' style={{color: color,}}>
                {time}
                <div style={{height:'100%',marginLeft:'2px'}}>
                    <img src="http://cdn.qiniu.shuyuanlab.cn/vector.png" style={{height: '10px', width:'10px',justifyContent:'center',alignItems:'center'}} alt="" />
                </div>
            </div>
            <div className='line' style={{
                borderBottom: `1px solid ${lineColor}`,  
            }}></div>
        </div>
       </>
    ); 
}

EtDivider.defaultProps = {
    time : '',
    color : '#1D1C1D',
    lineColor : '#DFDFDF',

}

export default EtDivider


