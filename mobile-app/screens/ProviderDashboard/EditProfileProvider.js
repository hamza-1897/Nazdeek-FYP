import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StatusBar, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; 
import { AuthContext } from '../../context/AuthContext';
import {updateProvider} from '../../api/ProviderApi'

const EditProfileProvider = ({ navigation }) => {
  const { providerInfo,updateUserInfo,updateProviderInfo, userInfo } = useContext(AuthContext);

  const [name, setName] = useState(providerInfo?.businessName || '');
  const [contact, setContact] = useState(userInfo?.phone || '');
  const [address, setAddress] = useState(providerInfo?.address || '');
  const [category, setCategory] = useState(providerInfo?.categoryId?.name || '');
  const [cnicNumber, setCnicNumber] = useState(providerInfo?.cnicNumber || '');
  const [profileCreatedAt, setProfileCreatedAt] = useState(providerInfo?.createdAt || '');
  const [description, setDescription] = useState(providerInfo?.description || '');
  const [experience, setExperience] = useState(  providerInfo?.experience != null ? String(providerInfo.experience) : '');
  const [isPremium, setIsPremium] = useState(providerInfo?.isPremium || false);
  const [regFee, setRegFee] = useState(providerInfo?.registrationFee || '');
  const [profileImage, setProfileImage] = useState(providerInfo?.providerImage || '');

  const subscriptionDetails = providerInfo?.subscriptionDetails || {
    title: 'N/A',
    amount: 0,
    status: 'none',
    activatedAt: null,
    expiresAt: null
  };

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

const handleUpdateOrEdit = async () => {
  if (!isEditable) {
    setIsEditable(true);
    return;
  }

  try {
 

    const formData = new FormData();

   

    if (name) {
      formData.append('name', String(name).trim());
    }

    if (contact) {
      formData.append('phone', String(contact).trim());
    }

    if (address) {
      formData.append('address', String(address).trim());
    }

    if (description) {
      formData.append('description', String(description).trim());
    }

    if (experience !== undefined && experience !== null) {
      formData.append('experience', String(experience).trim());
    }

  

    if (profileImage && typeof profileImage === 'string') {

      if (profileImage.startsWith('file://')) {

        const filename = profileImage.split('/').pop() || 'profile.jpg';
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image/jpeg';

        formData.append('providerImage', {
          uri: profileImage,
          name: filename,
          type: type,
        });

      }

    }

   

    const response = await updateProvider(formData);

    if (response?.success) {
      Alert.alert("Success", "Profile updated successfully!");
      updateProviderInfo(response?.providerInfo);
        updateUserInfo({
    phone: response.userPhone
  });
      setIsEditable(false);
    }

  } catch (error) {

    console.log(" Update Profile Error:", error);

    Alert.alert(
      "Error",
      error?.response?.data?.message ||
      error?.message ||
      "Failed to update profile."
    );
  }
};

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -20}
      className="flex-1 bg-white"
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="px-6 py-4 mt-8 flex-row items-center border-b border-gray-100 bg-white justify-between">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">
            {isEditable ? "Edit Profile" : "Provider Details"}
          </Text>
        </View>

        {isPremium && (
          <View className="bg-amber-100 px-3 py-1 rounded-full flex-row items-center gap-1">
            <MaterialCommunityIcons name="crown" size={16} color="#d97706" />
            <Text className="text-amber-700 text-xs font-bold uppercase">PREMIUM</Text>
          </View>
        )}
      </View>

      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        <View className="items-center my-6">
          <View className="relative">
            <View className={`w-32 h-32 bg-blue-50 rounded-full items-center justify-center overflow-hidden border-2 ${isEditable ? 'border-[#1a5ea1]' : 'border-gray-200'}`}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} className="w-full h-full" />
              ) : (
                <Text className="text-[#1a5ea1] text-4xl font-bold">
                  {name ? name.substring(0, 2).toUpperCase() : 'PRO'}
                </Text>
              )}
            </View>
            
            {isEditable && (
              <TouchableOpacity 
                className="absolute bottom-0 right-0 bg-[#1a5ea1] p-2.5 rounded-full border-2 border-white shadow-sm"
                onPress={pickImage} 
              >
                <Feather name="camera" size={18} color="white" />
              </TouchableOpacity>
            )}
          </View>
          <Text className="text-gray-400 text-xs mt-3 uppercase tracking-widest font-semibold">
            {isEditable ? "Change Profile Photo" : "Business Profile Image"}
          </Text>
        </View>

        <View className="space-y-4">

          <Text className="text-base font-bold text-gray-900 mt-2">Personal & Business Info</Text>

          <View>
            <Text className="text-gray-500 text-sm mb-1.5 ml-1">Business Name</Text>
            <View className={`flex-row items-center px-4 py-3.5 rounded-xl border ${isEditable ? 'bg-gray-50 border-blue-200' : 'bg-gray-50/60 border-gray-100'}`}>
              <Feather name="briefcase" size={18} color={isEditable ? "#1a5ea1" : "#9ca3af"} />
              <TextInput 
                className="flex-1 ml-3 text-gray-900 text-base"
                value={name}
                onChangeText={setName}
                editable={isEditable} 
                placeholder="Enter business name"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <View>
            <Text className="text-gray-500 text-sm mb-1.5 ml-1">Contact Phone</Text>
            <View className={`flex-row items-center px-4 py-3.5 rounded-xl border ${isEditable ? 'bg-gray-50 border-blue-200' : 'bg-gray-50/60 border-gray-100'}`}>
              <Feather name="phone" size={18} color={isEditable ? "#1a5ea1" : "#9ca3af"} />
              <TextInput 
                className="flex-1 ml-3 text-gray-900 text-base"
                value={contact}
                onChangeText={setContact}
                editable={isEditable}
                keyboardType="phone-pad"
                placeholder="Enter contact number"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <View>
            <Text className="text-gray-500 text-sm mb-1.5 ml-1">Work Category</Text>
            <View className="flex-row items-center px-4 py-3.5 rounded-xl border bg-gray-100 border-gray-200">
              <Feather name="grid" size={18} color="#6b7280" />
              <TextInput 
                className="flex-1 ml-3 text-gray-500 text-base"
                value={category}
                editable={false} 
                placeholder="Category"
              />
              <Feather name="lock" size={16} color="#9ca3af" />
            </View>
          </View>

          <View>
            <Text className="text-gray-500 text-sm mb-1.5 ml-1">Experience (Years/Level)</Text>
            <View className={`flex-row items-center px-4 py-3.5 rounded-xl border ${isEditable ? 'bg-gray-50 border-blue-200' : 'bg-gray-50/60 border-gray-100'}`}>
              <Feather name="award" size={18} color={isEditable ? "#1a5ea1" : "#9ca3af"} />
              <TextInput 
                className="flex-1 ml-3 text-gray-900 text-base"
                value={experience}
                onChangeText={setExperience}
                editable={isEditable}
                placeholder="e.g. 5 Years"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <View>
            <Text className="text-gray-500 text-sm mb-1.5 ml-1">Description / Services Offered</Text>
            <View className={`flex-row items-start px-4 py-3 rounded-xl border ${isEditable ? 'bg-gray-50 border-blue-200' : 'bg-gray-50/60 border-gray-100'}`}>
              <Feather name="align-left" size={18} color={isEditable ? "#1a5ea1" : "#9ca3af"} style={{ marginTop: 4 }} />
              <TextInput 
                className="flex-1 ml-3 text-gray-900 text-base min-h-[80px]"
                value={description}
                onChangeText={setDescription}
                editable={isEditable}
                multiline={true}
                textAlignVertical="top"
                placeholder="Describe your business and skills..."
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <View>
            <Text className="text-gray-500 text-sm mb-1.5 ml-1">Full Address</Text>
            <View className={`flex-row items-start px-4 py-3 rounded-xl border ${isEditable ? 'bg-gray-50 border-blue-200' : 'bg-gray-50/60 border-gray-100'}`}>
              <Feather name="map-pin" size={18} color={isEditable ? "#1a5ea1" : "#9ca3af"} style={{ marginTop: 4 }} />
              <TextInput 
                className="flex-1 ml-3 text-gray-900 text-base min-h-[70px]"
                value={address}
                onChangeText={setAddress}
                editable={isEditable}
                multiline={true}
                textAlignVertical="top"
                placeholder="Enter complete address"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <Text className="text-base font-bold text-gray-900 mt-6">Verification & Identification</Text>

          <View>
            <Text className="text-gray-500 text-sm mb-1.5 ml-1">CNIC Number</Text>
            <View className="flex-row items-center px-4 py-3.5 rounded-xl border bg-gray-100 border-gray-200">
              <Feather name="credit-card" size={18} color="#6b7280" />
              <TextInput 
                className="flex-1 ml-3 text-gray-500 text-base"
                value={cnicNumber}
                editable={false}
                placeholder="35201-XXXXXXXX-X"
              />
              <Feather name="lock" size={16} color="#9ca3af" />
            </View>
          </View>

          <View>
            <Text className="text-gray-500 text-sm mb-1.5 ml-1">Registration Fee Status</Text>
            <View className="flex-row items-center px-4 py-3.5 rounded-xl border bg-gray-100 border-gray-200 justify-between">
              <View className="flex-row items-center">
                <Feather name="check-circle" size={18} color={regFee === 'paid' ? '#16a34a' : '#dc2626'} />
                <Text className="ml-3 text-gray-700 text-base capitalize font-semibold">
                  {regFee || 'Unpaid'}
                </Text>
              </View>
              <Feather name="lock" size={16} color="#9ca3af" />
            </View>
          </View>

          <Text className="text-base font-bold text-gray-900 mt-6">Subscription Details</Text>

          <View className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-600 text-sm font-medium">Plan Title:</Text>
              <Text className="text-[#1a5ea1] font-bold text-base">
                {subscriptionDetails.title || 'No Active Plan'}
              </Text>
            </View>

            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-600 text-sm font-medium">Subscription Amount:</Text>
              <Text className="text-gray-900 font-semibold text-sm">
                Rs. {subscriptionDetails.amount || 0}
              </Text>
            </View>

            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-600 text-sm font-medium">Status:</Text>
              <View className={`px-2.5 py-0.5 rounded-full ${subscriptionDetails.status === 'active' ? 'bg-green-100' : 'bg-gray-200'}`}>
                <Text className={`text-xs font-bold capitalize ${subscriptionDetails.status === 'active' ? 'text-green-700' : 'text-gray-600'}`}>
                  {subscriptionDetails.status || 'None'}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-gray-600 text-sm font-medium">Expires At:</Text>
              <Text className="text-gray-700 text-xs font-semibold">
                {subscriptionDetails.expiresAt ? new Date(subscriptionDetails.expiresAt).toLocaleDateString() : 'N/A'}
              </Text>
            </View>
          </View>

          {profileCreatedAt && (
            <View className="mt-4 items-center">
              <Text className="text-gray-400 text-xs">
                Profile Created: {new Date(profileCreatedAt).toLocaleDateString()}
              </Text>
            </View>
          )}

        </View>

        <TouchableOpacity 
          onPress={handleUpdateOrEdit}
          className="bg-[#1a5ea1] mt-8 py-4 rounded-xl shadow-sm items-center"
          activeOpacity={0.8}
        >
          <Text className="text-white text-base font-bold">
            {isEditable ? "Save Changes" : "Edit Profile"}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileProvider;