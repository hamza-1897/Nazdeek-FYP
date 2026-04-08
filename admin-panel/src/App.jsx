import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Forgotpassword from './pages/Forgotpassword';

function App() {
  return (
  
  <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<Login />} />

        <Route path="/forgot-password" element={<Forgotpassword />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;