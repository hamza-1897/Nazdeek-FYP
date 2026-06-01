import React from 'react';
import { View, Text, TextInput, ActivityIndicator,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState  } from 'react';
import { verifySignupOTP , verifyForgotOTP } from '../api/authApi';

const VerifyOTP = ({ navigation, route }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const email = route.params.email;
  const password = route.params?.password;
  const flow = route.params.flow; 


const checkOtp = () => {
  if(otp.length !== 6){
    alert("Please enter a valid 6-digit OTP.");
    return false;
  }
  alert(`OTP entered: ${otp}`);
  return true;
}


const handleVerifyOTP = async () => {

  if(otp.length !== 6){
    alert("Please enter a valid 6-digit OTP.");
    return false;
  }
 
 const code = parseInt(otp, 10);
  setLoading(true);
  try {


    if(flow === 'signup'){
      const data = await verifySignupOTP( email,code, password );
      alert(data.message)
      navigation.replace('Login');
    }
    else if(flow === 'forgotPassword'){
      const data = await verifyForgotOTP( email,code);
      alert(data.message)
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
    <View className="flex-1 bg-white px-6 pt-12">
     
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-6">
        <Ionicons name="chevron-back" size={28} color="black" />
      </TouchableOpacity>
      
      <Text className="text-center text-xl font-semibold mb-10">Verify OTP</Text>

      
      <View className="items-center mb-8">
        <View className="bg-[#e8f0f7] p-6 rounded-2xl">
          <Ionicons name="shield-checkmark-outline" size={50} color="#1a5ea1" />
        </View>
      </View>

      
      <Text className="text-3xl font-bold text-center mb-3">Verification</Text>
      <Text className="text-gray-500 text-center px-6 mb-10">
        Please enter the 6-digit code sent to your email.
      </Text>

     
      <View className="flex-row justify-between px-4 mb-12">
        
          <View className=" flex w-[290px] h-16 bg-[#F3F4F6] border border-gray-200 rounded-2xl items-center justify-center">
            <TextInput 
            
              maxLength={6}
              keyboardType="number-pad"
              className="text-2xl font-bold items-center justify-center text-center w-full"
              placeholder="_ _ _ _ _ _"
              value={otp}
              onChangeText={setOtp}
            />
          </View>
        
      </View>

      
      <TouchableOpacity className="bg-[#1a5ea1] py-4 rounded-3xl shadow-lg flex-row justify-center items-center"
      onPress={()=>{
      // checkOtp(otp)
       handleVerifyOTP()
      }}
      >
         {loading ? <ActivityIndicator color="#fff" /> :  <Text className="text-white font-bold text-lg mr-2">Verify</Text> }
        
      </TouchableOpacity>

      
      <View className="mt-8 flex-row justify-center">
        <Text className="text-gray-500">Didn't receive code? </Text>
        <TouchableOpacity>
          <Text className="text-[#1a5ea1] font-bold">Resend</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyOTP;