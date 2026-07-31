import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';

const PendingApprovalScreen = ({ navigation }) => {
  const [checking, setChecking] = useState(false);
  const { logout, userInfo } = useContext(AuthContext);


  const handlelogout = async ()=>{
    await logout();
    navigation.replace('Login')
  }
  const handleCheckStatus = async () => {
    try {
      setChecking(true);
      
      setTimeout(() => {
        setChecking(false);
        Alert.alert(
          'Status Pending',
          'Your application is still under review. You will receive access once verification is complete.'
        );
      }, 1000);

    } catch (error) {
      setChecking(false);
      Alert.alert('Error', 'Status refresh Error. Try Again.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6 justify-between py-8">
      
      <View className="items-center mt-10">
        <View className="w-28 h-28 bg-amber-50 rounded-full justify-center items-center mb-6 border-2 border-amber-200">
          <Ionicons name="time-outline" size={60} color="#d97706" />
        </View>

        <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
          Application Under Review
        </Text>
        
        <Text className="text-sm text-gray-500 text-center px-4 leading-6">
       Your details and documents have been received by our team. The verification process may take 24-48 hours.        </Text>
      </View>

      <View className="bg-gray-50 border border-gray-200 rounded-xl p-4 my-6">
        <View className="flex-row items-center mb-3">
          <Ionicons name="information-circle-outline" size={22} color="#1a5ea1" />
          <Text className="text-base font-bold text-gray-800 ml-2">
            What happens next?
          </Text>
        </View>

        <View className="space-y-2">
          <Text className="text-xs text-gray-600">
            • Admin will verify your nick and work portfolio.
          </Text>
          <Text className="text-xs text-gray-600">
            • When the status changes, you will be redirected to the dashboard.
          </Text>
        </View>
      </View>

      <View className="w-full space-y-3 mb-4">
        
        <TouchableOpacity
          onPress={handleCheckStatus}
          disabled={checking}
          className="bg-[#1a5ea1] p-4 rounded-xl items-center flex-row justify-center"
        >
          {checking ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons name="refresh-outline" size={20} color="white" className="mr-2" />
              <Text className="text-white font-bold text-base ml-2">
                Check Status
              </Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlelogout}

          className="border border-gray-300 p-4 rounded-xl items-center"
        >
          <Text className="text-gray-700 font-semibold text-base">
            Logout & Exit
          </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

export default PendingApprovalScreen;