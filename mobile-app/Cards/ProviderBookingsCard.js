import {React, useState} from 'react';
import { View, Text, TouchableOpacity, Image, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import {accessChat} from '../api/chatApi';
import { useNavigation } from '@react-navigation/native';

const ProviderBookingsCard = ({ item, onAccept, onReject, onComplete }) => {
  const navigation = useNavigation();
  const [loadingChat, setLoadingChat] = useState(false);

  const formattedDate = item?.bookingDate ? dayjs(item.bookingDate).format('DD MMM, YYYY') : '';
  const customerName = item?.customerName  || 'Customer';
  const customerPhone = item?.customerPhone || 'N/A';
  const profileImageUri =
    item?.userId?.profileImage ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(customerName)}&size=128`;

  const handleCall = () => {
    if (customerPhone !== 'N/A') {
      Linking.openURL(`tel:${customerPhone}`);
    } else {
      Alert.alert('Error', 'Phone number not available');
    }
  };

 const handleMessagePress = async () => {
    try {
      setLoadingChat(true);

      const userId = item?.userId?._id ;
      const userName = item.userId?.name ;
      const userImage = item.userId?.profileImage || null;

      const chatRoom = await accessChat({
        userId: userId,
        providerId: item?.providerId,
      });

     navigation.navigate('ChatScreen', {
        chatId: chatRoom._id,
        senderId: item?.providerId,
        senderModel: 'Provider',
        receiverId: userId,
        receiverModel: 'User',
        receiverName: userName,
        receiverImage: userImage,
      });
    } catch (error) {
      console.error('Error opening chat:', error);
      Alert.alert('Error', 'Chat room open nahi ho saka. Dobara try karein.');
    } finally {
      setLoadingChat(false);
    }
  };

  return (
    <View className="mb-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
      <View className="flex-row items-center justify-between pb-3 border-b border-gray-100">
        <View className="flex-row items-center flex-1">
          <Image source={{ uri: profileImageUri }} className="w-11 h-11 rounded-full mr-3" />
          <View className="flex-1">
            <Text className="text-base font-bold text-gray-900">{customerName}</Text>
            <Text className="text-gray-500 text-xs font-medium">
              {item?.serviceId?.serviceName || 'Service'}
            </Text>
          </View>
        </View>

        <View
          className={`px-2.5 py-1 rounded-full ${
            item?.status === 'pending'
              ? 'bg-amber-100'
              : item?.status === 'accepted'
              ? 'bg-blue-100'
              : item?.status === 'rejected'
              ? 'bg-red-100'
              : 'bg-emerald-100'
          }`}
        >
          <Text
            className={`text-[10px] font-bold capitalize ${
              item?.status === 'pending'
                ? 'text-amber-700'
                : item?.status === 'accepted'
                ? 'text-[#1a5ea1]'
                : item?.status === 'rejected'
                ? 'text-red-700'
                : 'text-emerald-700'
            }`}
          >
            {item?.status}
          </Text>
        </View>
      </View>

      <View className="py-3 gap-2">
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={15} color="#64748b" />
          <Text className="text-xs text-gray-600 font-medium ml-2">
            {formattedDate} - {item?.bookingTime}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="cash-outline" size={15} color="#64748b" />
          <Text className="text-xs text-gray-900 font-bold ml-2">
            PKR {item?.bookingPrice || item?.serviceId?.price}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={15} color="#64748b" />
          <Text className="text-xs text-gray-600 font-medium ml-2 flex-1" numberOfLines={1}>
            {item?.bookingAddress}
          </Text>
        </View>

        {item?.description ? (
          <View className="flex-row items-start mt-1 p-2 bg-gray-50 rounded-lg">
            <Ionicons name="document-text-outline" size={14} color="#64748b" className="mt-0.5" />
            <Text className="text-[11px] text-gray-500 ml-1.5 flex-1">{item.description}</Text>
          </View>
        ) : null}
      </View>

      {item?.status === 'pending' && (
        <View className="flex-row gap-2 mt-2 pt-3 border-t border-gray-100">
          <TouchableOpacity
            onPress={() => onReject(item._id)}
            className="flex-1 border border-red-500 py-2 rounded-xl items-center"
          >
            <Text className="text-red-500 font-bold text-xs">Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onAccept(item._id)}
            className="flex-1 bg-[#1a5ea1] py-2 rounded-xl items-center"
          >
            <Text className="text-white font-bold text-xs">Accept</Text>
          </TouchableOpacity>
        </View>
      )}

      {item?.status === 'accepted' && (
        <View className="mt-2 pt-3 border-t border-gray-100 gap-2">
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={handleCall}
              className="flex-1 border border-gray-200 py-2 px-3 rounded-xl flex-row items-center justify-center bg-gray-50"
            >
              <Ionicons name="call-outline" size={16} color="#1a5ea1" />
              <Text className="text-[#1a5ea1] font-bold text-xs ml-1.5">
                {customerPhone}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleMessagePress}
              className="border border-[#1a5ea1] px-4 py-2 rounded-xl flex-row items-center justify-center bg-blue-50/40"
            >
              <Ionicons name="chatbubble-ellipses-outline" size={16} color="#1a5ea1" />
              <Text className="text-[#1a5ea1] font-bold text-xs ml-1.5">Chat</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => onComplete(item._id)}
            className="w-full bg-emerald-600 py-2.5 rounded-xl items-center justify-center flex-row"
          >
            <Ionicons name="checkmark-done-circle-outline" size={16} color="white" />
            <Text className="text-white font-bold text-xs ml-1.5">Mark as Completed</Text>
          </TouchableOpacity>
        </View>
      )}

      {item?.status === 'cancelled' && (
        <View className="flex-row items-center justify-center mt-1 pt-2 border-t border-gray-100">
          <Ionicons name="checkmark-done-circle" size={16} color="#a40a0a" />
          <Text className="text-emerald-600 font-bold text-xs ml-1.5">Cancelled</Text>
        </View>
      )}

      {item?.status === 'completed' && (
        <View className="flex-row items-center justify-center mt-1 pt-2 border-t border-gray-100">
          <Ionicons name="checkmark-done-circle" size={16} color="#059669" />
          <Text className="text-emerald-600 font-bold text-xs ml-1.5">Completed</Text>
        </View>
      )}

      {item?.status === 'rejected' && (
        <View className="flex-row items-center justify-center mt-1 pt-2 border-t border-gray-100">
          <Ionicons name="close-circle" size={16} color="#dc2626" />
          <Text className="text-red-600 font-bold text-xs ml-1.5">Rejected</Text>
        </View>
      )}
    </View>
  );
};

export default ProviderBookingsCard;