import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind'; // Nativewind classes handle karne ke liye

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-12">
        
       
        <Text className="text-4xl font-bold text-[#006666] text-center italic mb-10">
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
            className="border border-gray-300 rounded-lg p-3 text-base"
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
        </View>

      
        <View className="mb-5">
          <Text className="text-sm font-bold mb-2 text-gray-800">Password</Text>
          <View className="flex-row items-center border border-gray-300 rounded-lg pr-4">
            <TextInput
              className="flex-1 p-3 text-base"
              placeholder="Enter password"
              value={password}
              onChangeText={(text) => setPassword(text)}
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

       
        <TouchableOpacity className="self-end mb-8">
          <Text className="text-[#006666] underline">Forgot Password?</Text>
        </TouchableOpacity>

       
        <TouchableOpacity 
          className="bg-[#006666] p-4 rounded-lg items-center mb-4"
          onPress={() => navigation.navigate('Home')}
        >
          <Text className="text-white text-lg font-bold">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border-2 border-[#006666] p-4 rounded-lg items-center">
          <Text className="text-[#006666] text-lg font-bold">Continue as Guest</Text>
        </TouchableOpacity>

       
        <View className="flex-row justify-center mt-24">
          <Text className="text-gray-500">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text className="text-[#006666] font-bold">Sign up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;