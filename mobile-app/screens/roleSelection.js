import React from 'react';
import { View, Text,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const RoleSelection = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-white justify-center px-6">
      <Text className="text-2xl font-bold text-gray-800 mb-2">
        How will you use Nazdeek?
      </Text>
      <Text className="text-gray-500 mb-10">
        
      </Text>

     
      <TouchableOpacity 
        onPress={() => navigation.navigate('AppTabs')}
        className="flex-row items-center p-6 bg-blue-50 border border-blue-200 rounded-xl mb-4"
      >
        <View className="bg-blue-600 p-3 rounded-lg mr-4">
          <Ionicons name="person-outline" size={28} color="white" />
        </View>
        <View>
          <Text className="text-lg font-bold text-blue-900">I'm a customer</Text>
          <Text className="text-blue-700/60 text-sm">Book services </Text>
        </View>
      </TouchableOpacity>

     
      <TouchableOpacity 
        onPress={() => navigation.navigate('ProviderRegisterScreen')}
        className="flex-row items-center p-6 bg-green-50 border border-green-100 rounded-xl"
      >
        <View className="bg-green-100 p-3 rounded-lg mr-4">
          <Ionicons name="add-outline" size={28} color="#059669" />
        </View>
        <View>
          <Text className="text-lg font-bold text-green-900">I'm a service provider</Text>
          <Text className="text-green-700/60 text-sm">Offer services </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RoleSelection;