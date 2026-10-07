import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { resetPassword } from '../api/authApi';

const RuleItem = ({ isValid, label }) => (
  <View className="flex-row items-center gap-2 my-0.5">
    <Ionicons 
      name={isValid ? "checkmark-circle" : "ellipse-outline"} 
      size={16} 
      color={isValid ? "#16a34a" : "#9ca3af"} 
    />
    <Text className={`text-xs ${isValid ? "text-green-700 font-semibold" : "text-gray-500"}`}>
      {label}
    </Text>
  </View>
);

const ResetPassword = ({ navigation, route }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const getPasswordRules = (pwd = '') => {
    return {
      hasMinLength: pwd.length >= 8,
      hasUpper: /[A-Z]/.test(pwd),
      hasLower: /[a-z]/.test(pwd),
      hasNumber: /[0-9]/.test(pwd),
    };
  };

  const passwordRules = getPasswordRules(newPassword);
  const isPasswordValid = 
    passwordRules.hasMinLength && 
    passwordRules.hasUpper && 
    passwordRules.hasLower && 
    passwordRules.hasNumber;

  const handleResetPassword = async () => {
    if (!newPassword) {
      Alert.alert("Error", "Please enter a new password.");
      return;
    }

    if (!isPasswordValid) {
      Alert.alert("Weak Password", "Please fulfill all password requirements.");
      return;
    }

    try {
      const data = await resetPassword(route?.params?.email, newPassword);
      Alert.alert("Success", data?.message || "Password reset successfully.");
      navigation.replace('Login');
    } catch (error) {
      console.log("Reset Password error:", error);
      Alert.alert("Error", error?.message || "Failed to reset password. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-6" contentContainerStyle={{ flexGrow: 1 }}>
        
        <View className="mt-8 flex-row items-center justify-between">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">Reset Password</Text>
          <View style={{ width: 26 }} />
        </View>

        <View className="mt-12">
          <Text className="text-4xl font-bold text-gray-900">New Password</Text>
          <Text className="text-lg text-gray-500 mt-2 mb-10">
            Create a strong password to secure your account and protect your data.
          </Text>

          <View className="space-y-6">
            <View>
              <Text className="text-sm font-bold mb-2 text-gray-800">New Password</Text>
              <View className="flex-row items-center border border-gray-200 rounded-2xl px-4 bg-gray-50">
                <TextInput 
                  className="flex-1 py-4 text-base text-gray-900" 
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholderTextColor="#9ca3af"
                  placeholder="Enter new password"
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
          </View>

          <View className="mt-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <Text className="text-xs font-bold text-gray-500 mb-2">
              PASSWORD MUST CONTAIN:
            </Text>

            <RuleItem isValid={passwordRules.hasMinLength} label="At least 8 characters" />
            <RuleItem isValid={passwordRules.hasUpper} label="One uppercase letter (A-Z)" />
            <RuleItem isValid={passwordRules.hasLower} label="One lowercase letter (a-z)" />
            <RuleItem isValid={passwordRules.hasNumber} label="One number (0-9)" />
          </View>

          <TouchableOpacity 
            disabled={!isPasswordValid}
            className={`py-4 rounded-2xl items-center shadow-md mt-10 ${
              isPasswordValid ? 'bg-[#1a5ea1]' : 'bg-gray-300'
            }`}
            onPress={handleResetPassword}
          >
            <Text className="text-white text-lg font-bold">Reset Password</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;