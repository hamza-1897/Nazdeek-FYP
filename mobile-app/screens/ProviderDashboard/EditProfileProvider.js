import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StatusBar, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; 

const EditProfileProvider = ({ navigation }) => {
  
  const [name, setName] = useState('Sana Bibi');
  const [contact, setContact] = useState('+92 300 1234567');
  const [address, setAddress] = useState('Model Town, Lahore');
  const [profileImage, setProfileImage] = useState(null);

 
  const [isEditable, setIsEditable] = useState(false);


  const pickImage = async () => {
    if (!isEditable) return; 
    
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "App ko gallery access karne ki permission chahiye!");
      return;
    }
    
   
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images', 
      allowsEditing: false, 
      quality: 0.9, 
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleUpdateOrEdit = () => {
    if (!isEditable) {
      setIsEditable(true);
    } else {
      const nameTxt = (name || '').trim();
      const contactTxt = (contact || '').trim();
      const addressTxt = (address || '').trim();

      if (!nameTxt || !contactTxt || !addressTxt) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      Alert.alert("Success", "Profile updated successfully!", [
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
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} 
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -20}
      className="flex-1 bg-white"
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />


      <View className="px-6 py-4 mt-8 flex-row items-center border-b border-gray-50 bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-900">
          {isEditable ? "Edit Profile" : "Profile Details"}
        </Text>
      </View>

     
      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        
     
        <View className="items-center my-8">
          <View className="relative">
            <View className={`w-32 h-32 bg-blue-100 rounded-full items-center justify-center overflow-hidden border-2 ${isEditable ? 'border-blue-500' : 'border-gray-200'}`}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} className="w-full h-full" />
              ) : (
                <Text className="text-blue-600 text-4xl font-bold">SB</Text>
              )}
            </View>
            
            {isEditable && (
              <TouchableOpacity 
                className="absolute bottom-0 right-0 bg-[#1a5ea1] p-2 rounded-full border-2 border-white shadow-sm"
                onPress={pickImage} 
              >
                <Feather name="camera" size={18} color="white" />
              </TouchableOpacity>
            )}
          </View>
          <Text className="text-gray-400 text-xs mt-3 uppercase tracking-widest font-semibold">
            {isEditable ? "Change Profile Photo" : "Profile Picture"}
          </Text>
        </View>

       
        <View className="gap-y-5">
          
        
          <View>
            <Text className="text-gray-500 text-sm mb-2 ml-1">Full Name</Text>
            <View className={`flex-row items-center px-4 py-3 rounded-2xl border ${isEditable ? 'bg-gray-50 border-blue-200' : 'bg-gray-50/40 border-gray-100'}`}>
              <Feather name="user" size={20} color={isEditable ? "#1a5ea1" : "#9ca3af"} />
              <TextInput 
                className="flex-1 ml-3 text-gray-900 text-base"
                value={name}
                onChangeText={setName}
                editable={isEditable} 
                placeholder="Enter your name"
              />
            </View>
          </View>

        
          <View>
            <Text className="text-gray-500 text-sm mb-2 ml-1">Contact Number</Text>
            <View className={`flex-row items-center px-4 py-3 rounded-2xl border ${isEditable ? 'bg-gray-50 border-blue-200' : 'bg-gray-50/40 border-gray-100'}`}>
              <Feather name="phone" size={20} color={isEditable ? "#1a5ea1" : "#9ca3af"} />
              <TextInput 
                className="flex-1 ml-3 text-gray-900 text-base"
                value={contact}
                onChangeText={setContact}
                editable={isEditable}
                keyboardType="phone-pad"
                placeholder="Enter contact number"
              />
            </View>
          </View>

         
          <View className="mb-4">
            <Text className="text-gray-500 text-sm mb-2 ml-1">Address</Text>
            <View className={`flex-row items-start px-4 py-3 rounded-2xl border ${isEditable ? 'bg-gray-50 border-blue-200' : 'bg-gray-50/40 border-gray-100'}`}>
              <Feather name="map-pin" size={20} color={isEditable ? "#1a5ea1" : "#9ca3af"} style={{marginTop: 4}} />
              <TextInput 
                className="flex-1 ml-3 text-gray-900 text-base min-h-[96px]"
                value={address}
                onChangeText={setAddress}
                editable={isEditable}
                multiline={true}
                textAlignVertical="top"
                placeholder="Enter your address"
              />
            </View>
          </View>

        </View>

        <TouchableOpacity 
          onPress={handleUpdateOrEdit}
          className="bg-[#1a5ea1] mt-auto mb-10 py-4 rounded-2xl shadow-md items-center"
        >
          <Text className="text-white text-lg font-bold">
            {isEditable ? "Save Changes" : "Edit Profile"}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileProvider;