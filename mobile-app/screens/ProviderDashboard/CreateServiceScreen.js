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
  const [images, setImages] = useState([]); // Up to 3 image URIs
  const [loading, setLoading] = useState(false);

  // Pick multiple images (Max 3) - Simple selection without cropping
  const pickImages = async () => {
    if (images.length >= 3) {
      Alert.alert("Limit Reached", "You can only select up to 3 images.");
      return;
    }

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "Gallery access is required to select images.");
      return;
    }

    const remainingSlots = 3 - images.length;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], 
      allowsMultipleSelection: true,
      selectionLimit: remainingSlots,
      quality: 0.8,
    });

    if (!result.canceled) {
      const selectedUris = result.assets.map((asset) => asset.uri);
      setImages((prev) => [...prev, ...selectedUris].slice(0, 3));
    }
  };

  // Remove single image from array
  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleCreateService = async () => {
    if (!serviceName.trim() || !description.trim() || !price || images.length === 0) {
      Alert.alert("Missing Information", "Please complete all fields and upload at least one image.");
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

    images.forEach((imgUri, index) => {
      const filename = imgUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';

      formData.append('serviceImages', {
        uri: imgUri,
        name: filename || `service_${index}.jpg`,
        type: type,
      });
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

      {/* Header */}
      <View className="px-6 py-4 flex-row items-center justify-between border-b border-gray-100">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">Create Service</Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1 px-6 mt-4" showsVerticalScrollIndicator={false}>
        
        {/* Images Picker Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-700 font-semibold">Service Images ({images.length}/3)</Text>
            {images.length < 3 && (
              <TouchableOpacity onPress={pickImages} className="flex-row items-center">
                <Ionicons name="add-circle" size={18} color="#1a5ea1" />
                <Text className="text-[#1a5ea1] text-xs font-bold ml-1">Add Image</Text>
              </TouchableOpacity>
            )}
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row py-1">
            {images.map((uri, index) => (
              <View key={index} className="relative mr-3 w-28 h-28 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                <Image source={{ uri }} className="w-full h-full" resizeMode="cover" />
                <TouchableOpacity 
                  onPress={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 p-1 rounded-full shadow-sm"
                >
                  <Ionicons name="close" size={14} color="white" />
                </TouchableOpacity>
              </View>
            ))}

            {images.length < 3 && (
              <TouchableOpacity 
                onPress={pickImages}
                className="w-28 h-28 rounded-2xl border-2 border-dashed border-gray-300 justify-center items-center bg-gray-50"
              >
                <View className="bg-blue-50 p-2 rounded-full mb-1">
                  <Ionicons name="camera-outline" size={22} color="#1a5ea1" />
                </View>
                <Text className="text-gray-500 font-medium text-xs">Upload</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>

        {/* Title */}
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

        {/* Pricing Type */}
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

        {/* Price */}
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

        {/* Description */}
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

        {/* Submit Button */}
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