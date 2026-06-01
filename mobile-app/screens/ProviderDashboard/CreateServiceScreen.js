import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; 

const CreateServiceScreen = ({ navigation }) => {
  const [category, setCategory] = useState('Select Category');
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [imageUri, setImageUri] = useState(null); 

  const categories = ['Plumber', 'Electrician', 'Cleaning', 'Home Services', 'Carpanter'];

 
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
          />
        </View>

      
        <View className="mb-6 z-50">
          <Text className="text-gray-700 font-medium mb-2">Category</Text>
          <TouchableOpacity 
            onPress={() => setIsCatOpen(!isCatOpen)}
            className="flex-row justify-between items-center border-b border-gray-200 py-2"
          >
            <Text className={category === 'Select Category' ? "text-gray-400 text-base" : "text-gray-900 text-base"}>
              {category}
            </Text>
            <Ionicons name={isCatOpen ? "chevron-up" : "chevron-down"} size={18} color="black" />
          </TouchableOpacity>

          {isCatOpen && (
            <View className="bg-gray-50 rounded-xl mt-1 shadow-sm border border-gray-100 overflow-hidden">
              {categories.map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  onPress={() => { setCategory(item); setIsCatOpen(false); }}
                  className="p-4 border-b border-gray-100 active:bg-blue-50"
                >
                  <Text className="text-gray-800">{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Description</Text>
          <TextInput 
            placeholder="Describe what's included..."
            multiline
            className="border-b border-gray-200 py-2 text-base text-gray-900"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Base price (Rs)</Text>
          <TextInput 
            placeholder="2000"
            keyboardType="numeric"
            className="border-b border-gray-200 py-2 text-base text-gray-900"
            placeholderTextColor="#9ca3af"
          />
        </View>

       
        <View className="mb-10">
          <Text className="text-gray-700 font-medium mb-2">Service area / city</Text>
          <TextInput 
            placeholder="e.g. Lahore"
            className="border-b border-gray-200 py-2 text-base text-gray-900"
            placeholderTextColor="#9ca3af"
          />
        </View>

      
        <TouchableOpacity 
          className="bg-[#1a5ea1] py-4 rounded-xl items-center mb-10 shadow-sm"
          onPress={() => navigation.replace('ServicePublished')}
        >
          <Text className="text-white font-bold text-base">Publish service</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CreateServiceScreen;