import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CompletedCard = ({ serviceName, providerName, price, imageUri, date }) => {
  return (
    <View className="bg-white rounded-[25px] p-4 mb-3 border border-gray-100 shadow-sm">
      <View className="flex-row">
        
        <Image 
          source={{ uri: imageUri }} 
          className="w-20 h-20 rounded-2xl"
          resizeMode="cover"
        />
        
        <View className="flex-1 ml-3">
          <View className="flex-row justify-between items-center">
             <Text className="bg-blue-50 text-[#1a5ea1] text-[10px] px-2 py-0.5 rounded font-bold uppercase">
               Completed
             </Text>
             <Text className="text-gray-400 text-[10px]">{date}</Text>
          </View>

          <Text className="text-gray-900 font-bold text-base mt-1" numberOfLines={1}>
            {serviceName}
          </Text>

          <View className="flex-row items-center mt-1">
            <Ionicons name="person-circle-outline" size={14} color="#1a5ea1" />
            <Text className="text-gray-500 text-xs ml-1">{providerName}</Text>
          </View>

          <View className="flex-row justify-between items-center mt-3 pt-2 border-t border-gray-50">
            <Text className="text-[#1a5ea1] font-extrabold text-sm">Rs. {price}</Text>
            
           
            <TouchableOpacity className="bg-[#1a5ea1] px-4 py-1.5 rounded-full">
              <Text className="text-white text-[11px] font-bold">Leave Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CompletedCard;