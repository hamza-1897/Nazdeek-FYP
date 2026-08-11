import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProviderTabs = ({ activeTab, navigation }) => {
  const handleTabPress = (screenName) => {
    if (!navigation) {
      console.warn('ProviderTabs: navigation prop is missing');
      return;
    }
    navigation.navigate(screenName);
  };

  return (
    <View className="flex-row justify-around py-3 border-t border-slate-100 bg-white pb-6">
      <TabItem
        icon={activeTab === 'Home' ? 'home' : 'home-outline'}
        label="Home"
        active={activeTab === 'Home'}
        onPress={() => handleTabPress('ProviderDashboard')}
      />

      <TabItem
        icon={activeTab === 'Services' ? 'grid' : 'grid-outline'}
        label="Services"
        active={activeTab === 'Services'}
        onPress={() => handleTabPress('MyServicesProvider')}
      />

      <TabItem
        icon={activeTab === 'Chat' ? 'chatbubble' : 'chatbubble-outline'}
        label="Chat"
        active={activeTab === 'Chat'}
        onPress={() => handleTabPress('InboxScreen')}
      />

      <TabItem
        icon={activeTab === 'Bookings' ? 'calendar' : 'calendar-outline'}
        label="Bookings"
        active={activeTab === 'Bookings'}
        onPress={() => handleTabPress('ProvidersBooking')}
      />

      <TabItem
        icon={activeTab === 'Profile' ? 'person' : 'person-outline'}
        label="Profile"
        active={activeTab === 'Profile'}
        onPress={() => handleTabPress('ProvProfileScreen')}
      />
    </View>
  );
};

const TabItem = ({ icon, label, active, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    className="items-center px-2 py-1"
    onPress={onPress}
  >
    <Ionicons name={icon} size={22} color={active ? '#1a5ea1' : '#94a3b8'} />
    <Text
      className={`mt-1 text-[11px] font-semibold ${
        active ? 'text-[#1a5ea1]' : 'text-slate-400'
      }`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default ProviderTabs;