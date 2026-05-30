import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Image, Alert, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const ProvidersBooking = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Requests');

  
  const [requestsData, setRequestsData] = useState([
    { id: 101, name: 'Ayesha Omar', service: 'Deep Home Cleaning', date: 'Apr 12, 4 PM', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { id: 102, name: 'Zain Ahmed', service: 'Electrician Service', date: 'Apr 14, 11 AM', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
  ]);

  const [upcomingData, setUpcomingData] = useState([
    { id: 1, name: 'Sara Khan', service: 'Deep Home Cleaning', date: 'Apr 8, 11 AM', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 2, name: 'Fatima Noor', service: 'Deep Home Cleaning', date: 'Apr 10, 2 PM', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
  ]);

  const [completedData, setCompletedData] = useState([
    { id: 3, name: 'Ali Raza', service: 'Electrician Service', date: 'Mar 15, 10 AM', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  ]);

  
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'ProviderDashboard' }],
        });
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [navigation])
  );

 
  const handleAcceptRequest = (item) => {
    Alert.alert("Request Accepted", `${item.name}'s booking has been moved to Upcoming.`, [
      { text: "OK", onPress: () => {
        setRequestsData(prev => prev.filter(i => i.id !== item.id));
        setUpcomingData(prev => [...prev, item]);
      }}
    ]);
  };


  const handleRejectRequest = (item) => {
    Alert.alert("Reject Request", "Are you sure you want to reject this booking?", [
      { text: "Cancel", style: "cancel" },
      { text: "Reject", style: "destructive", onPress: () => {
        setRequestsData(prev => prev.filter(i => i.id !== item.id));
      }}
    ]);
  };

  
  const handleMarkDone = (item) => {
    Alert.alert("Success", "Job marked as completed!", [
      { text: "OK", onPress: () => {
        setUpcomingData(prev => prev.filter(i => i.id !== item.id));
        setCompletedData(prev => [...prev, item]);
      }}
    ]);
  };

  const getCurrentData = () => {
    if (activeTab === 'Requests') return requestsData;
    if (activeTab === 'Upcoming') return upcomingData;
    return completedData;
  };

  const currentData = getCurrentData();

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      
      <View className="px-6 py-4 mt-8 flex-row items-center border-b border-gray-50">
        <TouchableOpacity 
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'ProviderDashboard' }],
            });
          }} 
          className="mr-4"
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-900">My bookings</Text>
      </View>

     
      <View className="flex-row justify-around border-b border-gray-100">
        {['Requests', 'Upcoming', 'Completed'].map((tab) => (
          <TouchableOpacity 
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`py-3 flex-1 items-center ${activeTab === tab ? 'border-b-2 border-[#1a5ea1]' : ''}`}
          >
            <Text className={`font-semibold text-xs ${activeTab === tab ? 'text-[#1a5ea1]' : 'text-gray-400'}`}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

     
      <ScrollView className="flex-1 px-6 mt-4" showsVerticalScrollIndicator={false}>
        {currentData.length === 0 ? (
          <View className="items-center justify-center mt-20">
            <Ionicons name="calendar-outline" size={48} color="#cbd5e1" />
            <Text className="text-gray-400 mt-2 font-medium">No bookings found</Text>
          </View>
        ) : (
          currentData.map((item) => (
            <View 
              key={item.id} 
              className={`mb-3 p-3 rounded-2xl border ${
                activeTab === 'Completed' ? 'bg-white border-gray-100' : 'bg-blue-50/50 border-blue-100'
              }`}
            >
              <View className="flex-row items-center">
                <Image source={{ uri: item.image }} className="w-10 h-10 rounded-full mr-3 border border-gray-100" />
                <View className="flex-1">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-[15px] font-bold text-gray-900">{item.name}</Text>
                    <Text className="font-bold text-[9px] px-2 py-0.5 rounded-md bg-blue-100/60 text-[#1a5ea1]">
                      {item.date}
                    </Text>
                  </View>
                  <Text className="text-gray-500 text-[11px]">{item.service}</Text>
                </View>
              </View>

              {/* Action Buttons based on Active Tab */}
              {activeTab === 'Requests' && (
                <View className="flex-row gap-2 mt-3 justify-end">
                  <TouchableOpacity 
                    onPress={() => handleRejectRequest(item)}
                    className="border border-red-500 px-4 py-1.5 rounded-lg"
                  >
                    <Text className="text-red-500 font-bold text-[11px]">Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => handleAcceptRequest(item)}
                    className="bg-[#1a5ea1] px-4 py-1.5 rounded-lg shadow-sm"
                  >
                    <Text className="text-white font-bold text-[11px]">Accept</Text>
                  </TouchableOpacity>
                </View>
              )}

              {activeTab === 'Upcoming' && (
                <View className="flex-row gap-2 mt-3 justify-end">
                  <TouchableOpacity className="border border-[#1a5ea1] px-4 py-1.5 rounded-lg">
                    <Text className="text-[#1a5ea1] font-bold text-[11px]">Message</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    className="bg-[#1a5ea1] px-4 py-1.5 rounded-lg shadow-sm" 
                    onPress={() => handleMarkDone(item)}
                  >
                    <Text className="text-white font-bold text-[11px]">Mark done</Text>
                  </TouchableOpacity>
                </View>
              )}

              {activeTab === 'Completed' && (
                <View className="flex-row items-center mt-2 pt-2 border-t border-gray-50">
                  <Ionicons name="checkmark-done" size={14} color="#1a5ea1" />
                  <Text className="text-[#1a5ea1] font-bold text-[10px] ml-1 uppercase">Job Completed</Text>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default ProvidersBooking;