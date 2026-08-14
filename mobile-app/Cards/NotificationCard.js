import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const getNotificationIcon = (type) => {
  switch (type) {
    case 'booking':
      return { name: 'calendar-outline', color: '#1a5ea1', bg: 'bg-blue-50' };
    case 'system':
      return { name: 'information-circle-outline', color: '#f59e0b', bg: 'bg-amber-50' };
    default:
      return { name: 'notifications-outline', color: '#6b7280', bg: 'bg-gray-100' };
  }
};

const NotificationCard = ({ item }) => {
  const iconConfig = getNotificationIcon(item?.type);

  return (
    <View
      className={`p-4 mb-3 rounded-2xl border flex-row items-start ${
        item?.isRead 
          ? 'bg-white border-gray-100' 
          : 'bg-blue-50/30 border-blue-100'
      }`}
    >
      <View className={`w-11 h-11 rounded-xl items-center justify-center mr-3.5 ${iconConfig.bg}`}>
        <Ionicons name={iconConfig.name} size={22} color={iconConfig.color} />
      </View>

      <View className="flex-1 pr-1">
        <View className="flex-row items-center justify-between mb-1">
          <Text className={`text-base flex-1 pr-2 ${item?.isRead ? 'font-semibold text-gray-800' : 'font-bold text-gray-900'}`}>
            {item?.title}
          </Text>
          
          {!item?.isRead && (
            <View className="w-2.5 h-2.5 rounded-full bg-[#1a5ea1]" />
          )}
        </View>

        <Text className="text-sm text-gray-600 leading-5 mb-2">
          {item?.body}
        </Text>

        <Text className="text-[11px] font-medium text-gray-400">
          {item?.createdAt}
        </Text>
      </View>
    </View>
  );
};

export default NotificationCard;