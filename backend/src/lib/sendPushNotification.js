const { Expo } = require('expo-server-sdk');
const expo = new Expo();

/**
 * @param {string} pushToken - Receiver's Expo Push Token
 * @param {string} title - Notification Title
 * @param {string} body - Notification Body Message
 * @param {object} data - Extra custom data for screen navigation
 */
const sendPushNotification = async (pushToken, title, body, data = {}) => {
  if (!pushToken || !Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
    return;
  }

  const messages = [
    {
      to: pushToken,
      sound: 'default',
      title: title,
      body: body,
      data: data,
      priority: 'high',
    },
  ];

  try {
    const chunks = expo.chunkPushNotifications(messages);
    for (let chunk of chunks) {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log('Push notification sent successfully:', ticketChunk);
    }
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};

module.exports = sendPushNotification;