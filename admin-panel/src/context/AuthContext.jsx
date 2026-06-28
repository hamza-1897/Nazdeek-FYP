import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const data = localStorage.getItem('adminData');
    if (data && data !== "undefined") {
      try { return JSON.parse(data); } catch { return null; }
    }
    return null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('adminToken') || null);

  const loginAdmin = (accessToken, adminData) => {
    setToken(accessToken);
    setAdmin(adminData);
    localStorage.setItem('adminToken', accessToken);
    localStorage.setItem('adminData', JSON.stringify(adminData)); 
  };

  const logoutAdmin = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
  };

  return (
    <AuthContext.Provider value={{ admin, token, loginAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAdmin = () => useContext(AuthContext);