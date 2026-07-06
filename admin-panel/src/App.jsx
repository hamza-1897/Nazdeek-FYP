import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import { AuthProvider } from './context/AuthContext';

import Login from './pages/Login';
import Forgotpassword from './pages/Forgotpassword';
import Users from './pages/Users';
import Providers from './pages/Providers';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Categories from './pages/Categories';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} /> 
            
            <Route path="users" element={<Users />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="providers" element={<Providers />} />
            <Route path='categories' element={<Categories />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;