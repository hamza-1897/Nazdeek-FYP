import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmptyNotificationState = () => {
  return (
    <View className="flex-1 items-center justify-center p-8 mt-12">
      <View className="w-20 h-20 bg-blue-50 rounded-full items-center justify-center mb-4 border border-blue-100">
        <Ionicons name="notifications-off-outline" size={38} color="#1a5ea1" />
      </View>
      <Text className="text-lg font-bold text-gray-800 mb-1">
        No Notifications Yet
      </Text>
      <Text className="text-sm text-gray-400 text-center leading-5">
        We'll keep you updated when something important happens regarding your bookings or profile.
      </Text>
    </View>
  );
};

export default EmptyNotificationState;