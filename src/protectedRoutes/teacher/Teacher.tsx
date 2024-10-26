// src/components/RequireAuth.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../redux/store';

const RequireAuth = () => {
    const user = useSelector((state: RootState) => state.auth.userInfo);
    return user ? <Outlet /> : <Navigate to="/signup" />;
};

export default RequireAuth;
