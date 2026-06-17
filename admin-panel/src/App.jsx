import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';

import Login from './pages/Login';
import Forgotpassword from './pages/Forgotpassword';
import Users from './pages/Users';
import Providers from './pages/Providers';
import Categories from './pages/Categories';

function App() {
  return (
  
  <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<Login />} />

         <Route path='/admin' element={<AdminLayout />}>

          <Route path="/admin/users" element= {<Users/>} />

          <Route path="/admin/categories" element= {<Categories/>} />
         </Route>

        <Route path="/forgot-password" element={<Forgotpassword />} />
        
        
      </Routes>
    </BrowserRouter>

  );
}

export default App;