import React , {useState,useEffect,useCallback}from 'react';
import { View, Text,ActivityIndicator, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
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
    }
    catch (error) {
      console.error("Error fetching services:", error);
    }
    finally {
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
      ):(<ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 100 }}
      >
        <Text className="text-gray-800 text-2xl font-bold mb-6">Popular Services</Text>
        
        
     {services.length === 0 ? (
            <Text className="text-gray-500 text-center mt-4">No services found</Text>
          ) : (
            services.map((item) => (
              <ServiceCard 
                key={item._id}
                serviceName={item.serviceName}
                providerName={item.providerId?.businessName || "Unknown Provider"}
                price={item.price.toString()} 
                imageUri={item.serviceImages && item.serviceImages[0] ? item.serviceImages[0] : "https://via.placeholder.com/150"}
                onPress={() => navigation.navigate('ViewDetail', { serviceId: item._id })} 
              />
            ))
          )}

       
      </ScrollView>)}
    </SafeAreaView>
  );
};

export default ServicesScreen;