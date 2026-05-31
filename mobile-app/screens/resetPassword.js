import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { resetPassword } from '../api/authApi';

const ResetPassword = ({ navigation , route}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = async () => {
    if (!newPassword) {
      alert("Please enter a new password.");
      return;
    }
    try {
      const data = await resetPassword(route.params.email, newPassword);
      alert(data.message);
      navigation.replace('Login');
    }
    catch (error) {
      console.log("Reset Password error:", error);
      alert(error.message || "Failed to reset password. Please try again.");
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-6" contentContainerStyle={{ flexGrow: 1 }}>
        
        <View className="mt-8 flex-row items-center justify-between">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">Reset Password</Text>
          <View style={{ width: 26 }} />
        </View>

        <View className="mt-12">
          <Text className="text-4xl font-bold text-gray-900">New Password</Text>
          <Text className="text-lg text-gray-500 mt-2 mb-10">
            Create a strong password to secure your account and protect your data.
          </Text>

          
          <View className="space-y-6">
            <View>
              <Text className="text-sm font-bold mb-2 text-gray-800">New Password</Text>
              <View className="flex-row items-center border border-gray-200 rounded-2xl px-4 bg-gray-50">
                <TextInput className="flex-1 py-4" 
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                
                 secureTextEntry={isPasswordVisible} />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={22} color="#9ca3af" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            className="bg-[#1a5ea1] py-4 rounded-2xl items-center shadow-md mt-12"
           // onPress={() => navigation.replace('PasswordUpdated')}
            onPress={handleResetPassword}
          >
            <Text className="text-white text-lg font-bold">Reset Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;