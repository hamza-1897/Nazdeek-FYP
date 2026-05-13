import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProviderServiceCard = ({ service }) => {
  return (
    <View className="flex-row bg-white p-3 rounded-2xl mb-3 border border-gray-100 shadow-sm items-center">
     
      <Image 
        source={{ uri: service.image }} 
        className="w-20 h-20 rounded-xl mr-4" 
        resizeMode="cover" 
      />

     
      <View className="flex-1">
        <View className="bg-gray-50 self-start px-2 py-0.5 rounded-md mb-1">
          <Text className="text-[10px] text-gray-400 font-medium">{service.category}</Text>
        </View>
        <Text className="text-sm font-bold text-gray-800" numberOfLines={1}>
          {service.name}
        </Text>
        <View className="flex-row items-center mt-1">
          <Ionicons name="person" size={12} color="#9ca3af" />
          <Text className="text-xs text-gray-400 ml-1">{service.providerName}</Text>
        </View>
        <Text className="text-[#1a5ea1] font-bold mt-1 text-sm">Rs. {service.price}</Text>
      </View>

     
    </View>
  );
};

export default ProviderServiceCard;