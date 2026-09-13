import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
 
export const CityPills = ({ cities, selectedCity, onSelectCity }) => {
  return (
    <View className="mb-5">
      <View className="flex-row justify-between items-center px-5 mb-3">
        <Text className="text-slate-900 font-bold text-base">Cities</Text>
      </View>
 
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        className="flex-row"
      >
        {cities.map((city) => {
          const isActive = selectedCity === city.name;
          return (
            <TouchableOpacity
              key={city.id}
              activeOpacity={0.8}
              onPress={() => onSelectCity(city.name)}
              className={`flex-row items-center px-4 py-2.5 rounded-2xl mr-2.5 border ${
                isActive
                  ? 'bg-[#1a5ea1] border-[#1a5ea1]'
                  : 'bg-white border-slate-200'
              }`}
            >
              <Ionicons
                name="location-outline"
                size={16}
                color={isActive ? '#ffffff' : '#64748b'}
              />
              <Text
                className={`ml-1.5 text-xs font-bold ${
                  isActive ? 'text-white' : 'text-slate-700'
                }`}
              >
                {city.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
 
export default CityPills;