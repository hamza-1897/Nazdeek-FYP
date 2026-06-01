import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProviderTabs = ({ activeTab, navigation }) => {
  
  const handleTabPress = (screenName) => {
    navigation.navigate({
      name: screenName,
      key: screenName,
      merge: true,
    });
  };

  return (
    <View className="flex-row justify-around py-4 border-t border-gray-100 bg-white pb-8">
      <TabItem 
        icon="home-outline" 
        label="Home" 
        active={activeTab === 'Home'} 
        onPress={() => handleTabPress('ProviderDashboard')} 
      />
      
     
      <TabItem 
        icon="grid-outline" 
        label="Services" 
        active={activeTab === 'Services'} 
        onPress={() => handleTabPress('serviceScreen')} 
      />
      
      <TabItem 
        icon="chatbubble-outline" 
        label="Chat" 
        active={activeTab === 'Chat'} 
        onPress={() => handleTabPress('ChatScreen')} 
      />
      
      <TabItem 
        icon="person-outline" 
        label="Profile" 
        active={activeTab === 'Profile'} 
        onPress={() => handleTabPress('ProvProfileScreen')} 
      />
    </View>
  );
};

const TabItem = ({ icon, label, active, onPress }) => (
  <TouchableOpacity className="items-center" onPress={onPress}>
    <Ionicons name={icon} size={24} color={active ? "#1a5ea1" : "#9ca3af"} />
    <Text className={`mt-1 font-medium text-[10px] ${active ? 'text-[#1a5ea1]' : 'text-gray-400'}`}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default ProviderTabs;