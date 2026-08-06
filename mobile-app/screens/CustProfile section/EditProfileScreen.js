import React, { useState, useRef,useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StatusBar, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { AuthContext } from '../../context/AuthContext';

const EditProfileScreen = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);

  const [name, setName] = useState(userInfo?.name);
  const [phone, setPhone] = useState(userInfo?.phone);
  const [email] = useState(userInfo?.email );
  const [address, setAddress] = useState(userInfo?.address || 'No address provided');
  const [profileImage, setProfileImage] = useState(userInfo?.profileImage || 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png');


  const [isEditable, setIsEditable] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const phoneInputRef = useRef(null);

  

 
  const pickImage = async () => {
    if (!isEditable) return;

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Gallery access is required!');
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
      const phoneTxt = (phone || '').trim();
      const addressTxt = (address || '').trim();

      if (!nameTxt || !phoneTxt || !addressTxt) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      Alert.alert("Success", "Profile Updated successfully!", [
        {
          text: "OK",
          onPress: () => {
            setIsEditable(false);
            setIsEditingPhone(false);
            navigation.goBack();
          }
        }
      ]);
    }
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
            <Text className="text-xl font-bold text-gray-800">
              {isEditable ? "Edit Profile" : "Your Profile"}
            </Text>
          </View>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          className="flex-1 px-6 pt-4"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
      
          <View className="items-center mb-8 mt-2">
            <View className="relative">
              <View className={`rounded-full overflow-hidden border-4 ${isEditable ? 'border-blue-500 shadow-md' : 'border-gray-100'}`}>
                <Image source={{ uri: profileImage }} className="w-32 h-32" />
              </View>
              {isEditable && (
                <TouchableOpacity onPress={pickImage} className="absolute bottom-0 right-0 bg-[#1a5ea1] p-2.5 rounded-full border-2 border-white shadow-md">
                  <Ionicons name="camera" size={16} color="white" />
                </TouchableOpacity>
              )}
            </View>
          </View>

        
          <View className="gap-y-5 mb-12">
            
          
            <View>
              <Text className="text-gray-500 text-sm font-semibold mb-2 ml-1">Name</Text>
              <TextInput 
                value={name} 
                onChangeText={setName} 
                editable={isEditable}
                placeholder="Enter your name"
                className={`border p-4 rounded-2xl text-base ${isEditable ? 'bg-gray-50 border-blue-200 text-gray-900' : 'bg-gray-50/40 border-gray-100 text-gray-500'}`} 
              />
            </View>

           
            <View>
              <Text className="text-gray-500 text-sm font-semibold mb-2 ml-1">Phone Number</Text>
              <View className={`border flex-row items-center pr-4 rounded-2xl ${isEditable && isEditingPhone ? 'bg-gray-50 border-blue-400' : 'bg-gray-50/40 border-gray-100'}`}>
                <TextInput 
                  ref={phoneInputRef} 
                  value={phone} 
                  keyboardType="phone-pad" 
                  onChangeText={setPhone} 
                  editable={isEditable && isEditingPhone} 
                  placeholder="Enter phone number"
                  className={`flex-1 p-4 text-base ${(isEditable && isEditingPhone) ? 'text-gray-900' : 'text-gray-400'}`} 
                />
                {isEditable && (
                  <TouchableOpacity onPress={() => setIsEditingPhone(!isEditingPhone)}>
                    <Text className="text-[#1a5ea1] font-bold">{isEditingPhone ? 'Done' : 'Change'}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

           
            <View>
              <Text className="text-gray-500 text-sm font-semibold mb-2 ml-1">Email</Text>
              <View className="bg-gray-50/40 border border-gray-100 p-4 rounded-2xl">
                <Text className="text-gray-400 text-base">{email}</Text>
              </View>
              <Text className="text-[10px] text-gray-400 mt-1 ml-1">* Email cannot be changed</Text>
            </View>

        

           
            <View className="mb-6">
              <Text className="text-gray-500 text-sm font-semibold mb-2 ml-1">Manage Address</Text>
              <TextInput 
                value={address} 
                onChangeText={setAddress} 
                editable={isEditable}
                multiline={true}
                textAlignVertical="top"
                placeholder="Enter your address"
                className={`border p-4 rounded-2xl text-base min-h-[96px] ${isEditable ? 'bg-gray-50 border-blue-200 text-gray-900' : 'bg-gray-50/40 border-gray-100 text-gray-500'}`} 
              />
            </View>
          </View>

         
          <TouchableOpacity 
            onPress={handleUpdateOrEdit} 
            className="bg-[#1a5ea1] py-4 rounded-2xl items-center shadow-md mt-auto mb-6"
          >
            <Text className="text-white text-lg font-bold">
              {isEditable ? "Save Changes" : "Edit Profile"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 58,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#9ca3af',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#111827',
  },
});

export default EditProfileScreen;