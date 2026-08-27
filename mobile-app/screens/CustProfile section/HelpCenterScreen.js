import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Alert, Linking, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getSupportDetails } from '../../api/customerApi';

const HelpCenterScreen = ({ navigation }) => {
  const [supportData, setSupportData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const res = await getSupportDetails();
      // Handle both res.data.data.contactDetails or res.data.contactDetails dynamically
      const details = res?.data?.data?.contactDetails || res?.data?.contactDetails || res?.data;
      if (details) {
        setSupportData({
          supportPhone: details.supportPhone || supportData.supportPhone,
          supportWhatsapp: details.supportWhatsapp || supportData.supportWhatsapp,
          supportEmail: details.supportEmail || supportData.supportEmail,
          officeAddress: details.officeAddress || supportData.officeAddress,
        });
      }
    } catch (error) {
      console.error("Error fetching support details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCall = () => {
    Linking.openURL(`tel:${supportData.supportPhone}`).catch(() => {
      Alert.alert("Error", "Cannot open phone dialer");
    });
  };

  const handleWhatsapp = () => {
    const cleanNumber = supportData.supportWhatsapp.replace(/[^0-9]/g, '');
    const url = `whatsapp://send?phone=${cleanNumber}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "WhatsApp is not installed on your device");
    });
  };

  const handleEmailClick = () => {
    Linking.openURL(`mailto:${supportData.supportEmail}?subject=Nazdeek App Support`).catch(() => {
      Alert.alert("Error", "Cannot open email app");
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1 px-6">
        {/* Header */}
        <View className="py-4 flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-800">Help Center</Text>
          <View className="w-6" />
        </View>

        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#1a5ea1" />
            <Text className="text-gray-400 text-xs font-medium mt-2">Loading contact details...</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="text-xl font-bold text-gray-900 mb-2">How can we help you?</Text>
            <Text className="text-gray-500 text-sm mb-6">
              Please feel free to contact us. You can call, WhatsApp, or email us directly with your queries and feedback.
            </Text>

            <View className="space-y-4">
              {/* Call Support */}
              <TouchableOpacity 
                onPress={handleCall}
                className="flex-row items-center p-5 bg-gray-50 rounded-2xl border border-gray-100 mb-4"
              >
                <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center">
                  <Ionicons name="call" size={22} color="#1a5ea1" />
                </View>
                <View className="ml-4 flex-1">
                  <Text className="text-xs text-gray-400 font-medium">Call Support</Text>
                  <Text className="text-base font-bold text-gray-800 mt-0.5">{supportData.supportPhone}</Text>
                </View>
              </TouchableOpacity>

              {/* WhatsApp Support */}
              <TouchableOpacity 
                onPress={handleWhatsapp}
                className="flex-row items-center p-5 bg-gray-50 rounded-2xl border border-gray-100 mb-4"
              >
                <View className="w-12 h-12 bg-emerald-50 rounded-full items-center justify-center">
                  <Ionicons name="logo-whatsapp" size={22} color="#10b981" />
                </View>
                <View className="ml-4 flex-1">
                  <Text className="text-xs text-gray-400 font-medium">WhatsApp Support</Text>
                  <Text className="text-base font-bold text-gray-800 mt-0.5">{supportData.supportWhatsapp}</Text>
                </View>
              </TouchableOpacity>

              {/* Email Support */}
              <TouchableOpacity 
                onPress={handleEmailClick}
                className="flex-row items-center p-5 bg-gray-50 rounded-2xl border border-gray-100 mb-4"
              >
                <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center">
                  <Ionicons name="mail" size={22} color="#1a5ea1" />
                </View>
                <View className="ml-4 flex-1">
                  <Text className="text-xs text-gray-400 font-medium">Email Support</Text>
                  <Text className="text-base font-bold text-gray-800 mt-0.5">{supportData.supportEmail}</Text>
                </View>
              </TouchableOpacity>

              {/* Office Address */}
              <View className="flex-row items-center p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <View className="w-12 h-12 bg-gray-200/60 rounded-full items-center justify-center">
                  <Ionicons name="location" size={22} color="#4b5563" />
                </View>
                <View className="ml-4 flex-1">
                  <Text className="text-xs text-gray-400 font-medium">Office Address</Text>
                  <Text className="text-sm font-semibold text-gray-800 mt-0.5">{supportData.officeAddress}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HelpCenterScreen;