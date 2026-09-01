import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Text,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderCard from '../Cards/HeaderCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { registerForPushNotificationsAsync } from '../services/notificationService';
import { AuthContext } from '../context/AuthContext';
import PromoBanner from '../Components/PromoBanner';
import PremiumProvidersSection from '../Components/PremiumProvidersSection';
import ServiceCardItem from '../Components/ServiceCardItem';
import ServiceCard from '../Cards/HomeServiceCard';

const HomeScreen = ({ navigation, servicesData = [] }) => {
  const { userInfo } = useContext(AuthContext);
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

const DUMMY_PROVIDERS = [
  {
    id: 'p1',
    name: 'Ahmad Electricians',
    category: 'Electrical Specialist',
    rating: '4.9',
    jobs: '120+',
    image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150',
    isPremium: true,
  },
  {
    id: 'p2',
    name: 'Ali Plumbers Co.',
    category: 'Master Plumber',
    rating: '4.8',
    jobs: '85+',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    isPremium: true,
  },
];

const DUMMY_SERVICES = [
  {
    id: 's1',
    title: 'AC Deep Cleaning & Service',
    category: 'Appliance',
    price: '1500',
    rating: '4.9',
    reviews: '45',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300',
  },
  {
    id: 's2',
    title: 'Full Home Circuit Repair',
    category: 'Electrical',
    price: '2000',
    rating: '4.7',
    reviews: '28',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300',
  },
];

  useEffect(() => {
    if (userInfo?.fcmToken) {
      registerForPushNotificationsAsync(userInfo?.fcmToken);
    }
  }, [userInfo?.fcmToken]);

  return (
    <View style={{ flex: 1, backgroundColor: '#1a5ea1' }}>
      <StatusBar barStyle="light-content" backgroundColor="#1a5ea1" translucent={false} />

      <SafeAreaView edges={['top']} style={{ backgroundColor: '#1a5ea1' }}>
        <HeaderCard userName={userInfo?.name || 'User'} />
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

        <View className="px-5 mt-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-slate-900 font-bold text-base">Top Rated Services</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Services')}>
              <Text className="text-[#1a5ea1] font-bold text-xs">View All</Text>
            </TouchableOpacity>
          </View>

         <PremiumProvidersSection
          providers={DUMMY_PROVIDERS}
          onSelectProvider={(id) => navigation.navigate('ProviderProfile', { id })}
          
        />

        <View className="mt-6 px-5">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-slate-900 font-bold text-base">Top Rated Services</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Services')}>
              <Text className="text-[#1a5ea1] font-bold text-xs">View All</Text>
            </TouchableOpacity>
          </View>

          {DUMMY_SERVICES.map((item) => (
            <ServiceCardItem
              key={item.id}
              item={item}
              onPress={() => navigation.navigate('ViewDetailScreen', { serviceId: item.id })}
            />
          ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;