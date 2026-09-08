import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ServiceCardItem = ({ item, onPress }) => {
 const imageUrl =
    (item?.serviceImages && item.serviceImages.length > 0 && item.serviceImages[0]) ||
    item?.image ||
    'https://via.placeholder.com/300';

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="bg-white rounded-2xl mb-3.5 p-3 flex-row items-center border border-slate-100 shadow-xs"
    >
      <View className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 relative">
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      <View className="flex-1 ml-3.5 justify-between py-0.5 h-24">
        <View>
          <View className="self-start bg-blue-50 px-2 py-0.5 rounded-md mb-1">
            <Text className="text-[#1a5ea1] text-[10px] font-bold tracking-wide uppercase">
              {item?.category || 'General'}
            </Text>
          </View>

          <Text
            numberOfLines={1}
            className="text-slate-900 font-bold text-base tracking-tight"
          >
            {item?.title}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="checkmark-circle" size={13} color="#16a34a" />
            <Text className="text-slate-400 text-[11px] ml-1 font-medium">
              Verified
            </Text>
          </View>

          <View className="items-end">
            <Text className="text-[9px] font-semibold text-slate-400 uppercase">
              Starting
            </Text>
            <Text className="text-[#1a5ea1] font-extrabold text-sm">
              PKR {item?.price}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCardItem;