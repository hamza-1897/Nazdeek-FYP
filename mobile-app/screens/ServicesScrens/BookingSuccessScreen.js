import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const BookingSuccessScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      
      <View className="w-full px-6 py-4">
        <TouchableOpacity 
          onPress={() => navigation.replace('AppTabs')}
          className="w-11 h-11 border border-gray-100 rounded-full items-center justify-center bg-white"
        >
          <Ionicons name="arrow-back" size={24} color="#1a5ea1" />
        </TouchableOpacity>
      </View>

      
      <View className="flex-1 justify-center items-center px-10">
        
        <View className="w-32 h-32 bg-[#1a5ea1]/10 rounded-full items-center justify-center mb-8">
          <View className="w-24 h-24 bg-[#1a5ea1] rounded-full items-center justify-center shadow-xl shadow-blue-300">
            <Ionicons name="checkmark" size={60} color="white" />
          </View>
        </View>

        <Text className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Congratulations!
        </Text>
        
        <Text className="text-gray-500 text-center text-base leading-6">
          Your Booking has been Created Successfully. You can view your booking details in the "My Bookings" section.
        </Text>
      </View>

    </SafeAreaView>
  );
};

export default BookingSuccessScreen;