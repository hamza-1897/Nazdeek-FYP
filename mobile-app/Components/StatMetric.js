import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StatMetric = ({ icon, value, label, iconColor = '#1a5ea1' }) => (
  <View className="items-center flex-1">
    <View className="flex-row items-center space-x-1">
      <Ionicons name={icon} size={16} color={iconColor} />
      <Text className="font-extrabold text-slate-800 text-sm">{value}</Text>
    </View>
    <Text className="text-slate-400 text-[10px] font-semibold mt-0.5 uppercase tracking-wider">
      {label}
    </Text>
  </View>
);

export default StatMetric;