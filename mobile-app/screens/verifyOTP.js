import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { verifySignupOTP, verifyForgotOTP } from '../api/authApi';

const VerifyOTP = ({ navigation, route }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120);
  const [isResendActive, setIsResendActive] = useState(false);

  const email = route.params.email;
  const password = route.params?.password;
  const flow = route.params.flow; 
  const phone = route.params?.phone;
  const role = route.params?.role;

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendActive(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOTP = () => {
    if (!isResendActive) return;
    setTimer(120);
    setIsResendActive(false);
    alert("OTP has been resent to your email.");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins} : ${secs < 10 ? '0' : ''}${secs}`;
  };

  const checkOtp = () => {
    if(code.length !== 6){
      alert("Please enter a valid 6-digit OTP.");
      return false;
    }
    alert(`OTP entered: ${code}`);
    return true;
  }

  const handleVerifyOTP = async () => {
    if(code.length !== 6){
      alert("Please enter a valid 6-digit OTP.");
      return false;
    }
   
    const otp = parseInt(code, 10);
    setLoading(true);
    try {
      if(flow === 'signup'){
        const data = await verifySignupOTP(
          email,
          otp,
          password,
          phone,
          role
        );
        alert(data.message);
        navigation.replace('Login');
      }
      else if(flow === 'forgotPassword'){
        const data = await verifyForgotOTP(email, otp);
        alert(data.message);
        navigation.navigate('ResetPassword', { email });
      }
    } catch (error) {
      console.log("OTP Verification error:", error);
      alert(error.message || "OTP verification failed. Please try again.");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-5 pt-6" showsVerticalScrollIndicator={false}>
      
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4 pt-2">
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      
      <Text className="text-center text-lg font-semibold mb-6">Verify OTP</Text>

      <View className="items-center mb-5">
        <View className="bg-[#e8f0f7] p-4 rounded-2xl">
          <Ionicons name="shield-checkmark-outline" size={38} color="#1a5ea1" />
        </View>
      </View>

      <Text className="text-2xl font-bold text-center mb-2">Verification</Text>
      <Text className="text-gray-500 text-xs text-center px-4 mb-6">
        Please enter the 6-digit code sent to your email.
      </Text>

      <View className="items-center mb-6">
        <View className="w-full max-w-[280px] h-12 bg-[#F3F4F6] border border-gray-200 rounded-xl items-center justify-center">
          <TextInput 
            maxLength={6}
            keyboardType="number-pad"
            className="text-xl font-bold text-center w-full"
            placeholder="_ _ _ _ _ _"
            value={code}
            onChangeText={setCode}
          />
        </View>
      </View>

      <TouchableOpacity 
        className="bg-[#1a5ea1] py-3 rounded-2xl shadow flex-row justify-center items-center mb-6"
        onPress={() => handleVerifyOTP()}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-bold text-base">Verify</Text>}
      </TouchableOpacity>

      <View className="items-center pb-8">
        <Text className="text-[#1a5ea1] font-bold text-base mb-2">
          {formatTime(timer)}
        </Text>

        <TouchableOpacity 
          onPress={handleResendOTP}
          disabled={!isResendActive}
          className={`flex-row items-center justify-center w-full py-2.5 rounded-xl border ${isResendActive ? 'border-[#1a5ea1] bg-white' : 'border-gray-200 bg-gray-50'}`}
        >
          <Ionicons name="time-outline" size={18} color={isResendActive ? "#1a5ea1" : "#9ca3af"} style={{ marginRight: 6 }} />
          <Text className={`font-semibold text-sm ${isResendActive ? 'text-[#1a5ea1]' : 'text-gray-400'}`}>
            Resend OTP
          </Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

export default VerifyOTP;