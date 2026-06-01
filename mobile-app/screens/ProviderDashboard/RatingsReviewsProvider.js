import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const RatingsReviewsProvider = ({ navigation }) => {
 
  const reviewsList = [
    {
      id: '1',
      customerName: 'Ayesha Khan',
      rating: 5,
      comment: 'Excellent service! She cleaned the entire kitchen perfectly and was very polite. Highly recommended.',
      date: 'May 15, 2026',
    },
    {
      id: '2',
      customerName: 'Imran Khan',
      rating: 4,
      comment: 'Very professional work. Arrived on time and did a great job with deep home cleaning.',
      date: 'May 10, 2026',
    },
    {
      id: '3',
      customerName: 'Musa Ali',
      rating: 5,
      comment: 'Superb experience. Quick and spotless cleaning. Will definitely book again!',
      date: 'April 28, 2026',
    },
  ];

 
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i <= rating ? 'star' : 'star-o'}
          size={14}
          color="#eab308"
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars; 
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

    
      <View className="px-6 py-4 mt-8 flex-row items-center border-b border-gray-50">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-900">Ratings & Reviews</Text>
      </View>

     
      <ScrollView className="flex-1 px-6 mt-4" showsVerticalScrollIndicator={false}>
        
        
        <View className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 items-center mb-6">
          <Text className="text-4xl font-extrabold text-[#1a5ea1]">4.9</Text>
          <View className="flex-row my-2">
            {renderStars(5)}
          </View>
          <Text className="text-gray-500 text-sm">Based on {reviewsList.length} reviews</Text>
        </View>

        <Text className="text-lg font-bold text-gray-900 mb-3">All Reviews</Text>

       
        {reviewsList.map((item) => (
          <View key={item.id} className="mb-4 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm shadow-gray-50">
            
            
            <View className="flex-row justify-between items-center mb-2">
              <View>
                <Text className="text-base font-semibold text-gray-900">{item.customerName}</Text>
                <View className="flex-row mt-1">
                  {renderStars(item.rating)}
                </View>
              </View>
              <Text className="text-gray-400 text-xs">{item.date}</Text>
            </View>

           
            <Text className="text-gray-600 text-sm leading-5 mt-1">
              {item.comment}
            </Text>

          </View>
        ))}

      </ScrollView>
    </View>
  );
};

export default RatingsReviewsProvider;