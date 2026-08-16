import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const HomeServiceCard = ({ item, onPressCard }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPressCard}
      className="bg-white p-3.5 rounded-2xl border border-slate-200/80 mb-3 shadow-xs flex-row"
    >
      <Image
        source={{
          uri:
            item?.serviceImages?.[0] ||
            'https://images.unsplash.com/photo-1581578731522-30d8d067469a?q=80&w=300',
        }}
        className="w-24 h-24 rounded-xl bg-slate-100"
        resizeMode="cover"
      />
      <View className="flex-1 ml-3 justify-between py-0.5">
        <View>
          <Text className="text-slate-900 font-bold text-sm" numberOfLines={1}>
            {item?.serviceName || 'Service Title'}
          </Text>
          <Text className="text-slate-400 text-xs font-medium mt-0.5 capitalize">
            {item?.categoryId?.name || item?.category || 'General'}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="star" size={12} color="#f59e0b" />
          <Text className="text-slate-800 font-bold text-xs ml-1">
            {item?.rating || '4.8'}
          </Text>
          <Text className="text-slate-400 text-[11px] ml-1">
            ({item?.reviewsCount || '50'} reviews)
          </Text>
        </View>

        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-[#1a5ea1] font-black text-sm">
            Rs. {item?.price || '0'}
          </Text>
          <View className="bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
            <Text className="text-[#1a5ea1] font-bold text-[10px]">Book</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeServiceCard;