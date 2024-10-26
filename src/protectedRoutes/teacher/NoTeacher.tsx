// src/components/NoAuth.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../redux/store';

const NoAuth = () => {
    const user = useSelector((state: RootState) => state.auth.userInfo);
    return user ? <Navigate to="/" /> : <Outlet />;
};

export default NoAuth;
