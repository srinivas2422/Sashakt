import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from '../config.js';
import '../components/Bot.css';
import ActionProvider from '../ActionProvider.js'
import MessageParser from '../MessageParser.js'


const Bot = () => {
    return ( 
        <div className="Bot">
            <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            />
        </div>
     );
}
 
export default Bot;