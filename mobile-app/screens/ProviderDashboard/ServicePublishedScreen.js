import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ServicePublishedScreen = ({ navigation }) => {
  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View className="flex-1 items-center justify-center px-8">
        <View className="w-24 h-24 bg-blue-50 rounded-full items-center justify-center mb-8">
          <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center">
            <Ionicons name="checkmark-sharp" size={45} color="#1a5ea1" />
          </View>
        </View>
        
        <Text className="text-2xl font-bold text-gray-900 text-center mb-3">
          Service Published!
        </Text>
        
        <Text className="text-base text-gray-500 text-center leading-relaxed px-6">
          Your service has been successfully listed. It is now visible to all customers in your area.
        </Text>
      </View>

      <View className="px-6 pb-12">
        <TouchableOpacity 
          className="bg-[#1a5ea1] py-4 rounded-2xl items-center shadow-sm active:opacity-90"
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'ProviderDashboard' }],
            });
          }} 
        >
          <Text className="text-white font-semibold text-lg">Continue to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServicePublishedScreen;