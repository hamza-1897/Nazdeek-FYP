import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StatusBar, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown';

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('Shamir Ali');
  const [phone, setPhone] = useState('0300 1234567');
  const [email] = useState('shamir.ali@example.com');
  const [gender, setGender] = useState('Male');
  const [address, setAddress] = useState('House #123, Street 5, Mandi Bahauddin'); // New Address State
  const [profileImage, setProfileImage] = useState('https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const phoneInputRef = useRef(null);

  const genderData = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
  ];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Gallery access is required!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View className="px-6 py-4 flex-row items-center relative">
        <TouchableOpacity onPress={() => navigation.goBack()} className="w-10 h-10 border border-gray-100 rounded-full items-center justify-center bg-white shadow-sm">
          <Ionicons name="arrow-back" size={22} color="#1a5ea1" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="text-xl font-bold text-gray-800">Your Profile</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-6 pt-4">
        <View className="items-center mb-10">
          <View className="relative">
            <Image source={{ uri: profileImage }} className="w-32 h-32 rounded-full" />
            <TouchableOpacity onPress={pickImage} className="absolute bottom-1 right-1 bg-[#1a5ea1] p-2.5 rounded-full border-4 border-white">
              <Ionicons name="pencil" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="gap-y-5">
          
          <View>
            <Text className="text-gray-700 font-semibold mb-2 ml-1">Name</Text>
            <TextInput value={name} onChangeText={setName} className="bg-white border border-gray-200 p-4 rounded-2xl text-gray-800 text-base" />
          </View>

          
          <View>
            <Text className="text-gray-700 font-semibold mb-2 ml-1">Phone Number</Text>
            <View className={`bg-white border ${isEditingPhone ? 'border-[#1a5ea1]' : 'border-gray-200'} flex-row items-center pr-4 rounded-2xl`}>
              <TextInput ref={phoneInputRef} value={phone} keyboardType="phone-pad" onChangeText={setPhone} editable={isEditingPhone} className={`flex-1 p-4 text-base ${isEditingPhone ? 'text-gray-900' : 'text-gray-400'}`} />
              <TouchableOpacity onPress={() => setIsEditingPhone(!isEditingPhone)}>
                <Text className="text-[#1a5ea1] font-bold">{isEditingPhone ? 'Done' : 'Change'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          
          <View>
            <Text className="text-gray-700 font-semibold mb-2 ml-1">Email</Text>
            <View className="bg-gray-50 border border-gray-100 p-4 rounded-2xl">
              <Text className="text-gray-400 text-base">{email}</Text>
            </View>
            <Text className="text-[10px] text-gray-400 mt-1 ml-1">* Email cannot be changed</Text>
          </View>

         
          <View>
            <Text className="text-gray-700 font-semibold mb-2 ml-1">Gender</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={genderData}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder="Select Gender"
              value={gender}
              onChange={item => setGender(item.value)}
              renderRightIcon={() => (
                <Ionicons name="chevron-down" size={20} color="#cbd5e1" />
              )}
            />
          </View>

         
          <View>
            <Text className="text-gray-700 font-semibold mb-2 ml-1">Manage Address</Text>
            <TextInput 
              value={address} 
              onChangeText={setAddress} 
              multiline={true}
              numberOfLines={2}
              textAlignVertical="top"
              className="bg-white border border-gray-200 p-4 rounded-2xl text-gray-800 text-base min-h-[80px]" 
            />
          </View>
        </View>
        <View className="h-40" />
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 px-6 pb-10 pt-5 bg-white border-t border-gray-50">
        <TouchableOpacity onPress={() => Alert.alert("Success", "Profile Updated!")} className="bg-[#1a5ea1] py-4 rounded-3xl items-center shadow-lg">
          <Text className="text-white text-lg font-bold">Update</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 60,
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
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