import React from 'react';
import Message from './Message';
import '../css/MessageList.css';

function MessageList({ messages }) {
  return (

    <div className="message-list">
      {messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((message, index) => (
        <Message
          key={index}
          username={message.username}
          message={message.text}
          timestamp={message.timestamp}
        />
      ))}
    </div>
  );
}

export default MessageList;
