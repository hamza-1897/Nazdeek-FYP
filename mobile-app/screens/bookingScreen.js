import React, { useState, useContext, useEffect } from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BookingCard from '../Cards/BookingCard';
import { getBookingsByUserId } from '../api/customerApi';
import { AuthContext } from '../context/AuthContext';

const BookingScreen = ({ navigation, route }) => {
  const { userInfo } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [bookingsData, setMyBookingsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      if (userInfo && userInfo.id) {
        const data = await getBookingsByUserId(userInfo.id);
        setMyBookingsData(data);
      }
    } catch (error) {
      console.log("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [userInfo]);

 

  const TABS = ['Upcoming', 'Completed', 'Cancelled'];

  const getFilteredData = () => {
    if (!bookingsData || bookingsData.length === 0) return [];

    return bookingsData.filter((item) => {
      const currentStatus = item.status?.toLowerCase();
      
      if (activeTab === 'Upcoming') {
        return currentStatus === 'pending' || currentStatus === 'accepted';
      }
      if (activeTab === 'Completed') {
        return currentStatus === 'completed';
      }
      if (activeTab === 'Cancelled') {
        return currentStatus === 'cancelled';
      }
      return false;
    });
  };

  const currentData = getFilteredData();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      <View className="py-4 flex-row justify-center items-center border-b border-slate-50">
        <Text className="text-xl font-bold text-slate-800">My Bookings</Text>
      </View>

      <View className="flex-row px-4 bg-white mt-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity 
              key={tab}
              onPress={() => setActiveTab(tab)}
              className="flex-1 items-center py-3"
            >
              <Text className={`text-xs font-bold tracking-wide ${isActive ? 'text-[#1a5ea1]' : 'text-slate-400'}`}>
                {tab}
              </Text>
              {isActive && (
                <View className="absolute bottom-0 w-12 h-[3.5px] bg-[#1a5ea1] rounded-full" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#1a5ea1" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} className="px-4 pt-4 bg-slate-50/40">
          {currentData.length > 0 ? (
            currentData.map((item) => {
              const formattedDate = item.bookingDate ? item.bookingDate.split('T')[0] : 'N/A';

              return (
                <BookingCard 
                  key={item._id}
                  serviceName={item.serviceId?.serviceName || "Service Name"}
                  providerName={item.providerId?.businessName || "Provider Name"}
                  price={item.serviceId?.price || item.price || 0}
                  imageUri={item.serviceId?.serviceImages && item.serviceId.serviceImages[0]} 
                  bookingDate={formattedDate}
                  bookingTime={item.bookingTime || "N/A"}
                  description={item.description}
                  status={item.status}
                  isReviewed={item.isReviewed}
                  onLeaveReview={() => navigation.navigate('LeaveReview', {
                    bookingId: item._id,
                    providerName: item.providerId?.businessName,
                    serviceName: item.serviceId?.serviceName,
                    date: formattedDate
                  })}
                />
              );
            })
          ) : (
            <View className="items-center justify-center mt-28">
              <View className="w-20 h-20 bg-slate-100 rounded-full items-center justify-center mb-4">
                <Ionicons 
                  name={activeTab === 'Cancelled' ? "close-circle-outline" : activeTab === 'Completed' ? "checkmark-circle-outline" : "calendar-outline"} 
                  size={40} 
                  color="#94a3b8" 
                />
              </View>
              <Text className="text-slate-700 font-bold text-base">No {activeTab} Bookings</Text>
              <Text className="text-slate-400 text-xs mt-1 text-center px-8">
                Your {activeTab.toLowerCase()} bookings will appear here.
              </Text>
            </View>
          )}
          
          <View className="h-16" />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default BookingScreen;