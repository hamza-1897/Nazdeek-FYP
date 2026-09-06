import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';

const ChatItem = ({ chat, currentUserId, onPress }) => {
  const isCustomer = chat.customerId?._id === currentUserId;
  const recipient = isCustomer ? chat.providerId : chat.customerId;

  const recipientName = recipient?.name || recipient?.businessName || 'User';
  const recipientImage = recipient?.profileImage || recipient?.providerImage || null;

  const lastMsg = chat.lastMessage;

  let lastMessageText = 'No messages yet';
  let lastMessageIcon = null;
  if (lastMsg) {
    if (lastMsg.messageType === 'image') {
      lastMessageText = 'Photo';
      lastMessageIcon = 'image';
    } else if (lastMsg.messageType === 'voice') {
      lastMessageText = 'Voice message';
      lastMessageIcon = 'mic';
    } else {
      lastMessageText = lastMsg.text || 'No messages yet';
    }
  }

  const timeToFormat = lastMsg?.createdAt || chat.lastMessageTime;
  const formattedTime = timeToFormat ? dayjs(timeToFormat).format('hh:mm A') : '';

  const isUnread =
    lastMsg &&
    (lastMsg.receiverId === currentUserId || lastMsg.receiverId?._id === currentUserId) &&
    !lastMsg.isRead;

  return (
    <TouchableOpacity
      onPress={() => onPress(chat, recipient)}
      activeOpacity={0.7}
      className={`flex-row items-center px-4 py-3.5 border-b border-slate-100 ${
        isUnread ? 'bg-blue-50/40' : 'bg-white'
      }`}
    >
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

      <View className="flex-1 ml-3.5 pr-1">
        <View className="flex-row justify-between items-center mb-1">
          <Text
            className={`text-base ${
              isUnread ? 'font-extrabold text-slate-900' : 'font-bold text-slate-800'
            }`}
            numberOfLines={1}
          >
            {recipientName}
          </Text>

          {formattedTime ? (
            <Text
              className={`text-xs ${
                isUnread ? 'font-bold text-blue-600' : 'font-medium text-slate-400'
              }`}
            >
              {formattedTime}
            </Text>
          ) : null}
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-1 flex-row items-center">
            {lastMessageIcon && (
              <Ionicons
                name={lastMessageIcon}
                size={13}
                color={isUnread ? '#0f172a' : '#94a3b8'}
                style={{ marginRight: 4 }}
              />
            )}
            <Text
              className={`flex-1 text-sm ${
                isUnread
                  ? 'font-extrabold text-slate-900'
                  : 'font-normal text-slate-500'
              }`}
              numberOfLines={1}
            >
              {lastMessageText}
            </Text>
          </View>

          {isUnread && (
            <View className="w-2.5 h-2.5 bg-blue-600 rounded-full ml-2" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
