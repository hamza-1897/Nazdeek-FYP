import React from 'react';
import { View, Text } from 'react-native';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';

const MessageBubble = ({ item, currentUserId }) => {
  const senderIdStr = item.senderId?._id?.toString() || item.senderId?.toString();
  const currentUserIdStr = currentUserId?.toString();
  const isMyMessage = senderIdStr === currentUserIdStr;

  const timeFormatted = item.createdAt
    ? dayjs(item.createdAt).format('hh:mm A')
    : dayjs().format('hh:mm A');

  return (
    <View
      className={`my-1.5 max-w-[80%] px-3.5 py-2.5 rounded-2xl ${
        isMyMessage
          ? 'bg-[#1a5ea1] rounded-tr-none self-end shadow-sm'
          : 'bg-white rounded-tl-none border border-slate-100 self-start shadow-xs'
      }`}
    >
      <Text
        className={`text-[15px] leading-5 ${
          isMyMessage ? 'text-white font-normal' : 'text-slate-800 font-normal'
        }`}
      >
        {item.text}
      </Text>

      <View className="flex-row items-center justify-end mt-1 space-x-1">
        <Text
          className={`text-[10px] font-medium ${
            isMyMessage ? 'text-blue-200' : 'text-slate-400'
          }`}
        >
          {timeFormatted}
        </Text>

        {isMyMessage && (
          <Ionicons
            name="checkmark-done"
            size={14}
            color="#93c5fd" 
            style={{ marginLeft: 3 }}
          />
        )}
      </View>
    </View>
  );
};

export default MessageBubble;