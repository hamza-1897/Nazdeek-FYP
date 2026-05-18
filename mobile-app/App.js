import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './Navigation/auth-navigation'; 
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
     <AuthNavigation />
    </NavigationContainer>
    </AuthProvider>
  );
}