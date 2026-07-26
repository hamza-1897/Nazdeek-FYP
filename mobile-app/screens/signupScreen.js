import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  ActivityIndicator, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { userSignup } from '../api/authApi';

const SignupScreen = ({ navigation }) => {
  const [role, setRole] = useState('customer'); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); 
  const [address, setAddress] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const validateForm = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim() || !password) {
      Alert.alert('Error', 'Please fill in all input fields.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await userSignup(name, email);

      Alert.alert('Success','Please check your email for the OTP.');

      navigation.navigate('VerifyOTP', { 
        name, 
        email, 
        phone, 
        address, 
        password, 
        role, 
        flow: 'signup' 
      });

    } catch (error) {
      console.log("Signup error:", error);
      Alert.alert("Signup Failed", error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 bg-white">
        
        <View className="px-6 pt-4 flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="flex-1 text-center text-xl font-bold mr-6">Create Account</Text>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="px-6 pt-6">
            <Text className="text-3xl font-bold text-gray-900">Join Nazdeek</Text>
            <Text className="text-sm text-gray-500 mt-1 mb-6">
              Select your role and fill in the details below.
            </Text>

            <Text className="text-sm font-bold mb-2 text-gray-800">I want to join as:</Text>
            <View className="flex-row gap-3 mb-6">
              <TouchableOpacity 
                onPress={() => setRole('customer')}
                className={`flex-1 py-3.5 rounded-xl border items-center flex-row justify-center gap-2 ${
                  role === 'customer' 
                    ? 'bg-[#1a5ea1] border-[#1a5ea1]' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <Ionicons 
                  name="person-outline" 
                  size={18} 
                  color={role === 'customer' ? '#fff' : '#4b5563'} 
                />
                <Text className={`font-bold text-sm ${role === 'customer' ? 'text-white' : 'text-gray-700'}`}>
                  Customer
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => setRole('provider')}
                className={`flex-1 py-3.5 rounded-xl border items-center flex-row justify-center gap-2 ${
                  role === 'provider' 
                    ? 'bg-[#1a5ea1] border-[#1a5ea1]' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <Ionicons 
                  name="construct-outline" 
                  size={18} 
                  color={role === 'provider' ? '#fff' : '#4b5563'} 
                />
                <Text className={`font-bold text-sm ${role === 'provider' ? 'text-white' : 'text-gray-700'}`}>
                  Provider
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-bold mb-2 text-gray-800">Full Name</Text>
              <TextInput
                className="border border-gray-200 rounded-xl p-4 text-base bg-gray-50 text-gray-900"
                placeholder="John Doe"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-bold mb-2 text-gray-800">Email Address</Text>
              <TextInput
                className="border border-gray-200 rounded-xl p-4 text-base bg-gray-50 text-gray-900"
                placeholder="name@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-bold mb-2 text-gray-800">Contact Number</Text>
              <TextInput
                className="border border-gray-200 rounded-xl p-4 text-base bg-gray-50 text-gray-900"
                placeholder="03001234567"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-bold mb-2 text-gray-800">Address</Text>
              <TextInput
                className="border border-gray-200 rounded-xl p-4 text-base bg-gray-50 text-gray-900"
                placeholder="Enter residential or business address"
                value={address}
                onChangeText={setAddress}
              />
            </View>

            <View className="mb-8">
              <Text className="text-sm font-bold mb-2 text-gray-800">Password</Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 bg-gray-50">
                <TextInput
                  className="flex-1 py-4 text-base text-gray-900"
                  placeholder="Min 6 characters"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Ionicons 
                    name={isPasswordVisible ? "eye-outline" : "eye-off-outline"} 
                    size={22} 
                    color="#9ca3af" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              className="bg-[#1a5ea1] py-4 rounded-xl items-center shadow-sm"
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-bold text-base">Register as {role === 'provider' ? 'Provider' : 'Customer'}</Text>
              )}
            </TouchableOpacity>

            <View className="flex-row justify-center mt-8 mb-6">
              <Text className="text-gray-500 text-sm">Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text className="text-[#1a5ea1] font-bold text-sm">Login</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;