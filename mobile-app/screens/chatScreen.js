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
import {getAllMessages , sendMessage} from '../api/chatApi';


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

    if (!socket.connected) socket.connect();
    socket.emit('join_room', chatId);

    fetchMessages();

    const handleReceiveMessage = (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on('receive_message', handleReceiveMessage);

    return () => {
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

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const messageData = {
      chatId,
      senderId: currentUserId,
      senderModel: currentUserModel,
      receiverId,
      receiverModel,
      text: inputText.trim(),
    };
    const tempMessage = {
    ...messageData,
    _id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  setMessages((prevMessages) => [...prevMessages, tempMessage]);
  setInputText('');
  console.log("Sending Message Payload:", messageData);


try {
    const response = await sendMessage(messageData);

    socket.emit('send_message', response || messageData);
  } catch (error) {
    console.error('Message send karne mein error:', error);
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg._id !== tempMessage._id)
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