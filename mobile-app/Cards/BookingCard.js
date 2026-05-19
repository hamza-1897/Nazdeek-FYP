import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

const BookingCard = ({ serviceName, providerName, price, imageUri }) => {
  const navigation = useNavigation();

  return (
    <View className="bg-white rounded-[25px] p-3 mb-3 border border-gray-100 shadow-sm">
      <View className="flex-row">
        
        <Image 
          source={{ uri: imageUri }} 
          className="w-20 h-20 rounded-2xl"
          resizeMode="cover"
        />
        
        <View className="flex-1 ml-3 justify-center">
          <View className="flex-row justify-between items-start">
            <Text className="text-gray-900 font-bold text-base flex-1" numberOfLines={1}>
              {serviceName}
            </Text>
          </View>

          
          <View className="flex-row items-center mt-1">
            <Ionicons name="person-circle-outline" size={16} color="#1a5ea1" />
            <Text className="text-gray-500 text-xs ml-1 font-medium">{providerName}</Text>
          </View>

          
          <View className="flex-row justify-between items-center mt-2">
            <Text className="text-[#1a5ea1] font-extrabold text-sm">Rs. {price}</Text>
            
           
            <TouchableOpacity 
              onPress={() => navigation.navigate('CancelBooking')} 
              className="bg-red-50 px-4 py-1.5 rounded-full border border-red-100"
            >
              <Text className="text-red-500 text-[11px] font-bold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BookingCard;