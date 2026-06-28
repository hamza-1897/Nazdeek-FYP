import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StatusBar, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const LeaveReviewScreen = ({ navigation, route }) => {
  const { bookingId, providerName, serviceName, date } = route.params || { 
    bookingId: null,
    providerName: 'Zara Khan', 
    serviceName: 'Bridal Makeup', 
    date: 'Mar 24'
  };

 
  const [rating, setRating] = useState(0); 
  const [reviewText, setReviewText] = useState('');

  const getInitials = (name) => {
    if (!name) return 'ZK';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRatingStatus = (score) => {
    switch(score) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very good';
      case 5: return 'Excellent';
      default: return 'Tap stars to rate';
    }
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      Alert.alert("Required", "Please select a rating star before submitting.");
      return;
    }
    if (reviewText.trim() === "") {
      Alert.alert("Required", "Please write a short review before submitting.");
      return;
    }

    Alert.alert(
      "Review Submitted",
      "Thank you for your valuable feedback!",
      [{ 
        text: "OK", 
        onPress: () => {
          if (bookingId) {
            navigation.navigate('AppTabs', {
              screen: 'Bookings',
              params: { reviewedBookingId: bookingId },
            });
          } else {
            navigation.goBack();
          }
        } 
      }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 px-6">
            
           
            <View className="py-4 flex-row items-center justify-between mb-6">
              <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
                <Ionicons name="chevron-back" size={24} color="black" />
              </TouchableOpacity>
              <Text className="text-lg font-semibold text-gray-800">Leave a review</Text>
              <View className="w-6" />
            </View>

           
            <ScrollView 
              showsVerticalScrollIndicator={false} 
              contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'space-between', paddingBottom: 24 }}
            >
              <View className="w-full items-center">
               
                <View className="items-center mb-4 mt-2">
                  <View className="w-16 h-16 bg-blue-50 rounded-full items-center justify-center mb-3">
                    <Text className="text-[#1a5ea1] text-lg font-bold">
                      {getInitials(providerName)}
                    </Text>
                  </View>
                  
                  <Text className="text-xl font-bold text-gray-900">{providerName}</Text>
                  <Text className="text-gray-400 text-sm mt-1">{serviceName} · {date}</Text>
                </View>

               
                <View className="items-center my-6">
                  <Text className="text-gray-800 text-base font-medium mb-4">How was the service?</Text>
                  
                 
                  <View className="flex-row justify-center space-x-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity key={star} onPress={() => setRating(star)}>
                        <Ionicons 
                          name={star <= rating ? "star" : "star-outline"} 
                          size={32} 
                          color={star <= rating ? "#f59e0b" : "#d1d5db"} 
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                  
                 
                  <Text className="text-[#f59e0b] font-medium mt-1">
                    {rating > 0 ? `${rating} / 5 — ${getRatingStatus(rating)}` : getRatingStatus(rating)}
                  </Text>
                </View>

                
                <View className="w-full mt-4">
                  <Text className="text-gray-500 text-sm mb-2">Your review</Text>
                  <TextInput
                    multiline
                    value={reviewText}
                    onChangeText={setReviewText}
                    placeholder="Write your review here..."
                    placeholderTextColor="#9ca3af"
                    className="border-b border-gray-200 py-2 text-gray-800 text-base"
                    style={{ minHeight: 40 }}
                  />
                </View>
              </View>

              <TouchableOpacity 
                onPress={handleSubmitReview}
                className="bg-[#1a5ea1] w-full py-4 rounded-none items-center mt-6"
              >
                <Text className="text-white text-base font-semibold">Submit review</Text>
              </TouchableOpacity>

            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LeaveReviewScreen;