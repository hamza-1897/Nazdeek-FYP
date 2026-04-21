import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const customerDashboard = () => {
  const categories = ['All', 'Cleaning', 'Plumbing', 'Beauty'];

  return (
    <SafeAreaView className="flex-1 bg-white">
      
      <View className="bg-[#1a5ea1]  rounded-b-[35px]">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-blue-100 text-base">Good morning!!!</Text>
            <Text className="text-white text-3xl font-bold"></Text>
          </View>
          <TouchableOpacity className="bg-white/30 w-12 h-12 rounded-full items-center justify-center border border-white/40">
            <Text className="text-white font-bold">SK</Text>
          </TouchableOpacity>
        </View>

        
        <View className="bg-white/20 flex-row items-center px-4 py-3 rounded-xl border border-white/30">
          <Ionicons name="search" size={20} color="white" />
          <TextInput 
            placeholder="Search services..." 
            placeholderTextColor="#cbd5e1"
            className="ml-3 flex-1 text-white"
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-6 py-6">
       
        <Text className="text-gray-500 font-bold uppercase tracking-wider text-xs mb-4">Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-8">
          {categories.map((cat, index) => (
            <TouchableOpacity 
              key={index} 
              className={`mr-3 px-6 py-2 rounded-full border ${index === 0 ? 'bg-blue-100 border-blue-100' : 'bg-white border-gray-200'}`}
            >
              <Text className={`${index === 0 ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        
        <Text className="text-gray-500 font-bold uppercase tracking-wider text-xs mb-4">Featured Deals</Text>
        
        
        <View className="items-center justify-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
           <Ionicons name="construct-outline" size={40} color="#cbd5e1" />
           <Text className="text-gray-400 mt-2 font-medium">No services registered yet</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default customerDashboard;