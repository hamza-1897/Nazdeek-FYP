import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProviderHeader = ({ providerInfo, onNotificationPress, onProfilePress }) => {
  return (
    <View className="bg-[#1a5ea1] px-6 pt-14 pb-8 rounded-b-[32px]">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1 mr-3">
          <TouchableOpacity
            onPress={onProfilePress}
            activeOpacity={0.8}
            className="w-12 h-12 rounded-full border-2 border-white/30 overflow-hidden bg-blue-400/30 mr-3"
          >
            <Image
              source={{
                uri:
                  providerInfo?.providerImage ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    providerInfo?.businessName || 'Provider'
                  )}&background=0D8ABC&color=fff`,
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </TouchableOpacity>

          <View className="flex-1">
            <Text className="text-blue-100 text-[11px] font-semibold uppercase tracking-wider">
              Provider Dashboard
            </Text>
            <View className="flex-row items-center mt-0.5">
              <Text className="text-white text-xl font-extrabold mr-1.5" numberOfLines={1}>
                {providerInfo?.businessName || 'Business Name'}
              </Text>
              {providerInfo?.isVerified && (
                <Ionicons name="checkmark-circle" size={18} color="#60a5fa" />
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={onNotificationPress}
          activeOpacity={0.8}
          className="w-11 h-11 bg-white/15 rounded-2xl items-center justify-center border border-white/20"
        >
          <Ionicons name="notifications-outline" size={22} color="#ffffff" />
          <View className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#1a5ea1]" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProviderHeader;