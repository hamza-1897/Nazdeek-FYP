import React, { useState , useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {getAllCategories} from '../../api/ProviderApi'



const ProviderSetupScreen = ({ navigation }) => {
  const [businessName, setBusinessName] = useState('');
  const [cnicNumber, setCnicNumber] = useState('');
const [categories, setCategories] = useState([]);
const [selectedCategory, setSelectedCategory] = useState(null);
const [loadingCategories, setLoadingCategories] = useState(true);
  const [bio, setBio] = useState('');
  const [experience, setExperience] = useState('');

  const [profileImage, setProfileImage] = useState(null);
  const [cnicFront, setCnicFront] = useState(null);
  const [cnicBack, setCnicBack] = useState(null);
  const [workImages, setWorkImages] = useState([]);

  const fetchCategories = async () => {
  try {
    setLoadingCategories(true);
    const res = await getAllCategories(); 
    const data = res?.data ? res.data : res;

    if (data?.success) {
      setCategories(data.categories);
    }
    } catch (error) {
    console.log('Categories Fetch Error:', error);
    Alert.alert('Error', 'Unable to load service categories.');
  } finally {
    setLoadingCategories(false);
  }
};

useEffect(() => {
  fetchCategories();
}, []);


const pickSingleImage = async (type) => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissionResult.granted) {
    Alert.alert('Permission Required', 'Permission to access gallery is required!');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'], 
    allowsEditing: type === 'profile',
    aspect: type === 'profile' ? [1, 1] : [4, 3],
    quality: 0.7,
  });

  if (!result.canceled && result.assets && result.assets[0].uri) {
    const uri = result.assets[0].uri;
    if (type === 'profile') setProfileImage(uri);
    if (type === 'cnicFront') setCnicFront(uri);
    if (type === 'cnicBack') setCnicBack(uri);
  }
};

const pickWorkImages = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissionResult.granted) {
    Alert.alert('Permission Required', 'Permission to access gallery is required!');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'], 
    allowsMultipleSelection: true,
    quality: 0.7,
  });

  if (!result.canceled && result.assets) {
    const newUris = result.assets.map(asset => asset.uri);
    if (workImages.length + newUris.length > 5) {
      Alert.alert("Limit Reached", "You can upload a maximum of 5 work images.");
      return;
    }
    setWorkImages(prev => [...prev, ...newUris]);
  }
};
  const removeWorkImage = (index) => {
    setWorkImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!businessName.trim()) {
      Alert.alert('Validation Error', 'Please enter Business/Service Name.');
      return;
    }
    if (!cnicNumber.trim() || cnicNumber.length < 13) {
      Alert.alert('Validation Error', 'Please enter a valid 13-digit CNIC number.');
      return;
    }
    if (!selectedCategory) {
      Alert.alert('Validation Error', 'Please select a service category.');
      return;
    }
    if (!profileImage) {
      Alert.alert('Validation Error', 'Please select a profile picture.');
      return;
    }
    if (!experience.trim()) {
  Alert.alert('Validation Error', 'Please enter your years of experience.');
  return;
}
    if (!cnicFront || !cnicBack) {
      Alert.alert('Validation Error', 'Please upload both CNIC Front and Back images.');
      return;
    }

    Alert.alert(
      "UI Test Success!",
      "Form validation passed! Currently in UI mode (No API call made).",
      [
        {
          text: "Go to Pending Screen",
          onPress: () => navigation.navigate('PendingApproval')
        },
        { text: "Stay Here", style: "cancel" }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-6 py-4" showsVerticalScrollIndicator={false}>
        
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800">Complete Your Setup</Text>
          <Text className="text-sm text-gray-500 mt-1">
            Provide your business details, CNIC verification, and work samples to get approved.
          </Text>
        </View>

        <View className="items-center mb-6">
          <TouchableOpacity 
            onPress={() => pickSingleImage('profile')}
            className="relative w-28 h-28 rounded-full bg-gray-100 border-2 border-dashed border-[#1a5ea1] justify-center items-center overflow-hidden"
          >
            {profileImage ? (
              <Image source={{ uri: profileImage }} className="w-full h-full" />
            ) : (
              <View className="items-center">
                <Ionicons name="camera-outline" size={32} color="#1a5ea1" />
                <Text className="text-xs text-[#1a5ea1] mt-1 font-semibold">Upload Photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Text className="text-sm font-bold text-gray-800 mb-1">Business Name</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-base bg-gray-50 text-gray-900"
            placeholder="e.g. Ali Electric Work"
            value={businessName}
            onChangeText={setBusinessName}
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-bold text-gray-800 mb-1">CNIC Number</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-base bg-gray-50 text-gray-900"
            placeholder="3740512345671"
            keyboardType="number-pad"
            maxLength={13}
            value={cnicNumber}
            onChangeText={setCnicNumber}
          />
        </View>

<View className="mb-4">
  <Text className="text-sm font-bold text-gray-800 mb-2">Select Category</Text>
  
  {loadingCategories ? (
    <View className="py-3 items-center flex-row">
      <ActivityIndicator size="small" color="#1a5ea1" />
      <Text className="ml-2 text-xs text-gray-500">Loading categories...</Text>
    </View>
  ) : categories.length === 0 ? (
    <Text className="text-xs text-red-500">No categories available.</Text>
  ) : (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
      {categories.map((cat) => {
        const isSelected = selectedCategory?._id === cat._id;
        return (
          <TouchableOpacity
            key={cat._id}
            onPress={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full mr-2 border ${
              isSelected
                ? 'bg-[#1a5ea1] border-[#1a5ea1]'
                : 'bg-gray-100 border-gray-300'
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                isSelected ? 'text-white' : 'text-gray-700'
              }`}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  )}
</View>

        <View className="mb-6">
          <Text className="text-sm font-bold text-gray-800 mb-1">About Your Profile</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-base bg-gray-50 text-gray-900"
            placeholder="Tell customers about your experience, timing, and specialty..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={bio}
            onChangeText={setBio}
          />
        </View>
<View className="mb-4">
  <Text className="text-sm font-bold text-gray-800 mb-1">
    Experience (in Years)
  </Text>
  <TextInput
    className="border border-gray-300 rounded-lg p-3 text-base bg-gray-50 text-gray-900"
    placeholder="e.g. 3"
    keyboardType="numeric"
    maxLength={2}
    value={experience}
    onChangeText={setExperience}
  />
</View>

        <Text className="text-base font-bold text-gray-800 mb-3">Upload CNIC Images</Text>
        <View className="flex-row justify-between mb-6">
          
          <TouchableOpacity
            onPress={() => pickSingleImage('cnicFront')}
            className="w-[48%] h-32 border-2 border-dashed border-gray-300 rounded-lg justify-center items-center bg-gray-50 overflow-hidden"
          >
            {cnicFront ? (
              <Image source={{ uri: cnicFront }} className="w-full h-full" resizeMode="cover" />
            ) : (
              <View className="items-center">
                <Ionicons name="card-outline" size={28} color="gray" />
                <Text className="text-xs text-gray-500 mt-1">CNIC Front</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => pickSingleImage('cnicBack')}
            className="w-[48%] h-32 border-2 border-dashed border-gray-300 rounded-lg justify-center items-center bg-gray-50 overflow-hidden"
          >
            {cnicBack ? (
              <Image source={{ uri: cnicBack }} className="w-full h-full" resizeMode="cover" />
            ) : (
              <View className="items-center">
                <Ionicons name="card-outline" size={28} color="gray" />
                <Text className="text-xs text-gray-500 mt-1">CNIC Back</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-base font-bold text-gray-800">Work Portfolio Images</Text>
            <Text className="text-xs text-gray-500">Max 5 photos</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            <TouchableOpacity
              onPress={pickWorkImages}
              className="w-24 h-24 border-2 border-dashed border-[#1a5ea1] rounded-lg justify-center items-center bg-blue-50 mr-3"
            >
              <Ionicons name="add-circle-outline" size={30} color="#1a5ea1" />
              <Text className="text-xs text-[#1a5ea1] font-bold mt-1">Add Work</Text>
            </TouchableOpacity>

            {workImages.map((uri, index) => (
              <View key={index} className="relative w-24 h-24 rounded-lg mr-3 overflow-hidden bg-gray-100">
                <Image source={{ uri }} className="w-full h-full" resizeMode="cover" />
                <TouchableOpacity
                  onPress={() => removeWorkImage(index)}
                  className="absolute top-1 right-1 bg-red-600 rounded-full p-1"
                >
                  <Ionicons name="close" size={12} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-[#1a5ea1] p-4 rounded-lg items-center mb-10"
        >
          <Text className="text-white text-lg font-bold">Submit for Approval</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ProviderSetupScreen;