import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ServiceCard from '../Cards/ServiceCard';

const ServicesScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      
      <View className="px-6 pt-4 pb-2 flex-row items-center space-x-3">
        <View className="flex-1 bg-white flex-row items-center px-4 h-14 rounded-2xl shadow-sm border border-gray-100">
          <Ionicons name="search" size={20} color="#94a3b8" />
          <TextInput 
            placeholder="Search Services..." 
            className="ml-3 flex-1 text-gray-800"
          />
        </View>
        
        
        <TouchableOpacity className="bg-[#1a5ea1] w-14 h-14 rounded-2xl items-center justify-center shadow-md">
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 100 }}
      >
        <Text className="text-gray-800 text-2xl font-bold mb-6">Popular Services</Text>
        
        
        <ServiceCard 
    serviceName="Deep House Cleaning"
    providerName="Wade Warren"
    rating="4.8"
    price="120.00"
    imageUri="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800"
    onPress={() => navigation.navigate('ViewDetail')} 
  />

        <ServiceCard 
    serviceName="Kitchen Cleaning"
    providerName="Jenny Wilson"
    rating="5.0"
    price="80.00"
    imageUri="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800"
    onPress={() => navigation.navigate('ViewDetail')}
  />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServicesScreen;