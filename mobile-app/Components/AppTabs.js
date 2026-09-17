import React ,{useContext}from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import HomeScreen from '../screens/homeScreen';
import ServicesScreen from '../screens/serviceScreen';
import InboxScreen from '../screens/InboxScreen';
import BookingsScreen from '../screens/bookingScreen';
import ProfileScreen from '../screens/profileScreen';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  const { unReadMessagesCount } = useContext(AuthContext);
  return (
    <Tab.Navigator
    initialRouteName="Home"

      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#1a5ea1',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: { 
          left: 15,
          right: 15,
          height: 70,
        backgroundColor: '#ffffff',
          elevation: 10,
          paddingBottom: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Services') iconName = focused ? 'grid' : 'grid-outline';
          else if (route.name === 'Chat') iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
          else if (route.name === 'Bookings') iconName = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';

          return <Ionicons name={iconName} size={26} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Chat" component={InboxScreen} 
        options={{
          tabBarBadge: unReadMessagesCount > 0 ? (unReadMessagesCount > 5 ? '5+' : unReadMessagesCount) : undefined,
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
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppTabs;