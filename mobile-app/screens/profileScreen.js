import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  
  const MenuItem = ({ icon, title, onPress }) => (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center justify-between py-4 border-b border-gray-50"
    >
      <View className="flex-row items-center">
        <Ionicons name={icon} size={22} color="#1a5ea1" />
        <Text className="ml-4 text-gray-700 font-medium text-base">{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
    </TouchableOpacity>
  );

  
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel" 
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
           
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }], // auth-navigation ke mutabiq name 'Login' hai
            });
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
     
      <View className="px-6 py-4 flex-row items-center justify-center relative">
        <Text className="text-xl font-bold text-gray-800">Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-6">
        
       
        <View className="items-center mt-6 mb-8">
          <View className="relative">
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400' }} 
              className="w-28 h-28 rounded-full"
            />
          </View>
          <Text className="text-xl font-bold text-gray-900 mt-4">Shamir Ali</Text>
        </View>

        <View className="mt-2">
          
       
          <MenuItem 
            icon="person-outline" 
            title="Your profile" 
            placeholder="Edit profile details"
            onPress={() => navigation.navigate('EditProfile')} 
          />
          
         
          <MenuItem 
            icon="help-circle-outline" 
            title="Help Center" 
            onPress={() => {}} 
          />
          
          
          <TouchableOpacity 
            onPress={handleLogout} 
            className="flex-row items-center py-4 mt-4"
          >
            <Ionicons name="log-out-outline" size={22} color="#ef4444" />
            <Text className="ml-4 text-red-500 font-bold text-base">Logout</Text>
          </TouchableOpacity>
        </View>

        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;