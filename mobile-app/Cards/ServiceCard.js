import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ServiceCard = ({ item, onPress }) => {
  const imageUrl = item?.serviceImages?.[0] || item?.image || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=500';
  const categoryName = item?.categoryId?.name || item?.category || 'Service';
  const providerName = item?.providerId?.businessName ;
  const locationText = item?.providerId?.address || 'Location not available';
  const rating = item?.rating || '4.9';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="bg-white rounded-3xl mb-4 mx-1 border border-slate-100 shadow-md shadow-slate-200/50 overflow-hidden"
    >
      <View className="relative w-full h-40 bg-slate-100">
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-full"
          resizeMode="cover"
        />

        <View className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/40 shadow-xs">
          <Text className="text-slate-900 text-[10px] font-extrabold uppercase tracking-wider">
            {categoryName}
          </Text>
        </View>

        <View className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full flex-row items-center border border-white/20">
          <Ionicons name="star" size={11} color="#f59e0b" />
          <Text className="text-white text-xs font-bold ml-1">
            {rating}
          </Text>
        </View>
      </View>

      <View className="p-4">
        <View className="flex-row justify-between items-start mb-1.5">
          <Text
            numberOfLines={1}
            className="text-lg font-black text-slate-900 flex-1 pr-2 capitalize"
          >
            {item?.serviceName || item?.name || 'Untitled Service'}
          </Text>
          <View className="items-end">
            <Text className="text-xl font-black text-[#1a5ea1]">
              Rs.{item?.price || '0'}
            </Text>
            <Text className="text-[10px] font-extrabold text-slate-400 uppercase -mt-1">
              {item?.priceType || 'Fixed'}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center mb-3">
          <Ionicons name="location-outline" size={14} color="#64748b" />
          <Text numberOfLines={1} className="text-xs font-semibold text-slate-500 ml-1 capitalize">
            {locationText}
          </Text>
        </View>

        <View className="flex-row items-center justify-between border-t border-slate-100 pt-3">
          <View className="flex-1 mr-2">
            <Text className="text-xs font-semibold text-slate-400">Provider</Text>
            <Text numberOfLines={1} className="text-sm font-extrabold text-slate-900 mt-0.5">
              {providerName}
            </Text>
          </View>

          <View className="bg-[#1a5ea1] px-4 py-2.5 rounded-xl flex-row items-center shadow-sm shadow-blue-500/20">
            <Text className="text-white text-xs font-bold mr-1">View Detail</Text>
            <Ionicons name="arrow-forward" size={12} color="white" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCard;