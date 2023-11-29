import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/loginhome" />;
    }

    return children;
};

export default PrivateRoute;
