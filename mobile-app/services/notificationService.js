import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { updateFcmToken } from '../api/authApi';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true, 
    shouldShowList: true,   
    shouldPlaySound: true,  
    shouldSetBadge: false,
  }),
});

/**
 * @param {string} currentSavedToken 
 */
export const registerForPushNotificationsAsync = async (currentSavedToken = null) => {
  let token = null;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#1a5ea1',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return null;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);

    if (currentSavedToken && currentSavedToken === token) {
      console.log('FCM Token unchanged. Skipping backend update.');
    } else {
      console.log('New token detected, updating backend...');
      await updateFcmToken(token); 
    }

  } else {
    console.log('Must use physical device for Push Notifications');
  }

  return token;
};