import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { AuthContext } from '../../context/AuthContext';
import { createBooking,rebookService } from '../../api/customerApi';

const BookingSummaryScreen = ({ route, navigation }) => {
  const { bookingPayload } = route.params || {};
  const [loading, setLoading] = useState(false);
  const { userInfo } = useContext(AuthContext);

  const formatDateWithDayjs = (dateVal) => {
    if (!dateVal) return 'N/A';
    
    const formatted = dayjs(dateVal);
    if (!formatted.isValid()) return String(dateVal);

    return formatted.format('ddd, DD MMM YYYY');
  };
const handleConfirmBooking = async () => {
  setLoading(true);
  try {
    let response;

    if (bookingPayload?.isRebook) {
      const rebookPayload = {
        bookingDate: bookingPayload.bookingDate,
        bookingTime: bookingPayload.bookingTime,
      };

      console.log("Rebooking ID:", bookingPayload.bookingId);
      response = await rebookService(bookingPayload.bookingId, rebookPayload);
      
    } else {
      const currentUserId = userInfo?._id || userInfo?.id;

      const newBookingPayload = {
        userId: currentUserId,
        providerId: bookingPayload.providerId,
        serviceId: bookingPayload.serviceId,
        customerName: bookingPayload.customerName,
        customerPhone: bookingPayload.customerPhone,
        bookingDate: bookingPayload.bookingDate,
        bookingTime: bookingPayload.bookingTime,
        bookingAddress: bookingPayload.bookingAddress,
        bookingPrice: bookingPayload.bookingPrice,
        description: bookingPayload.description || '',
      };

      console.log(" New Booking Payload:", newBookingPayload);
      response = await createBooking(newBookingPayload);
    }

    setLoading(false);
    console.log(" Success Response:", response);
    
    navigation.replace('BookingSuccess');

  } catch (error) {
    setLoading(false);
    const serverMessage = error.response?.data?.message || error.response?.data?.error;
    console.error("Action Error:", error.response?.data || error.message);
    Alert.alert(
      'Booking Failed',
      serverMessage || 'Something went wrong. Please try again.'
    );
  }
};

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <View className="px-6 py-4 flex-row items-center relative bg-white border-b border-slate-100">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 border border-slate-200 rounded-full items-center justify-center absolute left-6 z-10 bg-white"
        >
          <Ionicons name="arrow-back" size={20} color="#0f172a" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="text-lg font-bold text-slate-900">Booking Summary</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-5 pt-5">
        
        <View className="bg-white p-4 rounded-2xl border border-slate-100 mb-4 shadow-xs">
          <Text className="text-xs font-bold text-[#1a5ea1] uppercase tracking-wider mb-2">
            Selected Service
          </Text>
          <View className="flex-row items-center">
            <Image
              source={{
                uri:
                  bookingPayload?.serviceImage ||
                  'https://images.unsplash.com/photo-1581578731522-30d8d067469a?q=80&w=200',
              }}
              className="w-16 h-16 rounded-xl bg-slate-100"
              resizeMode="cover"
            />
            <View className="ml-3 flex-1">
              <Text className="text-base font-bold text-slate-900" numberOfLines={1}>
                {bookingPayload?.serviceName}
              </Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="person-circle-outline" size={14} color="#64748b" />
                <Text className="text-xs text-slate-500 font-medium ml-1">
                  {bookingPayload?.providerName}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="bg-white p-4 rounded-2xl border border-slate-100 mb-4 shadow-xs space-y-3">
          <Text className="text-xs font-bold text-[#1a5ea1] uppercase tracking-wider mb-1">
            Schedule & Location
          </Text>

          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center mr-3">
              <Ionicons name="calendar" size={16} color="#1a5ea1" />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-slate-400 font-medium">Date & Slot</Text>
              <Text className="text-sm font-bold text-slate-800">
                {formatDateWithDayjs(bookingPayload?.bookingDate)} at {bookingPayload?.bookingTime}
              </Text>
            </View>
          </View>

          <View className="h-[1px] bg-slate-100 my-1" />

          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center mr-3">
              <Ionicons name="location" size={16} color="#1a5ea1" />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-slate-400 font-medium">Service Location</Text>
              <Text className="text-sm font-bold text-slate-800" numberOfLines={2}>
                {bookingPayload?.bookingAddress}
              </Text>
            </View>
          </View>

          <View className="h-[1px] bg-slate-100 my-1" />

          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center mr-3">
              <Ionicons name="call" size={16} color="#1a5ea1" />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-slate-400 font-medium">Contact Person</Text>
              <Text className="text-sm font-bold text-slate-800">
                {bookingPayload?.customerName} ({bookingPayload?.customerPhone})
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-white p-4 rounded-2xl border border-slate-100 mb-6 shadow-xs">
          <Text className="text-xs font-bold text-[#1a5ea1] uppercase tracking-wider mb-3">
            Payment Breakdown
          </Text>

          <View className="flex-row justify-between mb-2.5">
            <Text className="text-sm text-slate-500 font-medium">Service Charges</Text>
            <Text className="text-sm text-slate-800 font-bold">Rs. {bookingPayload?.bookingPrice}</Text>
          </View>

          <View className="h-[1px] bg-slate-100 my-2" />

          <View className="flex-row justify-between items-center pt-1">
            <Text className="text-base font-bold text-slate-900">Total Amount</Text>
            <Text className="text-xl font-black text-[#1a5ea1]">Rs. {bookingPayload?.bookingPrice}</Text>
          </View>
        </View>

        <View className="h-28" />
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-white border-t border-slate-100 shadow-lg">
        <TouchableOpacity
          onPress={handleConfirmBooking}
          disabled={loading}
          className="bg-[#1a5ea1] h-14 rounded-2xl justify-center items-center shadow-md active:opacity-90"
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text className="text-white text-base font-bold">Confirm & Book Now</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BookingSummaryScreen;