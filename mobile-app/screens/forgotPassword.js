import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { forgotPassword } from '../api/authApi';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
      if (!email) {
        alert("Please enter your registered email.");
        return;
      }

      try {
        const data  = await forgotPassword(email);
        alert(data.message);
        navigation.navigate('VerifyOTP',{ 
      email: email, 
      flow: 'forgotPassword' 
    });
      } catch (error) {
        alert("Failed to send OTP. Please try again.");
      }
    };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      
      <View className="items-center mb-8">
        <View className="bg-[#e8f0f7] p-6 rounded-full">
          <Ionicons name="lock-open-outline" size={50} color="#1a5ea1" />
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
          value={email}
          onChangeText={setEmail}
        />
      </View>

     
      <TouchableOpacity 
        className="bg-[#1a5ea1] py-4 rounded-3xl shadow-lg items-center"
        onPress={handleForgotPassword}
      >
        <Text className="text-white font-bold text-lg">Get OTP</Text>
      </TouchableOpacity>

     
      <TouchableOpacity className="mt-10 flex-row justify-center items-center" onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={18} color="#1a5ea1" />
        <Text className="text-[#1a5ea1] font-bold ml-2">Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;