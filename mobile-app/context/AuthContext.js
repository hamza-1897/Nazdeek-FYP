import React, { createContext, useEffect,useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);


  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        const savedUser = await SecureStore.getItemAsync('userData');
        if (token) {
          setUserToken(token);
        }
        if (savedUser) {
          setUserInfo(JSON.parse(savedUser));
        }
      } catch (e) {
        console.log("Token fetch error:", e);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  const login = async (token, userInfo) => {
    setUserToken(token);
    setUserInfo(userInfo);

    await SecureStore.setItemAsync('userToken', token);
    await SecureStore.setItemAsync('userData', JSON.stringify(userInfo));
  };

  const logout = async () => {
    setUserToken(null);
    setUserInfo(null);
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('userData');
  };

  return (
    <AuthContext.Provider value={{ userToken, userInfo, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;