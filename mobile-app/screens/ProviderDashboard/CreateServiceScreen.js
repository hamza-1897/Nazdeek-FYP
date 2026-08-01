import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; 
import { createService } from '../../api/ProviderApi';
import { useContext } from 'react';
import {AuthContext} from '../../context/AuthContext';

const CreateServiceScreen = ({ navigation }) => {
  const { providerInfo } = useContext(AuthContext);
  const [category, setCategory] = useState('Select Category');
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [imageUri, setImageUri] = useState(null); 
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [priceType, setPriceType] = useState('fixed');

const handleCreateService = async () => {
    if (!serviceName || !description || !price  || !imageUri) {
      Alert.alert("Missing Information", "Please fill in all fields before publishing.");
      return;
    }


    const formData = new FormData();

    formData.append('providerId', providerInfo._id);
    formData.append('categoryId', providerInfo.categoryId._id);
    formData.append('serviceName', serviceName);
    formData.append('description', description);
    formData.append('price', parseFloat(price));


    const filename = imageUri.split('/').pop(); 
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`; 

    formData.append('serviceImages', {
      uri: imageUri,
      name: filename || 'service_image.jpg',
      type: type,
    });


    console.log("Creating service with FormData...");

    try {
      const response = await createService(formData);
      console.log("Service created successfully:", response);
      navigation.replace('ServicePublished');
    } catch (error) {
      console.error("Error creating service:", error);
      Alert.alert("Error", "There was an issue creating your service. Please try again.");
    }
  };
 
  const pickImage = async () => {
   
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "You need to allow gallery access to upload a service image.");
      return;
    }

    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images', 
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); 
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View className="px-6 py-4 flex-row items-center justify-between mt-8">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Create service</Text>
        <View className="w-6" /> 
      </View>

      <ScrollView className="flex-1 px-6 mt-4" showsVerticalScrollIndicator={false}>
        
        
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Service Banner Image</Text>
          
          {imageUri ? (
            <View className="relative w-full h-44 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <Image source={{ uri: imageUri }} className="w-full h-full" resizeMode="cover" />
              <TouchableOpacity 
                onPress={pickImage}
                className="absolute bottom-3 right-3 bg-[#1a5ea1] p-2 rounded-full shadow-md"
              >
                <Ionicons name="camera" size={18} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              onPress={pickImage}
              className="w-full h-44 border-2 border-dashed border-gray-200 rounded-2xl justify-center items-center bg-gray-50/50"
            >
              <View className="bg-blue-50 p-3 rounded-full mb-2">
                <Ionicons name="image-outline" size={26} color="#1a5ea1" />
              </View>
              <Text className="text-gray-500 font-medium text-sm">Upload Service Photo</Text>
              <Text className="text-gray-400 text-xs mt-0.5">Supports JPG, PNG (4:3)</Text>
            </TouchableOpacity>
          )}
        </View>

      
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Service title</Text>
          <TextInput 
            placeholder="e.g. Deep House Cleaning"
            className="border-b border-gray-200 py-2 text-base text-gray-900"
            placeholderTextColor="#9ca3af"
            value={serviceName}
            onChangeText={setServiceName}
          />
        </View>

      
        

        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Description</Text>
          <TextInput 
            placeholder="Describe what's included..."
            multiline
            className="border-b border-gray-200 py-2 text-base text-gray-900"
            placeholderTextColor="#9ca3af"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Base price (Rs)</Text>
          <TextInput 
            placeholder="2000"
            keyboardType="numeric"
            className="border-b border-gray-200 py-2 text-base text-gray-900"
            placeholderTextColor="#9ca3af"
            value={price}
            onChangeText={setPrice}
          />
        </View>

       
      
      
        <TouchableOpacity 
          className="bg-[#1a5ea1] py-4 rounded-xl items-center mb-10 shadow-sm"
          onPress={handleCreateService}
        >
          <Text className="text-white font-bold text-base">Publish service</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CreateServiceScreen;