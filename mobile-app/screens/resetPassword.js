import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ResetPassword = ({ navigation }) => {
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
                <TextInput className="flex-1 py-4" placeholder="Enter new password" secureTextEntry />
                <Ionicons name="eye-outline" size={22} color="#9ca3af" />
              </View>
            </View>

            <View className="mt-5">
              <Text className="text-sm font-bold mb-2 text-gray-800">Confirm New Password</Text>
              <View className="flex-row items-center border border-gray-200 rounded-2xl px-4 bg-gray-50">
                <TextInput className="flex-1 py-4" placeholder="Re-enter your password" secureTextEntry />
                <Ionicons name="eye-outline" size={22} color="#9ca3af" />
              </View>
            </View>
          </View>

          <TouchableOpacity 
            className="bg-[#1a5ea1] py-4 rounded-2xl items-center shadow-md mt-12"
            onPress={() => navigation.replace('PasswordUpdated')}
          >
            <Text className="text-white text-lg font-bold">Reset Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;