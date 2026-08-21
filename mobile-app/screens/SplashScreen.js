import React, { useEffect, useRef, useContext } from 'react';
import { View, Text, StatusBar, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

const SplashScreen = ({ navigation }) => {
  const { userToken, isLoading } = useContext(AuthContext);
  const progressAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => {
      if (!isLoading) {
        if (userToken) {
          navigation.replace('AppTabs'); 
        } else {
          navigation.replace('Login');
        }
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, userToken, isLoading]);

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