import React, { useEffect, useState } from 'react';
import AddStudent from './AddStudent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { blockStudent, deleteStudent, getStudents } from '../../api/user';
import { Students } from '../../services/interface/studetns';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../redux/userSlice';
import { Button } from '@nextui-org/react';

const Home = () => {
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const teacherId = user._id; 
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [students, setStudents] = useState<Students[]>([]);

  const getStudentsData = async (teacherId: string) => {
    try {
      const response = await getStudents(teacherId);
      console.log('Fetched students:', response);
      setStudents(response); 
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };


  const refreshStudentList = () => {
    getStudentsData(teacherId);
  };
if(teacherId){
  useEffect(() => {
    getStudentsData(teacherId);
  }, [teacherId]); 

}


  const  handleLogout = () =>{
    dispatch(userLogout()); 
    localStorage.removeItem('token');
    navigate('/student/studentLogin')
  }


  const handleDelete= async(id:string) => {
    const response = await deleteStudent(id)
    if(response){
      console.log('delete',response);
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== id) 
    );

      toast.success(response.message)
    }
  }

  const blockStudents = async(id:string, status:boolean) => {
    const response = await blockStudent(id, status)
    console.log(response);
    if(response){
      console.log('vlock',response);
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === id ? { ...student, blocked: response.data.blocked } : student
        )
      );
      toast.success(response.message)
    }
  }

  return (
    <div className="p-6 bg-gray-100 h-screen">
      <h1 className="text-2xl font-bold mb-4">Teacher Home Page</h1>
      <AddStudent onStudentAdded={refreshStudentList}/>
      <Button onClick={handleLogout} type="submit" color="warning" className="w-32 max-w-xs mx-auto ">
              Logout
            </Button>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-10 text-left  text-gray-700">Picture</th>
              <th className="py-2 px-4 text-left text-gray-700">Name</th>
              <th className="py-2 px-4 text-left text-gray-700">Class</th>
              <th className="py-2 px-4 text-left text-gray-700">age</th>
              <th className="py-2 px-4 text-left text-gray-700">Delete</th>
              <th className="py-2 px-4 text-left text-gray-700">Block</th>

            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? students.map((student) => (
              <tr key={student._id} className="hover:bg-gray-100"> {/* Use student._id as a key */}
                <td className="py-4 px-16">
                  <img src={student.profilePic} alt={`${student.name}'s profile`} className="w-12 h-12 rounded-full" />
                </td>
                <td className="py-4 px-4 text-gray-800">{student.name}</td>
                <td className="py-4 px-4 text-gray-800">{student.className}</td>
                <td className="py-4 px-4 text-gray-800">{student.age}</td>

                <td className="py-4 px-4">
                  <button className="bg-red-500 text-white py-1 px-3 rounded mr-20" onClick={()=>handleDelete(student._id)}>Delete</button>
                </td>
                <td className="py-4 px-4"> 
                  <button className="bg-yellow-500 text-white py-1 px-3 rounded mr-20" onClick={()=>blockStudents(student._id, student.blocked)}>{student.blocked ? 'Unblock' : 'Block'}</button>
                </td> 
                {/* <td>
                  <button className="bg-blue-500 text-white py-1 px-3 rounded">View Profile</button>
                </td> */}
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="py-4 px-4 text-center text-gray-500">No students</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
