import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PremiumProvidersSection = ({ providers = [], onSelectProvider }) => {
  return (
    <View className="mt-5">
      <View className="mb-3">
         <Text className="text-slate-900 font-bold text-base">Verified Experts</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {providers.map((item) => (
          <TouchableOpacity
            key={item._id || item.id}
            activeOpacity={0.85}
            onPress={() => onSelectProvider(item._id || item.id)}
            className="bg-white rounded-2xl border border-slate-100 mr-3.5 w-36 p-3 items-center shadow-sm"
          >
            <View className="relative mb-2">
              <Image
                source={{ uri: item.image || item.profileImage || 'https://via.placeholder.com/150' }}
                className="w-16 h-16 rounded-full bg-slate-100"
              />
              {item.isPremium && (
                <View className="absolute bottom-0 right-0 bg-[#1a5ea1] rounded-full w-5 h-5 items-center justify-center border-2 border-white">
                  <Ionicons name="checkmark-sharp" size={10} color="#ffffff" />
                </View>
              )}
            </View>

            <Text className="text-slate-900 font-bold text-sm text-center" numberOfLines={1}>
              {item.name}
            </Text>
            <Text className="text-slate-400 text-xs font-medium text-center mt-0.5" numberOfLines={1}>
              {item.category || 'Specialist'}
            </Text>

            <View className="mt-3 w-full bg-blue-50 rounded-xl py-2 items-center border border-blue-100/50">
              <Text className="text-[#1a5ea1] font-bold text-xs">View Profile</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default PremiumProvidersSection;