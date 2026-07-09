import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator,ScrollView, StatusBar, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useFocusEffect} from '@react-navigation/native';
import {getServiceById} from '../../api/customerApi';

const { width } = Dimensions.get('window');

const ViewDetailScreen = ({ route, navigation }) => {
  const { serviceId } = route.params; 
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('About');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const service = {
    title: 'Deep House Cleaning',
    category: 'Home Cleaning',
    rating: 4.5,
    reviews: 365,
    price: 1500,
    serviceImages: [
      'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/4886600/pexels-photo-4886600.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/6195122/pexels-photo-6195122.jpeg?auto=compress&cs=tinysrgb&w=600'
    ], 
    provider: {
      name: 'Zayaan Khan',
      businessName: 'Zayaan Cleaning Services',
      area: 'Mandi Bahauddin', 
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  };


  useFocusEffect(
    useCallback(() => {
      fetchServiceDetails();
    }
, [serviceId])
  );

  const fetchServiceDetails = async () => {
    setLoading(true);
    try {
      const response = await getServiceById(serviceId);
      setServiceData(response.data);
      console.log("Fetched service details:", response.data);
    }
    catch (error) {
      console.error("Error fetching service details:", error);
    }
    finally {
      setLoading(false);
    }
  };

  const TABS = ['About', 'Review'];

  const handleScroll = (event) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    if (slide !== activeImageIndex) {
      setActiveImageIndex(slide);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#1a5ea1" />
      </View>
    );
  }

  if (!serviceData) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500">Service details could not be loaded.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <View className="h-[360px] w-full relative bg-gray-200">
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {serviceData.serviceImages.map((imgUri, index) => (
            <Image 
              key={index}
              source={{ uri: imgUri }} 
              style={{ width: width, height: '100%' }}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        <View className="absolute top-12 left-6">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="bg-white/90 w-11 h-11 rounded-full items-center justify-center shadow-lg"
          >
            <Ionicons name="arrow-back" size={24} color="#1a5ea1" />
          </TouchableOpacity>
        </View>

        <View className="absolute bottom-14 left-0 right-0 flex-row justify-center space-x-1.5">
          {serviceData.serviceImages.map((_, index) => (
            <View 
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${activeImageIndex === index ? 'w-5 bg-[#1a5ea1]' : 'w-2 bg-white/60'}`}
            />
          ))}
        </View>
      </View>

      <View className="flex-1 bg-white -mt-10 rounded-t-[36px] shadow-2xl overflow-hidden">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
          <View className="px-6 pt-6">
            
            <View className="flex-row justify-between items-center mb-3">
              <View className="bg-blue-50 px-3 py-1 rounded-lg">
                <Text className="text-[#1a5ea1] font-bold text-xs uppercase tracking-wider">{service.category}</Text>
              </View>
              <View className="flex-row items-center bg-amber-50 px-2.5 py-1 rounded-lg">
                <Ionicons name="star" size={14} color="#fbbf24" />
                <Text className="text-amber-700 font-bold text-xs ml-1">{service.rating}</Text>
                <Text className="text-gray-400 text-xs font-medium"> ({service.reviews})</Text>
              </View>
            </View>

            <Text className="text-gray-900 text-2xl font-extrabold mb-5 leading-snug">
              {serviceData.serviceName}
            </Text>

            <View className="flex-row border-b border-gray-100 mb-5">
              {TABS.map(tab => (
                <TouchableOpacity 
                  key={tab} 
                  onPress={() => setActiveTab(tab)}
                  className="mr-8 pb-3 relative"
                >
                  <Text className={`text-base font-bold ${activeTab === tab ? 'text-[#1a5ea1]' : 'text-gray-400'}`}>
                    {tab}
                  </Text>
                  {activeTab === tab && (
                    <View className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1a5ea1] rounded-full" />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {activeTab === 'About' && (
              <View>
                <Text className="text-gray-900 font-bold text-base mb-2">About Service</Text>
                <Text className="text-gray-500 leading-6 text-sm mb-6">
                  {serviceData.description || "No description available for this service."}
                </Text>

              {/* Provider Card */}
{/* Provider Card - Premium Vertical Layout */}
<Text className="text-gray-900 font-bold text-base mb-3">Service Provider</Text>
<View className="bg-white p-5 rounded-3xl border border-gray-100 shadow-md shadow-gray-100/60">
  
  <View className="flex-row items-center mb-4">
    <View className="relative">
      <Image 
        source={{ uri: serviceData.providerId.image || 'https://images.unsplash.com/photo-1581578731522-30d8d067469a?q=80&w=500' }} 
        className="w-14 h-14 rounded-2xl border border-gray-100"
        resizeMode="cover"
      />
        </View>
    
    <View className="ml-4 flex-1">
      <Text className="text-gray-900 font-extrabold text-base tracking-wide" numberOfLines={1}>
        {serviceData.providerId.businessName}
      </Text>
      <Text className="text-[#1a5ea1] text-xs font-semibold mt-0.5">
        Verified Expert Partner
      </Text>
    </View>
  </View>

  {/* Row 2: Full Width Address Area */}
  <View className="flex-row items-center bg-gray-50 px-3 py-2.5 rounded-xl border border-gray-100/50 mb-4">
    <Ionicons name="location-sharp" size={15} color="#1a5ea1" />
    <Text className="text-gray-600 text-xs ml-2 font-medium capitalize flex-1" numberOfLines={2}>
      {serviceData.providerId.address}
    </Text>
  </View>

  {/* Row 3: Action Buttons at the Bottom */}
  <View className="flex-row space-x-3">
    {/* Chat Button */}
    <TouchableOpacity 
      className="flex-1 bg-blue-50/80 h-11 rounded-xl flex-row items-center justify-center border border-blue-100/30 active:scale-[0.98]"
      onPress={() => console.log("Open Chat")}
    >
      <Ionicons name="chatbubble-ellipses" size={18} color="#1a5ea1" />
      <Text className="text-[#1a5ea1] font-bold text-xs ml-2">Chat Now</Text>
    </TouchableOpacity>

    {/* View Profile Button */}
    <TouchableOpacity 
      className="flex-1 bg-[#1a5ea1] h-11 rounded-xl flex-row items-center justify-center shadow-sm shadow-blue-100 active:scale-[0.98]"
      onPress={() => navigation.navigate('ProviderProfile')}
    >
      <Ionicons name="person" size={16} color="white" />
      <Text className="text-white font-bold text-xs ml-2">View Profile</Text>
    </TouchableOpacity>
  </View>

</View>
              </View>
            )}

            {activeTab === 'Review' && (
              <View className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <View className="flex-row items-center mb-1.5">
                  <Ionicons name="star" size={14} color="#fbbf24" />
                  <Text className="ml-1.5 font-bold text-gray-800 text-sm">Excellent Work!</Text>
                </View>
                <Text className="text-gray-500 text-xs leading-5">"Cleaning was amazing! Highly recommended!"</Text>
                <Text className="text-[#1a5ea1] font-bold text-[11px] mt-2.5">- Malaika Noor</Text>
              </View>
            )}

          </View>
        </ScrollView>
      </View>

      <View className="absolute bottom-0 left-0 right-0 bg-white px-6 pt-4 pb-8 border-t border-gray-100 flex-row justify-between items-center shadow-2xl">
        <View>
          <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Total Price</Text>
          <Text className="text-[#1a5ea1] text-xl font-extrabold">Rs. {serviceData.price}</Text>
        </View>
        
        <TouchableOpacity 
          onPress={() => navigation.navigate('BookService')} 
          className="bg-[#1a5ea1] px-12 h-12 rounded-full justify-center items-center shadow-lg shadow-blue-200"
        >
          <Text className="text-white text-base font-bold">Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewDetailScreen;