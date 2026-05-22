import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Alert, BackHandler } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';


import ProviderTabs from '../../Cards/ProviderTabs'; 

const ProvProfile = ({ navigation }) => {

  
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

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel" 
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }], 
            });
          }
        }
      ]
    );
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#e6f0fa" />

      <ScrollView className="flex-1 mb-16" showsVerticalScrollIndicator={false}>
        
        
        <View className="bg-[#e6f0fa] items-center pt-14 pb-8 px-6 rounded-b-[32px]">
          <View className="w-20 h-20 bg-[#1a5ea1] rounded-full items-center justify-center shadow-sm mb-3">
            <Text className="text-white text-2xl font-bold">SB</Text>
          </View>
          
          <Text className="text-xl font-bold text-gray-900">Sana Bibi</Text>
          <Text className="text-gray-500 text-xs mt-1">Verified provider · Cleaning</Text>
        </View>

      
        <View className="flex-row justify-around items-center my-6 px-4">
          <View className="items-center">
            <Text className="text-xl font-bold text-[#1a5ea1]">4.9</Text>
            <Text className="text-gray-400 text-xs mt-0.5">Rating</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-[#1a5ea1]">20</Text>
            <Text className="text-gray-400 text-xs mt-0.5">Bookings</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-[#1a5ea1]">2</Text>
            <Text className="text-gray-400 text-xs mt-0.5">Services</Text>
          </View>
        </View>

        <View className="px-6 mt-2 gap-y-3">
          
         
          <TouchableOpacity 
            onPress={() => navigation.navigate('EditProfileProvider')}
            className="flex-row items-center bg-white p-4 rounded-xl border border-gray-100"
          >
            <View className="w-9 h-9 bg-blue-50 rounded-lg items-center justify-center mr-4">
              <Feather name="user" size={18} color="#1a5ea1" />
            </View>
            <Text className="flex-1 text-base font-medium text-gray-800">Edit profile</Text>
            <Ionicons name="chevron-forward" size={18} color="black" />
          </TouchableOpacity>

         
          <TouchableOpacity 
            onPress={() => navigation.navigate('MyServicesProvider')}
            className="flex-row items-center bg-white p-4 rounded-xl border border-gray-100"
          >
            <View className="w-9 h-9 bg-green-50 rounded-lg items-center justify-center mr-4">
              <Feather name="grid" size={18} color="#22c55e" />
            </View>
            <Text className="flex-1 text-base font-medium text-gray-800">My services</Text>
            <Ionicons name="chevron-forward" size={18} color="black" />
          </TouchableOpacity>

         
          <TouchableOpacity 
            onPress={() => navigation.navigate('RatingsReviewsProvider')}
            className="flex-row items-center bg-white p-4 rounded-xl border border-gray-100"
          >
            <View className="w-9 h-9 bg-amber-50 rounded-lg items-center justify-center mr-4">
              <Feather name="star" size={18} color="#eab308" />
            </View>
            <Text className="flex-1 text-base font-medium text-gray-800">Ratings & reviews</Text>
            <Ionicons name="chevron-forward" size={18} color="black" />
          </TouchableOpacity>

       
          <TouchableOpacity 
            onPress={handleLogout}
            className="flex-row items-center bg-white p-4 rounded-xl border border-gray-100"
          >
            <View className="w-9 h-9 bg-red-50 rounded-lg items-center justify-center mr-4">
              <Feather name="log-out" size={18} color="#ef4444" />
            </View>
            <Text className="flex-1 text-base font-medium text-red-500">Log out</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

   
      <ProviderTabs activeTab="Profile" navigation={navigation} />
    </View>
  );
};

export default ProvProfile;