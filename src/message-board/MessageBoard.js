import '../css/MessageBoard.css';
import NewMessageForm from './NewMessageForm.js';
import MessageList from './MessageList.js';
import React, { useState, useEffect } from 'react';


const fetchedMessages = [
  { username: 'Alice', text: 'Hello!', timestamp: '10 minutes ago' },
  { username: 'Bob', text: 'Hi there!', timestamp: '8 minutes ago' },
  // ... more messages
];

function MessageBoard() {

  const onSendMessage = (message) => {
    const newMessage = {
      username: 'Current User',
      text: message,
      timestamp: new Date()
    };
  
    setMessages([...messages, newMessage]);
  }

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchedMessages = [
      { username: 'Alice', text: 'Hello!', timestamp: new Date(2023, 10, 27, 20, 0, 0) },
      { username: 'Bob', text: 'Hi there!', timestamp: new Date(2023, 10, 27, 21, 0, 0) },

    ];
    setMessages(fetchedMessages);
  }, [])
  
  
  return (



    <div className='parent-container'>

      <p className='title-header'>What's on your mind..?</p>
      <div className='message-board'>
        <NewMessageForm onSendMessage={onSendMessage} />  

        <MessageList messages={messages} />
      </div>
    </div>
    

    );


}

export default MessageBoard;
