import React from 'react';
import { View, ScrollView, StatusBar, Text } from 'react-native';
import HeaderCard from '../Cards/HeaderCard';
import { useContext } from 'react';
import {AuthContext} from '../context/AuthContext';

const HomeScreen = () => {
  const { userInfo } = useContext(AuthContext);

  return (
    <View className="flex-1 bg-white">
     
      <StatusBar barStyle="light-content" backgroundColor="#1a5ea1" />
      
      
      {/* <HeaderCard userName={userInfo.name } /> */}
      <HeaderCard userName={'hamza' } />

      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-6 pt-6">
          <Text className="text-gray-800 text-2xl font-bold mb-4">Categories</Text>
          
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;