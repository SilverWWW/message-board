import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MessageBoard from "./MessageBoard";
import Login from "./LoginHome";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import './global.css';


function App() {


    return (

    <Router>
        <Routes>
            <Route path="/" element={<Navigate replace to="/loginhome" />} />
            <Route path="/loginhome" element={<Login />} />
            <Route path="/messageboard" element={<MessageBoard />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    </Router>

    );
}

export default App;