import React from 'react';
import { View, Text, Image,TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import ProviderTabs from '../../Cards/ProviderTabs';
import { useContext } from 'react';
import {AuthContext} from '../../context/AuthContext';


const ProvProfile = ({ navigation }) => {
  const { providerInfo, userInfo } = useContext(AuthContext);

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#e6f0fa" />

      <ScrollView className="flex-1 mb-16" showsVerticalScrollIndicator={false}>
        
        
        <View className="bg-[#e6f0fa] items-center pt-14 pb-8 px-6 rounded-b-[32px]">
         
          <View className="w-20 h-20 bg-[#1a5ea1] rounded-full items-center justify-center shadow-sm mb-3">
            <Image source={{ uri: userInfo?.profileImage }} className="w-20 h-20 rounded-full" />
          </View>
          
          <Text className="text-xl font-bold text-gray-900">{providerInfo?.businessName}</Text>
          <Text className="text-gray-500 text-xs mt-1">Verified provider · {providerInfo?.categoryId.name}</Text>
        </View>

        
        <View className="flex-row justify-around items-center my-6 px-4">
          <View className="items-center">
            <Text className="text-xl font-bold text-[#1a5ea1]">4.9</Text>
            <Text className="text-gray-400 text-xs mt-0.5">Rating</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-[#1a5ea1]">201</Text>
            <Text className="text-gray-400 text-xs mt-0.5">Bookings</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-[#1a5ea1]">2</Text>
            <Text className="text-gray-400 text-xs mt-0.5">Services</Text>
          </View>
        </View>

        <View className="px-6 mt-2 gap-y-3">
          
         
          <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-xl border border-gray-100">
            <View className="w-9 h-9 bg-blue-50 rounded-lg items-center justify-center mr-4">
              <Feather name="user" size={18} color="#1a5ea1" />
            </View>
            <Text className="flex-1 text-base font-medium text-gray-800">Edit profile</Text>
            <Ionicons name="chevron-forward" size={18} color="black" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-xl border border-gray-100">
            <View className="w-9 h-9 bg-green-50 rounded-lg items-center justify-center mr-4">
              <Feather name="grid" size={18} color="#22c55e" />
            </View>
            <Text className="flex-1 text-base font-medium text-gray-800">My services</Text>
            <Ionicons name="chevron-forward" size={18} color="black" />
          </TouchableOpacity>

         
          <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-xl border border-gray-100">
            <View className="w-9 h-9 bg-amber-50 rounded-lg items-center justify-center mr-4">
              <Feather name="star" size={18} color="#eab308" />
            </View>
            <Text className="flex-1 text-base font-medium text-gray-800">Ratings & reviews</Text>
            <Ionicons name="chevron-forward" size={18} color="black" />
          </TouchableOpacity>

         
          <TouchableOpacity 
            onPress={() => {
              navigation.replace('Login');
            }}
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