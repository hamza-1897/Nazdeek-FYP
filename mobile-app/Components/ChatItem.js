import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import dayjs from 'dayjs';

const ChatItem = ({ chat, currentUserId, onPress }) => {
  // Determine if the current user is customer or provider
  const isCustomer = chat.customerId?._id === currentUserId;

  // Opposite user info to display
  const recipient = isCustomer ? chat.providerId : chat.customerId;

  const recipientName = recipient?.name || 'User';
  const recipientImage = recipient?.profileImage || null;
  const lastMessageText = chat.lastMessage || 'No messages yet';
  const formattedTime = chat.lastMessageTime
    ? dayjs(chat.lastMessageTime).format('hh:mm A')
    : '';

  return (
    <TouchableOpacity
      onPress={() => onPress(chat, recipient)}
      activeOpacity={0.7}
      className="flex-row items-center px-4 py-3.5 bg-white border-b border-slate-100"
    >
      {/* Profile Image */}
      <Image
        source={{
          uri:
            recipientImage ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              recipientName
            )}&background=0D8ABC&color=fff`,
        }}
        className="w-12 h-12 rounded-full bg-slate-100"
      />

      {/* Name and Last Message */}
      <View className="flex-1 ml-3.5 pr-2">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-base font-bold text-slate-800" numberOfLines={1}>
            {recipientName}
          </Text>
          {formattedTime ? (
            <Text className="text-xs text-slate-400 font-medium">
              {formattedTime}
            </Text>
          ) : null}
        </View>

        <Text className="text-sm text-slate-500 font-normal" numberOfLines={1}>
          {lastMessageText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;