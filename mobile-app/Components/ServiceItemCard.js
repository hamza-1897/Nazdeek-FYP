import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const ServiceItemCard = ({ service, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-white p-3.5 rounded-2xl border border-slate-200/80 flex-row items-center shadow-xs mb-3"
  >
    <Image
      source={{
        uri:
          service?.serviceImages?.[0] ||
          'https://via.placeholder.com/150',
      }}
      className="w-20 h-20 rounded-xl bg-slate-100"
    />
    <View className="ml-3 flex-1">
      <Text className="text-slate-900 font-bold text-base" numberOfLines={1}>
        {service?.serviceName}
      </Text>
      <Text className="text-slate-500 text-xs mt-0.5" numberOfLines={2}>
        {service?.description}
      </Text>
      <Text className="text-[#1a5ea1] font-black text-sm mt-2">
        Rs. {service?.price}
      </Text>
    </View>
  </TouchableOpacity>
);

export default ServiceItemCard;