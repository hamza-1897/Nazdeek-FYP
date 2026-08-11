import React from 'react';
import { View, Text } from 'react-native';
import dayjs from 'dayjs';

const MessageBubble = ({ item, currentUserId }) => {
  const isMyMessage =
    item.senderId === currentUserId || item.senderId?._id === currentUserId;

  const timeFormatted = dayjs(item.createdAt).format('hh:mm A');

  return (
    <View
      className={`my-1 max-w-[82%] px-4 py-2.5 rounded-2xl shadow-xs ${
        isMyMessage
          ? 'bg-[#1a5ea1] rounded-tr-xs self-end'
          : 'bg-white rounded-tl-xs border border-slate-100 self-start'
      }`}
    >
      <Text
        className={`text-[15px] leading-5 font-normal ${
          isMyMessage ? 'text-white' : 'text-slate-800'
        }`}
      >
        {item.text}
      </Text>
      <Text
        className={`text-[10px] mt-1 text-right font-medium ${
          isMyMessage ? 'text-blue-100' : 'text-slate-400'
        }`}
      >
        {timeFormatted}
      </Text>
    </View>
  );
};

export default MessageBubble;