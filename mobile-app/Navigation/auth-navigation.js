import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/loginScreen';
import SignupScreen from '../screens/signupScreen';
import ForgotPassword from '../screens/forgotPassword'; 
import VerifyOTP from '../screens/verifyOTP'; 
import ResetPassword from '../screens/resetPassword';
import PasswordUpdated from '../screens/passwordUpdate';
import RoleSelection from '../screens/roleSelection';

import AppTabs from '../Components/AppTabs';
import NotificationScreen from '../screens/NotificationScreen';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator 
      initialRouteName="RoleSelection"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
       <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="PasswordUpdated" component={PasswordUpdated} />
        <Stack.Screen name="RoleSelection" component={RoleSelection} />
       
        <Stack.Screen name='Notification' component={NotificationScreen} />
        <Stack.Screen name="AppTabs" component={AppTabs} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;