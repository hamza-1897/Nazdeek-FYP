import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';
import { deleteAccount } from '../../api/ProviderApi';

const ProvProfile = ({ navigation }) => {
  const { logout, providerInfo } = useContext(AuthContext);
  const [deleting, setDeleting] = useState(false);

  const pressDelete = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your provider account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setDeleting(true);
              const response = await deleteAccount();

              if (response && response.success) {
                Alert.alert('Account Deleted', 'Your account has been deleted successfully.', [
                  {
                    text: 'OK',
                    onPress: async () => {
                      await logout();
                      navigation.replace('Login');
                    },
                  },
                ]);
              } else {
                Alert.alert('Error', response?.message || 'Failed to delete account.');
              }
            } catch (error) {
              Alert.alert('Error', error?.response?.data?.message || 'Something went wrong.');
            } finally {
              setDeleting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#e6f0fa" />

      <ScrollView className="flex-1 mb-16" showsVerticalScrollIndicator={false}>
        <View className="bg-[#e6f0fa] items-center pt-14 pb-8 px-6 rounded-b-[32px]">
          <View className="w-20 h-20 bg-[#1a5ea1] rounded-full items-center justify-center shadow-sm mb-3">
            <Image
              source={{ uri: providerInfo?.providerImage || 'https://via.placeholder.com/150' }}
              className="w-20 h-20 rounded-full"
            />
          </View>

          <Text className="text-xl font-bold text-gray-900">
            {providerInfo?.businessName || 'Provider'}
          </Text>
          <Text className="text-gray-500 text-xs mt-1">
            {providerInfo?.categoryId?.name || 'Category'}
          </Text>
        </View>

        <View className="px-6 mt-2 gap-y-3">
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfileProvider')}
            className="flex-row items-center bg-white p-4 rounded-xl border border-gray-100"
          >
            <View className="w-9 h-9 bg-blue-50 rounded-lg items-center justify-center mr-4">
              <Feather name="user" size={18} color="#1a5ea1" />
            </View>
            <Text className="flex-1 text-base font-medium text-gray-800">Edit profile</Text>
            <Ionicons name="chevron-forward" size={18} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MyServicesProvider')}
            className="flex-row items-center bg-white p-4 rounded-xl border border-gray-100"
          >
            <View className="w-9 h-9 bg-green-50 rounded-lg items-center justify-center mr-4">
              <Feather name="grid" size={18} color="#22c55e" />
            </View>
            <Text className="flex-1 text-base font-medium text-gray-800">My services</Text>
            <Ionicons name="chevron-forward" size={18} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('RatingsReviewsProvider')}
            className="flex-row items-center bg-white p-4 rounded-xl border border-gray-100"
          >
            <View className="w-9 h-9 bg-amber-50 rounded-lg items-center justify-center mr-4">
              <Feather name="star" size={18} color="#eab308" />
            </View>
            <Text className="flex-1 text-base font-medium text-gray-800">Ratings & reviews</Text>
            <Ionicons name="chevron-forward" size={18} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('HelpCenter')}
            className="flex-row items-center bg-white p-4 rounded-xl border border-gray-100"
          >
            <View className="w-9 h-9 bg-emerald-50 rounded-lg items-center justify-center mr-4">
              <Feather name="phone" size={18} color="#10b981" />
            </View>
            <Text className="flex-1 text-base font-medium text-gray-800">Help Center</Text>
            <Ionicons name="chevron-forward" size={18} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={pressDelete}
            disabled={deleting}
            className="flex-row items-center bg-white p-4 rounded-xl border border-gray-100"
          >
            <View className="w-9 h-9 bg-red-50 rounded-lg items-center justify-center mr-4">
              {deleting ? (
                <ActivityIndicator size="small" color="#dc2626" />
              ) : (
                <Feather name="trash-2" size={18} color="#dc2626" />
              )}
            </View>
            <Text className="flex-1 text-base font-medium text-red-600">Delete Account</Text>
            <Ionicons name="chevron-forward" size={18} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              logout();
              navigation.replace('Login');
            }}
            className="flex-row items-center bg-white p-4 rounded-xl border border-gray-100"
          >
            <View className="w-9 h-9 bg-slate-100 rounded-lg items-center justify-center mr-4">
              <Feather name="log-out" size={18} color="#475569" />
            </View>
            <Text className="flex-1 text-base font-medium text-slate-700">Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProvProfile;