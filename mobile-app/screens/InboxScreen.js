import React, { useState, useContext, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { fetchChats } from '../api/chatApi';
import ChatItem from '../Components/ChatItem';
import { AuthContext } from '../context/AuthContext';
import { ProviderTabs } from '../Cards/ProviderTabs';

const InboxScreen = ({ navigation, route }) => {
  const { userInfo, providerInfo } = useContext(AuthContext);

  const currentUserId =
    userInfo?.role === 'customer'
      ? userInfo?.id
      : providerInfo?._id ;

  const currentUserModel =
    userInfo?.role === 'customer' 
      ? 'User'
      : 'Provider';

  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadChats = async () => {
    if (!currentUserId) {
      console.warn('InboxScreen: currentUserId is missing or undefined!');
      setLoading(false);
      setRefreshing(false);
      return;
    }

    try {
      console.log('Fetching chats for userId:', currentUserId);
      const data = await fetchChats(currentUserId);
      console.log('Chats fetched successfully:', data?.length || 0);
      setChats(data || []);
    } catch (error) {
      console.error('Error fetching inbox chats:', error?.message || error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadChats();
    }, [currentUserId])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    loadChats();
  };

  const handleChatPress = (chat, recipient) => {
    navigation.navigate('ChatScreen', {
      chatId: chat._id,
      currentUserId: currentUserId,
      currentUserModel: currentUserModel || 'User',
      receiverId: recipient?._id,
      receiverModel: currentUserModel === 'Provider' ? 'User' : 'Provider',
      receiverName: recipient?.name || recipient?.businessName || 'User',
      receiverImage: recipient?.profileImage || recipient?.providerImage ||null,
    });
  };

  const filteredChats = chats.filter((chat) => {
    const isCustomer = chat.customerId?._id === currentUserId;
    const recipient = isCustomer ? chat.providerId : chat.customerId;
    const recipientName = recipient?.name?.toLowerCase() || '';
    const lastMsg = chat.lastMessage?.toLowerCase() || '';
    const query = searchQuery.toLowerCase().trim();

    return recipientName.includes(query) || lastMsg.includes(query);
  });

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-slate-50">
      <View className="px-5 py-3.5 bg-white border-b border-slate-100 shadow-xs justify-center items-center">
        <Text className="text-xl font-bold text-slate-900 text-center">
          Messages
        </Text>
      </View>

      <View className="px-4 py-3 bg-white border-b border-slate-100">
        <View className="flex-row items-center bg-slate-100 rounded-xl px-3.5 py-2">
          <Ionicons name="search-outline" size={18} color="#64748b" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search conversations..."
            placeholderTextColor="#94a3b8"
            className="flex-1 ml-2 text-sm text-slate-800 p-0"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#94a3b8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading && !refreshing ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#1a5ea1" />
          <Text className="text-slate-400 text-xs mt-2">Loading chats...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredChats}
          keyExtractor={(item) => item._id || Math.random().toString()}
          renderItem={({ item }) => (
            <ChatItem
              chat={item}
              currentUserId={currentUserId}
              onPress={handleChatPress}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#1a5ea1']}
            />
          }
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center mt-24 px-6">
              <Ionicons name="chatbox-ellipses-outline" size={56} color="#cbd5e1" />
              <Text className="text-slate-700 font-bold text-lg mt-3">
                {searchQuery ? 'No Results Found' : 'No Conversations'}
              </Text>
              <Text className="text-slate-400 text-sm text-center mt-1 leading-5">
                {searchQuery
                  ? 'No results found.'
                  : 'No conversations available.'}
              </Text>
            </View>
          }
        />
      )}



    </SafeAreaView>
  );
};

export default InboxScreen;