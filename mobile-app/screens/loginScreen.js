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
      console.log("Login successful response:", data);

      const token = data?.accessToken;
  const refreshToken = data?.refreshToken;

      if (token) {
        const userObj = {
          id: data._id || data.id,
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

        await login(token, refreshToken, userObj);

        await new Promise((resolve) => setTimeout(resolve, 100));

        if (data.role === 'provider') {
          const verificationStatus = data.providerStatus || 'unsubmitted';
          const registrationFee = data.providerInfo?.registrationFee || 'unpaid';
          const isRegistrationFree = data.isRegistrationFree ?? false;

          handleProviderRouting(navigation, verificationStatus, registrationFee, isRegistrationFree);
        } else {
          navigation.replace('AppTabs');
        }
      } else {
        Alert.alert("Login Failed", "AccessToken missing in server response.");
      }
    } catch (error) {
      console.log("Login error:", error);
      Alert.alert("Login Failed", error.message || "Invalid email or password.");
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
        <ScrollView 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="px-6 pt-10 pb-6 justify-center flex-1">
              
              <Text className="text-4xl font-extrabold text-[#1a5ea1] text-center italic mb-8">
                Nazdeek
              </Text>
              
              <Text className="text-3xl font-bold text-gray-900">
                Welcome back!
              </Text>
              <Text className="text-sm text-gray-500 mt-1 mb-8">
                Log in to your account to continue
              </Text>

              <View className="mb-4">
                <Text className="text-sm font-bold mb-2 text-gray-800">Email Address</Text>
                <TextInput
                  className="border border-gray-200 rounded-xl p-4 text-base bg-gray-50 text-gray-900"
                  placeholder="name@example.com"
                  placeholderTextColor="#9ca3af" 
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View className="mb-2">
                <Text className="text-sm font-bold mb-2 text-gray-800">Password</Text>
                <View className="flex-row items-center border border-gray-200 rounded-xl px-4 bg-gray-50">
                  <TextInput
                    className="flex-1 py-4 text-base text-gray-900"
                    placeholder="Enter password"
                    placeholderTextColor="#9ca3af"
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
                className="self-end mb-8"
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text className="text-[#1a5ea1] font-bold text-sm">Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                className="bg-[#1a5ea1] py-4 rounded-xl items-center shadow-sm"
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white font-bold text-base">Login</Text>
                )}
              </TouchableOpacity>

              <View className="flex-row justify-center mt-8 mb-6">
                <Text className="text-gray-500 text-sm">Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text className="text-[#1a5ea1] font-bold text-sm">Sign up</Text>
                </TouchableOpacity>
              </View>

            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;