import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const BookServiceScreen = ({ navigation }) => {
  const [gender, setGender] = useState('Select Gender');
  const [modalVisible, setModalVisible] = useState(false);

  const genderOptions = ['Male', 'Female'];

  const selectGender = (item) => {
    setGender(item);
    setModalVisible(false);
  };

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
            <TextInput placeholder="Enter your name" className="bg-gray-50 border border-gray-100 p-4 rounded-2xl text-gray-800 text-base" />
          </View>

          <View>
            <Text className="text-gray-500 font-semibold mb-2 ml-1">Email</Text>
            <TextInput placeholder="example@gmail.com" keyboardType="email-address" className="bg-gray-50 border border-gray-100 p-4 rounded-2xl text-gray-800 text-base" />
          </View>

          
          <View>
            <Text className="text-gray-500 font-semibold mb-2 ml-1">Gender</Text>
            <TouchableOpacity 
              onPress={() => setModalVisible(true)}
              className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex-row justify-between items-center"
            >
              <Text className={gender === 'Select Gender' ? "text-gray-400 text-base" : "text-gray-800 text-base"}>
                {gender}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#1a5ea1" />
            </TouchableOpacity>
          </View>

         
          <View>
            <Text className="text-gray-500 font-semibold mb-2 ml-1">Phone Number</Text>
            <View className="flex-row space-x-3">
              <View className="bg-gray-50 border border-gray-100 px-4 rounded-2xl flex-row items-center">
                <Text className="text-gray-800 font-medium">+92</Text>
              </View>
              <TextInput placeholder="300 1234567" keyboardType="phone-pad" className="flex-1 bg-gray-50 border border-gray-100 p-4 rounded-2xl text-gray-800 text-base" />
            </View>
          </View>

          <View>
            <Text className="text-gray-500 font-semibold mb-2 ml-1">Description</Text>
            <TextInput multiline={true} numberOfLines={5} textAlignVertical="top" className="bg-gray-50 border border-gray-100 p-4 rounded-3xl text-gray-800 h-40 text-base" />
          </View>
        </View>
        <View className="h-32" />
      </ScrollView>

      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-[40px] p-8 pb-12">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-gray-800">Select Gender</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close-circle" size={30} color="#cbd5e1" />
              </TouchableOpacity>
            </View>
            
            {genderOptions.map((item) => (
              <TouchableOpacity 
                key={item}
                onPress={() => selectGender(item)}
                className="py-4 border-b border-gray-50 flex-row justify-between items-center"
              >
                <Text className="text-lg text-gray-700">{item}</Text>
                {gender === item && <Ionicons name="checkmark-circle" size={24} color="#1a5ea1" />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      
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