import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { socket } from '../services/socket';
import ChatHeader from '../Components/ChatHeader';
import MessageBubble from '../Components/MessageBubble';
import MessageInput from '../Components/MessageInput';
import {getAllMessages , sendMessage, markRead} from '../api/chatApi';


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
  const flatListRef = useRef(null);

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

   markAsRead(chatId,currentUserId);

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

  const markAsRead = async (chatId,userId)=>{
    if (!chatId || !userId) {
  return res.status(400).json({ message: 'chatId and userId are required' });
}
    try {
      const response = await markRead(chatId,userId);
      
    } catch (error) {
            console.error('Error read messages:', error);

    }
  }

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

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ChatHeader
        receiverName={receiverName}
        receiverImage={receiverImage}
        onBack={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
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
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
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
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;