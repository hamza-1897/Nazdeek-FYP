import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const PaymentStatusScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white justify-center px-6">
      <View className="items-center bg-gray-50 p-8 rounded-2xl border border-gray-200">
        
        <View className="bg-amber-100 p-5 rounded-full mb-6">
          <Ionicons name="time-outline" size={60} color="#D97706" />
        </View>

        <Text className="text-2xl font-bold text-gray-800 text-center mb-3">
          Payment Verification Pending
        </Text>

        <Text className="text-gray-600 text-center text-base leading-6">
          Your payment slip has been received successfully. Your provider account will be automatically activated once the administrator verifies your payment.
        </Text>

      </View>
    </SafeAreaView>
  );
};

export default PaymentStatusScreen;