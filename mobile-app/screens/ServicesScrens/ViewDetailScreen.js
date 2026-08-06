import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getServiceById } from '../../api/customerApi';

const { width } = Dimensions.get('window');

const ViewDetailScreen = ({ route, navigation }) => {
  const { serviceId } = route.params;
  const insets = useSafeAreaInsets();
  
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
      console.error('Error fetching service details:', error);
    } finally {
      setLoading(false);
    }
  };

  const TABS = ['About', 'Reviews'];

  const handleScroll = (event) => {
    const slide = Math.round(
      event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
    );
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
        <Ionicons name="alert-circle-outline" size={56} color="#94a3b8" />
        <Text className="text-slate-500 mt-3 font-semibold text-center text-base">
          Service details could not be loaded.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mt-5 bg-[#1a5ea1] px-8 py-3 rounded-2xl shadow-sm"
        >
          <Text className="text-white font-bold text-sm">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const images = serviceData?.serviceImages?.length
    ? serviceData.serviceImages
    : ['https://images.unsplash.com/photo-1581578731522-30d8d067469a?q=80&w=600'];

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" translucent={false} />

      <View className="flex-1 bg-white">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 110 }}
        >
          <View className="relative w-full h-64 bg-slate-100">
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
                  style={{ width: width, height: 256 }}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ top: 16, left: 16 }}
              className="absolute z-20 bg-white/90 backdrop-blur-md w-10 h-10 rounded-full items-center justify-center border border-slate-200/50 shadow-sm active:scale-95"
            >
              <Ionicons name="arrow-back" size={20} color="#0f172a" />
            </TouchableOpacity>

            <View className="absolute bottom-3 left-0 right-0 flex-row justify-center space-x-1.5 z-10">
              {images.map((_, index) => (
                <View
                  key={index}
                  className={`h-1.5 rounded-full ${
                    activeImageIndex === index ? 'w-6 bg-[#1a5ea1]' : 'w-1.5 bg-white/70'
                  }`}
                />
              ))}
            </View>
          </View>

          <View className="px-5 pt-5">
            <View className="flex-row justify-between items-center mb-3">
              <View className="bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                <Text className="text-[#1a5ea1] font-extrabold text-[10px] uppercase tracking-wider">
                  {serviceData?.categoryId?.name || 'Service'}
                </Text>
              </View>

              <View className="flex-row items-center bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                <Ionicons name="star" size={12} color="#f59e0b" />
                <Text className="text-amber-800 font-bold text-xs ml-1">
                  {serviceData?.rating || '4.8'}
                </Text>
                <Text className="text-slate-400 text-[11px] font-medium ml-0.5">
                  ({serviceData?.reviewsCount || '120'})
                </Text>
              </View>
            </View>

            <Text className="text-slate-900 text-2xl font-black mb-4 capitalize leading-tight">
              {serviceData?.serviceName }
            </Text>

            <View className="flex-row border-b border-slate-100 mb-6">
              {TABS.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  className="mr-8 pb-3 relative"
                >
                  <Text
                    className={`text-base font-bold ${
                      activeTab === tab ? 'text-[#1a5ea1]' : 'text-slate-400'
                    }`}
                  >
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
                <Text className="text-slate-900 font-bold text-base mb-2">
                  Description 
                </Text>
                <Text className="text-slate-500 leading-relaxed text-sm mb-6 font-medium">
                  {serviceData?.description || 'No description provided for this service.'}
                </Text>

                <Text className="text-slate-900 font-bold text-base mb-3">
                  Service Provider
                </Text>

                <View className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                  <View className="flex-row items-center mb-3">
                    <Image
                      source={{
                        uri:
                          serviceData?.providerId?.providerImage ||
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
                      }}
                      className="w-12 h-12 rounded-xl bg-slate-200"
                      resizeMode="cover"
                    />
                    <View className="ml-3 flex-1">
                      <Text className="text-slate-900 font-bold text-base" numberOfLines={1}>
                        {serviceData?.providerId?.businessName ||
                          serviceData?.providerId?.userId?.name ||
                          'Verified Partner'}
                      </Text>
                      <View className="flex-row items-center mt-0.5">
                        <Ionicons name="checkmark-circle" size={13} color="#1a5ea1" />
                        <Text className="text-[#1a5ea1] text-[11px] font-bold ml-1 uppercase">
                          Verified Partner
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className="flex-row items-center mb-4">
                    <Ionicons name="location-outline" size={14} color="#64748b" />
                    <Text
                      className="text-slate-500 text-xs ml-1 font-medium capitalize flex-1"
                      numberOfLines={1}
                    >
                      {serviceData?.providerId?.address || 'Mandi Bahauddin, Pakistan'}
                    </Text>
                  </View>

                  <View className="flex-row space-x-3">
                    <TouchableOpacity
                      className="flex-1 bg-white h-11 rounded-xl flex-row items-center justify-center border border-slate-200 active:opacity-80"
                      onPress={() => console.log('Open Chat')}
                    >
                      <Ionicons name="chatbubble-ellipses-outline" size={16} color="#1a5ea1" />
                      <Text className="text-[#1a5ea1] font-bold text-xs ml-2">Chat</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="flex-1 bg-[#1a5ea1] h-11 rounded-xl flex-row items-center justify-center active:opacity-90 shadow-xs"
                      onPress={() => navigation.navigate('ProviderProfile')}
                    >
                      <Ionicons name="person-outline" size={15} color="white" />
                      <Text className="text-white font-bold text-xs ml-2">View Profile</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}

            {activeTab === 'Reviews' && (
              <View className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                <View className="flex-row items-center mb-1">
                  <Ionicons name="star" size={13} color="#f59e0b" />
                  <Text className="ml-1.5 font-bold text-slate-800 text-sm">
                    Excellent Work!
                  </Text>
                </View>
                <Text className="text-slate-500 font-medium text-xs leading-5">
                  "Service quality was top notch. Arrived right on time and solved the issue."
                </Text>
                <Text className="text-[#1a5ea1] font-bold text-[10px] uppercase tracking-wider mt-2">
                  - Customer Review
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      <View className="absolute bottom-0 left-0 right-0 bg-white px-5 pt-3.5 pb-8 border-t border-slate-100 flex-row justify-between items-center shadow-lg">
        <View>
          <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            Price ({serviceData?.priceType || 'Fixed'})
          </Text>
          <Text className="text-[#1a5ea1] text-2xl font-black mt-0.5">
            Rs. {serviceData?.price || '0'}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('BookService', { serviceData })}
          className="bg-[#1a5ea1] px-8 h-12 rounded-2xl justify-center items-center shadow-md shadow-blue-500/20 active:opacity-90"
        >
          <Text className="text-white text-sm font-bold">Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewDetailScreen;