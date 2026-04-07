import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


import CustomerDashboard from '../screens/customerDashboard';
import ProviderDashboard from '../screens/providerDashboard';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1a5ea1',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={CustomerDashboard} 
        options={{ title: 'Home' }}
      />
      
     
      <Tab.Screen 
        name="Orders" 
        component={CustomerDashboard} 
        options={{ title: 'Orders' }}
      />

      <Tab.Screen 
        name="Profile" 
        component={CustomerDashboard} 
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;