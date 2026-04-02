import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const PasswordUpdated = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center px-8">
      <View className="bg-[#52ab98] p-6 rounded-full mb-8 shadow-lg">
        <Ionicons name="checkmark" size={60} color="white" />
      </View>

      <Text className="text-3xl font-bold text-gray-900 text-center">Password Updated!</Text>
      <Text className="text-base text-gray-500 text-center mt-4 mb-16">
        Your password has been changed successfully. You can now login with your new password.
      </Text>

      <TouchableOpacity 
        className="bg-[#006666] w-full py-4 rounded-2xl flex-row justify-center items-center"
        onPress={() => navigation.replace('Login')}
      >
        <Text className="text-white text-lg font-bold mr-2">Back to Login</Text>
        <Ionicons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PasswordUpdated;