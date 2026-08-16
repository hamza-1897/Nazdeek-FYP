import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SectionHeader = ({ title, count, icon }) => (
  <View className="flex-row items-center justify-between mb-3">
    <View className="flex-row items-center">
      <Ionicons name={icon} size={18} color="#1a5ea1" />
      <Text className="text-slate-900 font-extrabold text-base ml-2">
        {title}
      </Text>
    </View>
    {count !== undefined && count > 0 && (
      <View className="bg-slate-200/60 px-2 py-0.5 rounded-full">
        <Text className="text-slate-700 text-xs font-bold">{count}</Text>
      </View>
    )}
  </View>
);

export default SectionHeader;