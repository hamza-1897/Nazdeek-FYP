import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Image, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; 
import { createService } from '../../api/ProviderApi';
import { AuthContext } from '../../context/AuthContext';

const CreateServiceScreen = ({ navigation }) => {
  const { providerInfo } = useContext(AuthContext);

  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [priceType, setPriceType] = useState('fixed');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);



  const pickImage = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    Alert.alert("Permission Denied", "Gallery access is required to select an image.");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'], 
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.8,
  });

  if (!result.canceled) {
    setImageUri(result.assets[0].uri);
  }
};

  const handleCreateService = async () => {
    if (!serviceName.trim() || !description.trim() || !price || !imageUri) {
      Alert.alert("Missing Information", "Please complete all fields and upload a banner image.");
      return;
    }

    const providerId = providerInfo?._id;
    const categoryId = providerInfo?.categoryId?._id || providerInfo?.categoryId;

    if (!providerId || !categoryId) {
      Alert.alert("Error", "Provider details not found. Please log in again.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('providerId', providerId);
    formData.append('categoryId', categoryId);
    formData.append('serviceName', serviceName.trim());
    formData.append('description', description.trim());
    formData.append('price', price);
    formData.append('priceType', priceType);

    const filename = imageUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';

    formData.append('serviceImages', {
      uri: imageUri,
      name: filename || 'service_banner.jpg',
      type: type,
    });

    try {
      const response = await createService(formData);
      if (response?.success) {
        navigation.replace('ServicePublished');
      } else {
        Alert.alert("Notice", response?.message || "Service created successfully.");
        navigation.replace('ServicePublished');
      }
    } catch (error) {
      Alert.alert("Error", error?.response?.data?.message || "Failed to publish service. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="px-6 py-4 flex-row items-center justify-between  border-b border-gray-100">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">Create Service</Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1 px-6 mt-4" showsVerticalScrollIndicator={false}>
        <View className="mb-6">
          <Text className="text-gray-700 font-semibold mb-2">Service Image</Text>
          {imageUri ? (
            <View className="relative w-full h-44 rounded-2xl overflow-hidden border border-gray-200">
              <Image source={{ uri: imageUri }} className="w-full h-full" resizeMode="cover" />
              <TouchableOpacity 
                onPress={pickImage}
                className="absolute bottom-3 right-3 bg-[#1a5ea1] p-2.5 rounded-full shadow-md"
              >
                <Ionicons name="camera" size={18} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              onPress={pickImage}
              className="w-full h-44 border-2 border-dashed border-gray-300 rounded-2xl justify-center items-center bg-gray-50"
            >
              <View className="bg-blue-50 p-3 rounded-full mb-2">
                <Ionicons name="image-outline" size={26} color="#1a5ea1" />
              </View>
              <Text className="text-gray-600 font-medium text-sm">Upload Service Photo</Text>
              <Text className="text-gray-400 text-xs mt-0.5">JPG, PNG (4:3 ratio)</Text>
            </TouchableOpacity>
          )}
        </View>

        <View className="mb-5">
          <Text className="text-gray-700 font-semibold mb-1">Service Title</Text>
          <TextInput 
            placeholder="e.g. Electrical Repair & Wiring"
            className="border-b border-gray-300 py-2.5 text-base text-gray-900"
            placeholderTextColor="#9ca3af"
            value={serviceName}
            onChangeText={setServiceName}
          />
        </View>

        <View className="mb-5">
          <Text className="text-gray-700 font-semibold mb-2">Pricing Type</Text>
          <View className="flex-row gap-3">
            <TouchableOpacity 
              onPress={() => setPriceType('fixed')}
              className={`flex-1 py-3 rounded-xl border items-center ${
                priceType === 'fixed' 
                  ? 'bg-blue-50 border-[#1a5ea1]' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <Text className={`font-semibold text-sm ${priceType === 'fixed' ? 'text-[#1a5ea1]' : 'text-gray-600'}`}>
                Fixed Rate
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setPriceType('hourly')}
              className={`flex-1 py-3 rounded-xl border items-center ${
                priceType === 'hourly' 
                  ? 'bg-blue-50 border-[#1a5ea1]' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <Text className={`font-semibold text-sm ${priceType === 'hourly' ? 'text-[#1a5ea1]' : 'text-gray-600'}`}>
                Hourly Rate
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setPriceType('negotiable')}
              className={`flex-1 py-3 rounded-xl border items-center ${
                priceType === 'negotiable' 
                  ? 'bg-blue-50 border-[#1a5ea1]' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <Text className={`font-semibold text-sm ${priceType === 'negotiable' ? 'text-[#1a5ea1]' : 'text-gray-600'}`}>
                Negotiable
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-5">
          <Text className="text-gray-700 font-semibold mb-1">
            {priceType === 'hourly' ? 'Hourly Rate (Rs)' : 'Base Price (Rs)'}
          </Text>
          <TextInput 
            placeholder="e.g. 1500"
            keyboardType="numeric"
            className="border-b border-gray-300 py-2.5 text-base text-gray-900"
            placeholderTextColor="#9ca3af"
            value={price}
            onChangeText={setPrice}
          />
        </View>

        <View className="mb-8">
          <Text className="text-gray-700 font-semibold mb-1">Description</Text>
          <TextInput 
            placeholder="Specify what work and tools are included..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            className="border border-gray-200 rounded-xl p-3 text-base text-gray-900 bg-gray-50/50 min-h-[100px]"
            placeholderTextColor="#9ca3af"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <TouchableOpacity 
          disabled={loading}
          className={`bg-[#1a5ea1] py-4 rounded-xl items-center mb-10 shadow-sm ${loading ? 'opacity-70' : 'active:opacity-90'}`}
          onPress={handleCreateService}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-base">Publish Service</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CreateServiceScreen;