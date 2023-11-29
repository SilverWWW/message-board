import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MessageBoard from "./message-board/MessageBoard";
import Login from "./auth/LoginHome";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Footer from "./common/Footer";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import './css/global.css';

function App() {
    return (
        <AuthProvider>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Router>
                    <div className='content'>
                        <Routes>
                            <Route path="/" element={<Navigate replace to="/loginhome" />} />
                            <Route path="/loginhome" element={<Login />} />
                            <Route path="/messageboard" element={<MessageBoard />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/signup" element={<SignUp />} />
                        </Routes>
                    </div>
                    <Footer/>
                </Router>
            </div>
        </AuthProvider>
    );
}

export default App;
