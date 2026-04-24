import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const BookServiceScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      

      <View className="px-6 py-4 flex-row items-center relative">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="w-11 h-11 border border-gray-100 rounded-full items-center justify-center absolute left-6 z-10 bg-white"
        >
          <Ionicons name="arrow-back" size={24} color="#1a5ea1" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="text-xl font-bold text-gray-800">Book Services</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-5">
        <Text className="text-lg font-bold text-gray-800 mb-6">Customer Information</Text>

        <View className="gap-y-6">
          
          
          <View>
            <Text className="text-gray-500 font-semibold mb-2 ml-1">Name</Text>
            <TextInput 
              placeholder="Enter your name" 
              className="bg-gray-50 border border-gray-100 p-4 rounded-2xl text-gray-800 text-base" 
            />
          </View>

          
          <View>
            <Text className="text-gray-500 font-semibold mb-2 ml-1">Phone Number</Text>
            <View className="flex-row space-x-3">
              <View className="bg-gray-50 border border-gray-100 px-4 rounded-2xl flex-row items-center">
                <Text className="text-gray-800 font-medium">+92</Text>
              </View>
              <TextInput 
                placeholder="300 1234567" 
                keyboardType="phone-pad" 
                className="flex-1 bg-gray-50 border border-gray-100 p-4 rounded-2xl text-gray-800 text-base" 
              />
            </View>
          </View>

          
          <View>
            <Text className="text-gray-500 font-semibold mb-2 ml-1">Address</Text>
            <View className="bg-gray-50 border border-gray-100 flex-row items-center px-4 rounded-2xl">
              <Ionicons name="location-outline" size={20} color="#1a5ea1" />
              <TextInput 
                placeholder="Enter your street address" 
                className="flex-1 p-4 text-gray-800 text-base"
                multiline={false}
              />
            </View>
          </View>

          
          <View>
            <Text className="text-gray-500 font-semibold mb-2 ml-1">Request Detail</Text>
            <TextInput 
              placeholder="Tell us more about your service request..."
              multiline={true} 
              numberOfLines={5} 
              textAlignVertical="top" 
              className="bg-gray-50 border border-gray-100 p-4 rounded-3xl text-gray-800 h-40 text-base" 
            />
          </View>
        </View>
        
        <View className="h-32" />
      </ScrollView>

      
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-10 pt-5 bg-white border-t border-gray-50">
        <TouchableOpacity 
          onPress={() => navigation.navigate('BookingSuccess')}
          className="bg-[#1a5ea1] py-4 rounded-3xl items-center shadow-lg shadow-blue-300"
        >
          <Text className="text-white text-lg font-bold">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BookServiceScreen;