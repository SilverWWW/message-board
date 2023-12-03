import React, { useEffect } from 'react';
import '../css/MessageKebabMenu.css';
import { useAuth } from "../auth/AuthContext";


const MessageKebabMenu = ({ isOpen, toggleMenu, handleDelete, handleEdit, handleReport, user_id }) => {

    const { user } = useAuth();

    useEffect(() => {
        const closeMenu = (e) => {
            if (!e.target.closest('.kebab-menu-container')) {
                toggleMenu(false);
            }
        };
    
        if (isOpen) {
            document.addEventListener('click', closeMenu);
        }
    
        return () => {
            document.removeEventListener('click', closeMenu);
        };
    }, [isOpen, toggleMenu]);

    return (
        <div className="kebab-menu-container">
            <button className='button-kebab-menu' onClick={toggleMenu}>☰</button>
            {isOpen && (
                <ul className="menu-options">
                    {user.id == user_id && <li onClick={handleEdit}>Edit</li>}
                    {user.id == user_id && <li onClick={handleDelete}>Delete</li>}
                    {user.id != user_id &&<li onClick={handleReport}>Report Message</li>}
                </ul>
            )}
        </div>
    );
};

export default MessageKebabMenu;
