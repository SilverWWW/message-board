import '../css/MessageBoard.css';
import NewMessageForm from './NewMessageForm.js';
import MessageList from './MessageList.js';
import React, { useState, useEffect } from 'react';
import { useAuth } from "../auth/AuthContext";
import supabase from '../auth/supabaseClient';


function MessageBoard() {

  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  
  const getUserName = async (id) => {

    const {data, error} = await supabase
      .from('users')
      .select('name')
      .eq('id', id)
      .maybeSingle();
    
      if (error) {
        console.error('Error getting user name:', error);
        return "Unknown";
      }

      return data.name;
  }


  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        created_at,
        content,
        posted_by,
        id
      `);

    if (error) {
      console.error('Error fetching messages:', error);
      return;
    }

    const formattedMessages = await Promise.all(data.map(async (message) => {
      
      const username = await getUserName(message.posted_by);
      
      return {
        username,
        text: message.content,
        timestamp: new Date(message.created_at),
        id: message.id,
        user_id: message.posted_by
      };
    }));

    setMessages(formattedMessages);
  };


  const deleteMessage = async (messageId) => {
    const { error } = await supabase
      .from('messages')
      .delete()
      .match({ id: messageId });
  
    if (error) {
      console.error('Error deleting message:', error);
    } else {
      setMessages(messages.filter((message) => message.id !== messageId));
    }
  };

  const updateMessage = async (messageId, editedMessage) => {
    const { error } = await supabase
      .from('messages')
      .update({ content: editedMessage })
      .match({ id: messageId });
  
    if (error) {
      console.error('Error updating message:', error);
    } else {
      setMessages(messages.map((message) => {
        if (message.id === messageId) {
          message.text = editedMessage;
        }
        return message;
      }));
    }

  };



  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel('message-board-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, payload => {
        fetchMessages();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const sendMessage = async (messageText) => {

    const sentAt = new Date();

    const { data, error } = await supabase
      .from('messages')
      .insert([
        { content: messageText, posted_by: user.id, created_at: sentAt }
      ]);

    if (error) {
      console.error('Error sending message:', error);
      return;
    }

    setMessages(messages.concat({
      username: user.name,
      text: messageText,
      timestamp: sentAt,
      id: -4503599627370496, // placeholder for fast send
    }));

    fetchMessages();
  }
  
  



  return (



    <div className='parent-container'>

      <p className='title-header'>What's on your mind..?</p>
      <div className='message-board'>
        <NewMessageForm onSendMessage={sendMessage} />  
        <MessageList messages={messages} deleteMessage={deleteMessage} updateMessage={updateMessage}/>
      </div>
    </div>
    

    );


}

export default MessageBoard;
