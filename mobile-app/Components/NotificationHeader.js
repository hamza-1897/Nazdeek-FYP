import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationHeader = ({ navigation, onClearAll, hasNotifications }) => {
  return (
    <View className="px-6 py-4 flex-row items-center justify-between bg-white border-b border-gray-100">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="w-10 h-10 border border-gray-100 rounded-full items-center justify-center bg-white shadow-sm"
      >
        <Ionicons name="arrow-back" size={22} color="#1a5ea1" />
      </TouchableOpacity>

      <Text className="text-xl font-bold text-gray-800">
        Notifications
      </Text>

      {/* Clear All Button */}
      {hasNotifications ? (
        <TouchableOpacity 
          onPress={onClearAll} 
          className="px-2.5 py-1.5 rounded-lg bg-red-50"
        >
          <Text className="text-xs font-semibold text-red-600">
            Clear All
          </Text>
        </TouchableOpacity>
      ) : (
        <View className="w-10" />
      )}
    </View>
  );
};

export default NotificationHeader;