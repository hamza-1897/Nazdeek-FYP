import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Platform,
  ActivityIndicator,
  Keyboard,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { socket } from '../services/socket';
import ChatHeader from '../Components/ChatHeader';
import MessageBubble from '../Components/MessageBubble';
import MessageInput from '../Components/MessageInput';
import { getAllMessages, sendMessage, sendMediaMessage, markRead } from '../api/chatApi';

const ChatScreen = ({ route, navigation }) => {
  const {
    chatId,
    currentUserId,
    currentUserModel,
    receiverId,
    receiverModel,
    receiverName,
    receiverImage,
  } = route.params || {};

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 50);
      }
    );

    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    if (!chatId) return;

    if (!socket.connected) {
      socket.connect();
    }

    const onConnect = () => {
      socket.emit('join_room', chatId);
    };

    if (socket.connected) {
      socket.emit('join_room', chatId);
    } else {
      socket.on('connect', onConnect);
    }

    fetchMessages();
    markAsRead(chatId, currentUserId);

    const handleReceiveMessage = (newMessage) => {
      if (newMessage.chatId === chatId || newMessage.chat === chatId) {
        setMessages((prevMessages) => {
          const exists = prevMessages.some((msg) => msg._id === newMessage._id);
          return exists ? prevMessages : [...prevMessages, newMessage];
        });
      }
    };

    socket.on('receive_message', handleReceiveMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [chatId]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await getAllMessages(chatId);
      setMessages(response || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (chatId, userId) => {
    if (!chatId || !userId) return;

    try {
      await markRead(chatId, userId);
    } catch (error) {
      console.error('Error reading messages:', error);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const textToSend = inputText.trim();
    const tempId = Date.now().toString();

    const messageData = {
      chatId,
      senderId: currentUserId,
      senderModel: currentUserModel,
      receiverId,
      receiverModel,
      text: textToSend,
    };

    const tempMessage = {
      ...messageData,
      _id: tempId,
      createdAt: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, tempMessage]);
    setInputText('');

    try {
      const response = await sendMessage(messageData);
      const savedMessage = response?.data || response?.message || response || messageData;

      socket.emit('send_message', savedMessage);

      if (savedMessage._id) {
        setMessages((prev) =>
          prev.map((msg) => (msg._id === tempId ? savedMessage : msg))
        );
      }
    } catch (error) {
      console.error('Message send error:', error);
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== tempId)
      );
    }
  };

  
  const uploadMedia = async ({ uri, mimeType, fileName, messageType, duration }) => {
    const tempId = Date.now().toString();

    const tempMessage = {
      _id: tempId,
      chatId,
      senderId: currentUserId,
      senderModel: currentUserModel,
      receiverId,
      receiverModel,
      messageType,
      mediaUrl: uri, 
      duration: duration || 0,
      createdAt: new Date().toISOString(),
      _uploading: true,
    };

    setMessages((prev) => [...prev, tempMessage]);

    try {
      const formData = new FormData();
      formData.append('media', {
        uri,
        name: fileName,
        type: mimeType,
      });
      formData.append('chatId', chatId);
      formData.append('senderId', currentUserId);
      formData.append('senderModel', currentUserModel);
      formData.append('receiverId', receiverId);
      formData.append('receiverModel', receiverModel);
      formData.append('messageType', messageType);
      if (messageType === 'voice') {
        formData.append('duration', String(duration || 0));
      }

      const savedMessage = await sendMediaMessage(formData);

      socket.emit('send_message', savedMessage);

      setMessages((prev) =>
        prev.map((msg) => (msg._id === tempId ? savedMessage : msg))
      );
    } catch (error) {
      console.error(`${messageType} send error:`, error);
      setMessages((prev) => prev.filter((msg) => msg._id !== tempId));
      Alert.alert('Send failed', `Could not send the ${messageType}. Please try again.`);
    }
  };

  const handleSendImage = (uri) => {
    uploadMedia({
      uri,
      mimeType: 'image/jpeg',
      fileName: `photo_${Date.now()}.jpg`,
      messageType: 'image',
    });
  };

  const handleSendVoice = (uri, durationSecs) => {
    uploadMedia({
      uri,
      mimeType: 'audio/m4a',
      fileName: `voice_${Date.now()}.m4a`,
      messageType: 'voice',
      duration: durationSecs,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top', 'bottom']}>
      <ChatHeader
        receiverName={receiverName}
        receiverImage={receiverImage}
        onBack={() => navigation.goBack()}
      />

      <View style={{ flex: 1, paddingBottom: keyboardHeight, backgroundColor: '#f8fafc' }}>
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#1a5ea1" />
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item, index) => item._id || `msg-${index}`}
            renderItem={({ item }) => (
              <MessageBubble item={item} currentUserId={currentUserId} />
            )}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            onLayout={() =>
              flatListRef.current?.scrollToEnd({ animated: false })
            }
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center mt-20">
                <Ionicons name="chatbubbles-outline" size={48} color="#cbd5e1" />
                <Text className="text-gray-400 mt-2 text-sm font-medium">
                  No messages yet. Say hello!
                </Text>
              </View>
            }
          />
        )}

        <MessageInput
          value={inputText}
          onChangeText={setInputText}
          onSend={handleSend}
          onSendImage={handleSendImage}
          onSendVoice={handleSendVoice}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
