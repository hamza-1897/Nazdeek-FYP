import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Platform, Alert, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {
  useAudioRecorder,
  useAudioRecorderState,
  RecordingPresets,
  AudioModule,
  setAudioModeAsync,
} from 'expo-audio';


const MessageInput = ({ value, onChangeText, onSend, onSendImage, onSendVoice }) => {
  const isEnabled = value.trim().length > 0;
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const timerRef = useRef(null);

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);

  const handlePickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission required', 'Please allow photo library access to send images.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions
          ? ImagePicker.MediaTypeOptions.Images
          : ['images'],
        quality: 0.7,
        allowsEditing: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onSendImage?.(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Image pick error:', error);
      Alert.alert('Error', 'Could not pick the image. Please try again.');
    }
  };

  const startRecording = async () => {
    try {
      const permission = await AudioModule.requestRecordingPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission required', 'Please allow microphone access to send voice messages.');
        return;
      }

      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });

      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();

      setIsRecording(true);
      setRecordSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordSeconds((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Start recording error:', error);
      Alert.alert('Error', 'Could not start recording. Please try again.');
    }
  };

  const stopRecording = async (shouldSend) => {
    try {
      clearInterval(timerRef.current);
      timerRef.current = null;

      const finalDuration = recordSeconds;
      setIsRecording(false);
      setRecordSeconds(0);

      await audioRecorder.stop();
      const uri = audioRecorder.uri;

      await setAudioModeAsync({ allowsRecording: false });

      if (shouldSend && uri && finalDuration > 0) {
        onSendVoice?.(uri, finalDuration);
      }
    } catch (error) {
      console.error('Stop recording error:', error);
    }
  };

  if (isRecording) {
    return (
      <View className="flex-row items-center px-3 py-2 bg-white border-t mb-3 border-slate-100">
        <View className="flex-1 flex-row items-center bg-red-50 rounded-2xl px-4 py-3 mr-2">
          <View className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2" />
          <Text className="text-red-600 font-medium text-sm">
            Recording... {Math.floor(recordSeconds / 60)}:{(recordSeconds % 60).toString().padStart(2, '0')}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => stopRecording(false)}
          activeOpacity={0.8}
          className="w-11 h-11 rounded-full items-center justify-center bg-slate-200 mr-2"
        >
          <Ionicons name="trash" size={18} color="#64748b" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => stopRecording(true)}
          activeOpacity={0.8}
          className="w-11 h-11 rounded-full items-center justify-center bg-[#1a5ea1]"
        >
          <Ionicons name="send" size={18} color="#ffffff" style={{ marginLeft: 2 }} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-row items-end px-3 py-2 bg-white border-t mb-3 border-slate-100">
      <TouchableOpacity
        onPress={handlePickImage}
        activeOpacity={0.7}
        className="w-10 h-10 rounded-full items-center justify-center mr-1.5 mb-0.5"
      >
        <Ionicons name="image-outline" size={23} color="#64748b" />
      </TouchableOpacity>

      <View className="flex-1 flex-row items-center bg-slate-100 rounded-2xl px-4  max-h-[100px] mr-2 py-1">
       <TextInput
  value={value}
  onChangeText={onChangeText}
  placeholder="Write a message..."
  placeholderTextColor="#94a3b8"
  multiline={true}
  textAlignVertical="center"

  style={{
    paddingTop: Platform.OS === 'ios' ? 8 : 4,
    paddingBottom: Platform.OS === 'ios' ? 8 : 2,
  }}
  className="flex-1 text-[15px] text-slate-800 leading-5"
/>
      </View>

      {isEnabled ? (
        <TouchableOpacity
          onPress={onSend}
          activeOpacity={0.8}
          className="w-11 h-11 rounded-full items-center justify-center bg-[#1a5ea1]"
        >
          <Ionicons name="send" size={18} color="#ffffff" style={{ marginLeft: 2 }} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={startRecording}
          activeOpacity={0.8}
          className="w-11 h-11 rounded-full items-center justify-center bg-slate-200"
        >
          <Ionicons name="mic-outline" size={20} color="#64748b" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MessageInput;
