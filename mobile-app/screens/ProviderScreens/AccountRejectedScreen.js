import {React,useContext} from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {AuthContext} from '../../context/AuthContext'

const AccountRejectedScreen = ({ route, navigation }) => {
  const providerData = route?.params?.providerData;
    const {logout} = useContext(AuthContext)
  const rejectionReason = 
    providerData?.accountRejectionReason || 
    providerData?.providerInfo?.accountRejectionReason || 
    'Your submitted documents or details did not meet our verification criteria.';

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }} 
        className="px-6 py-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mt-6">
          <View className="w-24 h-24 rounded-full bg-rose-100 items-center justify-center mb-6 border-4 border-rose-50 shadow-sm">
            <Ionicons name="close-circle" size={58} color="#e11d48" />
          </View>

          <Text className="text-2xl font-black text-slate-900 text-center">
            Verification Application Rejected
          </Text>
          
          <Text className="text-slate-500 text-xs text-center mt-2 px-2 leading-5 font-medium">
            The Nazdeek Admin team has reviewed your provider account request and rejected it.
          </Text>

          <View className="w-full bg-white p-5 rounded-2xl border border-rose-200 mt-6 shadow-sm">
            <View className="flex-row items-center mb-2">
              <Ionicons name="alert-circle" size={20} color="#e11d48" />
              <Text className="text-rose-700 font-bold text-sm ml-2">Rejection Reason</Text>
            </View>
            <View className="bg-rose-50/60 p-3 rounded-xl border border-rose-100 mt-1">
              <Text className="text-slate-800 text-xs leading-5 font-semibold">
                "{rejectionReason}"
              </Text>
            </View>
          </View>

          <View className="w-full bg-blue-50/80 p-4 rounded-xl mt-4 flex-row items-start border border-blue-100">
            <Ionicons name="information-circle" size={20} color="#1d4ed8" style={{ marginTop: 1 }} />
            <Text className="text-slate-700 text-xs ml-2.5 flex-1 font-medium leading-5">
              Please review the reason provided above and re-submit your application with updated documents or correct details.
            </Text>
          </View>
        </View>

        <View className="w-full my-6 space-y-3">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ProviderSetup')}
            className="w-full bg-blue-800  py-4 rounded-2xl items-center shadow-md flex-row justify-center gap-2"
          >
            <Ionicons name="cloud-upload-outline" size={20} color="#ffffff" />
            <Text className="text-white font-extrabold text-sm uppercase tracking-wider">
              Resubmit Application 
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={logout}
            className="w-full bg-slate-200 py-3.5 rounded-2xl items-center mt-3"
          >
            <Text className="text-slate-700 font-bold text-xs uppercase tracking-wider">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountRejectedScreen;