import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Signup = lazy(() => import('../pages/teacher/Signup'));
const Home = lazy(() => import('../pages/teacher/Home'));
const RequireAuth = lazy(()=> import('../protectedRoutes/teacher/Teacher'))
const NoAuth = lazy(()=> import('../protectedRoutes/teacher/NoTeacher'))
const Login  = lazy(()=> import('../pages/teacher/Login'))


const UserRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
      <Route element={<NoAuth />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

           </Route>
           
        {/* <Route element={<NoAuth />}> */}
          <Route path="/" element={<Home />} />
          {/* </Route> */}

          
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
