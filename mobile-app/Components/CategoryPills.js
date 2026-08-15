import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export const CategoryPills = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <View className="mb-5">
      <View className="flex-row justify-between items-center px-5 mb-3">
        <Text className="text-slate-900 font-bold text-base">Categories</Text>
        <Text className="text-[#1a5ea1] text-xs font-bold">Scope: 3 Services</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        className="flex-row"
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.name;
          return (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.8}
              onPress={() => onSelectCategory(cat.name)}
              className={`flex-row items-center px-4 py-2.5 rounded-2xl mr-2.5 border ${
                isActive
                  ? 'bg-[#1a5ea1] border-[#1a5ea1]'
                  : 'bg-white border-slate-200'
              }`}
            >
              {cat.type === 'ion' ? (
                <Ionicons
                  name={cat.icon}
                  size={18}
                  color={isActive ? '#ffffff' : '#64748b'}
                />
              ) : (
                <MaterialCommunityIcons
                  name={cat.icon}
                  size={18}
                  color={isActive ? '#ffffff' : '#64748b'}
                />
              )}
              <Text
                className={`ml-2 text-xs font-bold ${
                  isActive ? 'text-white' : 'text-slate-700'
                }`}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategoryPills;