import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

const BookingCard = ({ 
  serviceName, 
  providerName, 
  price, 
  imageUri, 
  bookingDate, 
  bookingTime, 
  description, 
  bookingAddress,
  customerName,
  customerPhone,
  status = "Pending",
  isReviewed,
  onCancel,
  onLeaveReview,
  fullBookingData // Optional: Agar poora item parent se aa raha ho
}) => {
  const navigation = useNavigation();

  const getStatusStyles = (statusStr) => {
    const current = statusStr?.toLowerCase();
    if (current === 'completed') return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' };
    if (current === 'cancelled') return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100' };
    if (current === 'rejected') return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100' };
    if (current === 'accepted') return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' };
    if (current === 'pending') return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' };
    return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' };
  };

  const statusStyle = getStatusStyles(status);
  const currentStatus = status?.toLowerCase();

  // Rebook Action Function
  const handleRebook = () => {
    // Agar parent component se fullBookingData paas ho raha hai to wo use karein, warna fallback object create karein
    const previousBooking = fullBookingData || {
      customerName,
      customerPhone,
      bookingAddress,
      description,
      price,
      serviceId: fullBookingData?.serviceId || { serviceName, price, serviceImages: [imageUri] },
      providerId: fullBookingData?.providerId || { businessName: providerName }
    };

    const serviceData = fullBookingData?.serviceId || {
      serviceName,
      price,
      serviceImages: [imageUri],
      providerId: fullBookingData?.providerId || { businessName: providerName }
    };

    navigation.navigate('BookService', { 
      serviceData: serviceData, 
      previousBooking: previousBooking,        
      isRebook: true 
    });
  };

  return (
    <View className="bg-white rounded-2xl p-4 mb-5 border border-slate-100 shadow-md shadow-slate-300/60 elevation-3">
      
      <View className="flex-row items-start">
        <Image 
          source={{ uri: imageUri || 'https://via.placeholder.com/150' }} 
          className="w-20 h-20 rounded-xl bg-slate-100"
          resizeMode="cover"
        />
        
        <View className="flex-1 ml-3.5">
          <View className="flex-row justify-between items-start">
            <Text className="text-slate-900 font-bold text-base flex-1 pr-2" numberOfLines={1}>
              {serviceName}
            </Text>
            <View className={`${statusStyle.bg} ${statusStyle.border} px-2.5 py-0.5 rounded-full border`}>
              <Text className={`${statusStyle.text} text-[10px] font-bold uppercase tracking-wider`}>
                {status}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mt-1">
            <Ionicons name="person-circle-outline" size={15} color="#64748b" />
            <Text className="text-slate-500 text-xs ml-1 font-medium">{providerName}</Text>
          </View>

          <View className="flex-row items-center mt-2.5">
            <Text className="text-[#1a5ea1] font-extrabold text-base">Rs. {price}</Text>
          </View>
        </View>
      </View>

      <View className="flex-row items-center justify-between border-t border-b border-slate-50 py-2.5 my-3">
        <View className="flex-row items-center flex-1">
          <Ionicons name="calendar-outline" size={14} color="#1a5ea1" />
          <Text className="text-slate-600 text-xs ml-1.5 font-semibold">{bookingDate}</Text>
        </View>
        <View className="flex-row items-center flex-1 justify-end">
          <Ionicons name="time-outline" size={14} color="#1a5ea1" />
          <Text className="text-slate-600 text-xs ml-1.5 font-semibold">{bookingTime}</Text>
        </View>
      </View>

      <View className="bg-slate-50/50 border border-slate-100 rounded-xl p-3 mb-3">
        <View className="flex-row items-center justify-between mb-1.5">
          <View className="flex-row items-center flex-1">
            <Ionicons name="person-outline" size={13} color="#475569" />
            <Text className="text-slate-700 text-xs font-semibold ml-1.5" numberOfLines={1}>
              {customerName || "For Myself"}
            </Text>
          </View>
          <View className="flex-row items-center flex-1 justify-end">
            <Ionicons name="call-outline" size={13} color="#475569" />
            <Text className="text-slate-600 text-xs ml-1.5 font-medium">
              {customerPhone}
            </Text>
          </View>
        </View>
        
        <View className="flex-row items-start mt-0.5">
          <Ionicons name="location-outline" size={14} color="#e11d48" className="mt-0.5" />
          <Text className="text-slate-600 text-xs ml-1.5 flex-1 leading-normal" numberOfLines={2}>
            {bookingAddress || "No Address Provided"}
          </Text>
        </View>
      </View>

      {description ? (
        <View className="bg-slate-50/70 rounded-xl p-2.5 mb-2">
          <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Your Note:</Text>
          <Text className="text-slate-600 text-xs leading-relaxed" numberOfLines={2}>
            {description}
          </Text>
        </View>
      ) : null}

      <View className="flex-row justify-end mt-1.5">
        {currentStatus !== 'cancelled' && currentStatus !== 'rejected' && currentStatus !== 'completed' && (
          <TouchableOpacity 
            onPress={onCancel} 
            className="bg-rose-50 px-5 py-1.5 rounded-xl border border-rose-100 active:bg-rose-100"
          >
            <Text className="text-rose-600 text-xs font-bold">Cancel Booking</Text>
          </TouchableOpacity>
        )}
        
        {currentStatus === 'completed' && (
          <TouchableOpacity 
            onPress={onLeaveReview}
            disabled={isReviewed}
            className={`px-5 py-1.5 rounded-xl border transition-all ${
              isReviewed 
                ? 'bg-slate-100 border-slate-200' 
                : 'bg-indigo-50 border-indigo-100 active:bg-indigo-100'
            }`}
          >
            <Text className={`text-xs font-bold ${isReviewed ? 'text-slate-400' : 'text-indigo-600'}`}>
              {isReviewed ? 'Reviewed' : 'Leave Review'}
            </Text>
          </TouchableOpacity>
        )}

        {currentStatus === 'cancelled' && (
          <TouchableOpacity 
            onPress={handleRebook} 
            className="bg-blue-50 px-6 py-1.5 rounded-xl border border-blue-100 active:bg-blue-100"
          >
            <Text className="text-blue-600 text-xs font-bold">Rebook Service</Text>
          </TouchableOpacity>
        )}

        {currentStatus === 'rejected' && (
          <Text className="text-rose-500 text-center text-xs font-bold">Your Booking is Rejected.</Text>
        )}
      </View>

    </View>
  );
};

export default BookingCard;