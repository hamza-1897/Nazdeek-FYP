import React, { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [providerInfo, setProviderInfo] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        const refToken = await SecureStore.getItemAsync('refreshToken');
        const savedUser = await SecureStore.getItemAsync('userData');

        if (token) setUserToken(token);
        if (refToken) setRefreshToken(refToken);
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

  const login = async (accessToken, refToken, userData) => {
    setUserToken(accessToken);
    setRefreshToken(refToken || null);
    setUserInfo(userData);
    setProviderInfo(userData?.providerInfo || null);

    if (accessToken) {
      await SecureStore.setItemAsync('userToken', accessToken);
    }
    
    if (refToken && typeof refToken === 'string') {
      await SecureStore.setItemAsync('refreshToken', refToken);
    }
    
    if (userData) {
      await SecureStore.setItemAsync('userData', JSON.stringify(userData));
    }
  };

  const updateProviderDetails = async (newProviderInfo, newStatus = 'pending') => {
    const updatedUser = {
      ...userInfo,
      providerInfo: newProviderInfo,
      providerStatus: newStatus,
    };
    setUserInfo(updatedUser);
    setProviderInfo(newProviderInfo);
    await SecureStore.setItemAsync('userData', JSON.stringify(updatedUser));
  };

  const updateProviderInfo = (updatedProvider) => {
  setProviderInfo(updatedProvider);
};


const updateUserInfo = (updatedUser) => {
  setUserInfo(prev => ({
    ...prev,
    ...updatedUser
  }));
};

  const logout = async () => {
    setUserToken(null);
    setRefreshToken(null);
    setUserInfo(null);
    setProviderInfo(null);

    await SecureStore.deleteItemAsync('userToken').catch(() => {});
    await SecureStore.deleteItemAsync('refreshToken').catch(() => {});
    await SecureStore.deleteItemAsync('userData').catch(() => {});
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        refreshToken,
        userInfo,
        providerInfo,
        setUserInfo,
        updateUserInfo,
        login,
        logout,
        updateProviderInfo,
        updateProviderDetails,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;