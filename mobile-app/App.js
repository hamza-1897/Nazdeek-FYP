import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './Navigation/auth-navigation'; 
import { AuthProvider } from './context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
      
        <NavigationContainer>
        
          <AuthNavigation />
        
        </NavigationContainer>
      
    </AuthProvider>
    </SafeAreaProvider>
  );
}