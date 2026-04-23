import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ViewDetailScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Gallery');
  
  const service = {
    title: 'Deep House Cleaning',
    address: '1012 Ocean Avenue, New York, USA',
    category: 'Home Cleaning',
    rating: 4.5,
    reviews: 365,
    price: 1500,
    mainImage: 'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
  };

  const TABS = ['About', 'Gallery', 'Review'];

  const galleryImages = [
    'https://images.pexels.com/photos/4886600/pexels-photo-4886600.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/6195122/pexels-photo-6195122.jpeg?auto=compress&cs=tinysrgb&w=600', 
    'https://images.pexels.com/photos/4099469/pexels-photo-4099469.jpeg?auto=compress&cs=tinysrgb&w=600'  
  ];

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      
      <View className="h-[380px] w-full relative bg-gray-200">
        <Image 
          source={{ uri: service.mainImage }} 
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
        <View className="absolute top-12 left-6 right-6">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="bg-white/80 w-11 h-11 rounded-full items-center justify-center shadow-md"
          >
            <Ionicons name="arrow-back" size={24} color="#1a5ea1" />
          </TouchableOpacity>
        </View>
      </View>

      
      <View className="flex-1 bg-white -mt-10 rounded-t-[40px] overflow-hidden">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
          <View className="px-6 pt-8">
            <View className="bg-blue-50 self-start px-4 py-1.5 rounded-full mb-4">
              <Text className="text-[#1a5ea1] font-bold text-xs uppercase">{service.category}</Text>
            </View>

            <Text className="text-gray-900 text-3xl font-extrabold mb-8 leading-tight">
              {service.title}
            </Text>

          
            <View className="flex-row border-b border-gray-100 mb-6">
              {TABS.map(tab => (
                <TouchableOpacity 
                  key={tab} 
                  onPress={() => setActiveTab(tab)}
                  className={`mr-8 pb-4 ${activeTab === tab ? 'border-b-4 border-[#1a5ea1]' : ''}`}
                >
                  <Text className={`text-base font-bold ${activeTab === tab ? 'text-[#1a5ea1]' : 'text-gray-400'}`}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

           
            {activeTab === 'About' && (
              <View>
                <Text className="text-gray-600 leading-7 text-base">
                  Professional deep cleaning for every corner of your home. We use eco-friendly products and advanced equipment to ensure a spotless, sanitized, and fresh living environment for you and your family.
                </Text>
              </View>
            )}

           
            {activeTab === 'Gallery' && (
              <View className="flex-row flex-wrap justify-between">
                {galleryImages.map((img, index) => (
                  <View key={index} className="w-[48%] h-32 bg-gray-100 rounded-3xl mb-4 overflow-hidden border border-gray-50 shadow-sm">
                    <Image source={{ uri: img }} className="w-full h-full" resizeMode="cover" />
                  </View>
                ))}
              </View>
            )}

            
            {activeTab === 'Review' && (
              <View className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
                <View className="flex-row items-center mb-2">
                  <Ionicons name="star" size={16} color="#fbbf24" />
                  <Text className="ml-2 font-bold text-gray-800">Excellent Work!</Text>
                </View>
                <Text className="text-gray-500 text-sm">"Cleaning was amazing! The team was punctual and did a perfect job. Highly recommended!"</Text>
                <Text className="text-[#1a5ea1] font-bold text-xs mt-3">- Malaika Noor</Text>
              </View>
            )}

          </View>
        </ScrollView>
      </View>

      
      <View className="absolute bottom-0 left-0 right-0 bg-white px-7 pt-5 pb-10 border-t border-gray-100 flex-row justify-between items-center shadow-2xl">
        <View>
          <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Total Price</Text>
          <Text className="text-[#1a5ea1] text-2xl font-extrabold">Rs.{service.price}</Text>
        </View>
        
        <TouchableOpacity 
          onPress={() => navigation.navigate('BookService')} 
          className="bg-[#1a5ea1] px-12 py-4 rounded-3xl shadow-lg shadow-blue-200"
        >
          <Text className="text-white text-lg font-bold">Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewDetailScreen;