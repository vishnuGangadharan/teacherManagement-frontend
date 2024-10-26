import React from 'react';
import { Input, Button } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { studentLogout } from '../../redux/studentSlice';
import { useNavigate } from 'react-router-dom';
const StudentHome = () => {
    const studentInfo = useSelector((state: RootState) => state.student.studentInfo);

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(studentLogout()); 
        localStorage.removeItem('token');
        navigate('/student/studentLogin')
      };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className=" flex flex-col justify-center items-center p-28 bg-white rounded-lg shadow-lg max-w-md">
        <h1 className='text-3xl font-semibold text-gray-700 mt-6 mb-6'>welcome</h1>
        <img
          src={studentInfo.profilePic}
          alt="Student's profile"
          className="w-24 h-24 rounded-full mb-9" // Changed mr-6 to mb-4 for bottom margin
        />
        <div className='text-center'>
          <h2 className="text-xl font-bold text-gray-800">{studentInfo.name}</h2>
          <p className="text-gray-600">Class: {studentInfo.className}</p>
          <p className="text-gray-600">Age: {studentInfo.age}</p>
        </div>
        <Button type="submit" onClick={handleLogout} color="warning" className="w-full mt-10 max-w-xs mx-auto">
              logout
            </Button>
      </div>
    </div>
  );
};

export default StudentHome;
