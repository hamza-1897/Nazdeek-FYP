import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const BookingCancelSuccess = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
      <StatusBar barStyle="dark-content" />
      
      <View className="w-24 h-24 bg-red-50 rounded-full items-center justify-center mb-8">
        <Ionicons name="close-circle" size={60} color="#ef4444" />
      </View>

      <Text className="text-2xl font-bold text-gray-800 mb-3 text-center">
        Booking Cancelled!
      </Text>
      
      <Text className="text-gray-500 text-center text-base mb-10 leading-6">
        Your booking has been successfully cancelled. You can explore more services in the bookings section.
      </Text>

      <TouchableOpacity 
        onPress={() => navigation.navigate('AppTabs', { screen: 'Bookings' })} 
        className="bg-[#1a5ea1] w-full py-4 rounded-3xl items-center shadow-lg shadow-blue-200"
      >
        <Text className="text-white text-lg font-bold">Back to Bookings</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BookingCancelSuccess;