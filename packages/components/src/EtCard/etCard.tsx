import React from 'react';
import './EtCard.css'

export interface IEtCardProps {
    imgUrl?: string
    width?: string
    height?: string
    name: string
    describe?: string
}

const EtCard:React.FC<IEtCardProps> = (props) => {
    const { imgUrl, width, height, name, describe }  = props
    const jugStyles: React.CSSProperties = {
        display: describe === '' ? 'none' : 'flex'
    };
    return (
        <div className='card-container' 
            style={{'width':width , 'height':height , 
            'display': 'flex', 'borderRadius': '8px',
            'border': '1px solid #DDDDDD', 'boxSizing': 'border-box',
            'justifyContent': 'center','alignItems': 'center'}} 
        >
            <div className='card-img'>
                <img src={imgUrl} alt={name} />
            </div>
            <div className='card-text'>
                <div className='card-name'>{name}</div>
                <div style={jugStyles} className='card-describe'>{describe}</div>
            </div>
        </div>
    )

}

EtCard.defaultProps = {
    imgUrl: 'http://cdn.qiniu.shuyuanlab.cn/Image50px.png',
    width: '347px',
    height: '62px',
    describe: ''
}

export default EtCard