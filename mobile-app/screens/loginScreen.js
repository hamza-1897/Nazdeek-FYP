import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ProviderTabNavigator } from '../Navigation/ProviderTabNavigator';

import { AuthContext } from '../context/AuthContext';
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
          profileImage: data.profileImage || null,
          providerInfo: data.providerInfo || null,
          providerStatus: data.providerStatus || data.providerInfo?.verificationStatus || 'unsubmitted'
        };

        await login(data.accessToken, userObj);

        if (data.role === 'provider') {
          const status = userObj.providerStatus;

          if (status === 'unsubmitted') {
            navigation.replace('ProviderSetup');
          } else if (status === 'pending') {
            navigation.replace('PendingApproval');
          } else if (status === 'approved') {
            navigation.replace('ProviderTabNavigator');
          } else {
            navigation.replace('ProviderSetup');
          }
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
      <View className="px-6 pt-12">
        
        <Text className="text-4xl font-bold text-[#1a5ea1] text-center italic mb-10">
          Nazdeek
        </Text>
        
        <Text className="text-3xl font-bold text-center text-gray-800">
          Welcome back!
        </Text>
        <Text className="text-base text-center text-gray-500 mb-8">
          Log in to your account to continue
        </Text>

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

        <TouchableOpacity 
          className="self-end mb-8"
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text className="text-[#1a5ea1] underline font-bold">Forgot Password?</Text>
        </TouchableOpacity>

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


        <View className="flex-row justify-center mt-20">
          <Text className="text-gray-500">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text className="text-[#1a5ea1] font-bold">Sign up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;