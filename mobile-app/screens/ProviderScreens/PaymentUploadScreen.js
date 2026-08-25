import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator, 
  Alert, 
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {AuthContext} from '../../context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import { getPaymentDetails , uploadPayment} from '../../api/ProviderApi';

const PaymentUploadScreen = ({ navigation }) => {
    const {providerInfo} = useContext(AuthContext)
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [registrationFeeAmount, setRegistrationFeeAmount] = useState('');
  const [bankAccounts, setBankAccounts] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getPaymentDetails();
        if (response && response.success) {
          setRegistrationFeeAmount(response.registrationFeeAmount );
          setBankAccounts(response.activePaymentAccounts || []);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load payment details.");
      } finally {
        setFetching(false);
      }
    };

    fetchDetails();
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "Gallery access is needed to upload payment slip.");
      return;
    }

   let result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ['images'], 
  allowsEditing: true,
  quality: 0.8,
});

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
const handleSubmit = async () => {
  if (!image) {
    Alert.alert("Required", "Please select payment slip image first.");
    return;
  }

  setLoading(true);
  try {
    const formData = new FormData();

    formData.append('paymentSlip', {
      uri: image,
      type: 'image/jpeg',
      name: 'payment_slip.jpg',
    });

    if (providerInfo?._id) {
      formData.append('providerId', providerInfo._id);
    }
    formData.append('paymentType', 'registration');

    const res = await uploadPayment(formData);

    Alert.alert("Success", "Payment slip uploaded successfully!");
    navigation.replace('PaymentStatusScreen', { status: 'pending_approval' });

  } catch (error) {
    Alert.alert("Upload Failed", error.response?.data?.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  if (fetching) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#1a5ea1" />
        <Text className="text-gray-500 mt-3">Loading details...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text className="text-3xl font-bold text-[#1a5ea1] text-center mb-1">
          Registration Fee
        </Text>
        
        <Text className="text-xl font-bold text-center text-gray-800 mb-1">
          PKR {registrationFeeAmount}
        </Text>

        <Text className="text-gray-500 text-center mb-8 text-base">
          Deposit registration fee to activate your provider account
        </Text>

        {bankAccounts.length === 0 ? (
          <View className="bg-gray-100 p-4 rounded-xl mb-6">
            <Text className="text-gray-600 text-center">No active bank accounts available.</Text>
          </View>
        ) : (
          bankAccounts.map((acc, index) => (
            <View key={acc._id || index} className="bg-[#0a2f5c] p-5 rounded-xl mb-4 shadow-md">
              <Text className="text-white text-lg font-bold mb-3 border-b border-gray-600 pb-2">
                Bank Account Details {bankAccounts.length > 1 ? `#${index + 1}` : ''}
              </Text>
              
              <View className="mb-2">
                <Text className="text-gray-300 text-xs uppercase">Bank Name</Text>
                <Text className="text-white font-bold text-base">{acc.bankName}</Text>
              </View>

              <View className="mb-2">
                <Text className="text-gray-300 text-xs uppercase">Account Title</Text>
                <Text className="text-white font-bold text-base">{acc.accountTitle}</Text>
              </View>

              <View className="mb-1">
                <Text className="text-gray-300 text-xs uppercase">IBAN / Account Number</Text>
                <Text className="text-white font-bold text-base tracking-wider">{acc.accountNumber}</Text>
              </View>
            </View>
          ))
        )}

        <Text className="text-gray-800 font-bold mb-2 text-base">
          Upload Payment Slip / Screenshot
        </Text>
        
        <TouchableOpacity 
          onPress={pickImage}
          className="border-2 border-dashed border-gray-300 bg-gray-50 h-48 rounded-xl justify-center items-center mb-6 overflow-hidden"
        >
          {image ? (
            <Image source={{ uri: image }} className="w-full h-full" resizeMode="cover" />
          ) : (
            <View className="items-center">
              <Ionicons name="cloud-upload-outline" size={44} color="#1a5ea1" />
              <Text className="text-gray-500 mt-2 font-medium">Tap to select payment slip</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={handleSubmit}
          disabled={loading}
          className="bg-[#1a5ea1] p-4 rounded-lg items-center shadow-lg"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-bold text-lg">Submit Slip for Review</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentUploadScreen;