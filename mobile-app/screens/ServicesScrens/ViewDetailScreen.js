import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ViewDetailScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('About');
  
  const service = {
    title: 'Deep House Cleaning',
    address: '1012 Ocean Avenue, New York, USA',
    category: 'Home Cleaning',
    rating: 4.5,
    reviews: 365,
    price: 1500,
    mainImage: 'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
    provider: {
      name: 'Zayaan Khan',
      role: 'Service Provider',
      area: 'Mandi Bahauddin', 
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
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

            <Text className="text-gray-900 text-xl font-extrabold mb-8 leading-tight">
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
                <Text className="text-gray-900 font-bold text-lg mb-2">About Service</Text>
                <Text className="text-gray-500 leading-6 text-sm mb-8">
                  Professional deep cleaning for every corner of your home. We use eco-friendly products and advanced equipment to ensure a spotless environment.
                </Text>

                <Text className="text-gray-900 font-bold text-lg mb-4">Service Provider</Text>
                <View className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
                  <View className="flex-row items-center justify-between mb-4">
                    <View className="flex-row items-center">
                      <Image 
                        source={{ uri: service.provider.image }} 
                        className="w-14 h-14 rounded-full mr-4 border-2 border-white"
                      />
                      <View>
                        <Text className="text-gray-900 font-bold text-base">{service.provider.name}</Text>
                        <View className="flex-row items-center mt-0.5">
                          <Ionicons name="location-sharp" size={12} color="#9ca3af" />
                          <Text className="text-gray-400 text-xs ml-1 font-medium">{service.provider.area}</Text>
                        </View>
                      </View>
                    </View>
                    
                    <TouchableOpacity 
                      className="bg-white w-10 h-10 rounded-full items-center justify-center shadow-sm border border-gray-100"
                      onPress={() => console.log("Open Chat")}
                    >
                      <Ionicons name="chatbubble-ellipses-outline" size={20} color="#1a5ea1" />
                    </TouchableOpacity>
                  </View>

                  {/* UPDATE: Yahan Provider Profile ka link add kar diya hai */}
                  <TouchableOpacity 
                    className="bg-[#1a5ea1]/10 py-2.5 rounded-xl items-center border border-[#1a5ea1]/20"
                    onPress={() => navigation.navigate('ProviderProfile')}
                  >
                    <Text className="text-[#1a5ea1] font-bold text-xs">View Provider</Text>
                  </TouchableOpacity>
                </View>
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
                <Text className="text-gray-500 text-sm">"Cleaning was amazing! Highly recommended!"</Text>
                <Text className="text-[#1a5ea1] font-bold text-xs mt-3">- Malaika Noor</Text>
              </View>
            )}

          </View>
        </ScrollView>
      </View>

      <View className="absolute bottom-0 left-0 right-0 bg-white px-7 pt-5 pb-10 border-t border-gray-100 flex-row justify-between items-center shadow-2xl">
        <View>
          <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Total Price</Text>
          <Text className="text-[#1a5ea1] text-xl font-extrabold">Rs. {service.price}</Text>
        </View>
        
        <TouchableOpacity 
          onPress={() => navigation.navigate('BookService')} 
          className="bg-[#1a5ea1] px-10 py-3 rounded-full shadow-lg shadow-blue-200"
        >
          <Text className="text-white text-lg font-bold">Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewDetailScreen;