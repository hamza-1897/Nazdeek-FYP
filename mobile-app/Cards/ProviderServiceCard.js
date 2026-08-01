import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProviderServiceCard = ({ service, onEdit, onDelete }) => {
  // Image URL handling
  const imageUrl = service?.serviceImages && service.serviceImages.length > 0 
    ? service.serviceImages[0] 
    : service?.image || 'https://via.placeholder.com/150';

  const priceTypeTag = service?.priceType || 'Fixed';

  const confirmDelete = () => {
    Alert.alert(
      "Delete Service",
      `Are you sure you want to delete "${service?.serviceName || service?.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => onDelete && onDelete(service._id) }
      ]
    );
  };

  return (
    <View 
      className="bg-white rounded-3xl mb-4 mx-6 p-4 border border-slate-100 shadow-sm flex-row items-start"
      style={{
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 3,
      }}
    >
      {/* Service Image */}
      <Image 
        source={{ uri: imageUrl }} 
        className="w-24 h-28 rounded-2xl bg-slate-100 mt-1" 
        resizeMode="cover" 
      />

      {/* Card Content Info */}
      <View className="flex-1 ml-3.5 justify-between min-h-[112px]">
        <View>
          {/* Price Type Badge (Category ki jagah ab Price Type hai) */}
          <View className="bg-blue-50/80 self-start px-2.5 py-0.5 rounded-full mb-1 border border-blue-100">
            <Text className="text-[10px] text-[#1a5ea1] font-bold tracking-wide uppercase">
              {priceTypeTag} Rate
            </Text>
          </View>

          {/* Service Title */}
          <Text className="text-base font-bold text-slate-800 leading-tight" numberOfLines={1}>
            {service?.serviceName || service?.name}
          </Text>

          {/* Detailed Description (Displaying proper text) */}
          {service?.description && (
            <Text className="text-xs text-slate-500 mt-1 leading-4" numberOfLines={3}>
              {service.description}
            </Text>
          )}
        </View>

        {/* Bottom Row: Price & Actions */}
        <View className="flex-row items-end justify-between mt-3 pt-2 border-t border-slate-50">
          <View className="flex-row items-baseline">
            <Text className="text-xs font-semibold text-slate-400 mr-1">Rs.</Text>
            <Text className="text-lg font-black text-[#1a5ea1]">
              {service?.price}
            </Text>
          </View>

          {/* Edit & Delete Action Buttons */}
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity 
              onPress={() => onEdit && onEdit(service)}
              activeOpacity={0.7}
              className="bg-blue-50 w-9 h-9 rounded-xl items-center justify-center border border-blue-100"
            >
              <Ionicons name="create-outline" size={17} color="#1a5ea1" />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={confirmDelete}
              activeOpacity={0.7}
              className="bg-rose-50 w-9 h-9 rounded-xl items-center justify-center border border-rose-100 ml-2"
            >
              <Ionicons name="trash-outline" size={17} color="#f43f5e" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProviderServiceCard;