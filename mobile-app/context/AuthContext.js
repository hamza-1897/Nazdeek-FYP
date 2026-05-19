import React, { createContext, useEffect,useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
          setUserToken(token);
        }
      } catch (e) {
        console.log("Token fetch error:", e);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  const login = (token) => {
    setUserToken(token);
    SecureStore.setItemAsync('userToken', token).catch(e => {
        console.log("Token save error:", e);
    });
  };

  const logout = () => {
    setUserToken(null);
    SecureStore.deleteItemAsync('userToken').catch(e => {
        console.log("Token delete error:", e);
    });
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;