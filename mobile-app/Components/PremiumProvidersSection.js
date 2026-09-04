import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

export const PremiumProvidersSection = ({ providers = [], onSelectProvider }) => {
  const premiumOnly = providers.filter((p) => p.isPremium);

  if (premiumOnly.length === 0) return null;

  return (
    <View className="mt-2 mb-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 8, paddingTop: 12 }}
      >
        {premiumOnly.map((item) => (
          <TouchableOpacity
            key={item._id || item.id}
            activeOpacity={0.88}
            onPress={() => onSelectProvider && onSelectProvider(item._id || item.id)}
            className="bg-white rounded-3xl border-2 border-amber-400 bg-amber-50/10 mr-3.5 w-36 p-3 items-center shadow-sm relative"
          >
            <View className="absolute -top-3 bg-amber-500 px-2.5 py-0.5 rounded-full flex-row items-center z-10 shadow-sm border border-amber-200">
              <FontAwesome5 name="crown" size={8} color="#ffffff" />
              <Text className="text-[9px] font-black text-white ml-1 tracking-wider uppercase">
                PRO
              </Text>
            </View>

            <Image
              source={{ uri: item.image || item.profileImage || 'https://via.placeholder.com/150' }}
              className="w-16 h-16 rounded-full bg-slate-100 border-2 border-amber-400 mt-1 mb-1"
            />

            <Text
              className="text-slate-900 font-bold text-sm text-center mt-1"
              numberOfLines={1}
            >
              {item.name}
            </Text>

            <Text
              className="text-slate-400 text-xs font-medium text-center mt-0.5"
              numberOfLines={1}
            >
              {item.category || 'Specialist'}
            </Text>

            

            <View className="mt-2.5 w-full bg-amber-500 py-1.5 rounded-xl items-center shadow-sm">
              <Text className="text-white font-bold text-xs">View Profile</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default PremiumProvidersSection;