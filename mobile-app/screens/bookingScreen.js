import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BookingCard from '../Cards/BookingCard';
import CompletedCard from '../Cards/CompletedCard'; 
import CancelledCard from '../Cards/CancelledCard';

const BookingScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Upcoming');

  const myBookings = [
    {
      id: '1',
      serviceName: 'Home Cleaning',
      providerName: 'Sajid Mehmood',
      price: '1500',
      status: 'Upcoming',
      imageUri: 'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      serviceName: 'AC Repairing',
      providerName: 'M. Ali',
      price: '1500',
      status: 'Upcoming',
      imageUri: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      serviceName: 'Plumbing Work',
      providerName: 'Zubair Khan',
      price: '800',
      status: 'Upcoming',
      imageUri: 'https://images.pexels.com/photos/2310904/pexels-photo-2310904.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const completedBookings = [
    {
      id: '1',
      serviceName: 'Electric Wiring',
      providerName: 'Alyan khan',
      price: '2000',
      date: 'Oct 04, 2023',
      imageUri: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      serviceName: 'Glass Cleaning',
      providerName: 'Arslan Ahmed',
      price: '500',
      date: 'Oct 01, 2023',
      imageUri: 'https://images.pexels.com/photos/4239113/pexels-photo-4239113.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const cancelledBookings = [
    {
      id: '1',
      serviceName: 'Appliance Repairing', 
      providerName: 'Arslan Ahmed', 
      price: '3000',
      date: 'March 29, 2026',
      imageUri: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
     {
      id: '2',
      serviceName: 'Car Wash',
      providerName: 'Sajid Mehmood',
      price: '1800',
      date: 'April 01, 2026',
      imageUri: 'https://images.pexels.com/photos/372810/pexels-photo-372810.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const TABS = ['Upcoming', 'Completed', 'Cancelled'];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      
      <View className="px-6 py-4 flex-row justify-center items-center bg-white">
        <Text className="text-xl font-bold text-gray-800">My Bookings</Text>
      </View>

      <View className="flex-row px-6 border-b border-gray-50 mb-4">
        {TABS.map((tab) => (
          <TouchableOpacity 
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`mr-6 pb-3 ${activeTab === tab ? 'border-b-4 border-[#1a5ea1]' : ''}`}
          >
            <Text className={`text-sm font-bold ${activeTab === tab ? 'text-[#1a5ea1]' : 'text-gray-400'}`}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-5">
        {activeTab === 'Upcoming' && (
          myBookings.map((item) => (
            <BookingCard 
              key={item.id}
              serviceName={item.serviceName}
              providerName={item.providerName}
              price={item.price}
              imageUri={item.imageUri}
            />
          ))
        )}

        {activeTab === 'Completed' && (
          completedBookings.map((item) => (
            <CompletedCard 
              key={item.id}
              serviceName={item.serviceName}
              providerName={item.providerName}
              price={item.price}
              date={item.date}
              imageUri={item.imageUri}
            />
          ))
        )}

        {activeTab === 'Cancelled' && (
          cancelledBookings.length > 0 ? (
            cancelledBookings.map((item) => (
              <CancelledCard 
                key={item.id}
                serviceName={item.serviceName}
                providerName={item.providerName}
                price={item.price}
                date={item.date}
                imageUri={item.imageUri}
              />
            ))
          ) : (
            <View className="items-center justify-center mt-20">
              <Ionicons name="close-circle-outline" size={80} color="#f3f4f6" />
              <Text className="text-gray-400 mt-2 font-medium">No Cancelled bookings yet.</Text>
            </View>
          )
        )}
        
        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingScreen;