import React, { createContext, useEffect,useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [providerInfo, setProviderInfo] = useState(null);


  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        const savedUser = await SecureStore.getItemAsync('userData');
        if (token) {
          setUserToken(token);
        }
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUserInfo(userData);
          setProviderInfo(userData.providerInfo || null);
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
    setProviderInfo(userInfo.providerInfo || null);

    await SecureStore.setItemAsync('userToken', token);
    await SecureStore.setItemAsync('userData', JSON.stringify(userInfo));
  };

  const logout = async () => {
    setUserToken(null);
    setUserInfo(null);
    setProviderInfo(null);
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('userData');
  };

  return (
    <AuthContext.Provider value={{ userToken, userInfo, providerInfo, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;