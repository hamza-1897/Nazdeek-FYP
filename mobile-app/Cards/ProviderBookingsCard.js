import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProviderBookingsCard = ({ item, onAccept, onReject, onComplete }) => {
  return (
    <View className="mb-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
      <View className="flex-row items-center justify-between pb-3 border-b border-gray-100">
        <View className="flex-row items-center flex-1">
          <Image
            source={{ uri: item.customerImage }}
            className="w-11 h-11 rounded-full mr-3"
          />
          <View className="flex-1">
            <Text className="text-base font-bold text-gray-900">{item.customerName}</Text>
            <Text className="text-gray-500 text-xs font-medium">{item.serviceName}</Text>
          </View>
        </View>

        <View
          className={`px-2.5 py-1 rounded-full ${
            item.status === 'pending'
              ? 'bg-amber-100'
              : item.status === 'accepted'
              ? 'bg-blue-100'
              : 'bg-emerald-100'
          }`}
        >
          <Text
            className={`text-[10px] font-bold capitalize ${
              item.status === 'pending'
                ? 'text-amber-700'
                : item.status === 'accepted'
                ? 'text-[#1a5ea1]'
                : 'text-emerald-700'
            }`}
          >
            {item.status}
          </Text>
        </View>
      </View>

      <View className="py-3 gap-2">
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={15} color="#64748b" />
          <Text className="text-xs text-gray-600 font-medium ml-2">{item.dateTime}</Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="cash-outline" size={15} color="#64748b" />
          <Text className="text-xs text-gray-900 font-bold ml-2">{item.price}</Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={15} color="#64748b" />
          <Text className="text-xs text-gray-600 font-medium ml-2 flex-1" numberOfLines={1}>
            {item.address}
          </Text>
        </View>

        {item.notes ? (
          <View className="flex-row items-start mt-1 p-2 bg-gray-50 rounded-lg">
            <Ionicons name="document-text-outline" size={14} color="#64748b" className="mt-0.5" />
            <Text className="text-[11px] text-gray-500 ml-1.5 flex-1">{item.notes}</Text>
          </View>
        ) : null}
      </View>

      {item.status === 'pending' && (
        <View className="flex-row gap-2 mt-2 pt-3 border-t border-gray-100">
          <TouchableOpacity
            onPress={() => onReject(item.id)}
            className="flex-1 border border-red-500 py-2 rounded-xl items-center"
          >
            <Text className="text-red-500 font-bold text-xs">Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onAccept(item.id)}
            className="flex-1 bg-[#1a5ea1] py-2 rounded-xl items-center"
          >
            <Text className="text-white font-bold text-xs">Accept</Text>
          </TouchableOpacity>
        </View>
      )}

      {item.status === 'accepted' && (
        <View className="flex-row gap-2 mt-2 pt-3 border-t border-gray-100">
          <TouchableOpacity
            onPress={() => Alert.alert('Calling', `Calling ${item.customerName}...`)}
            className="p-2.5 border border-gray-200 rounded-xl items-center justify-center"
          >
            <Ionicons name="call-outline" size={16} color="#1a5ea1" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onComplete(item.id)}
            className="flex-1 bg-emerald-600 py-2.5 rounded-xl items-center justify-center"
          >
            <Text className="text-white font-bold text-xs">Mark as Completed</Text>
          </TouchableOpacity>
        </View>
      )}

      {item.status === 'completed' && (
        <View className="flex-row items-center justify-center mt-1 pt-2 border-t border-gray-100">
          <Ionicons name="checkmark-done-circle" size={16} color="#059669" />
          <Text className="text-emerald-600 font-bold text-xs ml-1.5">Completed</Text>
        </View>
      )}
    </View>
  );
};

export default ProviderBookingsCard;