import React, { useState, useContext, useCallback } from 'react';
import {
  View,
  FlatList,
  Alert,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

import NotificationHeader from '../Components/NotificationHeader';
import NotificationCard from '../Cards/NotificationCard';
import EmptyNotificationState from '../Components/EmptyNotificationState';

import {
  getNotificationsApi,
  markAllasRead,
  clearAllNotificationsApi,
} from '../api/notifyApi';

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { userInfo } = useContext(AuthContext);

  const userId = userInfo?.id || userInfo?._id;
const loadAndMarkNotifications = async () => {
  if (!userId) return;

  try {
    // 1. Fetch API response
    const res = await getNotificationsApi(userId);
    
    // Handle array structure correctly whether wrapped or direct
    const rawData = Array.isArray(res) ? res : (res?.notifications || res?.data || []);

    // 2. Case-insensitive filter (BOOKING / booking / SYSTEM / system)
    const filtered = rawData.filter((item) => {
      const itemType = item?.type?.toLowerCase();
      return itemType === 'booking' || itemType === 'system';
    });

    setNotifications(filtered);

    // 3. Mark as read logic
    const hasUnread = filtered.some((item) => !item.isRead);
    if (hasUnread) {
      await markAllasRead(userId);

      setNotifications((prev) =>
        prev.map((item) => ({ ...item, isRead: true }))
      );
    }
  } catch (error) {
    console.error('Error fetching/updating notifications:', error);
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadAndMarkNotifications();
    }, [userId])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    loadAndMarkNotifications();
  };

  const handleClearAll = () => {
    if (!userId) return;

    Alert.alert(
      'Clear Notifications',
      'Are you sure you want to delete all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await clearAllNotificationsApi(userId);
              setNotifications([]);
            } catch (error) {
              console.error('Error clearing notifications:', error);
              Alert.alert('Error', 'Failed to clear notifications');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <NotificationHeader
        navigation={navigation}
        onClearAll={handleClearAll}
        hasNotifications={notifications.length > 0}
      />

      {loading && !refreshing ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#1a5ea1" />
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item._id || item.id}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 16,
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <NotificationCard item={item} />}
          ListEmptyComponent={<EmptyNotificationState />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#1a5ea1']}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;