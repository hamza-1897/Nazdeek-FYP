import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import ProviderHeader from '../Components/ProviderHeader';
import ProviderStatsCard from '../Cards/ProviderStatsCard';
import SubscriptionBanner from '../Components/SubscriptionBanner';

const ProviderDashboard = ({ navigation }) => {
  const { providerInfo } = useContext(AuthContext);

  const stats = [
    {
      title: 'Active Bookings',
      value: '5',
      iconName: 'time-outline',
      iconColor: '#2563eb',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Completed',
      value: '18',
      iconName: 'checkmark-done-outline',
      iconColor: '#16a34a',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Active Services' ,
      value: '4',
      iconName: 'construct-outline',
      iconColor: '#9333ea',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Reviews',
      value: '4.8',
      iconName: 'star-outline',
      iconColor: '#d97706',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="light-content" backgroundColor="#1a5ea1" />

      <ProviderHeader
        providerInfo={providerInfo}
        onNotificationPress={() => navigation.navigate('Notification')}
        onProfilePress={() => navigation.navigate('ProfileScreen')}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <SubscriptionBanner
          planType={providerInfo?.isPremium}
          onPress={() => navigation.navigate('SubscriptionScreen')}
        />

        <Text className="text-slate-800 font-extrabold mt-6 mb-3 uppercase tracking-wider text-[11px]">
          Business Overview
        </Text>

        <View className="flex-row flex-wrap justify-between">
          {stats.map((stat, index) => (
            <ProviderStatsCard key={index} {...stat} />
          ))}
        </View>

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

        <Text className="text-slate-800 font-extrabold mt-6 mb-3 uppercase tracking-wider text-[11px]">
          Today's Bookings
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('ProvidersBooking')}
          activeOpacity={0.8}
          className="bg-white border border-slate-100 rounded-2xl p-4 flex-row items-center shadow-sm mb-4"
        >
          <View className="w-11 h-11 bg-blue-100 rounded-2xl items-center justify-center mr-3.5">
            <Text className="text-[#1a5ea1] font-bold text-base">SK</Text>
          </View>
          <View className="flex-1">
            <Text className="text-slate-900 font-bold text-base">Sara Khan</Text>
            <Text className="text-slate-500 text-xs mt-0.5">
              Deep Home Cleaning · 11:00 AM
            </Text>
          </View>
          <View className="bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
            <Text className="text-[#1a5ea1] text-xs font-bold">Upcoming</Text>
          </View>
        </TouchableOpacity>
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