import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProviderBookingsCard from '../../Cards/ProviderBookingsCard';
import ProviderTabs from '../../Cards/ProviderTabs';

const ProvidersBooking = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Active');

  const [bookings, setBookings] = useState([
    {
      id: 1,
      customerName: 'Ayesha Omar',
      customerImage: 'https://randomuser.me/api/portraits/women/3.jpg',
      serviceName: 'Deep Home Cleaning',
      dateTime: 'Apr 12, 04:00 PM',
      price: 'PKR 2,500',
      address: 'Street 4, Sector F-7, Islamabad',
      notes: 'Please bring your own cleaning chemical set.',
      status: 'pending',
    },
    {
      id: 2,
      customerName: 'Zain Ahmed',
      customerImage: 'https://randomuser.me/api/portraits/men/2.jpg',
      serviceName: 'Electrician Service',
      dateTime: 'Apr 14, 11:00 AM',
      price: 'PKR 1,200',
      address: 'House 12, Main Bazaar, Mandi Bahauddin',
      notes: 'UPS wiring issue in upper portion.',
      status: 'accepted',
    },
    {
      id: 3,
      customerName: 'Ali Raza',
      customerImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      serviceName: 'AC Maintenance & Service',
      dateTime: 'Mar 15, 10:00 AM',
      price: 'PKR 3,000',
      address: 'G-9/1, Near Park, Islamabad',
      notes: 'Master bedroom inverter AC.',
      status: 'completed',
    },
  ]);

  const handleAccept = (id) => {
    Alert.alert('Accept Booking', 'Are you sure you want to accept this booking?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Accept',
        onPress: () => {
          setBookings((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status: 'accepted' } : item))
          );
        },
      },
    ]);
  };

  const handleReject = (id) => {
    Alert.alert('Reject Booking', 'Are you sure you want to reject this booking?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reject',
        style: 'destructive',
        onPress: () => {
          setBookings((prev) => prev.filter((item) => item.id !== id));
        },
      },
    ]);
  };

  const handleComplete = (id) => {
    Alert.alert('Complete Booking', 'Mark this booking as completed?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Complete',
        onPress: () => {
          setBookings((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status: 'completed' } : item))
          );
        },
      },
    ]);
  };

  const filteredBookings = bookings.filter((item) => {
    if (activeTab === 'Active') {
      return item.status === 'pending' || item.status === 'accepted';
    }
    return item.status === 'completed';
  });

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="px-6 py-4  bg-white flex-row items-center justify-center border-b border-gray-100">
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
          filteredBookings.map((item) => (
            <ProviderBookingsCard
              key={item.id}
              item={item}
              onAccept={handleAccept}
              onReject={handleReject}
              onComplete={handleComplete}
            />
          ))
        )}
      </ScrollView>

      <ProviderTabs activeTab="Bookings" navigation={navigation} />
    </View>
  );
};

export default ProvidersBooking;