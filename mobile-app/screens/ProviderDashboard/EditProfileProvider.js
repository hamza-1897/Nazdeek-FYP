import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StatusBar, Alert, Image } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; 

const EditProfileProvider = ({ navigation }) => {
  const [name, setName] = useState('Sana Bibi');
  const [contact, setContact] = useState('+92 300 1234567');
  const [address, setAddress] = useState('Model Town, Lahore');
  
 
  const [profileImage, setProfileImage] = useState(null);

  const pickImage = async () => {
  
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "App ko gallery access karne ki permission chahiye!");
      return;
    }

    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Sirf images show hon
      allowsEditing: true, // Crop aur rotate karne ka option mile
      aspect: [1, 1], // Square shape default crop ratio
      quality: 1, // High quality image
    });

   
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleUpdate = () => {
    Alert.alert("Success", "Profile updated successfully!", [
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
        <Text className="text-xl font-semibold text-gray-900">Edit Profile</Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        

        <View className="items-center my-8">
          <View className="relative">
            <View className="w-32 h-32 bg-blue-100 rounded-full items-center justify-center overflow-hidden border-2 border-blue-500">
              {profileImage ? (
               
                <Image source={{ uri: profileImage }} className="w-full h-full" />
              ) : (
               
                <Text className="text-blue-600 text-4xl font-bold">SB</Text>
              )}
            </View>
            <TouchableOpacity 
              className="absolute bottom-0 right-0 bg-[#1a5ea1] p-2 rounded-full border-2 border-white shadow-sm"
              onPress={pickImage} // Click karne par gallery khulegi
            >
              <Feather name="camera" size={18} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-gray-400 text-xs mt-3 uppercase tracking-widest font-semibold">Change Profile Photo</Text>
        </View>

       
        <View className="gap-y-5">
          
         
          <View>
            <Text className="text-gray-500 text-sm mb-2 ml-1">Full Name</Text>
            <View className="flex-row items-center bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100">
              <Feather name="user" size={20} color="#9ca3af" />
              <TextInput 
                className="flex-1 ml-3 text-gray-900 text-base"
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
              />
            </View>
          </View>

         
          <View>
            <Text className="text-gray-500 text-sm mb-2 ml-1">Contact Number</Text>
            <View className="flex-row items-center bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100">
              <Feather name="phone" size={20} color="#9ca3af" />
              <TextInput 
                className="flex-1 ml-3 text-gray-900 text-base"
                value={contact}
                onChangeText={setContact}
                keyboardType="phone-pad"
                placeholder="Enter contact number"
              />
            </View>
          </View>

         
          <View>
            <Text className="text-gray-500 text-sm mb-2 ml-1">Address</Text>
            <View className="flex-row items-start bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100">
              <Feather name="map-pin" size={20} color="#9ca3af" style={{marginTop: 4}} />
              <TextInput 
                className="flex-1 ml-3 text-gray-900 text-base h-24"
                value={address}
                onChangeText={setAddress}
                multiline={true}
                textAlignVertical="top"
                placeholder="Enter your address"
              />
            </View>
          </View>

        </View>

       
        <TouchableOpacity 
          onPress={handleUpdate}
          className="bg-[#1a5ea1] my-10 py-4 rounded-2xl shadow-lg shadow-blue-300 items-center"
        >
          <Text className="text-white text-lg font-bold">Update Profile</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default EditProfileProvider;