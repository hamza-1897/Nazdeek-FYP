import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StatusBar, Alert, Image } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const EditServiceProvider = ({ route, navigation }) => {
 
  const serviceData = route?.params?.service || {
    name: 'Deep House Cleaning',
    price: '2500',
    description: 'Complete home deep cleaning including kitchen, bathrooms, rooms, and lounge areas with specialized equipment.',
    city: 'Mandi Bahauddin',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=500&auto=format&fit=crop'
  };

 
  const [serviceName, setServiceName] = useState(serviceData.name ? serviceData.name.toString() : '');
  const [servicePrice, setServicePrice] = useState(serviceData.price ? serviceData.price.toString() : '');
  const [description, setDescription] = useState(serviceData.description ? serviceData.description.toString() : '');
  const [city, setCity] = useState(serviceData.city ? serviceData.city.toString() : '');
  const [imageUri, setImageUri] = useState(serviceData.image || null);


  const [isEditable, setIsEditable] = useState(false);

 
  const pickImage = async () => {
    if (!isEditable) return; 

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "You need to allow gallery access to change the image.");
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

  const handleSaveOrEdit = () => {
    if (!isEditable) {
    
      setIsEditable(true);
    } else {
     
      const nameTxt = (serviceName || '').trim();
      const priceTxt = (servicePrice || '').toString().trim();
      const descTxt = (description || '').trim();
      const cityTxt = (city || '').trim();

      if (!nameTxt || !priceTxt || !descTxt || !cityTxt) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

     
      Alert.alert("Success", "Service details updated successfully!", [
        { 
          text: "OK", 
          onPress: () => {
            setIsEditable(false); 
            navigation.goBack();
          } 
        }
      ]);
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
          {isEditable ? "Edit Service" : "Service Details"}
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 mt-6" showsVerticalScrollIndicator={false}>
        
       
        <View className="mb-5">
          <Text className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Service Banner</Text>
          <View className="relative w-full h-44 rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50">
            {imageUri ? (
              <>
                <Image source={{ uri: imageUri }} className="w-full h-full" resizeMode="cover" />
                {isEditable && (
                  <TouchableOpacity 
                    onPress={pickImage}
                    className="absolute bottom-3 right-3 bg-[#1a5ea1] p-2.5 rounded-full shadow-md"
                  >
                    <Ionicons name="camera" size={18} color="white" />
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <TouchableOpacity onPress={pickImage} disabled={!isEditable} className="w-full h-full justify-center items-center">
                <Ionicons name="image-outline" size={30} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>
        </View>

   
        <View className="mb-5">
          <Text className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Service Name</Text>
          <View className={`flex-row items-center px-4 py-3 rounded-2xl border ${isEditable ? 'bg-gray-50 border-blue-200' : 'bg-gray-50/40 border-gray-100'}`}>
            <Feather name="grid" size={18} color={isEditable ? "#1a5ea1" : "#9ca3af"} />
            <TextInput 
              className="flex-1 ml-3 text-gray-900 text-base"
              value={serviceName}
              onChangeText={setServiceName}
              editable={isEditable} 
              placeholder="E.g. Home Cleaning"
            />
          </View>
        </View>

      
        <View className="mb-5">
          <Text className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Price (Rs.)</Text>
          <View className={`flex-row items-center px-4 py-3 rounded-2xl border ${isEditable ? 'bg-gray-50 border-blue-200' : 'bg-gray-50/40 border-gray-100'}`}>
            <Feather name="tag" size={18} color={isEditable ? "#1a5ea1" : "#9ca3af"} />
            <TextInput 
              className="flex-1 ml-3 text-gray-900 text-base font-semibold"
              value={servicePrice}
              onChangeText={setServicePrice}
              editable={isEditable}
              keyboardType="numeric"
              placeholder="E.g. 2000"
            />
          </View>
        </View>

        
        <View className="mb-5">
          <Text className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Description</Text>
          <View className={`flex-row items-start px-4 py-3 rounded-2xl border ${isEditable ? 'bg-gray-50 border-blue-200' : 'bg-gray-50/40 border-gray-100'}`}>
            <Feather name="file-text" size={18} color={isEditable ? "#1a5ea1" : "#9ca3af"} className="mt-1" />
            <TextInput 
              className="flex-1 ml-3 text-gray-800 text-base min-h-[80px]"
              value={description}
              onChangeText={setDescription}
              editable={isEditable}
              placeholder="We provide complete kitchen cleaning."
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>

       
        <View className="mb-8">
          <Text className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Service Area / City</Text>
          <View className={`flex-row items-center px-4 py-3 rounded-2xl border ${isEditable ? 'bg-gray-50 border-blue-200' : 'bg-gray-50/40 border-gray-100'}`}>
            <Feather name="map-pin" size={18} color={isEditable ? "#1a5ea1" : "#9ca3af"} />
            <TextInput 
              className="flex-1 ml-3 text-gray-900 text-base"
              value={city}
              onChangeText={setCity}
              editable={isEditable}
              placeholder="M.B.Din"
            />
          </View>
        </View>

      
        <TouchableOpacity 
          onPress={handleSaveOrEdit}
          className="bg-[#1a5ea1] py-4 rounded-2xl shadow-md items-center mb-10"
        >
          <Text className="text-white text-base font-bold">
            {isEditable ? "Save Changes" : "Edit Service"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EditServiceProvider;