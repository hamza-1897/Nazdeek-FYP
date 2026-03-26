import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/loginScreen'; 
import SignupScreen from '../screens/signupScreen';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{ headerShown: false }} 
    >
      <Stack.Screen name="Login" component={loginScreen} />
      <Stack.Screen name="Signup" component={signupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;