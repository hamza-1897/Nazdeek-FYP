import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VerifyOTP = ({ navigation }) => {
  return (
    <View className="flex-1 bg-white px-6 pt-12">
     
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-6">
        <Ionicons name="chevron-back" size={28} color="black" />
      </TouchableOpacity>
      
      <Text className="text-center text-xl font-semibold mb-10">Verify OTP</Text>

      
      <View className="items-center mb-8">
        <View className="bg-[#E0F2F1] p-6 rounded-2xl">
          <Ionicons name="shield-checkmark-outline" size={50} color="#006064" />
        </View>
      </View>

      
      <Text className="text-3xl font-bold text-center mb-3">Verification</Text>
      <Text className="text-gray-500 text-center px-6 mb-10">
        Please enter the 4-digit code sent to your email.
      </Text>

     
      <View className="flex-row justify-between px-4 mb-12">
        {[1, 2, 3, 4].map((index) => (
          <View key={index} className="w-16 h-16 bg-[#F3F4F6] border border-gray-200 rounded-2xl items-center justify-center">
            <TextInput 
              maxLength={1} 
              keyboardType="number-pad" 
              className="text-2xl font-bold text-center w-full"
              placeholder="-"
            />
          </View>
        ))}
      </View>

      
      <TouchableOpacity className="bg-[#006064] py-4 rounded-3xl shadow-lg flex-row justify-center items-center">
        <Text className="text-white font-bold text-lg mr-2">Verify</Text>
        <Ionicons name="checkmark-circle-outline" size={20} color="white" />
      </TouchableOpacity>

      
      <View className="mt-8 flex-row justify-center">
        <Text className="text-gray-500">Didn't receive code? </Text>
        <TouchableOpacity>
          <Text className="text-[#006064] font-bold">Resend</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyOTP;