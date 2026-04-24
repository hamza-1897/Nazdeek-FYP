import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const CancelBookingScreen = ({ navigation }) => {
  const [selectedReason, setSelectedReason] = useState('Change in Plans');
  const [otherReason, setOtherReason] = useState('');

  const reasons = [
    'Change in Plans',
    'Found Another Provider',
    'Unexpected Work',
    'Change in Requirements',
    'Conflict in Scheduling',
    'Other'
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
     
      <View className="px-6 py-4 flex-row items-center">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="w-10 h-10 border border-gray-100 rounded-full items-center justify-center"
        >
          <Ionicons name="arrow-back" size={22} color="#1a5ea1" />
        </TouchableOpacity>
        <Text className="flex-1 text-center mr-10 text-xl font-bold text-gray-800">Cancel Booking</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-4">
        <Text className="text-gray-500 text-sm mb-6">
          Please select the reason for cancellations:
        </Text>

       
        {reasons.map((reason) => (
          <TouchableOpacity 
            key={reason}
            onPress={() => setSelectedReason(reason)}
            className="flex-row items-center mb-6"
          >
            <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${selectedReason === reason ? 'border-[#1a5ea1]' : 'border-gray-300'}`}>
              {selectedReason === reason && (
                <View className="w-3 h-3 rounded-full bg-[#1a5ea1]" />
              )}
            </View>
            <Text className={`ml-4 text-base ${selectedReason === reason ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>
              {reason}
            </Text>
          </TouchableOpacity>
        ))}

       
        {selectedReason === 'Other' && (
          <View className="mt-2">
            <Text className="text-gray-800 font-bold mb-3">Other</Text>
            <TextInput
              placeholder="Enter your Reason"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              value={otherReason}
              onChangeText={setOtherReason}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-4 h-32 text-gray-800"
            />
          </View>
        )}
      </ScrollView>

      
      <View className="px-6 pb-10 pt-4">
  <TouchableOpacity 
    onPress={() => {
      console.log("Button Clicked!"); // Debugging ke liye
      navigation.navigate('BookingCancelSuccess'); 
    }} 
    className="bg-[#1a5ea1] py-4 rounded-full items-center shadow-lg"
  >
    <Text className="text-white text-lg font-bold">Cancel Appointment</Text>
  </TouchableOpacity>
</View>
    </SafeAreaView>
  );
};

export default CancelBookingScreen;