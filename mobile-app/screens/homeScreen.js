import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Text,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderCard from '../Cards/HeaderCard';
import { registerForPushNotificationsAsync } from '../services/notificationService';
import { AuthContext } from '../context/AuthContext';
import PromoBanner from '../Components/PromoBanner';
import { useIsFocused } from '@react-navigation/native';
import { getDashboard } from '../api/customerApi';
import PremiumProvidersSection from '../Components/PremiumProvidersSection';
import ServiceCardItem from '../Components/ServiceCardItem';

const HomeScreen = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const [providers, setProviders] = useState([]);
  const [services, setServices] = useState([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await getDashboard();

      if (response && response.success) {
        const formattedProviders = (response.providers || []).map((p) => ({
          _id: p._id,
          id: p._id,
          name: p.businessName,
          category: p.categoryName,
          image: p.providerImage,
          isPremium: p.isPremium,
        }));

        const formattedServices = (response.services || []).map((s) => ({
          _id: s._id,
          id: s._id,
          title: s.title || s.serviceName || 'Service',
          category: s.categoryId?.name || s.categoryName || 'General',
          price: s.price || s.rate || 'N/A',
          rating: s.rating || '4.8',
          reviews: s.reviewsCount || '10+',
          image: s.image || s.serviceImage || 'https://via.placeholder.com/300',
        }));

        setProviders(formattedProviders);
        setServices(formattedServices);
        setHasUnreadNotifications(response.hasUnreadNotifications || false);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo?.fcmToken) {
      registerForPushNotificationsAsync(userInfo?.fcmToken);
    }
    if (isFocused) {
      fetchDashboardData();
    }
  }, [userInfo?.fcmToken, isFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: '#1a5ea1' }}>
      <StatusBar barStyle="light-content" backgroundColor="#1a5ea1" translucent={false} />

      <SafeAreaView edges={['top']} style={{ backgroundColor: '#1a5ea1' }}>
        <HeaderCard
          userName={userInfo?.name || 'User'}
          hasUnread={hasUnreadNotifications}
          onNotificationPress={() => navigation.navigate('NotificationScreen')}
        />
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 90,
          paddingTop: 12,
        }}
        className="flex-1 bg-slate-50"
      >
        <PromoBanner onPressBanner={() => {}} />

        {loading ? (
          <View className="py-12 items-center justify-center">
            <ActivityIndicator size="large" color="#1a5ea1" />
            <Text className="text-slate-400 text-xs mt-2 font-medium">
              Loading dashboard...
            </Text>
          </View>
        ) : (
          <>
            {providers.length > 0 && (
              <View className="px-5 mt-4">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-slate-900 font-bold text-base">
                    Premium Providers
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ViewPremiumProviders')}
                  >
                    <Text className="text-[#1a5ea1] font-bold text-xs">View All</Text>
                  </TouchableOpacity>
                </View>

                <PremiumProvidersSection
                  providers={providers}
                  onSelectProvider={(id) =>
                    navigation.navigate('ProviderProfile', { id })
                  }
                />
              </View>
            )}

            <View className="mt-4 px-5">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-slate-900 font-bold text-base">
                  Top Services
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Services')}>
                  <Text className="text-[#1a5ea1] font-bold text-xs">View All</Text>
                </TouchableOpacity>
              </View>

              {services.length > 0 ? (
                services.map((item) => (
                  <ServiceCardItem
                    key={item.id}
                    item={item}
                    onPress={() =>
                      navigation.navigate('ViewDetailScreen', { serviceId: item.id })
                    }
                  />
                ))
              ) : (
                <View className="bg-white p-6 rounded-2xl items-center border border-slate-100 mt-2">
                  <Text className="text-slate-400 text-xs font-medium">
                    No active services available right now.
                  </Text>
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;