import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export const PromoBanner = ({ onPressBanner }) => {
  return (
    <View className="px-5 my-4">
      <View className="bg-[#1a5ea1] p-5 rounded-3xl shadow-sm relative overflow-hidden">
        <View className="w-36 h-36 bg-white/10 rounded-full absolute -right-10 -top-10" />
        <View className="w-24 h-24 bg-white/10 rounded-full absolute -right-4 -bottom-8" />

        

        <Text className="text-white font-black text-xl leading-tight">
          Get Expert Repairing{'\n'}At Your Doorstep
        </Text>
        <Text className="text-blue-100 text-xs mt-1.5 font-medium">
          Verified Plumbers, Electricians & Technicians
        </Text>

        <TouchableOpacity
          onPress={onPressBanner}
          activeOpacity={0.9}
          className="mt-4 bg-white px-5 py-2.5 rounded-xl self-start"
        >
          <Text className="text-[#1a5ea1] font-bold text-xs">Explore More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PromoBanner;