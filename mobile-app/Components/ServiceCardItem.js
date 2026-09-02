import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ServiceCardItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="bg-white rounded-2xl p-3 border border-slate-100 mb-3 flex-row  shadow-sm"
    >
      <Image
        source={{ uri: item.image }}
        className="w-22 h-22 rounded-xl bg-slate-100"
      />
      <View className="ml-3.5 flex-1 py-0.5">
        <View className="bg-blue-50 self-start px-2 py-0.5 rounded-md mb-1">
          <Text className="text-[10px] text-[#1a5ea1] font-bold uppercase tracking-wider">
            {item.category}
          </Text>
        </View>

        <Text className="text-slate-800 font-bold text-sm" numberOfLines={1}>
          {item.title}
        </Text>

        <View className="flex-row items-center mt-1">
          <Ionicons name="star" size={12} color="#f59e0b" />
          <Text className="text-slate-700 text-xs font-bold ml-1">{item.rating}</Text>
          <Text className="text-slate-400 text-xs ml-1">({item.reviews} reviews)</Text>
        </View>

        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-slate-900 font-bold text-base">
            Rs. {item.price}
          </Text>
          <View className="bg-[#1a5ea1] px-3 py-1 rounded-lg">
            <Text className="text-white text-xs font-bold">Book</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCardItem;