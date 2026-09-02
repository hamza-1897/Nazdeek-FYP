import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatHeader = ({ receiverName, receiverImage, onBack }) => {
  return (
    <View className="flex-row items-center px-4 py-3 mt-2 bg-white border-b border-slate-100 shadow-sm">
      <TouchableOpacity
        onPress={onBack}
        activeOpacity={0.7}
        className="p-2 mr-1 rounded-full active:bg-slate-100"
      >
        <Ionicons name="arrow-back" size={22} color="#1e293b" />
      </TouchableOpacity>

      <View className="relative">
        <Image
          source={{
            uri:
              receiverImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                receiverName || 'User'
              )}&background=0D8ABC&color=fff`,
          }}
          className="w-11 h-11 rounded-full bg-gray-100 border border-gray-100"
        />
      </View>

      <View className="ml-3 flex-1">
        <Text className="text-base font-bold text-slate-800" numberOfLines={1}>
          {receiverName || 'Chat'}
        </Text>
      </View>
    </View>
  );
};

export default ChatHeader;