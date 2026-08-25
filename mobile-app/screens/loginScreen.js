import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AuthContext } from '../context/AuthContext';
import { handleProviderRouting } from '../Navigation/handleProviderRouting';
import { userLogin } from '../api/authApi';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Error', 'Please enter email and password.');
      return;
    }

    setLoading(true);
    try {
      const data = await userLogin(email, password);
      console.log("Login successful:", data);

      if (data.accessToken) {
        const userObj = {
          id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
          phone: data.phone,
          address: data.address,
          profileImage: data.profileImage || null,
          providerInfo: data.providerInfo || null,
          providerStatus: data.providerStatus || data.providerInfo?.verificationStatus || 'unsubmitted',
          accountRejectionReason: data.providerInfo?.accountRejectionReason || null
        };

        await login(data.accessToken, userObj);

        if (data.role === 'provider') {
          const verificationStatus = data.providerStatus || 'unsubmitted';
          const registrationFee = data.providerInfo?.registrationFee || 'unpaid';
          const isRegistrationFree = data.isRegistrationFree ?? false;

          handleProviderRouting(navigation, verificationStatus, registrationFee, isRegistrationFree);
        } else {
          navigation.replace('AppTabs');
        }
      }
    } catch (error) {
      console.log("Login error:", error);
      Alert.alert("Login Failed", error.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} 
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View className="px-6 py-6">
              <Text className="text-4xl font-bold text-[#1a5ea1] text-center italic mb-10">
                Nazdeek
              </Text>
              
              <Text className="text-3xl font-bold text-center text-gray-800">
                Welcome back!
              </Text>
              <Text className="text-base text-center text-gray-500 mb-8">
                Log in to your account to continue
              </Text>

              {/* Email Input */}
              <View className="mb-5">
                <Text className="text-sm font-bold mb-2 text-gray-800">Email</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3 text-base text-gray-900 bg-gray-50"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password Input */}
              <View className="mb-5">
                <Text className="text-sm font-bold mb-2 text-gray-800">Password</Text>
                <View className="flex-row items-center border border-gray-300 rounded-lg pr-4 bg-gray-50">
                  <TextInput
                    className="flex-1 p-3 text-base text-gray-900"
                    placeholder="Enter password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}
                  />
                  <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <Ionicons 
                      name={isPasswordVisible ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color="gray" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Forgot Password Link */}
              <TouchableOpacity 
                className="self-end mb-8"
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text className="text-[#1a5ea1] underline font-bold">Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity 
                className="bg-[#1a5ea1] p-4 rounded-lg items-center mb-4 flex-row justify-center"
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white text-lg font-bold">Login</Text>
                )}
              </TouchableOpacity>

              {/* Signup Link */}
              <View className="flex-row justify-center mt-12">
                <Text className="text-gray-500">Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text className="text-[#1a5ea1] font-bold">Sign up</Text>
                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;