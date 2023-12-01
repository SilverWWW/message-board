import React, { useState } from 'react';
import '../css/NewMessageForm.css';

function NewMessageForm({ onSendMessage }) {
  
    const [message, setMessage] = useState('');
    const [messageError, setmessageError] = useState('');

  const handleSubmit = (event) => {

    event.preventDefault();

    if (!message.trim()) {
      setmessageError('Message cannot be empty');
      return;
    }

    if (message.trim().length > 128) {
      setmessageError('Message cannot be longer than 128 characters');
      return;
    }

    onSendMessage(message);
    setMessage('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <form className="new-message-form" onSubmit={handleSubmit}>
      <textarea
        className="message-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
      />

      <div className='message-form-bottom-content'>
        <button type='submit' className="button">Send</button>
        {messageError && <p className='error-message'>{messageError}</p>}
      </div>
    </form>
  );
}

export default NewMessageForm;
