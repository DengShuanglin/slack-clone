import React from 'react'
import './ChatBody.css'
import EtMessage from '../../../../../../../components/src/EtMessage/etMessage'
import EsDivider from '../../../../../../../components/src/EtDivider/etDivider'
const ChatBody:React.FC<any> = (props) => {


    return (
        <div className='chat_body'>
            <EtMessage userId='12316546' userName='xiaoming'>
                {"123456123456123456123456123456123456123456123456123456123456123456123456123456123456123456123456123456123456123456"}
            </EtMessage>
            <EsDivider time='Monday,March 1st'></EsDivider>
            <EtMessage userId='12316546' userName='xiaoming'>
                {"123456"}
            </EtMessage>
            <EtMessage userId='12316546' userName='xiaoming'>
                {"123456"}
            </EtMessage>
            <EtMessage userId='12316546' userName='xiaoming'>
                {"123456"}
            </EtMessage>
            <EtMessage userId='12316546' userName='xiaoming'>
                {"123456"}
            </EtMessage>
            <EtMessage userId='12316546' userName='xiaoming'>
                {"123456"}
            </EtMessage>
            <EtMessage userId='12316546' userName='xiaoming'>
                {"123456"}
            </EtMessage>
        </div>
        
    )
}

export default ChatBody