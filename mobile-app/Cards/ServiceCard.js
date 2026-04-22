import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ServiceCard = ({ serviceName, providerName, rating, price, imageUri, onPress }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="bg-white rounded-[30px] p-4 mb-5 border border-gray-100 shadow-sm flex-row"
    >
      <Image 
        source={{ uri: imageUri || 'https://images.unsplash.com/photo-1581578731522-30d8d067469a?q=80&w=500' }} 
        className="w-28 h-28 rounded-2xl"
      />

      <View className="flex-1 ml-4 justify-between py-1">
        <View>
          <View className="flex-row justify-between items-start">
            <Text className="text-gray-900 text-lg font-bold flex-1" numberOfLines={1}>{serviceName}</Text>
            <View className="flex-row items-center bg-yellow-50 px-2 py-0.5 rounded-lg">
              <Ionicons name="star" size={12} color="#fbbf24" />
              <Text className="text-yellow-700 text-[10px] font-bold ml-1">{rating}</Text>
            </View>
          </View>
          
          <View className="flex-row items-center mt-1">
            <Ionicons name="person-circle-outline" size={16} color="#1a5ea1" />
            <Text className="text-gray-500 text-xs ml-1 font-medium">{providerName}</Text>
          </View>
        </View>

        
        <View className="flex-row justify-between items-end">
          <View>
            <Text className="text-gray-400 text-[10px]">Price</Text>
            <Text className="text-[#1a5ea1] text-lg font-extrabold">${price}</Text>
          </View>
          <View className="bg-[#1a5ea1] px-4 py-2 rounded-xl">
            <Text className="text-white font-bold text-xs">View Detail</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCard;