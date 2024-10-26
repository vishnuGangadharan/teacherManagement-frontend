// src/components/RequireAuth.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../redux/store';

const StudentRequireAuth = () => {
    const studentInfo = useSelector((state: RootState) => state.student.studentInfo);
    return studentInfo ? <Outlet /> : <Navigate to="/student/studentLogin" />;
};

export default StudentRequireAuth;
