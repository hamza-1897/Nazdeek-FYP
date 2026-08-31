import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Clipboard,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getPremiumPlans } from '../../api/ProviderApi';

const SelectPlanScreen = ({ navigation }) => {
  const [plans, setPlans] = useState([]);
  const [paymentAccounts, setPaymentAccounts] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await getPremiumPlans();
      console.log('API Response:', response);

      const resData = response?.data || response;
      const fetchedPlans = resData?.data?.plans || resData?.plans || [];
      const fetchedAccounts = resData?.data?.paymentAccounts || resData?.paymentAccounts || [];

      setPlans(fetchedPlans);
      setPaymentAccounts(fetchedAccounts);

      if (fetchedPlans.length > 0) {
        setSelectedPlan(fetchedPlans[0]);
      }
    } catch (error) {
      console.error('Fetch Plans Error:', error);
      Alert.alert('Error', 'Failed to fetch subscription plans');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert('Copied!', 'Account number copied to clipboard');
  };

  const handleProceed = () => {
    if (!selectedPlan) {
      Alert.alert('Select Plan', 'Please select a subscription plan to continue.');
      return;
    }

    navigation.navigate('PaymentUploadScreen', {
      type: 'subscription',
      selectedPlan: selectedPlan,
      bankAccounts: paymentAccounts,
    });
  };

  const premiumPerks = [
    { id: 1, icon: 'infinite', title: 'Unlimited Services', desc: 'Add & offer unlimited services without any limit' },
    { id: 2, icon: 'home', title: 'Home Page Feature', desc: 'Get featured directly on Customer Home Screen' },
    { id: 3, icon: 'trending-up', title: 'Top Search Ranking', desc: 'Your listings stay on top in search & category pages' },
    { id: 4, icon: 'checkmark-circle', title: 'Verified Badge', desc: 'Get official Gold Badge to build maximum customer trust' },
  ];

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#1a5ea1" />
        <Text className="text-gray-400 text-xs font-medium mt-3">Loading Subscription Plans...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <View className="px-6 py-4 flex-row items-center justify-between border-b border-gray-100 bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">Upgrade to Premium</Text>
        <View className="w-6" />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        
        <View className="bg-gradient-to-r from-blue-900 to-indigo-900 bg-[#1a5ea1] p-5 rounded-3xl mb-6 shadow-md">
          <View className="flex-row items-center mb-3">
            <Ionicons name="ribbon-sharp" size={26} color="#fbbf24" />
            <Text className="text-white font-extrabold text-lg ml-2">Why Go Premium?</Text>
          </View>
          <Text className="text-blue-100 text-xs mb-4 font-medium">
            Boost your bookings & grow your service business 5x faster.
          </Text>

          <View className="space-y-3">
            {premiumPerks.map((perk) => (
              <View key={perk.id} className="flex-row items-start mb-2.5">
                <View className="bg-white/10 p-1.5 rounded-lg mr-3 mt-0.5">
                  <Ionicons name={perk.icon} size={16} color="#fbbf24" />
                </View>
                <View className="flex-1">
                  <Text className="text-white text-xs font-bold">{perk.title}</Text>
                  <Text className="text-blue-100/80 text-[11px] font-normal">{perk.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <Text className="text-xl font-bold text-gray-900 mb-1">Choose Your Plan</Text>
        <Text className="text-gray-500 text-xs mb-4">
          Select a duration plan that best fits your business needs.
        </Text>

        <View className="mb-6">
          {plans.length === 0 ? (
            <Text className="text-gray-400 text-sm text-center py-4">No plans available.</Text>
          ) : (
            plans.map((plan) => {
              const isSelected = selectedPlan?.id === plan.id || selectedPlan?._id === plan._id;
              return (
                <TouchableOpacity
                  key={plan.id || plan._id}
                  onPress={() => setSelectedPlan(plan)}
                  className={`p-4 rounded-2xl border-2 flex-row items-center justify-between mb-3 bg-white ${
                    isSelected ? 'border-[#1a5ea1] bg-blue-50/50' : 'border-gray-200'
                  }`}
                >
                  <View className="flex-row items-center">
                    <View
                      className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
                        isSelected ? 'border-[#1a5ea1] bg-[#1a5ea1]' : 'border-gray-300'
                      }`}
                    >
                      {isSelected && <Ionicons name="checkmark" size={14} color="white" />}
                    </View>
                    <View>
                      <Text className="text-base font-bold text-gray-900">{plan.title}</Text>
                      <Text className="text-xs text-gray-400 font-medium">Duration: {plan.duration}</Text>
                    </View>
                  </View>

                  <Text className="text-lg font-extrabold text-[#1a5ea1]">
                    {plan.currency || 'PKR'} {plan.price}
                  </Text>
                </TouchableOpacity>
              );
            })
          )}
        </View>

        {paymentAccounts.length > 0 && (
          <View className="mb-6">
            <Text className="text-base font-bold text-gray-900 mb-3">Bank Details for Payment</Text>
            {paymentAccounts.map((acc, idx) => (
              <View key={acc._id || idx} className="bg-white p-5 rounded-2xl border border-gray-200 mb-3">
                <View className="flex-row items-center justify-between mb-3 border-b border-gray-100 pb-2">
                  <Text className="text-xs font-semibold text-gray-400">Bank Name</Text>
                  <Text className="text-sm font-bold text-gray-900">{acc.bankName}</Text>
                </View>

                <View className="flex-row items-center justify-between mb-3 border-b border-gray-100 pb-2">
                  <Text className="text-xs font-semibold text-gray-400">Account Title</Text>
                  <Text className="text-sm font-bold text-gray-900">{acc.accountTitle}</Text>
                </View>

                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-xs font-semibold text-gray-400">Account Number</Text>
                    <Text className="text-base font-extrabold text-[#1a5ea1] mt-0.5">{acc.accountNumber}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => copyToClipboard(acc.accountNumber)}
                    className="bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100"
                  >
                    <Text className="text-xs font-bold text-[#1a5ea1]">Copy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View className="p-6 bg-white border-t border-gray-100">
        <TouchableOpacity
          onPress={handleProceed}
          className="bg-[#1a5ea1] py-4 rounded-xl items-center shadow-sm active:opacity-90"
        >
          <Text className="text-white font-bold text-base">Proceed to Payment Proof</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SelectPlanScreen;