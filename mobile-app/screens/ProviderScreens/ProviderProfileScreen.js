import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import SectionHeader from '../../Components/SectionHeader';
import EmptyState from '../../Components/EmptyState';
import ServiceItemCard from '../../Components/ServiceItemCard';
import ProviderProfHeader from '../../Components/ProviderProfHeader';
import { getProviderById } from '../../api/customerApi';

const ProviderProfileScreen = ({ navigation, route }) => {
  const providerId = route?.params?.providerId;

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (providerId) {
      fetchProvider(providerId);
    }
  }, [providerId]);

  const fetchProvider = async (id) => {
    try {
      setLoading(true);
      const response = await getProviderById(id);
      setProfileData(response?.data || response);
    } catch (error) {
      console.error('Error fetching provider:', error);
    } finally {
      setLoading(false);
    }
  };

  const provider = profileData?.provider || profileData;
  const services = profileData?.services || [];
  const reviews = profileData?.reviews || [];
  const stats = profileData?.stats || { totalReviews: 0, averageRating: 0 };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="light-content" backgroundColor="#1a5ea1" />

      <View className="relative bg-[#1a5ea1] pt-3 pb-12 px-5 rounded-b-[32px]">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>

          <Text className="text-white font-bold text-base">Provider Details</Text>

          <View className="w-10" />
        </View>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#1a5ea1" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <ProviderProfHeader provider={provider} stats={stats} />

          <View className="mx-5 mt-6">
            <SectionHeader
              title="Offered Services"
              count={services?.length || 0}
              icon="construct-outline"
            />
            {services && services.length > 0 ? (
              services.map((item) => (
                <ServiceItemCard
                  key={item._id}
                  service={item}
                  onPress={() =>
                    navigation.navigate('ViewDetail', { serviceId: item._id })
                  }
                />
              ))
            ) : (
              <EmptyState text="No services listed yet" />
            )}
          </View>

          <View className="mx-5 mt-4">
            <SectionHeader title="About Business" icon="information-circle-outline" />
            <View className="bg-white p-4 rounded-2xl border border-slate-200/80">
              <Text className="text-slate-700 text-sm leading-6 font-medium">
                {provider?.description || 'No description provided.'}
              </Text>
            </View>
          </View>

          <View className="mx-5 mt-6">
            <SectionHeader
              title="Recent Work Portfolio"
              count={provider?.workImages?.length || 0}
              icon="images-outline"
            />
            {provider?.workImages && provider.workImages.length > 0 ? (
              <View className="flex-row flex-wrap justify-between">
                {provider.workImages.map((imgUrl, index) => (
                  <View
                    key={index}
                    className="w-[48%] h-32 mb-3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80"
                  >
                    <Image
                      source={{ uri: imgUrl }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                ))}
              </View>
            ) : (
              <EmptyState text="No work portfolio uploaded" />
            )}
          </View>

          <View className="mx-5 mt-4 mb-8">
            <SectionHeader
              title="Customer Reviews"
              count={reviews?.length || 0}
              icon="star-outline"
            />
            {reviews && reviews.length > 0 ? (
              reviews.map((rev) => (
                <View
                  key={rev._id}
                  className="bg-white p-4 rounded-2xl border border-slate-200/80 mb-3"
                >
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="font-bold text-slate-800 text-sm">
                      {rev?.userId?.name || 'Customer'}
                    </Text>
                    <View className="flex-row items-center bg-amber-50 px-2 py-0.5 rounded-md">
                      <Ionicons name="star" size={12} color="#f59e0b" />
                      <Text className="text-amber-700 font-bold text-xs ml-1">
                        {rev.rating}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-slate-600 text-xs leading-5">
                    {rev.comment}
                  </Text>
                </View>
              ))
            ) : (
              <EmptyState text="No customer reviews yet" />
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ProviderProfileScreen;