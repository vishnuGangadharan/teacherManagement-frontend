// src/components/NoAuth.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../redux/store';

const StudentNoAuth = () => {
    const studentInfo = useSelector((state: RootState) => state.student.studentInfo);
    return studentInfo ? <Navigate to="/student/studentHome" /> : <Outlet />;
};

export default StudentNoAuth;
