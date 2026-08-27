import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StatusBar, Alert, Image, ActivityIndicator } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { editService } from '../../api/ProviderApi';

const EditServiceProvider = ({ route, navigation }) => {
  const serviceData = route?.params?.service || {};

  const [serviceName, setServiceName] = useState(
    serviceData?.serviceName || serviceData?.name || ''
  );
  const [servicePrice, setServicePrice] = useState(
    serviceData?.price !== undefined ? serviceData.price.toString() : ''
  );
  const [priceType, setPriceType] = useState(
    serviceData?.priceType || 'fixed'
  );
  const [description, setDescription] = useState(
    serviceData?.description || ''
  );
  const [city, setCity] = useState(
    serviceData?.city || ''
  );

  const existingImages = Array.isArray(serviceData?.serviceImages) ? serviceData.serviceImages : [];
  
  const [images, setImages] = useState(existingImages);
  const [loading, setLoading] = useState(false);

  const priceTypeOptions = [
    { label: 'Fixed', value: 'fixed' },
    { label: 'Hourly', value: 'hourly' },
    { label: 'Negotiable', value: 'negotiable' },
  ];

  const pickImages = async () => {
    if (images.length >= 3) {
      Alert.alert("Limit Reached", "You can only attach a maximum of 3 images.");
      return;
    }

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "You need to allow gallery access to attach images.");
      return;
    }

    const remainingSlots = 3 - images.length;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsMultipleSelection: true,
      selectionLimit: remainingSlots,
      quality: 0.8,
    });

    if (!result.canceled) {
      const selectedUris = result.assets.map((asset) => asset.uri);
      setImages((prev) => [...prev, ...selectedUris].slice(0, 3));
    }
  };

  // Remove individual image
  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = async () => {
    const nameTxt = (serviceName || '').trim();
    const priceTxt = (servicePrice || '').toString().trim();
    const descTxt = (description || '').trim();

    if (!nameTxt || !priceTxt || !descTxt) {
      Alert.alert("Error", "Please fill in service name, price, and description.");
      return;
    }

    const serviceId = serviceData?._id || serviceData?.id;
    if (!serviceId) {
      Alert.alert("Error", "Service ID missing!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('serviceName', nameTxt);
      formData.append('price', priceTxt);
      formData.append('priceType', priceType);
      formData.append('description', descTxt);
      if (city) formData.append('city', city.trim());

      images.forEach((imgUri, index) => {
        if (!imgUri.startsWith('http')) {
          const filename = imgUri.split('/').pop();
          const match = /\.(\w+)$/.exec(filename);
          const type = match ? `image/${match[1]}` : `image/jpeg`;

          formData.append('serviceImages', {
            uri: imgUri,
            name: filename || `service_${index}.jpg`,
            type,
          });
        }
      });

      const res = await editService(serviceId, formData);

      if (res?.success) {
        Alert.alert("Success", "Service updated successfully!", [
          {
            text: "OK",
            onPress: () => navigation.goBack()
          }
        ]);
      } else {
        Alert.alert("Notice", res?.message || "Failed to update service.");
      }
    } catch (error) {
      console.error("Error editing service:", error);
      Alert.alert("Error", error?.response?.data?.message || "Something went wrong while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="px-6 py-4 mt-8 flex-row items-center border-b border-gray-50">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-900">
          Edit Service
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 mt-6" showsVerticalScrollIndicator={false}>
        
        <View className="mb-5">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-400 text-xs font-semibold uppercase tracking-wider ml-1">
              Service Images ({images.length}/3)
            </Text>
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
                <Ionicons name="camera-outline" size={28} color="#9ca3af" />
                <Text className="text-gray-400 text-xs font-medium mt-1">Upload</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>

        <View className="mb-5">
          <Text className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Service Name</Text>
          <View className="flex-row items-center px-4 py-3 rounded-2xl border bg-gray-50 border-blue-200">
            <Feather name="grid" size={18} color="#1a5ea1" />
            <TextInput 
              className="flex-1 ml-3 text-gray-900 text-base"
              value={serviceName}
              onChangeText={setServiceName}
              placeholder="E.g. Home Cleaning"
            />
          </View>
        </View>

        <View className="mb-5">
          <Text className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Pricing Options</Text>

          <View className="flex-row items-center px-4 py-3 rounded-2xl border bg-gray-50 border-blue-200 mb-3">
            <Feather name="tag" size={18} color="#1a5ea1" />
            <TextInput 
              className="flex-1 ml-3 text-gray-900 text-base font-semibold"
              value={servicePrice}
              onChangeText={setServicePrice}
              keyboardType="numeric"
              placeholder="E.g. 2000"
            />
          </View>

          <View className="flex-row justify-between">
            {priceTypeOptions.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                onPress={() => setPriceType(opt.value)}
                className={`flex-1 mx-1 py-2.5 rounded-xl border items-center justify-center ${
                  priceType === opt.value
                    ? 'bg-[#1a5ea1] border-[#1a5ea1]'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <Text
                  className={`text-xs font-bold capitalize ${
                    priceType === opt.value ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Description</Text>
          <View className="flex-row items-start px-4 py-3 rounded-2xl border bg-gray-50 border-blue-200">
            <Feather name="file-text" size={18} color="#1a5ea1" className="mt-1" />
            <TextInput 
              className="flex-1 ml-3 text-gray-800 text-base min-h-[80px]"
              value={description}
              onChangeText={setDescription}
              placeholder="We provide complete kitchen cleaning."
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>

        <TouchableOpacity 
          onPress={handleSave}
          disabled={loading}
          className="bg-[#1a5ea1] py-4 rounded-2xl shadow-md items-center mb-10"
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-white text-base font-bold">
              Save Changes
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EditServiceProvider;