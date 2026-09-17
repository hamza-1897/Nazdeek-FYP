import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import ProviderDashboard from '../screens/ProviderDashboard';
import MyServicesProvider from '../screens/ProviderDashboard/MyServicesProvider';
import InboxScreen from '../screens/InboxScreen';
import ProvidersBooking from '../screens/ProviderDashboard/ProvidersBooking';
import ProvProfile from '../screens/ProviderDashboard/ProvProfile';

const Tab = createBottomTabNavigator();

export default function ProviderTabNavigator() {
  const { unReadMessagesCount } = useContext(AuthContext);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#1a5ea1',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 70,
          paddingBottom: 10,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: '#f1f5f9',
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Services') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
          } else if (route.name === 'Bookings') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={ProviderDashboard} />
      <Tab.Screen name="Services" component={MyServicesProvider} />
      
      <Tab.Screen 
        name="Chat" 
        component={InboxScreen} 
        options={{
          tabBarBadge: unReadMessagesCount > 0 
            ? (unReadMessagesCount > 5 ? '5+' : unReadMessagesCount) 
            : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#ef4444',
            color: '#ffffff',
            fontSize: 10,
            fontWeight: 'bold',
            minWidth: 18,
            height: 18,
            borderRadius: 9,
            lineHeight: 18,
          },
        }}
      />
      
      <Tab.Screen name="Bookings" component={ProvidersBooking} />
      <Tab.Screen name="Profile" component={ProvProfile} />
    </Tab.Navigator>
  );
}