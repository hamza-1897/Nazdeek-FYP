import React, { useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, FlatList, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ServiceCard from '../Cards/ServiceCard';
import { getAllServices } from '../api/customerApi';

const ServicesScreen = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchServices();
    }, [])
  );

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await getAllServices();
      setServices(response.data);
      console.log("Fetched services:", response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

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

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#1a5ea1" />
        </View>
      ) : (
        <FlatList
          data={services} 
          renderItem={({ item }) => (
            <ServiceCard 
              item={item} 
              onPress={() => navigation.navigate('ViewDetail', { serviceId: item._id })} 
            />
          )}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          
          ListHeaderComponent={() => (
            <View className="px-6 pt-5 pb-2">
              <Text className="text-gray-800 text-2xl font-bold">Popular Services</Text>
            </View>
          )}

          ListEmptyComponent={() => (
            <View className="flex-1 justify-center items-center pt-12">
              <Text className="text-gray-400 font-semibold text-center">No services found</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default ServicesScreen;