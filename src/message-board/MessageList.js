import React from 'react';
import Message from './Message';
import '../css/MessageList.css';
import { useState } from 'react';

function MessageList({ messages, deleteMessage, updateMessage, reportMessage}) {

  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (id) => {
    if (openMenuId === id) {
        setOpenMenuId(null);
    } else {
        setOpenMenuId(id);
    }
};

  return (

    <div className="message-list">
      {messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((message, index) => (
        <Message
          key={index}
          id={message.id}
          user_id={message.user_id}
          username={message.username}
          message={message.text}
          timestamp={message.timestamp}
          deleteMessage={deleteMessage}
          updateMessage={updateMessage}
          isMenuOpen={openMenuId === message.id}
          toggleMenu={() => toggleMenu(message.id)}
          reportMessage={reportMessage}
        />
      ))}
    </div>
  );
}

export default MessageList;
