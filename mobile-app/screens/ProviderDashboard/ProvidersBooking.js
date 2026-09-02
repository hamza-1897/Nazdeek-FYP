import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProviderBookingsCard from '../../Cards/ProviderBookingsCard';
import ProviderTabs from '../../Cards/ProviderTabs';
import { getBookingsByProvider ,updateBookingStatus } from '../../api/ProviderApi';
import { AuthContext } from '../../context/AuthContext';

const ProvidersBooking = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Active');
  const { providerInfo } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      if (!providerInfo || !providerInfo._id) {
        console.log('Provider ID is not available');
        return;
      }

      const response = await getBookingsByProvider(providerInfo._id);
      console.log('Bookings fetched:', response);
      setBookings(response || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [providerInfo]);

  const handleAccept = async (id) => {
    Alert.alert('Accept Booking', 'Are you sure you want to accept this booking?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Accept',
        onPress: async () => {
          const res = await updateBookingStatus(id, 'accepted');
          Alert.alert('Booking Accepted', 'The booking has been accepted successfully.');
          fetchBookings();
        },
      },
    ]);
  };

  const handleReject = async (id) => {
    Alert.alert('Reject Booking', 'Are you sure you want to reject this booking?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reject',
        style: 'destructive',
        onPress: async () => {
          const res = await updateBookingStatus(id, 'rejected');
          Alert.alert('Booking Rejected', 'The booking has been rejected successfully.');
          fetchBookings();
        }
      },
    ]);
  };

  const handleComplete = async (id) => {
    Alert.alert('Complete Booking', 'Mark this booking as completed?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Complete',
        onPress: async () => {
        const res = await updateBookingStatus(id, 'completed');
        Alert.alert('Booking Completed', 'The booking has been marked as completed.');
        fetchBookings();
        },
      },
    ]);
  };

  const filteredBookings = bookings.filter((item) => {
    if (activeTab === 'Active') {
      return item?.status === 'pending' || item?.status === 'accepted';
    }
    return item?.status === 'completed' || item?.status === 'rejected' ;
  });

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="px-6 pt-10 pb-4 bg-white flex-row items-center justify-center border-b border-gray-100">
  <Text className="text-xl font-bold text-gray-900 text-center">My Bookings</Text>
</View>

      <View className="flex-row bg-white border-b border-gray-200">
        {['Active', 'Completed'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`py-3 flex-1 items-center ${
              activeTab === tab ? 'border-b-2 border-[#1a5ea1]' : ''
            }`}
          >
            <Text
              className={`font-semibold text-sm ${
                activeTab === tab ? 'text-[#1a5ea1]' : 'text-gray-400'
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1 px-5 mt-4" showsVerticalScrollIndicator={false}>
        {filteredBookings.length === 0 ? (
          <View className="items-center justify-center mt-24">
            <Ionicons name="calendar-outline" size={48} color="#cbd5e1" />
            <Text className="text-gray-400 mt-2 font-medium text-sm">No bookings found</Text>
          </View>
        ) : (
          filteredBookings.map((item, index) => (
            <ProviderBookingsCard
              key={item?._id || `booking-${index}`}
              item={item}
              onAccept={handleAccept}
              onReject={handleReject}
              onComplete={handleComplete}
            />
          ))
        )}
      </ScrollView>

    </View>
  );
};

export default ProvidersBooking;