import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserRoutes from './routes/TeacherRoutes';
import StudentRoutes from './routes/StudentRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path='/student/*' element={<StudentRoutes/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
