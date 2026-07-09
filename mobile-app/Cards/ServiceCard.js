import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ServiceCard = ({ serviceName, providerName,  price, imageUri, onPress }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      
      className="bg-white rounded-[25px] p-3 mb-3 border border-gray-100 shadow-sm flex-row"
    >
      
      <Image 
        source={{ uri: imageUri || 'https://images.unsplash.com/photo-1581578731522-30d8d067469a?q=80&w=500' }} 
        className="w-20 h-20 rounded-2xl"
        resizeMode="cover"
      />

      <View className="flex-1 ml-3 justify-between py-0.5">
        <View>
          <View className="flex-row justify-between items-center">
            
            <Text className="text-gray-900 text-base font-bold flex-1" numberOfLines={1}>
              {serviceName}
            </Text>
            
          
          </View>
          
          <View className="flex-row items-center mt-0.5">
            <Ionicons name="person-circle-outline" size={14} color="#1a5ea1" />
            <Text className="text-gray-500 text-[11px] ml-1 font-medium">{providerName}</Text>
          </View>
        </View>

        
    <View className="flex-row justify-between items-end">
          <View>
          
            <Text className="text-[#1a5ea1] text-lg font-extrabold">Rs.{price}</Text>
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