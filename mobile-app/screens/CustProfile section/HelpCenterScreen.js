import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Alert, Linking} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const HelpCenterScreen = ({ navigation }) => {
  const contactNumber = "03410632835";
  const supportEmail = "nazdeek.application@gmail.com";

  const handleCall = () => {
    Linking.openURL(`tel:${contactNumber}`).catch(() => {
      Alert.alert("Error", "Cannot open phone dialer");
    });
  };

  const handleEmailClick = () => {
    Linking.openURL(`mailto:${supportEmail}?subject=Nazdeek App Support`).catch(() => {
      Alert.alert("Error", "Cannot open email app");
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View className="flex-1 px-6">
        
        <View className="py-4 flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-800">Help Center</Text>
          <View className="w-6" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          
          <Text className="text-xl font-bold text-gray-900 mb-2">How can we help you?</Text>
          <Text className="text-gray-500 text-sm mb-8">
            Please feel free to contact us. You can call us directly or tap on email to send your issues and feedback.
          </Text>

          <View className="space-y-4">
            
            <TouchableOpacity 
              onPress={handleCall}
              className="flex-row items-center p-5 bg-gray-50 rounded-2xl border border-gray-100 mb-4"
            >
              <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center">
                <Ionicons name="call" size={22} color="#1a5ea1" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-xs text-gray-400 font-medium">Call Support</Text>
                <Text className="text-base font-bold text-gray-800 mt-0.5">{contactNumber}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={handleEmailClick}
              className="flex-row items-center p-5 bg-gray-50 rounded-2xl border border-gray-100"
            >
              <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center">
                <Ionicons name="mail" size={22} color="#1a5ea1" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-xs text-gray-400 font-medium">Email Us (Customer Support)</Text>
                <Text className="text-base font-bold text-gray-800 mt-0.5">{supportEmail}</Text>
              </View>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HelpCenterScreen;