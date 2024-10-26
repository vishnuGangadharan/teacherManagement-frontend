import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const StudentLogin = lazy(() => import('../pages/student/Login'));
const StudentHome = lazy(() => import('../pages/student/StudentHome'));

const StudentRoutes = () => {
  const StudentNoAuth = lazy(()=> import('../protectedRoutes/stude/studentLogout'))
  const StudentRequireAuth = lazy(()=> import('../protectedRoutes/stude/studentLogin'))
  
  

  return (
    <div>
      

      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
      <Route element={<StudentNoAuth />}>
           <Route path="/studentLogin" element={<StudentLogin />} />
           </Route>

           <Route element={<StudentRequireAuth />}>
          <Route path="/studentHome" element={<StudentHome />} />
          </Route>
      </Routes>
    </Suspense>
    </div>
  )
}

export default StudentRoutes
