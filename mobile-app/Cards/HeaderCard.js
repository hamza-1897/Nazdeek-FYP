import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HeaderCard = ({ userName }) => {
  return (
    
    <View className="bg-[#1a5ea1] px-6 pt-14 pb-14 rounded-b-[40px] shadow-2xl">
      
      <View className="flex-row justify-between items-center mb-8">
        <View>
          <Text className="text-blue-100 text-lg font-medium">Good morning,</Text>
          <Text className="text-white text-3xl font-bold tracking-tight">
            {userName || 'Malaika'}
          </Text>
        </View>
        
        <TouchableOpacity className="bg-white/20 p-3 rounded-2xl border border-white/30">
          <Ionicons name="notifications" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="bg-white flex-row items-center px-4 py-4 rounded-2xl shadow-lg">
        <Ionicons name="search" size={22} color="#1a5ea1" />
        <TextInput 
          placeholder="Search services..." 
          placeholderTextColor="#94a3b8"
          className="ml-3 flex-1 text-gray-800 text-base"
        />
      </View>
    </View>
  );
};

export default HeaderCard;