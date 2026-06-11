import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StatusBar, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown';

const ProviderRegisterScreen = ({ navigation }) => {
  
  const [businessName, setBusinessName] = useState('');
  const [cnicNumber, setCnicNumber] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState(null);
  const [experience, setExperience] = useState('');

  const [providerImage, setProviderImage] = useState(null);
  const [cnicImage, setCnicImage] = useState(null);
  const [workImages, setWorkImages] = useState([]); 

  const categoriesData = [
    { label: 'Electrician', value: 'Electrician' },
    { label: 'Plumber', value: 'Plumber' },
    { label: 'Carpenter', value: 'Carpenter' },
    { label: 'AC Repair', value: 'AC Repair' },
    { label: 'Painter', value: 'Painter' },
    { label: 'Cleaner', value: 'Cleaner' }
  ];

  const pickSingleImage = async (type) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Gallery access is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: false, 
      quality: 0.8,
    });

    if (!result.canceled) {
      if (type === 'provider') setProviderImage(result.assets[0].uri);
      if (type === 'cnic') setCnicImage(result.assets[0].uri);
    }
  };

  const pickWorkImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Gallery access is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const selectedUris = result.assets.map(asset => asset.uri);
      setWorkImages([...workImages, ...selectedUris]);
    }
  };

  const removeWorkImage = (index) => {
    const filtered = workImages.filter((_, i) => i !== index);
    setWorkImages(filtered);
  };

  const handleRegistration = () => {
    if (!businessName.trim() || !cnicNumber.trim() || !address.trim() || !category || !experience.trim()) {
      Alert.alert("Missing Fields", "Please fill in all text fields and select a category.");
      return;
    }
    if (!providerImage) {
      Alert.alert("Missing Image", "Please upload your profile image.");
      return;
    }
    if (!cnicImage) {
      Alert.alert("Missing ID", "Please upload your CNIC Front image.");
      return;
    }

    Alert.alert("Registration Submitted", "Your application is under review. You will be notified soon!", [
      {
        text: "OK",
        onPress: () => {
          navigation.replace('ProviderDashboard');
        }
      }
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -30}
      className="flex-1 bg-white"
    >
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        
        <View className="px-6 py-4 flex-row items-center bg-white border-b border-gray-50">
          <TouchableOpacity onPress={() => navigation.goBack()} className="w-10 h-10 border border-gray-100 rounded-full items-center justify-center bg-white shadow-sm">
            <Ionicons name="arrow-back" size={22} color="#1a5ea1" />
          </TouchableOpacity>
          <View className="flex-1 items-center pr-10">
            <Text className="text-xl font-bold text-gray-800">Business Profile</Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-6 pt-4"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          
        
          <View className="items-center mb-6 mt-2">
            <TouchableOpacity onPress={() => pickSingleImage('provider')} className="relative">
              <View className="w-28 h-28 rounded-full bg-gray-50 border-2 border-dashed border-gray-300 items-center justify-center overflow-hidden">
                {providerImage ? (
                  <Image source={{ uri: providerImage }} className="w-full h-full" />
                ) : (
                  <View className="items-center">
                    <Feather name="user" size={32} color="#9ca3af" />
                    <Text className="text-[10px] text-gray-400 mt-1">Upload Photo</Text>
                  </View>
                )}
              </View>
              <View className="absolute bottom-0 right-0 bg-[#1a5ea1] p-2 rounded-full border-2 border-white shadow-sm">
                <Ionicons name="camera" size={14} color="white" />
              </View>
            </TouchableOpacity>
            <Text className="text-gray-700 font-semibold mt-3 text-base">Service Provider Image</Text>
          </View>

          <View className="gap-y-5 mb-8">
            
          
            <View>
              <Text className="text-gray-700 font-semibold mb-2 ml-1">Business / Shop Name</Text>
              <TextInput
                value={businessName}
                onChangeText={setBusinessName}
                placeholder="e.g. Al-Rehman Electronics"
                className="bg-gray-50 border border-gray-200 p-4 rounded-2xl text-gray-800 text-base"
              />
            </View>

          
            <View>
              <Text className="text-gray-700 font-semibold mb-2 ml-1">CNIC Number</Text>
              <TextInput
                value={cnicNumber}
                onChangeText={setCnicNumber}
                keyboardType="numeric"
                placeholder="e.g. 34402XXXXXXXXX"
                maxLength={15}
                className="bg-gray-50 border border-gray-200 p-4 rounded-2xl text-gray-800 text-base"
              />
            </View>

            
            <View>
              <Text className="text-gray-700 font-semibold mb-2 ml-1">Select Category</Text>
              <Dropdown
                style={{ height: 58, borderColor: '#e5e7eb', borderWidth: 1, borderRadius: 16, paddingHorizontal: 16, backgroundColor: '#f9fafb' }}
                placeholderStyle={{ fontSize: 16, color: '#9ca3af' }}
                selectedTextStyle={{ fontSize: 16, color: '#111827' }}
                data={categoriesData}
                maxHeight={220}
                labelField="label"
                valueField="value"
                placeholder="Select Service Type"
                value={category}
                onChange={item => setCategory(item.value)}
                renderRightIcon={() => (
                  <Ionicons name="chevron-down" size={20} color="#9ca3af" />
                )}
              />
            </View>

          
            <View>
              <Text className="text-gray-700 font-semibold mb-2 ml-1">Experience (Years)</Text>
              <TextInput
                value={experience}
                onChangeText={setExperience}
                keyboardType="numeric"
                placeholder="e.g. 5"
                className="bg-gray-50 border border-gray-200 p-4 rounded-2xl text-gray-800 text-base"
              />
            </View>

           
            <View>
              <Text className="text-gray-700 font-semibold mb-2 ml-1">Business Address / Location</Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                multiline={true}
                textAlignVertical="top"
                placeholder="Enter complete workshop or store address"
                className="bg-gray-50 border border-gray-200 p-4 rounded-2xl text-gray-800 text-base min-h-[90px]"
              />
            </View>

           
            <View>
              <Text className="text-gray-700 font-semibold mb-2 ml-1">Identity Verification (CNIC Front)</Text>
              <TouchableOpacity 
                onPress={() => pickSingleImage('cnic')}
                className="w-full h-40 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl justify-center items-center overflow-hidden"
              >
                {cnicImage ? (
                  <Image source={{ uri: cnicImage }} className="w-full h-full object-cover" />
                ) : (
                  <View className="items-center px-4">
                    <Ionicons name="card-outline" size={36} color="#1a5ea1" />
                    <Text className="text-gray-500 font-medium mt-2">Upload CNIC Front Image</Text>
                    <Text className="text-xs text-gray-400 mt-1 text-center">Make sure details are clearly visible</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View>
              <Text className="text-gray-700 font-semibold mb-2 ml-1">Previous Work Images (Portfolio)</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row py-1">
                <TouchableOpacity 
                  onPress={pickWorkImages}
                  className="w-24 h-24 bg-gray-50 border-2 border-dashed border-blue-200 rounded-2xl justify-center items-center mr-3"
                >
                  <Ionicons name="add" size={28} color="#1a5ea1" />
                  <Text className="text-[10px] text-blue-600 font-bold mt-1">Add Work</Text>
                </TouchableOpacity>

                {workImages.map((uri, index) => (
                  <View key={index} className="w-24 h-24 rounded-2xl mr-3 relative bg-gray-100 border border-gray-100 overflow-hidden">
                    <Image source={{ uri: uri }} className="w-full h-full" />
                    <TouchableOpacity 
                      onPress={() => removeWorkImage(index)}
                      className="absolute top-1 right-1 bg-red-500 p-1 rounded-full shadow-sm"
                    >
                      <Ionicons name="close" size={12} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>

          </View>

       
          <TouchableOpacity
            onPress={handleRegistration}
            className="bg-[#1a5ea1] py-4 rounded-2xl items-center shadow-md mt-auto mb-8"
          >
            <Text className="text-white text-lg font-bold">Submit Registration</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ProviderRegisterScreen;