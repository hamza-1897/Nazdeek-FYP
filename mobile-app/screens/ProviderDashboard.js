import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Octicons } from '@expo/vector-icons';


import ProviderTabs from '../Cards/ProviderTabs'; 

const ProviderDashboard = ({ navigation }) => {
  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#1a5ea1" />

      
      <View className="bg-[#1a5ea1] px-6 pt-14 pb-8 rounded-b-[30px] flex-row justify-between items-center">
        <View>
          <Text className="text-blue-100 text-sm font-medium">Provider dashboard</Text>
          <Text className="text-white text-2xl font-bold">Sana Bibi</Text>
        </View>
        <TouchableOpacity className="w-12 h-12 bg-blue-400/30 rounded-full items-center justify-center border border-blue-300/50">
          <Text className="text-white font-bold text-lg">SB</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
      
        <View className="flex-row flex-wrap justify-between mt-6">
          <StatCard title="5" subtitle="Active bookings" bgColor="bg-blue-50" textColor="text-blue-600" />
          <StatCard title="Rs 22k" subtitle="This month" bgColor="bg-green-50" textColor="text-green-600" />
          <StatCard title="4.9" subtitle="Avg rating" bgColor="bg-orange-50" textColor="text-orange-600" />
          <StatCard title="20" subtitle="Total bookings" bgColor="bg-gray-50" textColor="text-gray-800" />
        </View>

        
        <Text className="text-gray-800 font-bold text-lg mt-8 mb-4 uppercase tracking-wider text-[10px]">Quick Actions</Text>
        <View className="flex-row justify-between">
          <ActionItem 
            icon="diff-added" 
            label="Add service" 
            color="#1a5ea1" 
            onPress={() => navigation.navigate('CreateService')} 
          />
          <ActionItem icon="calendar" label="Bookings" color="#b45309" />
        </View>

        <Text className="text-gray-800 font-bold text-lg mt-8 mb-4 uppercase tracking-wider text-[10px]">
          Today{"'"}s Bookings
        </Text>
        
        <View className="bg-white border border-gray-100 rounded-2xl p-4 flex-row items-center shadow-sm mb-6">
          <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-4">
            <Text className="text-[#1a5ea1] font-bold">SK</Text>
          </View>
          <View className="flex-1">
            <Text className="text-gray-900 font-bold text-base">Sara Khan</Text>
            <Text className="text-gray-500 text-sm">Deep Home Cleaning · 11:00 AM</Text>
          </View>
          <View className="bg-blue-50 px-3 py-1 rounded-full">
            <Text className="text-[#1a5ea1] text-xs font-bold">Upcoming</Text>
          </View>
        </View>
      </ScrollView>

     
      <ProviderTabs activeTab="Home" navigation={navigation} />
    </View>
      );
};


const StatCard = ({ title, subtitle, bgColor, textColor }) => (
  <View className={`${bgColor} w-[47%] p-5 rounded-2xl mb-4 items-center justify-center border border-white/50 shadow-sm`}>
    <Text className={`${textColor} text-2xl font-bold`}>{title}</Text>
    <Text className="text-gray-500 text-center text-[10px] mt-1 font-medium">{subtitle}</Text>
  </View>
);

const ActionItem = ({ icon, label, color, onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    className="w-[48%] bg-white border border-gray-100 p-4 rounded-2xl mb-4 flex-row items-center shadow-sm"
  >
    <View className="mr-3">
      <Octicons name={icon} size={20} color={color} />
    </View>
    <Text className="text-gray-700 font-semibold text-sm">{label}</Text>
  </TouchableOpacity>
);

export default ProviderDashboard;