import "../css/Message.css";
import moment from 'moment';
import { useState } from 'react';
import MessageKebabMenu from "./MessageKebabMenu";
import { useRef } from 'react';
import { useEffect } from 'react';

function Message({message, timestamp, username, id, deleteMessage, updateMessage, isMenuOpen, toggleMenu }) {

    const [isEditing, setIsEditing] = useState(false);
    const [editedMessage, setEditedMessage] = useState(message);
    const editAreaRef = useRef(null);
    const saveButtonRef = useRef(null);

    const handleDelete = (event) => {
        toggleMenu(false);
        deleteMessage(id);
    }

    
    const handleEditBlur = (event) => {
        if (editAreaRef.current && !editAreaRef.current.contains(event.relatedTarget) &&
        (!saveButtonRef.current || !saveButtonRef.current.contains(event.relatedTarget))) {
            handleCancel();
        }
    };

    useEffect(() => {
        setEditedMessage(message);
    }, [message]);

    useEffect(() => {
        if (isEditing && editAreaRef.current) {
            editAreaRef.current.focus(); // Set focus to the textarea
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


    const handleEdit = () => {
        setIsEditing(true);
        toggleMenu(false);
    };
    
    const handleCancel = () => {
        setIsEditing(false);
        setEditedMessage(message);
    };
    
    const handleSave = () => {
        updateMessage(id, editedMessage); // Assuming updateMessage is a prop function to update the message
        setIsEditing(false);
    };

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
    </div>
);

}

export default Message;