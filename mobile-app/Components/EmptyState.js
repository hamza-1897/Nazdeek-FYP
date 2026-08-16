import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmptyState = ({ text }) => (
  <View className="bg-white p-5 rounded-2xl border border-slate-200/80 items-center my-1">
    <Ionicons name="document-text-outline" size={28} color="#cbd5e1" />
    <Text className="text-slate-400 font-medium text-xs mt-1">{text}</Text>
  </View>
);

export default EmptyState;