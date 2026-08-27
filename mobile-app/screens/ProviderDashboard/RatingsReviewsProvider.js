import { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { providerReviews } from '../../api/ProviderApi';
import { AuthContext } from '../../context/AuthContext';

const RatingsReviewsProvider = ({ navigation }) => {
  const { providerInfo } = useContext(AuthContext);
  const [reviewsList, setReviewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const providerId = providerInfo?._id || providerInfo?.id;

  useEffect(() => {
    if (providerId) {
      fetchReviews(providerId);
    }
  }, [providerId]);

  const fetchReviews = async (id) => {
    setLoading(true);
    try {
      const res = await providerReviews(id);
      const data = res?.data || res;
      if (data?.reviews) {
        setReviewsList(data.reviews);
      }
    } catch (error) {
      console.log("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAverage = () => {
    if (!reviewsList.length) return "0.0";
    const total = reviewsList.reduce((acc, curr) => acc + (curr.rating || 0), 0);
    return (total / reviewsList.length).toFixed(1);
  };

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

  const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const dateObj = new Date(isoDate);
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#1a5ea1" />
        </View>
      ) : (
        <ScrollView className="flex-1 px-6 mt-4" showsVerticalScrollIndicator={false}>
          
          <View className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 items-center mb-6">
            <Text className="text-4xl font-extrabold text-[#1a5ea1]">{calculateAverage()}</Text>
            <View className="flex-row my-2">
              {renderStars(Math.round(Number(calculateAverage())))}
            </View>
            <Text className="text-gray-500 text-sm">Based on {reviewsList.length} reviews</Text>
          </View>

          <Text className="text-lg font-bold text-gray-900 mb-3">All Reviews</Text>

          {reviewsList.length === 0 ? (
            <View className="items-center py-10">
              <Text className="text-gray-400 text-base">No reviews yet.</Text>
            </View>
          ) : (
            reviewsList.map((item) => {
              const name = item?.userId?.name || 'Anonymous';
              const rating = item?.rating || 0;
              const comment = item?.comment || '';
              const date = formatDate(item?.createdAt);

              return (
                <View key={item._id} className="mb-4 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm shadow-gray-50">
                  <View className="flex-row justify-between items-center mb-2">
                    <View>
                      <Text className="text-base font-semibold text-gray-900">{name}</Text>
                      <View className="flex-row mt-1">
                        {renderStars(rating)}
                      </View>
                    </View>
                    <Text className="text-gray-400 text-xs">{date}</Text>
                  </View>

                  <Text className="text-gray-600 text-sm leading-5 mt-1">
                    {comment}
                  </Text>
                </View>
              );
            })
          )}

        </ScrollView>
      )}
    </View>
  );
};

export default RatingsReviewsProvider;