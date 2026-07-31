import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 const savedToken = sessionStorage.getItem('adminToken') || null;
  
  const getSavedAdminData = () => {
    const data = sessionStorage.getItem('adminData');
    if (data && data !== "undefined") {
      try {
        return JSON.parse(data);
      } catch (e) {
        return null;
      }
    }
    return null;
  
  }

const [token, setToken] = useState(savedToken);
  const [admin, setAdmin] = useState(getSavedAdminData);

 const loginAdmin = (accessToken, adminData) => {
    setToken(accessToken);
    setAdmin(adminData);
    
    sessionStorage.setItem('adminToken', accessToken);
    sessionStorage.setItem('adminData', JSON.stringify(adminData));
  };


 const logoutAdmin = () => {
    setToken(null);
    setAdmin(null);
    
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminData');
  };

 return (
    <AuthContext.Provider value={{ admin, token, loginAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAdmin = () => useContext(AuthContext);