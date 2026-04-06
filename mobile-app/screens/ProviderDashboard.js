import React from 'react';
import { View, Text, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProviderDashboard = () => {
  const stats = [
    { label: 'Active bookings', value: '8', bg: 'bg-blue-50' },
    { label: 'This month', value: 'Rs 22k', bg: 'bg-green-50' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-6 py-4">
        <Text className="text-xl font-bold">Provider Dashboard</Text>
        <Text className="text-gray-500 mb-6">Manage your services here</Text>

        <View className="flex-row justify-between mb-6">
          {stats.map((stat, index) => (
            <View key={index} className={`${stat.bg} p-4 rounded-xl w-[48%]`}>
              <Text className="text-gray-600 text-sm">{stat.label}</Text>
              <Text className="text-xl font-bold">{stat.value}</Text>
            </View>
          ))}
        </View>

        <Text className="text-lg font-bold mb-4">Recent Requests</Text>
        <View className="p-4 bg-gray-50 rounded-lg">
          <Text className="text-gray-400 italic">No new requests yet.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProviderDashboard;