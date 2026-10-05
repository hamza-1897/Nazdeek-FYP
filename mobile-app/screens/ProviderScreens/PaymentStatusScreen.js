import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext'; 

const PaymentStatusScreen = () => {
  const { logout } = useContext(AuthContext);

  return (
    <SafeAreaView className="flex-1 bg-white justify-center px-6">
      <View className="items-center bg-gray-50 p-8 rounded-2xl border border-gray-200">
        
        <View className="bg-amber-100 p-5 rounded-full mb-6">
          <Ionicons name="time-outline" size={60} color="#D97706" />
        </View>

        <Text className="text-2xl font-bold text-gray-800 text-center mb-3">
          Payment Verification Pending
        </Text>

        <Text className="text-gray-600 text-center text-base leading-6 mb-8">
          Your payment slip has been received successfully. Your provider account will be automatically activated once the administrator verifies your payment.
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={logout}
          className="w-full bg-red-500 py-3.5 rounded-xl items-center flex-row justify-center gap-2"
        >
          <Ionicons name="log-out-outline" size={20} color="#ffffff" />
          <Text className="text-white font-bold text-base">
            Logout
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default PaymentStatusScreen;