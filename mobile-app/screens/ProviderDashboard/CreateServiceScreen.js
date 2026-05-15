import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CreateServiceScreen = ({ navigation }) => {
  
  const [category, setCategory] = useState('Select Category');
  const [isCatOpen, setIsCatOpen] = useState(false);
  
  const [duration, setDuration] = useState('Select Duration');
  const [isDurOpen, setIsDurOpen] = useState(false);

  const categories = ['Plumber', 'Electrician', 'Cleaning', 'Carpenter'];
  const durations = ['30 min', '1 hour', '2 hours', 'Full day'];

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
     
      <View className="px-6 py-4 flex-row items-center justify-between mt-8">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Create service</Text>
        <View className="w-6" /> 
      </View>

      <ScrollView className="flex-1 px-6 mt-4" showsVerticalScrollIndicator={false}>
        
       
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Service title</Text>
          <TextInput 
            placeholder="e.g. Deep House Cleaning"
            className="border-b border-gray-200 py-2 text-base text-gray-900"
            placeholderTextColor="#9ca3af"
          />
        </View>

       
        <View className="mb-6 z-50">
          <Text className="text-gray-700 font-medium mb-2">Category</Text>
          <TouchableOpacity 
            onPress={() => { setIsCatOpen(!isCatOpen); setIsDurOpen(false); }}
            className="flex-row justify-between items-center border-b border-gray-200 py-2"
          >
            <Text className={category === 'Select Category' ? "text-gray-400 text-base" : "text-gray-900 text-base"}>
              {category}
            </Text>
            <Ionicons name={isCatOpen ? "chevron-up" : "chevron-down"} size={18} color="black" />
          </TouchableOpacity>

         
          {isCatOpen && (
            <View className="bg-gray-50 rounded-xl mt-1 shadow-sm border border-gray-100 overflow-hidden">
              {categories.map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  onPress={() => { setCategory(item); setIsCatOpen(false); }}
                  className="p-4 border-b border-gray-100 active:bg-blue-50"
                >
                  <Text className="text-gray-800">{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

       
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Description</Text>
          <TextInput 
            placeholder="Describe what's included..."
            multiline
            className="border-b border-gray-200 py-2 text-base text-gray-900"
            placeholderTextColor="#9ca3af"
          />
        </View>

        
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Base price (Rs)</Text>
          <TextInput 
            placeholder="2000"
            keyboardType="numeric"
            className="border-b border-gray-200 py-2 text-base text-gray-900"
            placeholderTextColor="#9ca3af"
          />
        </View>

       
        <View className="mb-6 z-40">
          <Text className="text-gray-700 font-medium mb-2">Duration</Text>
          <TouchableOpacity 
            onPress={() => { setIsDurOpen(!isDurOpen); setIsCatOpen(false); }}
            className="flex-row justify-between items-center border-b border-gray-200 py-2"
          >
            <Text className={duration === 'Select Duration' ? "text-gray-400 text-base" : "text-gray-900 text-base"}>
              {duration}
            </Text>
            <Ionicons name={isDurOpen ? "chevron-up" : "chevron-down"} size={18} color="black" />
          </TouchableOpacity>

          
          {isDurOpen && (
            <View className="bg-gray-50 rounded-xl mt-1 shadow-sm border border-gray-100 overflow-hidden">
              {durations.map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  onPress={() => { setDuration(item); setIsDurOpen(false); }}
                  className="p-4 border-b border-gray-100 active:bg-blue-50"
                >
                  <Text className="text-gray-800">{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

       
        <View className="mb-10">
          <Text className="text-gray-700 font-medium mb-2">Service area / city</Text>
          <TextInput 
            placeholder="e.g. Lahore"
            className="border-b border-gray-200 py-2 text-base text-gray-900"
            placeholderTextColor="#9ca3af"
          />
        </View>

        
        <TouchableOpacity 
          className="bg-[#1a5ea1] py-4 rounded-xl items-center mb-10 shadow-sm"
          onPress={() => alert('Service Published!')}
        >
          <Text className="text-white font-bold text-base">Publish service</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default CreateServiceScreen;