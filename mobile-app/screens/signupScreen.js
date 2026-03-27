import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      
      <View className="px-6 pt-4 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-xl font-bold mr-6">Create Account</Text>
      </View>

      <View className="px-6 pt-10">
        <Text className="text-4xl font-bold text-gray-900">Join Nazdeek</Text>
        <Text className="text-lg text-gray-500 mt-2 mb-8">
          Fill in the details below to get started.
        </Text>

       
        <View className="mb-5">
          <Text className="text-sm font-bold mb-2 text-gray-800">Full Name</Text>
          <TextInput
            className="border border-gray-200 rounded-xl p-4 text-base bg-gray-50"
            placeholder="John Doe"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        
        <View className="mb-5">
          <Text className="text-sm font-bold mb-2 text-gray-800">Email</Text>
          <TextInput
            className="border border-gray-200 rounded-xl p-4 text-base bg-gray-50"
            placeholder="name@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

       
        <View className="mb-10">
          <Text className="text-sm font-bold mb-2 text-gray-800">Password</Text>
          <View className="flex-row items-center border border-gray-200 rounded-xl px-4 bg-gray-50">
            <TextInput
              className="flex-1 py-4 text-base"
              placeholder="Create a strong password"
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
          className="bg-[#006666] py-4 rounded-xl items-center shadow-sm"
          onPress={() => {
            console.log("Signing up...");
                     }}
        >
          <Text className="text-white text-lg font-bold">Sign Up</Text>
        </TouchableOpacity>

      
        <View className="flex-row justify-center mt-12">
          <Text className="text-gray-500 text-base">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-[#006666] font-bold text-base">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;