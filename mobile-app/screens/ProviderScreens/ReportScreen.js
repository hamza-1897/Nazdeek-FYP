import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import { createReport } from '../../api/customerApi';
import { AuthContext } from '../../context/AuthContext';

const ReportScreen = ({ navigation, route }) => {
  const { providerName, providerId } = route.params || {};
  const [selectedOption, setSelectedOption] = useState(null);
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { userInfo } = useContext(AuthContext);

  const reportOptions = [
    { id: 1, label: 'Fake Profile', value: 'SPAM' },
    { id: 2, label: 'Spam or Fraud', value: 'FRAUD' },
    { id: 3, label: 'Unusual Activity', value: 'UNUSUAL_ACTIVITY' },
    { id: 4, label: 'Other', value: 'OTHER' },
  ];

  const handleReportSubmit = async () => {
    if (!selectedOption) {
      Alert.alert('Selection Required', 'Please select a reason for reporting.');
      return;
    }

    const reporterId = userInfo?.id || userInfo?._id;
    if (!reporterId) {
      Alert.alert('Error', 'User authentication details missing. Please log in again.');
      return;
    }
    if(!details.trim()) {
      Alert.alert('Details Required', 'Please provide additional details for the report.');
      return;
    }

    const apiPayload = {
      reporterId,
      providerId,
      reportType: selectedOption,
      reason: details,
    };

    setSubmitting(true);

    try {
      await createReport(apiPayload);

      Alert.alert(
        'Thank you for reporting',
        'We have received your feedback and will take necessary action.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'AppTabs' }],
                })
              );
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error submitting report:', error);
      Alert.alert(
        'Submission Failed',
        error?.response?.data?.message || 'Failed to submit report. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-white">
          <StatusBar barStyle="dark-content" />

          <View className="px-6 py-4 flex-row items-center mt-8 border-b border-gray-50">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="w-10 h-10 border border-gray-100 rounded-full items-center justify-center bg-white shadow-sm"
            >
              <Ionicons name="close" size={24} color="#1a5ea1" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-800 ml-4">Report Provider</Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
            className="px-6 pt-6"
          >
            <Text className="text-gray-500 text-sm mb-6">
              Why are you reporting{' '}
              <Text className="font-bold text-gray-900">{providerName || 'this provider'}</Text>?
              Your feedback helps us keep the Nazdeek community safe.
            </Text>

            <View className="mb-8">
              {reportOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => setSelectedOption(option.value)}
                  className={`flex-row items-center justify-between p-4 rounded-2xl mb-3 border ${
                    selectedOption === option.value
                      ? 'border-[#dc2626] bg-red-50'
                      : 'border-gray-100 bg-gray-50'
                  }`}
                >
                  <Text
                    className={`font-medium ${
                      selectedOption === option.value ? 'text-[#dc2626]' : 'text-gray-700'
                    }`}
                  >
                    {option.label}
                  </Text>
                  <View
                    className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                      selectedOption === option.value ? 'border-[#dc2626]' : 'border-gray-300'
                    }`}
                  >
                    {selectedOption === option.value && (
                      <View className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-gray-800 font-bold mb-3">Additional Details</Text>
            <TextInput
              placeholder="Describe the issue in detail (optional)..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              value={details}
              onChangeText={setDetails}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-gray-700 h-32 mb-10"
            />

            <TouchableOpacity
              onPress={handleReportSubmit}
              disabled={submitting}
              className={`bg-[#dc2626] py-4 rounded-full shadow-lg items-center mb-6 ${
                submitting ? 'opacity-70' : 'active:opacity-90'
              }`}
            >
              {submitting ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text className="text-white text-lg font-extrabold">Submit Report</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ReportScreen;