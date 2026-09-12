import React, { useEffect, useRef } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import AuthNavigation from './Navigation/auth-navigation'; 
import { AuthProvider } from './context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const navigationRef = createNavigationContainerRef();

export default function App() {
  const responseListener = useRef();

  useEffect(() => {
  responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
  const data = response?.notification?.request?.content?.data;

  if (data && data.type === 'CHAT' && data.chatId) {
    if (navigationRef.isReady()) {
      navigationRef.navigate('ChatScreen', {
        chatId: data.chatId,
        receiverId: data.senderId,       
        receiverModel: data.senderModel,
        receiverName: data.senderName,
        receiverImage: data.senderImage,
      });
    }
  }
});

    return () => {
     if (responseListener.current && typeof responseListener.current.remove === 'function') {
        responseListener.current.remove();
      }
    };
  }, []);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer ref={navigationRef}>
          <AuthNavigation />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}