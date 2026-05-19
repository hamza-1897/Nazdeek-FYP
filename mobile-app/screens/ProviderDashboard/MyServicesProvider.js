import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const MyServicesProvider = ({ navigation }) => {
 
  const [services, setServices] = useState([
    { id: '1', name: 'Deep Home Cleaning', price: '2500' },
    { id: '2', name: 'Kitchen Deep Cleaning', price: '1500' },
  ]);

 
  const handleDelete = (id, name) => {
    Alert.alert(
      "Delete Service",
      `Are you sure you want to delete "${name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            setServices(prev => prev.filter(service => service.id !== id));
            Alert.alert("Deleted", "Service has been removed successfully.");
          }
        }
      ]
    );
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

    
      <View className="px-6 py-4 mt-8 flex-row items-center border-b border-gray-50">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-900">My Services</Text>
      </View>


      <ScrollView className="flex-1 px-6 mt-4" showsVerticalScrollIndicator={false}>
        {services.length === 0 ? (
          <View className="flex-1 items-center justify-center mt-20">
            <Text className="text-gray-400 text-base">No services listed yet.</Text>
          </View>
        ) : (
          services.map((item) => (
            <View key={item.id} className="mb-4 p-4 rounded-2xl border border-gray-100 bg-gray-50/50 flex-row justify-between items-center">
              <View>
                <Text className="text-base font-bold text-gray-900">{item.name}</Text>
                <Text className="text-[#1a5ea1] font-semibold text-sm mt-1">Rs. {item.price}</Text>
              </View>

             
              <View className="flex-row gap-x-2">
               
                <TouchableOpacity 
                  onPress={() => navigation.navigate('EditServiceProvider', { service: item })}
                  className="bg-blue-50 p-2.5 rounded-xl border border-blue-100"
                >
                  <Feather name="edit-2" size={18} color="#1a5ea1" />
                </TouchableOpacity>

               
                <TouchableOpacity 
                  onPress={() => handleDelete(item.id, item.name)}
                  className="bg-red-50 p-2.5 rounded-xl border border-red-100"
                >
                  <Feather name="trash-2" size={18} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default MyServicesProvider;