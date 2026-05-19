import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StatusBar, Alert } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const EditServiceProvider = ({ route, navigation }) => {
 
  const { service } = route.params;

  const [serviceName, setServiceName] = useState(service.name);
  const [servicePrice, setServicePrice] = useState(service.price);

  const handleSave = () => {
   
    if (!serviceName || !servicePrice) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

  
    Alert.alert("Success", "Service details updated successfully!", [
      { text: "OK", onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

     
      <View className="px-6 py-4 mt-8 flex-row items-center border-b border-gray-50">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-900">Edit Service</Text>
      </View>

      <View className="flex-1 px-6 mt-8 gap-y-5">
        
       
        <View>
          <Text className="text-gray-500 text-sm mb-2 ml-1">Service Name</Text>
          <View className="flex-row items-center bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100">
            <Feather name="grid" size={20} color="#9ca3af" />
            <TextInput 
              className="flex-1 ml-3 text-gray-900 text-base"
              value={serviceName}
              onChangeText={setServiceName}
              placeholder="E.g. Home Cleaning"
            />
          </View>
        </View>

     
        <View>
          <Text className="text-gray-500 text-sm mb-2 ml-1">Price (Rs.)</Text>
          <View className="flex-row items-center bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100">
            <Feather name="dollar-sign" size={20} color="#9ca3af" />
            <TextInput 
              className="flex-1 ml-3 text-gray-900 text-base"
              value={servicePrice}
              onChangeText={setServicePrice}
              keyboardType="numeric"
              placeholder="E.g. 2000"
            />
          </View>
        </View>

       
        <TouchableOpacity 
          onPress={handleSave}
          className="bg-[#1a5ea1] mt-auto mb-10 py-4 rounded-2xl shadow-lg shadow-blue-300 items-center"
        >
          <Text className="text-white text-lg font-bold">Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditServiceProvider;