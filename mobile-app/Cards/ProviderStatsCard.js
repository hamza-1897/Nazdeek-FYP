import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProviderStatsCard = ({ title, value, iconName, iconColor, bgColor }) => {
  return (
    <View className="w-[48%] bg-white border border-slate-100 p-4 rounded-2xl mb-3 shadow-sm flex-row items-center justify-between">
      <View>
        <Text className="text-slate-400 text-xs font-medium">{title}</Text>
        <Text className="text-slate-900 text-xl font-bold mt-1">{value}</Text>
      </View>
      <View className={`w-10 h-10 ${bgColor} rounded-xl items-center justify-center`}>
        <Ionicons name={iconName} size={20} color={iconColor} />
      </View>
    </View>
  );
};

export default ProviderStatsCard;