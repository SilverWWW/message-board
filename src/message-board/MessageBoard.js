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
        posted_by
      `);

      console.log(data);

    if (error) {
      console.error('Error fetching messages:', error);
      return;
    }

    const formattedMessages = await Promise.all(data.map(async (message) => {
      
      const username = await getUserName(message.posted_by);
      
      return {
        username,
        text: message.content,
        timestamp: new Date(message.created_at)
      };
    }));

    setMessages(formattedMessages);
  };

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel('message-board-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, payload => {
        console.log('Change received!', payload);
        fetchMessages(); // Refetch messages when a new one is added
      })
      .subscribe();

    // Cleanup on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const onSendMessage = async (messageText) => {

    console.log(user);

    const { data, error } = await supabase
      .from('messages')
      .insert([
        { content: messageText, posted_by: user.id, created_at: new Date() }
      ]);

    if (error) {
      console.error('Error sending message:', error);
      return;
    }

    fetchMessages();
  }
  
  
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
