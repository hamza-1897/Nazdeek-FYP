import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './Navigation/auth-navigation'; 
export default function App() {
  return (
    <NavigationContainer>
     <AuthNavigation />
    </NavigationContainer>
  );
}