import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => (
  <SafeAreaView className="flex-1 bg-white">
    <View className="flex-1 justify-center items-center pb-32">
      <Text className="text-xl font-bold text-blue-600">Home Screen</Text>
    </View>
  </SafeAreaView>
);
export default HomeScreen;