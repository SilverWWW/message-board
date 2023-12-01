import React, { useEffect } from 'react';
import '../css/MessageKebabMenu.css';

const MessageKebabMenu = ({ isOpen, toggleMenu, handleDelete, handleEdit }) => {

    useEffect(() => {
        const closeMenu = (e) => {
            if (!e.target.closest('.kebab-menu-container')) {
                toggleMenu(false); // Use the toggleMenu function passed as a prop
            }
        };
    
        if (isOpen) {
            document.addEventListener('click', closeMenu);
        }
    
        return () => {
            document.removeEventListener('click', closeMenu);
        };
    }, [isOpen, toggleMenu]); // Include toggleMenu in the dependency array

    return (
        <div className="kebab-menu-container">
            <button className='button-kebab-menu' onClick={toggleMenu}>☰</button>
            {isOpen && (
                <ul className="menu-options">
                    <li onClick={handleEdit}>Edit</li>
                    <li onClick={handleDelete}>Delete</li>
                    <li onClick={() => console.log('report message')}>Report Message</li>
                </ul>
            )}
        </div>
    );
};

export default MessageKebabMenu;
