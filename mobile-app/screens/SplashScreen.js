import React, { useEffect, useRef, useContext } from 'react';
import { View, Text, StatusBar, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { getMe } from '../api/authApi';
import { handleProviderRouting } from '../Navigation/handleProviderRouting';

const SplashScreen = ({ navigation }) => {
  const { userToken, updateUserState } = useContext(AuthContext);
  const progressAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    const checkStatusAndNavigate = async () => {
      try {
        console.log(userToken);
        if (!userToken) {
          return navigation.replace('Login');
        }

        const data = await getMe();

        if (data && data.role) {
          if (updateUserState) {
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
            updateUserState(userObj);
          }

          if (data.role === 'customer') {
            return navigation.replace('AppTabs');
          }

          if (data.role === 'provider') {
            const verificationStatus = data.providerStatus || 'unsubmitted';
            const registrationFee = data.providerInfo?.registrationFee || 'unpaid';
            const isRegistrationFree = data.isRegistrationFree ?? false;

            return handleProviderRouting(
              navigation, 
              verificationStatus, 
              registrationFee, 
              isRegistrationFree
            );
          }
        }

        navigation.replace('Login');
      } catch (error) {
        navigation.replace('Login');
      }
    };

    const timer = setTimeout(() => {
      checkStatusAndNavigate();
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, userToken]);

  const progressWidth = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View className="flex-1 bg-[#0a2f5c] items-center justify-center px-6">
      <StatusBar barStyle="light-content" backgroundColor="#0a2f5c" />
      
      <View className="flex-1 items-center justify-center">
        <View className="flex-row items-center justify-center">
          <Text className="text-white text-5xl font-extrabold tracking-tighter">N</Text>
          <View className="mx-[-1px]" style={{ transform: [{ scaleY: 1.25 }] }}>
            <Ionicons name="location" size={32} color="white" />
          </View>
          <Text className="text-white text-5xl font-extrabold tracking-tighter">ZDEEK</Text>
        </View>

        <Text className="text-gray-300 text-xs font-medium mt-3 tracking-widest uppercase">
          Your Local Service Expert
        </Text>
      </View>

      <View className="absolute bottom-28 w-44 items-center">
        <Text className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2.5">
          Loading...
        </Text>
        <View className="w-full h-[3px] bg-[#1a4373] rounded-full overflow-hidden">
          <Animated.View 
            className="h-full bg-white rounded-full" 
            style={{ width: progressWidth }} 
          />
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;