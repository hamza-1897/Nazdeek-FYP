import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SubscriptionBanner = ({ planType, onPress }) => {
  const isPro = Boolean(planType);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      disabled={isPro}
      className={`mt-4 p-3 rounded-2xl border flex-row items-center justify-between ${
        isPro
          ? 'bg-amber-500/10 border-amber-400/30'
          : 'bg-slate-900 border-slate-800'
      }`}
    >
      <View className="flex-row items-center flex-1 mr-2">
        <View
          className={`w-10 h-10 rounded-xl items-center justify-center ${
            isPro ? 'bg-amber-500' : 'bg-slate-800'
          }`}
        >
          <MaterialCommunityIcons
            name={isPro ? 'crown' : 'crown-outline'}
            size={22}
            color={isPro ? '#ffffff' : '#fbbf24'}
          />
        </View>

        <View className="ml-3 flex-1">
          <View className="flex-row items-center">
            <Text
              className={`text-sm font-bold ${
                isPro ? 'text-amber-900' : 'text-white'
              }`}
            >
              {isPro ? 'Premium Member' : 'Free Plan'}
            </Text>

            {isPro && (
              <View className="ml-2 px-2.5 py-0.5 rounded-full bg-amber-500">
                <Text className="text-[10px] font-extrabold uppercase text-white">
                  PRO
                </Text>
              </View>
            )}
          </View>

          {!isPro && (
            <Text className="text-xs mt-0.5 text-slate-400">
              Upgrade to get higher search visibility
            </Text>
          )}
        </View>
      </View>

      {!isPro && (
        <MaterialCommunityIcons
          name="chevron-right"
          size={22}
          color="#94a3b8"
        />
      )}
    </TouchableOpacity>
  );
};

export default SubscriptionBanner;