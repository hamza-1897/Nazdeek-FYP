import React, { useContext, useEffect, useRef } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import AuthNavigation from './Navigation/auth-navigation';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const navigationRef = createNavigationContainerRef();


function NotificationResponseHandler() {
  const { userInfo, providerInfo } = useContext(AuthContext);
  const responseListener = useRef();

  
  const userInfoRef = useRef(userInfo);
  const providerInfoRef = useRef(providerInfo);

  useEffect(() => {
    userInfoRef.current = userInfo;
    providerInfoRef.current = providerInfo;
  }, [userInfo, providerInfo]);

  useEffect(() => {
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response?.notification?.request?.content?.data;

      if (data && data.type === 'CHAT' && data.chatId) {
        const currentUserInfo = userInfoRef.current;
        const currentProviderInfo = providerInfoRef.current;

        const currentUserId =
          currentUserInfo?.role === 'customer'
            ? currentUserInfo?.id
            : currentProviderInfo?._id;

        const currentUserModel =
          currentUserInfo?.role === 'customer' ? 'User' : 'Provider';

        if (navigationRef.isReady()) {
          navigationRef.navigate('ChatScreen', {
            chatId: data.chatId,
            currentUserId,          
            currentUserModel,      
            receiverId: data.senderId,
            receiverModel: data.senderModel,
            receiverName: data.senderName,
            receiverImage: data.senderImage,
          });
        }
      }
    });

    return () => {
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return null;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NotificationResponseHandler />
        <NavigationContainer ref={navigationRef}>
          <AuthNavigation />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}