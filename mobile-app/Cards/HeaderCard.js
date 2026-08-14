import React from 'react';
import { View, Text, TextInput , TouchableOpacity } from 'react-native';
import { SafeAreaFrameContext } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HeaderCard = ({ userName }) => {

  const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return 'Good Morning !!!';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'Good Afternoon !!!';
  } else if (currentHour >= 17 && currentHour < 21) {
    return 'Good Evening !!!';
  } else {
    return 'Good Night !!!';
  }
};
  const navigation = useNavigation()
  return (
    
          <View className="bg-[#1a5ea1] p-4 rounded-b-[40px] shadow-2xl">

      
      <View className="flex-row justify-between items-center mb-8">
        <View>

          <Text className="text-blue-100 text-lg font-medium">{getGreeting()}</Text>

          <Text className="text-white text-xl font-bold tracking-tight">
            {userName}
          </Text>
        </View>
        
        <TouchableOpacity className="bg-white/20 p-3 rounded-2xl border border-white/30"
        onPress={()=> navigation.navigate('Notification')}
        >
          <Ionicons name="notifications" size={18} color="white" />
        </TouchableOpacity>
      </View>

      <View className="bg-white flex-row items-center px-4  rounded-2xl shadow-lg">
        <Ionicons name="search" size={22} color="#1a5ea1" />
        <TextInput 
          placeholder="Search services..." 
          placeholderTextColor="#94a3b8"
          className="ml-3 flex-1 text-gray-800 text-base"
        />
      </View>
    </View>
    
        
  );
};

export default HeaderCard;