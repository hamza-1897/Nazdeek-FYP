import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView, StatusBar, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getServiceById } from '../../api/customerApi';

const { width } = Dimensions.get('window');

const ViewDetailScreen = ({ route, navigation }) => {
  const { serviceId } = route.params; 
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('About');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useFocusEffect(
    useCallback(() => {
      fetchServiceDetails();
    }, [serviceId])
  );

  const fetchServiceDetails = async () => {
    setLoading(true);
    try {
      const response = await getServiceById(serviceId);
      setServiceData(response.data);
    } catch (error) {
      console.error("Error fetching service details:", error);
    } finally {
      setLoading(false);
    }
  };

  const TABS = ['About', 'Review'];

  const handleScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
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
      <View className="flex-1 justify-center items-center bg-white px-6">
        <Ionicons name="alert-circle-outline" size={48} color="#9ca3af" />
        <Text className="text-gray-500 mt-2 font-semibold text-center">Service details could not be loaded.</Text>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="mt-4 bg-[#1a5ea1] px-6 py-2.5 rounded-xl"
        >
          <Text className="text-white font-bold text-xs">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const images = serviceData?.serviceImages?.length ? serviceData.serviceImages : ['https://images.unsplash.com/photo-1581578731522-30d8d067469a?q=80&w=500'];

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      <View className="h-[260px] w-full relative bg-white px-4 pt-12">
        <View className="w-full h-full rounded-[24px] overflow-hidden shadow-md shadow-gray-200/80 bg-gray-950">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {images.map((imgUri, index) => (
              <Image 
                key={index}
                source={{ uri: imgUri }} 
                style={{ width: width - 32, height: '100%' }}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          <View className="absolute bottom-3 left-0 right-0 flex-row justify-center space-x-1.5 z-10">
            {images.map((_, index) => (
              <View 
                key={index}
                className={`h-1.5 rounded-full transition-all duration-200 ${activeImageIndex === index ? 'w-5 bg-[#1a5ea1]' : 'w-1.5 bg-white/60'}`}
              />
            ))}
          </View>
        </View>

        <View className="absolute top-14 left-7 z-10">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="bg-white/95 backdrop-blur-md w-9 h-9 rounded-full items-center justify-center shadow-md shadow-black/10 active:scale-95"
          >
            <Ionicons name="arrow-back" size={20} color="#1a5ea1" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1 bg-white mt-1 overflow-hidden">
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{ paddingBottom: 130 }}
        >
          <View className="px-5 pt-4">
            
            <View className="flex-row justify-between items-center mb-3">
              <View className="bg-blue-50 px-3 py-1 rounded-xl border border-blue-100/20">
                <Text className="text-[#1a5ea1] font-black text-[11px] uppercase tracking-widest">
                  {serviceData.categoryId?.name || "Premium Service"}
                </Text>
              </View>
              <View className="flex-row items-center bg-amber-50/80 px-2.5 py-1 rounded-xl border border-amber-100/30">
                <Ionicons name="star-sharp" size={13} color="#fbbf24" />
                <Text className="text-amber-800 font-extrabold text-xs ml-1">4.5</Text>
                <Text className="text-gray-400 text-[11px] font-medium"> (365)</Text>
              </View>
            </View>

            <Text className="text-gray-900 text-2xl font-black mb-5 leading-tight tracking-tight">
              {serviceData.serviceName}
            </Text>

            <View className="flex-row border-b border-gray-100 mb-5">
              {TABS.map(tab => (
                <TouchableOpacity 
                  key={tab} 
                  onPress={() => setActiveTab(tab)}
                  className="mr-8 pb-3 relative"
                >
                  <Text className={`text-base font-extrabold ${activeTab === tab ? 'text-[#1a5ea1]' : 'text-gray-400'}`}>
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
                <Text className="text-gray-900 font-black text-base mb-2 tracking-tight">About Service</Text>
                <Text className="text-gray-500 leading-relaxed text-sm mb-6 font-medium">
                  {serviceData.description || "No description available for this service."}
                </Text>

                <Text className="text-gray-900 font-black text-base mb-3 tracking-tight">Service Provider</Text>
                <View className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/50">
                  <View className="flex-row items-center mb-4">
                    <Image 
                      source={{ uri: serviceData.providerId?.providerImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200' }} 
                      className="w-12 h-12 rounded-xl bg-gray-50"
                      resizeMode="cover"
                    />
                    <View className="ml-3 flex-1">
                      <Text className="text-gray-900 font-black text-base" numberOfLines={1}>
                        {serviceData.providerId?.businessName || "Expert Partner"}
                      </Text>
                      <Text className="text-[#1a5ea1] text-[11px] font-bold tracking-wide mt-0.5 uppercase">
                        Verified Expert Partner
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center bg-gray-50/80 px-3 py-2 rounded-xl border border-gray-100/30 mb-4">
                    <Ionicons name="location-sharp" size={14} color="#1a5ea1" />
                    <Text className="text-gray-600 text-xs ml-2 font-semibold capitalize flex-1" numberOfLines={1}>
                      {serviceData.providerId?.address || "Mandi Bahauddin, Pakistan"}
                    </Text>
                  </View>

                  <View className="flex-row space-x-3">
                    <TouchableOpacity 
                      className="flex-1 bg-blue-50/60 h-11 rounded-xl flex-row items-center justify-center border border-blue-100/20 active:opacity-80"
                      onPress={() => console.log("Open Chat")}
                    >
                      <Ionicons name="chatbubble-ellipses-sharp" size={16} color="#1a5ea1" />
                      <Text className="text-[#1a5ea1] font-extrabold text-xs ml-2">Chat Now</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      className="flex-1 bg-[#1a5ea1] h-11 rounded-xl flex-row items-center justify-center shadow-sm active:opacity-90"
                      onPress={() => navigation.navigate('ProviderProfile')}
                    >
                      <Ionicons name="person-sharp" size={14} color="white" />
                      <Text className="text-white font-extrabold text-xs ml-2">View Profile</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}

            {activeTab === 'Review' && (
              <View className="bg-gray-50/80 p-4 rounded-2xl border border-gray-100/60">
                <View className="flex-row items-center mb-1.5">
                  <Ionicons name="star-sharp" size={13} color="#fbbf24" />
                  <Text className="ml-1.5 font-black text-gray-800 text-sm">Excellent Work!</Text>
                </View>
                <Text className="text-gray-500 font-medium text-xs leading-5">"Cleaning was amazing! Highly recommended!"</Text>
                <Text className="text-[#1a5ea1] font-black text-[10px] uppercase tracking-wider mt-2.5">- Malaika Noor</Text>
              </View>
            )}

          </View>
        </ScrollView>
      </View>

      <View className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md px-5 pt-3.5 pb-8 border-t border-gray-100/80 flex-row justify-between items-center shadow-2xl">
        <View>
          <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Starting From</Text>
          <Text className="text-[#1a5ea1] text-2xl font-black mt-0.5">Rs. {serviceData.price}</Text>
        </View>
        
        <TouchableOpacity 
          onPress={() => navigation.navigate('BookService')} 
          className="bg-[#1a5ea1] px-10 h-12 rounded-full justify-center items-center shadow-md active:opacity-90"
        >
          <Text className="text-white text-base font-black tracking-tight">Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewDetailScreen;