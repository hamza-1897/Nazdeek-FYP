import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator, RefreshControl } from 'react-native';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import ProviderHeader from '../Components/ProviderHeader';
import ProviderStatsCard from '../Cards/ProviderStatsCard';
import SubscriptionBanner from '../Components/SubscriptionBanner';
import { getProviderDashboardStats } from '../api/ProviderApi';
import {registerForPushNotificationsAsync} from '../services/notificationService'

const ProviderDashboard = ({ navigation }) => {
  const { providerInfo } = useContext(AuthContext);
  const providerId = providerInfo?._id;

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [token,setToken] = useState('');
  const [dashboardData, setDashboardData] = useState({
    notifications: { hasUnread: false, unreadCount: 0 },
    stats: {
      totalServices: 0,
      activeBookings: 0,
      totalReviews: 0,
      averageRating: 0,
    },
    ongoingBookings: [],
  });

  const fetchDashboard = async () => {
    try {
      if (!providerId) return;
      const response = await getProviderDashboardStats(providerId);
      
      if (response?.data?.success || response?.data) {
        const resData = response.data.data || response.data;
        setDashboardData(resData);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats in UI:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
      registerForPushNotificationsAsync().then(generatedToken => {
      if (generatedToken) {
        setToken(generatedToken);
      } else {
        setToken('Permission denied ya koi error aaya.');
      }
    });
  }, [providerId]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboard();
  };

  const statsList = [
    {
      title: 'Services Listed',
      value: dashboardData?.stats?.totalServices || 0,
      icon: 'briefcase',
      color: '#1a5ea1',
    },
    {
      title: 'Active Bookings',
      value: dashboardData?.stats?.activeBookings || 0,
      icon: 'calendar',
      color: '#b45309',
    },
    {
      title: 'Total Reviews',
      value: dashboardData?.stats?.totalReviews || 0,
      icon: 'comment-discussion',
      color: '#047857',
    },
    {
      title: 'Avg Rating',
      value: dashboardData?.stats?.averageRating ? `⭐ ${dashboardData.stats.averageRating}` : '⭐ 0',
      icon: 'star',
      color: '#d97706',
    },
  ];

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="light-content" backgroundColor="#1a5ea1" />

      <ProviderHeader
        providerInfo={providerInfo}
        hasUnreadNotification={dashboardData?.notifications?.hasUnread}
        onNotificationPress={() => navigation.navigate('Notification')}
        onProfilePress={() => navigation.navigate('ProfileScreen')}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 30 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1a5ea1']} />}
      >
        <SubscriptionBanner
          planType={providerInfo?.isPremium}
          onPress={() => navigation.navigate('SelectPlanScreen')}
        />

        <Text className="text-slate-800 font-extrabold mt-6 mb-3 uppercase tracking-wider text-[11px]">
          Business Overview
        </Text>

        {loading ? (
          <View className="py-8 items-center justify-center">
            <ActivityIndicator size="small" color="#1a5ea1" />
          </View>
        ) : (
          <View className="flex-row flex-wrap justify-between">
            {statsList.map((stat, index) => (
              <ProviderStatsCard key={index} {...stat} />
            ))}
          </View>
        )}

        <Text className="text-slate-800 font-extrabold mt-5 mb-3 uppercase tracking-wider text-[11px]">
          Quick Actions
        </Text>

        <View className="flex-row justify-between">
          <ActionItem
            icon="diff-added"
            label="Add Service"
            color="#1a5ea1"
            onPress={() => navigation.navigate('CreateService')}
          />
          <ActionItem
            icon="calendar"
            label="Bookings"
            color="#b45309"
            onPress={() => navigation.navigate('ProvidersBooking')}
          />
        </View>



        <View className="flex-row justify-between items-center mt-6 mb-3">
          <Text className="text-slate-800 font-extrabold uppercase tracking-wider text-[11px]">
            Ongoing Bookings ({dashboardData?.ongoingBookings?.length || 0})
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProvidersBooking')}>
            <Text className="text-[#1a5ea1] text-xs font-bold">View All</Text>
          </TouchableOpacity>
        </View>

        
        {dashboardData?.ongoingBookings?.length > 0 ? (
          dashboardData.ongoingBookings.map((booking) => {
            const customerName = booking?.userId?.name || 'Customer';
            const initials = customerName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);

            return (
              <TouchableOpacity
                key={booking._id}
                onPress={() => navigation.navigate('ProvidersBooking', { bookingId: booking._id })}
                activeOpacity={0.8}
                className="bg-white border border-slate-100 rounded-2xl p-4 flex-row items-center shadow-sm mb-3"
              >
                <View className="w-11 h-11 bg-blue-100 rounded-2xl items-center justify-center mr-3.5">
                  <Text className="text-[#1a5ea1] font-bold text-base">{initials}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-slate-900 font-bold text-base">{customerName}</Text>
                  <Text className="text-slate-500 text-xs mt-0.5" numberOfLines={1}>
                    {booking?.serviceId?.title || 'Service'} · {booking?.serviceId?.price ? `Rs. ${booking.serviceId.price}` : 'Accepted'}
                  </Text>
                </View>
                <View className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                  <Text className="text-emerald-700 text-xs font-bold capitalize">Accepted</Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View className="bg-white border border-slate-100 rounded-2xl p-5 items-center justify-center shadow-sm">
            <Octicons name="issue-opened" size={24} color="#94a3b8" />
            <Text className="text-slate-500 font-medium text-xs mt-2">No ongoing accepted bookings right now.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const ActionItem = ({ icon, label, color, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    className="w-[48%] bg-white border border-slate-100 p-4 rounded-2xl flex-row items-center shadow-sm active:bg-slate-100"
  >
    <View className="mr-3 w-9 h-9 bg-slate-50 rounded-xl items-center justify-center">
      <Octicons name={icon} size={18} color={color} />
    </View>
    <Text className="text-slate-800 font-bold text-sm">{label}</Text>
  </TouchableOpacity>
);

export default ProviderDashboard;