import React, { useState } from 'react';
import '../css/NewMessageForm.css';
import { useEffect } from 'react';
import GeneralMessageFilter from '../message-filter/GeneralMessageFilter';

function NewMessageForm({ onSendMessage }) {
  
    const [message, setMessage] = useState('');
    const [messageError, setmessageError] = useState('');

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (!message.trim()) {
      setmessageError('Message cannot be empty');
      return;
    }

    if (message.length > 128) {
      setmessageError('Message cannot be longer than 128 characters');
      return;
    }

    const { censored } = await GeneralMessageFilter({text: message});
    
    onSendMessage(censored);
    setMessage('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };


  useEffect(() => {
    if (messageError) {
        const timer = setTimeout(() => {
            setmessageError(''); 
        }, 3000);

        return () => clearTimeout(timer);
    }
  }, [messageError]);

  return (
    <form className="new-message-form" onSubmit={handleSubmit}>
      <textarea
        className="message-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
      />

      <button type='submit' className="button">Send</button>

      {messageError && <p className='error-message'>{messageError}</p>}
  
    </form>
  );
}

export default NewMessageForm;
