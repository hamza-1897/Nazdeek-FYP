import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ForgotPassword = ({ navigation }) => {
  return (
    <View className="flex-1 bg-white px-6 justify-center">
      
      <View className="items-center mb-8">
        <View className="bg-[#E0F2F1] p-6 rounded-full">
          <Ionicons name="lock-open-outline" size={50} color="#006064" />
        </View>
      </View>

      
      <Text className="text-3xl font-bold text-gray-900 text-center mb-2">Forgot Password?</Text>
      <Text className="text-gray-500 text-center mb-10 leading-5">
        Enter your registered email below to receive a password reset OTP.
      </Text>

      
      <Text className="text-gray-900 font-bold mb-2 ml-1">Email Address</Text>
      <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-3 mb-8">
        <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
        <TextInput 
          placeholder="Enter your email" 
          className="flex-1 ml-3 text-gray-700"
          keyboardType="email-address"
        />
      </View>

     
      <TouchableOpacity 
        className="bg-[#006064] py-4 rounded-3xl shadow-lg items-center"
        onPress={() => navigation.navigate('VerifyOTP')}
      >
        <Text className="text-white font-bold text-lg">Get OTP</Text>
      </TouchableOpacity>

     
      <TouchableOpacity className="mt-10 flex-row justify-center items-center" onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={18} color="#006064" />
        <Text className="text-[#006064] font-bold ml-2">Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;