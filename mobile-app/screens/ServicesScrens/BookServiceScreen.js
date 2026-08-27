import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../../context/AuthContext';

const BookServiceScreen = ({ route, navigation }) => {
  const { userInfo } = useContext(AuthContext);
  
  const serviceData = route?.params?.serviceData;
  const previousBooking = route?.params?.previousBooking;
  const isRebook = route?.params?.isRebook || false;

  const [name, setName] = useState(`${userInfo?.name || ''}`);
  const [phone, setPhone] = useState(`${userInfo?.phone || ''}`);
  const [address, setAddress] = useState('');
  const [requestDetails, setRequestDetails] = useState('');

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dateText, setDateText] = useState('DD/MM/YYYY');
  const [timeText, setTimeText] = useState('00:00 AM');

  useEffect(() => {
    if (isRebook && previousBooking) {
      if (previousBooking.customerName) setName(previousBooking.customerName);
      if (previousBooking.customerPhone) setPhone(previousBooking.customerPhone);
      if (previousBooking.bookingAddress) setAddress(previousBooking.bookingAddress);
      if (previousBooking.description) setRequestDetails(previousBooking.description);
    }
  }, [isRebook, previousBooking]);

  // Unified Date Change Handler
  const handleDateChange = (event, selectedDate) => {
    // Android dialog close karna required hai
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    // User ne "Cancel" dabaya ho to exit ho jaye
    if (event?.type === 'dismissed') return;

    if (selectedDate) {
      setDate(selectedDate);
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const year = selectedDate.getFullYear();
      setDateText(`${day}/${month}/${year}`);
    }
  };

  // Unified Time Change Handler
  const handleTimeChange = (event, selectedTime) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }

    if (event?.type === 'dismissed') return;

    if (selectedTime) {
      const updatedDate = new Date(date);
      updatedDate.setHours(selectedTime.getHours());
      updatedDate.setMinutes(selectedTime.getMinutes());
      setDate(updatedDate);

      let hours = selectedTime.getHours();
      let minutes = selectedTime.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setTimeText(`${hours}:${formattedMinutes} ${ampm}`);
    }
  };

  const handleContinue = () => {
  if (!name.trim() || !phone.trim() || !address.trim() || dateText === 'DD/MM/YYYY') {
    Alert.alert('Required Fields', 'Please fill all mandatory fields (Name, Phone, Date, Address)');
    return;
  }

  const bookingPayload = {
    isRebook: isRebook,
    // Agar rebook hai to previousBooking ki ID pass hogi
    bookingId: previousBooking?._id,
    
    // Nayi booking ke liye Required IDs
    serviceId: serviceData?._id || previousBooking?.serviceId?._id || previousBooking?.serviceId,
    providerId: serviceData?.providerId?._id || previousBooking?.providerId?._id || previousBooking?.providerId,
    
    // UI Display Data
    serviceName: serviceData?.serviceName || serviceData?.name || previousBooking?.serviceName || previousBooking?.serviceId?.serviceName,
    providerName: serviceData?.providerId?.businessName || previousBooking?.providerName || 'Verified Provider',
    serviceImage: serviceData?.serviceImages?.[0] || previousBooking?.serviceImage || previousBooking?.serviceId?.serviceImages?.[0],
    
    customerName: name,
    customerPhone: phone,
    bookingDate: date.toISOString(),
    bookingTime: timeText,
    bookingAddress: address,
    description: requestDetails,
    bookingPrice: serviceData?.price || previousBooking?.bookingPrice || previousBooking?.price || 0,
  };

  navigation.navigate('BookingSummary', { bookingPayload });
};

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="px-6 py-4 flex-row items-center relative border-b border-gray-50">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 border border-gray-100 rounded-full items-center justify-center absolute left-6 z-10 bg-white"
        >
          <Ionicons name="arrow-back" size={22} color="#1a5ea1" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="text-lg font-bold text-gray-800">
            {isRebook ? 'Rebook Service' : 'Book Service'}
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-4">
        
        <View className="bg-slate-50 border border-slate-100 p-4 rounded-2xl mb-6 flex-row justify-between items-center">
          <View className="flex-1 pr-3">
            <Text className="text-xs font-bold text-[#1a5ea1] uppercase">Selected Service</Text>
            <Text className="text-base font-bold text-gray-900 mt-0.5" numberOfLines={1}>
              {serviceData?.serviceName || serviceData?.name || previousBooking?.serviceId?.serviceName}
            </Text>
            <Text className="text-xs text-gray-500 font-medium mt-0.5">
              By {serviceData?.providerId?.businessName || previousBooking?.providerId?.businessName || 'Verified Provider'}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-xs text-gray-400 font-medium">Est. Price</Text>
            <Text className="text-lg font-black text-[#1a5ea1]">
              Rs. {serviceData?.price || previousBooking?.price || '0'}
            </Text>
          </View>
        </View>

        <Text className="text-base font-bold text-gray-800 mb-4">Customer Details</Text>

        <View className="gap-y-4">
          <View>
            <Text className="text-gray-500 font-semibold mb-1.5 ml-1 text-sm">Full Name *</Text>
            <TextInput
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              className="bg-gray-50 border border-gray-100 p-3.5 rounded-2xl text-gray-800 text-base"
            />
          </View>

          <View>
            <Text className="text-gray-500 font-semibold mb-1.5 ml-1 text-sm">Phone Number *</Text>
            <View className="flex-row space-x-2">
              <TextInput
                placeholder="300 1234567"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={11}
                className="flex-1 bg-gray-50 border border-gray-100 p-3.5 rounded-2xl text-gray-800 text-base"
              />
            </View>
          </View>

          <View className="flex-row space-x-3">
            <View className="flex-1">
              <Text className="text-gray-500 font-semibold mb-1.5 ml-1 text-sm">Select Date *</Text>
              <TouchableOpacity
                className="bg-gray-50 border border-gray-100 p-3.5 rounded-2xl flex-row items-center justify-between"
                onPress={() => setShowDatePicker(true)}
              >
                <Text className={dateText === 'DD/MM/YYYY' ? "text-gray-400 text-sm font-medium" : "text-gray-800 text-sm font-semibold"}>
                  {dateText}
                </Text>
                <Ionicons name="calendar-outline" size={18} color="#1a5ea1" />
              </TouchableOpacity>
            </View>

            <View className="flex-1">
              <Text className="text-gray-500 font-semibold mb-1.5 ml-1 text-sm">Select Time *</Text>
              <TouchableOpacity
                className="bg-gray-50 border border-gray-100 p-3.5 rounded-2xl flex-row items-center justify-between"
                onPress={() => setShowTimePicker(true)}
              >
                <Text className={timeText === '00:00 AM' ? "text-gray-400 text-sm font-medium" : "text-gray-800 text-sm font-semibold"}>
                  {timeText}
                </Text>
                <Ionicons name="time-outline" size={18} color="#1a5ea1" />
              </TouchableOpacity>
            </View>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={date}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={false}
              onChange={handleTimeChange}
            />
          )}

          <View>
            <Text className="text-gray-500 font-semibold mb-1.5 ml-1 text-sm">Address *</Text>
            <View className="bg-gray-50 border border-gray-100 flex-row items-center px-3.5 rounded-2xl">
              <Ionicons name="location-outline" size={18} color="#1a5ea1" />
              <TextInput
                placeholder="House #, Street, Area"
                value={address}
                onChangeText={setAddress}
                className="flex-1 p-3.5 text-gray-800 text-base"
              />
            </View>
          </View>

          <View>
            <Text className="text-gray-500 font-semibold mb-1.5 ml-1 text-sm">Instructions / Request Detail</Text>
            <TextInput
              placeholder="E.g. Main gate bell is broken, call before reaching..."
              value={requestDetails}
              onChangeText={setRequestDetails}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              className="bg-gray-50 border border-gray-100 p-3.5 rounded-2xl text-gray-800 h-28 text-base"
            />
          </View>
        </View>

        <View className="h-28" />
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-white border-t border-slate-100 shadow-md">
        <TouchableOpacity
          onPress={handleContinue}
          className="bg-[#1a5ea1] py-4 rounded-2xl items-center shadow-md active:opacity-90"
        >
          <Text className="text-white text-base font-bold">Confirm & Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BookServiceScreen;