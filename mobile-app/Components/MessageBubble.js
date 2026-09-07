import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';
import VoiceMessagePlayer from './VoiceMessagePlayer';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MessageBubble = ({ item, currentUserId }) => {
  const [previewVisible, setPreviewVisible] = useState(false);

  const senderIdStr = item.senderId?._id?.toString() || item.senderId?.toString();
  const currentUserIdStr = currentUserId?.toString();
  const isMyMessage = senderIdStr === currentUserIdStr;

  const timeFormatted = item.createdAt
    ? dayjs(item.createdAt).format('hh:mm A')
    : dayjs().format('hh:mm A');

  const messageType = item.messageType || 'text';

  const bubbleBase = `my-1.5 rounded-2xl ${
    isMyMessage
      ? 'bg-[#1a5ea1] rounded-tr-none self-end shadow-sm'
      : 'bg-white rounded-tl-none border border-slate-100 self-start shadow-xs'
  }`;

  const bubblePadding = messageType === 'image' ? 'p-1.5 max-w-[70%]' : 'px-3.5 py-2.5 max-w-[80%]';

  const renderContent = () => {
    if (messageType === 'image' && item.mediaUrl) {
      return (
        <>
          <TouchableOpacity activeOpacity={0.9} onPress={() => setPreviewVisible(true)}>
            <Image
              source={{ uri: item.mediaUrl }}
              style={{ width: 210, height: 210, borderRadius: 14 }}
              resizeMode="cover"
            />
          </TouchableOpacity>

          <Modal visible={previewVisible} transparent animationType="fade">
            <View className="flex-1 bg-black/90 items-center justify-center">
              <TouchableOpacity
                onPress={() => setPreviewVisible(false)}
                className="absolute top-12 right-6 z-10 w-10 h-10 rounded-full bg-white/20 items-center justify-center"
              >
                <Ionicons name="close" size={22} color="#ffffff" />
              </TouchableOpacity>
              <Image
                source={{ uri: item.mediaUrl }}
                style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH }}
                resizeMode="contain"
              />
            </View>
          </Modal>
        </>
      );
    }

    if (messageType === 'voice' && item.mediaUrl) {
      return (
        <VoiceMessagePlayer
          uri={item.mediaUrl}
          duration={item.duration}
          isMyMessage={isMyMessage}
        />
      );
    }

    return (
      <Text
        className={`text-[15px] leading-5 ${
          isMyMessage ? 'text-white font-normal' : 'text-slate-800 font-normal'
        }`}
      >
        {item.text}
      </Text>
    );
  };

  return (
    <View className={`${bubbleBase} ${bubblePadding}`}>
      {renderContent()}

      <View
        className={`flex-row items-center justify-end mt-1 space-x-1 ${
          messageType === 'image' ? 'px-1.5 pb-0.5' : ''
        }`}
      >
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
