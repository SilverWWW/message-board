import "../css/Message.css";
import moment from 'moment';
import { useState } from 'react';
import MessageKebabMenu from "./MessageKebabMenu";
import { useRef } from 'react';
import { useEffect } from 'react';
import GeneralMessageFilter from '../message-filter/GeneralMessageFilter';

function Message({message, timestamp, username, id, deleteMessage, updateMessage, isMenuOpen, toggleMenu }) {

    const [messageError, setmessageError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedMessage, setEditedMessage] = useState(message);
    const editAreaRef = useRef(null);
    const saveButtonRef = useRef(null);


    const handleDelete = (event) => {
        toggleMenu(false);
        deleteMessage(id);
    }

    const handleEdit = () => {
        toggleMenu(false);
        setIsEditing(true);
    };

    const handleEditBlur = (event) => {
        if (editAreaRef.current && !editAreaRef.current.contains(event.relatedTarget) &&
        (!saveButtonRef.current || !saveButtonRef.current.contains(event.relatedTarget))) {
            handleCancel();
        }
    };
    
    const handleCancel = () => {
        setIsEditing(false);
        setEditedMessage(message);
    };
    
    const handleSave = async () => {

        if (editedMessage.length > 128) {
            handleCancel();
            setmessageError('Message cannot be longer than 128 characters');
            setEditedMessage(message);
            return;
        }

        if (!editedMessage.trim()) {
            handleCancel();
            setmessageError('Message cannot empty');
            setEditedMessage(message);
            return;
        }

        const { censored } = await GeneralMessageFilter({text: editedMessage});
        
        updateMessage(id, censored);
        setIsEditing(false);
    };


    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          if (isEditing) {
            handleSave();
          }
        }
      };

    useEffect(() => {
        setEditedMessage(message);
    }, [message]);

    useEffect(() => {
        if (isEditing && editAreaRef.current) {
            editAreaRef.current.focus();
        }
    }, [isEditing]);

    useEffect(() => {
        const currentRef = editAreaRef.current;
        if (currentRef) {
            currentRef.addEventListener('blur', handleEditBlur, true);
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('blur', handleEditBlur, true);
            }
        };
    }, []);

    useEffect(() => {
        if (messageError) {
            const timer = setTimeout(() => {
                setmessageError(''); // Clear the error message after 5 seconds
            }, 3000);

            return () => clearTimeout(timer); // Cleanup the timer
        }
    }, [messageError]);

return (
    <div className="message">
        <div className="message-header">
            <span className="message-username">Posted by <b>{username}</b></span>
            <div className="message-header-right">
                <span className="message-timestamp"><i>{moment(timestamp).fromNow()}</i></span>
                <MessageKebabMenu 
                    isOpen={isMenuOpen}
                    toggleMenu={toggleMenu}
                    handleDelete={handleDelete} 
                    handleEdit={handleEdit}
                />
            </div>
        </div>

        {isEditing ? (
            <textarea
                ref={editAreaRef}
                className="edit-message-textarea"
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
                onBlur={handleEditBlur}
                onKeyDown={handleKeyDown}
            />
        ) : (
            <div className="message-body">{message}</div>
        )}

        {isEditing && (
            <div className="edit-message-buttons">
                <button ref={saveButtonRef} className="edit-message-button" onClick={handleSave}>Save</button>
                <button className="edit-message-button cancel" onClick={handleCancel}>Cancel</button>
            </div>
        )}

        {messageError && <p className='error-message' style={{justifyContent: 'flex-start'}}>{messageError}</p>}

    </div>
);

}

export default Message;