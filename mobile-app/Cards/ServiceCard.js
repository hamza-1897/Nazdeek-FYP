import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ServiceCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.95}
      className="bg-white rounded-[22px] border border-gray-100 shadow-md shadow-gray-200/50 mb-3 mx-2 overflow-hidden"
    >
      <View className="flex-row p-3 items-center">
        
        <View className="relative">
          <Image 
            source={{ 
              uri: item?.serviceImages?.[0] || 'https://images.unsplash.com/photo-1581578731522-30d8d067469a?q=80&w=500' 
            }} 
            className="w-24 h-24 rounded-2xl"
            resizeMode="cover"
          />
          {/* Floating Category Badge */}
          <View className="absolute bottom-1 left-1 bg-black/60 px-2 py-0.5 rounded-md">
            <Text className="text-white text-[9px] font-black uppercase tracking-wider">
              {item?.serviceName?.toLowerCase().includes('cleaning') ? 'Cleaning' : 'Technician'}
            </Text>
          </View>
        </View>

    
        <View className="flex-1 ml-3.5 justify-between h-24 py-0.5">
          
          <View className="flex-row justify-between items-start w-full">
            <Text className="text-gray-900 font-black text-base flex-1 pr-1.5 leading-tight" numberOfLines={2}>
              {item?.serviceName || "Service Title"}
            </Text>
            <Text className="text-[#1a5ea1] font-black text-base whitespace-nowrap">
              Rs.{item?.price || "0"}
            </Text>
          </View>

          <View className="flex-row items-center bg-blue-50/40 border border-blue-100/20 px-2.5 py-0.5 rounded-xl self-start mt-0.5">
            <Ionicons name="person-circle-sharp" size={14} color="#1a5ea1" />
            <Text className="text-gray-700 text-xs font-bold ml-1.5" numberOfLines={1}>
              {item?.providerId?.businessName || "Expert Partner"}
            </Text>
          </View>

          <View className="flex-row items-center border-t border-gray-100/70 pt-1.5 mt-0.5">
            <Ionicons name="location-sharp" size={13} color="#9ca3af" />
            <Text className="text-gray-400 text-[11px] font-bold ml-1 capitalize" numberOfLines={1}>
              {item?.providerId?.address || "Mandi Bahauddin"}
            </Text>
          </View>

        </View>

      </View>
    </TouchableOpacity>
  );
};

export default ServiceCard;