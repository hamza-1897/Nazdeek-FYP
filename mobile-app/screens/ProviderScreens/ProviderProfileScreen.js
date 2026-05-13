import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProviderProfileScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Gallery');

  const provider = {
    name: 'Zayaan Khan',
    category: 'Cleaning Services',
    location: 'Mandi Bahauddin, Pakistan',
    rating: '4.9',
    reviews: '2',
    customers: '500+',
    experience: '10+',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
  };

  const servicesList = [
    { id: 1, name: 'Deep House Cleaning', price: '1500' },
    { id: 2, name: 'Kitchen Degreasing', price: '800' },
    { id: 3, name: 'Bathroom Sanitation', price: '600' },
  ];

  const galleryImages = [
    'https://images.pexels.com/photos/4886600/pexels-photo-4886600.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/6195122/pexels-photo-6195122.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/4099469/pexels-photo-4099469.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ];

  const reviewsData = [
    {
      id: 1,
      name: 'Abas Ali',
      date: '4 months ago',
      rating: 5,
      comment: 'Professional service! The cleaning was thorough and the provider was very polite. Highly recommended for deep cleaning.',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 2,
      name: 'Maryam Asghar',
      date: '2 months ago',
      rating: 4,
      comment: 'Great experience. They arrived on time and did a fantastic job with the kitchen and bathrooms.',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="px-6 py-4 flex-row justify-between items-center mt-8">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="w-10 h-10 border border-gray-100 rounded-full items-center justify-center bg-white shadow-sm"
        >
          <Ionicons name="arrow-back" size={22} color="#1a5ea1" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">Service Provider</Text>
        <TouchableOpacity className="w-10 h-10 border border-gray-100 rounded-full items-center justify-center bg-white shadow-sm">
          <Ionicons name="share-social-outline" size={20} color="#1a5ea1" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="items-center px-6 pt-6">
          <View className="relative">
            <Image 
              source={{ uri: provider.image }} 
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
            />
            <View className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white items-center justify-center">
              <Ionicons name="checkmark" size={14} color="white" />
            </View>
          </View>
          
          <Text className="text-2xl font-bold text-gray-900 mt-4">{provider.name}</Text>
          <Text className="text-gray-400 font-medium">{provider.category}</Text>
          
          <View className="flex-row items-center mt-2">
            <Ionicons name="location-sharp" size={16} color="#1a5ea1" />
            <Text className="text-gray-500 ml-1">{provider.location}</Text>
          </View>
        </View>

        <View className="flex-row justify-between px-6 mt-8">
          <StatItem icon="people-outline" value={provider.customers} label="Customer" />
          <StatItem icon="briefcase-outline" value={provider.experience} label="Years Exp." />
          <StatItem icon="star-outline" value={provider.rating} label="Rating" />
          <StatItem icon="chatbubble-outline" value={provider.reviews} label="Review" />
        </View>

        <View className="flex-row border-b border-gray-100 mt-8 px-6">
          {['Services', 'About', 'Gallery', 'Review'].map((tab) => (
            <TouchableOpacity 
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 items-center pb-3 ${activeTab === tab ? 'border-b-2 border-[#1a5ea1]' : ''}`}
            >
              <Text className={`font-bold ${activeTab === tab ? 'text-[#1a5ea1]' : 'text-gray-400'}`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="px-6 py-6">
          {activeTab === 'Services' && (
            <View>
              <Text className="text-lg font-bold text-gray-800 mb-4">Offered Services</Text>
              {servicesList.map((item) => (
                <View key={item.id} className="flex-row justify-between items-center bg-gray-50 p-4 rounded-2xl mb-3 border border-gray-100">
                  <Text className="text-gray-700 font-medium">{item.name}</Text>
                  <Text className="text-[#1a5ea1] font-bold text-base">Rs. {item.price}</Text>
                </View>
              ))}
            </View>
          )}

          {activeTab === 'Gallery' && (
            <View>
              <Text className="text-lg font-bold text-gray-800 mb-4">Gallery ({galleryImages.length})</Text>
              <View className="flex-row flex-wrap justify-between">
                {galleryImages.map((img, index) => (
                  <View key={index} className="w-[48%] h-36 mb-4 rounded-3xl overflow-hidden shadow-sm">
                    <Image source={{ uri: img }} className="w-full h-full" resizeMode="cover" />
                  </View>
                ))}
              </View>
            </View>
          )}

          {activeTab === 'About' && (
            <View>
              <Text className="text-lg font-bold text-gray-800 mb-2">About Provider</Text>
              <Text className="text-gray-500 leading-6">Zayaan is a professional cleaner with over 10 years of experience in deep house cleaning and office maintenance. Known for being punctual and detail-oriented.</Text>
            </View>
          )}

          {activeTab === 'Review' && (
            <View>
              <Text className="text-lg font-bold text-gray-800 mb-6">Review</Text>

              {reviewsData.map((review) => (
                <View key={review.id} className="mb-8 pb-6 border-b border-gray-50">
                  <View className="flex-row justify-between items-center mb-3">
                    <View className="flex-row items-center">
                      <Image source={{ uri: review.image }} className="w-10 h-10 rounded-full mr-3" />
                      <Text className="text-gray-900 font-bold text-base">{review.name}</Text>
                    </View>
                    <Text className="text-gray-500 text-xs">{review.date}</Text>
                  </View>
                  
                  <Text className="text-gray-600 leading-5 text-sm mb-2">{review.comment}</Text>
                  
                  {/* Stars Section: Comment ke niche */}
                  <View className="flex-row items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Ionicons 
                        key={star} 
                        name={star <= Math.floor(review.rating) ? "star" : "star-outline"} 
                        size={16} 
                        color="#fbbf24" 
                        style={{ marginRight: 2 }}
                      />
                    ))}
                    <Text className="ml-2 text-gray-800 font-bold text-xs">{review.rating}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const StatItem = ({ icon, value, label }) => (
  <View className="items-center">
    <View className="bg-blue-50 p-3 rounded-full mb-2">
      <Ionicons name={icon} size={20} color="#1a5ea1" />
    </View>
    <Text className="font-bold text-gray-800">{value}</Text>
    <Text className="text-gray-400 text-[10px] uppercase font-bold">{label}</Text>
  </View>
);

export default ProviderProfileScreen;