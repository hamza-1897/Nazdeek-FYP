import React, { useContext } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { userInfo, logout } = useContext(AuthContext);

  const defaultAvatar = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400';
  const profilePicUri = userInfo && userInfo.profileImage ? userInfo.profileImage : defaultAvatar;
  const userName = userInfo && userInfo.name ? userInfo.name : "Guest User";

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
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              if (logout) {
                await logout();
              }
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }], 
              });
            } catch (error) {
              console.log("Logout Error: ", error);
            }
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
          <View className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
            <Image 
              source={{ uri: profilePicUri }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-xl font-bold text-gray-900 mt-4">{userName}</Text>
        </View>

        <View className="mt-2">
          <MenuItem 
            icon="person-outline" 
            title="Your profile" 
            onPress={() => navigation.navigate('EditProfile')} 
          />
          
         
          <MenuItem 
            icon="help-circle-outline" 
            title="Help Center" 
            onPress={() => navigation.navigate('HelpCenter')}
          />
          
          <TouchableOpacity 
            className="flex-row items-center py-4 mt-4"
            onPress={handleLogout}
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