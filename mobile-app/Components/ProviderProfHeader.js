import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import StatMetric from './StatMetric';

const ProviderProfHeader = ({ provider, stats }) => {
  const navigation = useNavigation();

  return (
    <View className="mx-5 bg-white rounded-3xl p-5 shadow-sm border border-slate-100 items-center -mt-8 relative">
      
      <TouchableOpacity 
        onPress={() => navigation.navigate('ReportScreen', { 
          providerId: provider?._id, 
          providerName: provider?.businessName 
        })}
        className="absolute top-9 right-4 bg-red-50 p-2 rounded-full border border-red-100 z-10 items-center justify-center"
      >
        <Ionicons name="flag-outline" size={16} color="#ef4444" />
      </TouchableOpacity>

      <View className="relative mt-10 mb-2">
        <Image
          source={{ uri: provider?.providerImage }}
          className="w-20 h-20 rounded-full border-4 border-white bg-slate-200"
        />
        {provider?.isPremium && (
          <View className="absolute bottom-0 right-0 bg-amber-500 p-1 rounded-full border-2 border-white">
            <Ionicons name="checkmark-sharp" size={12} color="white" />
          </View>
        )}
      </View>

      <Text className="text-xl font-black text-slate-900 text-center">
        {provider?.businessName}
      </Text>

      <View className="bg-slate-100 px-3 py-1 rounded-full mt-1">
        <Text className="text-slate-600 font-semibold text-xs">
          {provider?.categoryId?.name || 'General Service'}
        </Text>
      </View>

      <View className="flex-row items-center mt-2">
        <Ionicons name="location-outline" size={14} color="#64748b" />
        <Text className="text-slate-500 text-xs ml-1 font-medium">
          {provider?.address}
        </Text>
      </View>

      <View className="flex-row justify-between w-full mt-5 pt-4 border-t border-slate-100">
        <StatMetric
          icon="briefcase-outline"
          value={`${provider?.experience || 0} Yrs`}
          label="Experience"
        />
        <StatMetric
          icon="star"
          iconColor="#f59e0b"
          value={stats?.averageRating || '0.0'}
          label="Rating"
        />
        <StatMetric
          icon="chatbubbles-outline"
          value={stats?.totalReviews || 0}
          label="Reviews"
        />
      </View>
    </View>
  );
};

export default ProviderProfHeader;