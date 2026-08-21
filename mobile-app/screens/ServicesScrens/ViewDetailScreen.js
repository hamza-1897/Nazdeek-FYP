import React, { useState, useContext, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getServiceById } from '../../api/customerApi';
import { accessChat } from '../../api/chatApi';
import { AuthContext } from '../../context/AuthContext';

const { width } = Dimensions.get('window');

const ViewDetailScreen = ({ route, navigation }) => {
  const { serviceId } = route.params;
  const insets = useSafeAreaInsets();
  const { userInfo } = useContext(AuthContext);

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
      const res = await getServiceById(serviceId);
      const data = res?.data?.data || res?.data;
      setServiceData(data);
    } catch (error) {
      console.error('Error fetching service details:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentUserId = userInfo?.id;
  const currentUserModel = 'User';

  const handleChatPress = async () => {
    try {
      const providerId = serviceData?.providerId?._id;
      const providerName = serviceData?.providerId?.businessName;
      const providerImage = serviceData?.providerId?.providerImage;

      const chatRoom = await accessChat({
        userId: currentUserId,
        providerId: providerId,
      });

      navigation.navigate('ChatScreen', {
        chatId: chatRoom._id,
        currentUserId,
        currentUserModel,
        receiverId: providerId,
        receiverModel: 'Provider',
        receiverName: providerName,
        receiverImage: providerImage,
      });
    } catch (error) {
      console.error('Error opening chat:', error);
      Alert.alert('Error', 'Chat room open nahi ho saka. Dobara try karein.');
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
      <View className="flex-1 justify-center items-center bg-slate-50">
        <ActivityIndicator size="large" color="#1a5ea1" />
        <Text className="text-slate-400 font-medium text-xs mt-3">Loading details...</Text>
      </View>
    );
  }

  if (!serviceData) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50 px-6">
        <View className="w-20 h-20 bg-rose-50 rounded-full items-center justify-center mb-4 border border-rose-100">
          <Ionicons name="alert-circle-outline" size={40} color="#f43f5e" />
        </View>
        <Text className="text-slate-900 font-bold text-lg text-center">Service Not Found</Text>
        <Text className="text-slate-500 mt-1 font-medium text-center text-sm leading-relaxed">
          The requested service details could not be loaded or are no longer available.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mt-6 bg-[#1a5ea1] px-8 py-3.5 rounded-2xl active:opacity-90 shadow-sm"
        >
          <Text className="text-white font-bold text-sm">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const images = serviceData?.serviceImages?.length
    ? serviceData.serviceImages
    : ['https://images.unsplash.com/photo-1581578731522-30d8d067469a?q=80&w=600'];

  const reviewsList = serviceData?.reviews || [];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        className="flex-1"
      >
        <View className="relative w-full h-64 bg-slate-900 overflow-hidden">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {images.map((imgUri, index) => (
              <View key={index} style={{ width: width, height: 256 }}>
                <Image
                  source={{ uri: imgUri }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
            ))}
          </ScrollView>

          <View className="absolute top-3 left-4 right-4 flex-row justify-between items-center z-20">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="bg-white/90 w-10 h-10 rounded-full items-center justify-center border border-white/40 shadow-sm active:scale-95"
            >
              <Ionicons name="arrow-back" size={20} color="#0f172a" />
            </TouchableOpacity>

            {images.length > 1 && (
              <View className="bg-slate-900/60 px-3 py-1 rounded-full border border-white/20">
                <Text className="text-white text-xs font-semibold">
                  {activeImageIndex + 1} / {images.length}
                </Text>
              </View>
            )}
          </View>

          {images.length > 1 && (
            <View className="absolute bottom-4 left-0 right-0 flex-row justify-center items-center space-x-1.5 z-10">
              {images.map((_, index) => (
                <View
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    activeImageIndex === index ? 'w-6 bg-[#1a5ea1]' : 'w-1.5 bg-white/70'
                  }`}
                />
              ))}
            </View>
          )}
        </View>

        <View className="px-5 pt-5">
          <View className="flex-row justify-between items-center mb-3">
            <View className="bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
              <Text className="text-[#1a5ea1] font-bold text-[11px] uppercase tracking-wider">
                {serviceData?.categoryId?.name || 'Service'}
              </Text>
            </View>

            <View className="flex-row items-center bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
              <Ionicons name="star" size={13} color="#f59e0b" />
              <Text className="text-amber-900 font-extrabold text-xs ml-1">
                {serviceData?.rating || '0.0'}
              </Text>
              <Text className="text-amber-700/70 text-xs font-medium ml-1">
                ({reviewsList.length})
              </Text>
            </View>
          </View>

          <Text className="text-slate-900 text-2xl font-black mb-5 capitalize leading-snug">
            {serviceData?.serviceName}
          </Text>

          <View className="flex-row border-b border-slate-100 mb-5">
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
                  <View className="absolute bottom-0 left-0 right-0 h-1 bg-[#1a5ea1] rounded-full" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {activeTab === 'About' && (
            <View>
              <Text className="text-slate-900 font-bold text-base mb-2">Description</Text>
              <Text className="text-slate-600 leading-relaxed text-sm mb-6 font-normal">
                {serviceData?.description || 'No description provided for this service.'}
              </Text>

              <Text className="text-slate-900 font-bold text-base mb-3">Service Provider</Text>

              <View className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <View className="flex-row items-center mb-4">
                  <Image
                    source={{
                      uri:
                        serviceData?.providerId?.providerImage ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
                    }}
                    className="w-12 h-12 rounded-2xl bg-slate-200 border border-slate-200"
                    resizeMode="cover"
                  />
                  <View className="ml-3 flex-1">
                    <Text className="text-slate-900 font-bold text-base" numberOfLines={1}>
                      {serviceData?.providerId?.businessName ||
                        serviceData?.providerId?.userId?.name ||
                        'Verified Partner'}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Ionicons name="checkmark-circle" size={14} color="#1a5ea1" />
                      <Text className="text-[#1a5ea1] text-[11px] font-bold ml-1 uppercase">
                        Verified Partner
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="flex-row items-center mb-4 bg-white p-2.5 rounded-xl border border-slate-100">
                  <Ionicons name="location-outline" size={16} color="#64748b" />
                  <Text
                    className="text-slate-600 text-xs ml-2 font-medium capitalize flex-1"
                    numberOfLines={1}
                  >
                    {serviceData?.providerId?.address || 'Mandi Bahauddin, Pakistan'}
                  </Text>
                </View>

                <View className="flex-row space-x-3">
                  <TouchableOpacity
                    className="flex-1 bg-white h-11 rounded-xl flex-row items-center justify-center border border-slate-200 active:opacity-80"
                    onPress={handleChatPress}
                  >
                    <Ionicons name="chatbubble-ellipses-outline" size={16} color="#1a5ea1" />
                    <Text className="text-[#1a5ea1] font-bold text-xs ml-2">Chat</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-1 bg-[#1a5ea1] h-11 rounded-xl flex-row items-center justify-center active:opacity-90 shadow-sm"
                    onPress={() =>
                      navigation.navigate('ProviderProfile', {
                        providerId: serviceData?.providerId?._id,
                      })
                    }
                  >
                    <Ionicons name="person-outline" size={15} color="white" />
                    <Text className="text-white font-bold text-xs ml-2">View Profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {activeTab === 'Reviews' && (
            <View className="space-y-3">
              {reviewsList.length > 0 ? (
                reviewsList.map((review, index) => {
                  const userName = review?.userId?.name || 'Anonymous User';
                  const userPic =
                    review?.userId?.profileImage ||
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150';
                  const ratingVal = Number(review?.rating) || 5;

                  return (
                    <View
                      key={review?._id || index}
                      className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-3"
                    >
                      <View className="flex-row items-center justify-between mb-3">
                        <View className="flex-row items-center flex-1">
                          <Image
                            source={{ uri: userPic }}
                            className="w-10 h-10 rounded-full bg-slate-200 border border-slate-200"
                            resizeMode="cover"
                          />
                          <View className="ml-3 flex-1">
                            <Text
                              className="font-bold text-slate-800 text-sm capitalize"
                              numberOfLines={1}
                            >
                              {userName}
                            </Text>
                          </View>
                        </View>

                        <View className="flex-row items-center bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                          <Ionicons name="star" size={12} color="#f59e0b" />
                          <Text className="text-amber-900 font-bold text-xs ml-1">
                            {ratingVal}
                          </Text>
                        </View>
                      </View>

                      {review?.comment ? (
                        <Text className="text-slate-600 font-normal text-xs leading-5 italic">
                          "{review.comment}"
                        </Text>
                      ) : (
                        <Text className="text-slate-400 font-normal text-xs italic">
                          No comment provided.
                        </Text>
                      )}
                    </View>
                  );
                })
              ) : (
                <View className="bg-slate-50 p-6 rounded-2xl border border-slate-100 items-center justify-center">
                  <Ionicons name="chatbox-ellipses-outline" size={32} color="#94a3b8" />
                  <Text className="text-slate-500 font-bold text-sm mt-2">No Reviews Yet</Text>
                  <Text className="text-slate-400 text-xs text-center mt-1">
                    Be the first one to review this service!
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      <View
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
        className="absolute bottom-0 left-0 right-0 bg-white px-5 pt-3.5 border-t border-slate-100 flex-row justify-between items-center shadow-lg"
      >
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
          className="bg-[#1a5ea1] px-7 h-12 rounded-2xl justify-center items-center shadow-md active:opacity-90"
        >
          <Text className="text-white text-sm font-bold">Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ViewDetailScreen;