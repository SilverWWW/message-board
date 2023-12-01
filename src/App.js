import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MessageBoard from "./message-board/MessageBoard";
import LoginHome from "./auth/LoginHome";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Footer from "./common/Footer";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/global.css';

function App() {

    return (
        <AuthProvider>
            <Router>
                <UserRedirect />
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <div className='content'>
                        <AppRoutes />
                    </div>
                    <Footer/>
                </div>
            </Router>
        </AuthProvider>
    );
}

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/loginhome"/>} />
            <Route path="/loginhome" element={<LoginHome />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/messageboard" element={
                <PrivateRoute>
                    <MessageBoard />
                </PrivateRoute>
            } />
        </Routes>
    );
};


const UserRedirect = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/messageboard');
        }
    }, [user, navigate]);

    return null;
};

export default App;
