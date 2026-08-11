import React from 'react';
import { View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MessageInput = ({ value, onChangeText, onSend }) => {
  const isEnabled = value.trim().length > 0;

  return (
    <View className="flex-row items-end px-3 py-2 bg-white border-t border-slate-100">
      <View className="flex-1 flex-row items-center bg-slate-100 rounded-2xl px-4 min-h-[44px] max-h-[100px] mr-2 py-1">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Write a message..."
          placeholderTextColor="#94a3b8"
          multiline={true}
          textAlignVertical="center"
          style={{
            paddingTop: Platform.OS === 'ios' ? 8 : 4,
            paddingBottom: Platform.OS === 'ios' ? 8 : 4,
          }}
          className="flex-1 text-[15px] text-slate-800 leading-5"
        />
      </View>

      <TouchableOpacity
        onPress={onSend}
        disabled={!isEnabled}
        activeOpacity={0.8}
        className={`w-11 h-11 rounded-full items-center justify-center ${
          isEnabled ? 'bg-[#1a5ea1]' : 'bg-slate-200'
        }`}
      >
        <Ionicons
          name="send"
          size={18}
          color={isEnabled ? '#ffffff' : '#94a3b8'}
          style={{ marginLeft: 2 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;