import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Context
import { AuthProvider } from '../context/AuthContext';

// --- AUTH & ONBOARDING SCREENS ---
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/loginScreen';
import SignupScreen from '../screens/signupScreen';
import ForgotPassword from '../screens/forgotPassword'; 
import VerifyOTP from '../screens/verifyOTP'; 
import ResetPassword from '../screens/resetPassword';
import PasswordUpdated from '../screens/passwordUpdate';
import RoleSelection from '../screens/roleSelection';
import ProviderSetup from '../screens/ProviderScreens/ProviderSetupScreen';
import PendingApprovalScreen from '../screens/ProviderScreens/PendingApprovalScreen';
import ProviderRegisterScreen from '../screens/ProviderDashboard/ProviderRegisterScreen';

// --- CUSTOMER FLOW SCREENS ---
import AppTabs from '../Components/AppTabs';
import serviceScreen from '../screens/serviceScreen'; 
import ViewDetailScreen from '../screens/ServicesScrens/ViewDetailScreen';
import BookServiceScreen from '../screens/ServicesScrens/BookServiceScreen';
import BookingSummaryScreen from '../screens/ServicesScrens/BookingSummaryScreen';
import BookingSuccessScreen from '../screens/ServicesScrens/BookingSuccessScreen';
import BookingScreen from '../screens/bookingScreen';
import CancelBookingScreen from '../screens/Bookings related/CancelBookingScreen';
import BookingCancelSuccess from '../screens/Bookings related/BookingCancelSuccess';
import EditProfileScreen from '../screens/CustProfile section/EditProfileScreen';
import ProviderProfileScreen from '../screens/ProviderScreens/ProviderProfileScreen';
import LeaveReviewScreen from '../screens/ServicesScrens/LeaveReviewScreen';
import HelpCenterScreen from '../screens/CustProfile section/HelpCenterScreen';

// --- PROVIDER FLOW SCREENS ---
import ProviderDashboard from '../screens/ProviderDashboard';
import CreateServiceScreen from '../screens/ProviderDashboard/CreateServiceScreen';
import ServicePublishedScreen from '../screens/ProviderDashboard/ServicePublishedScreen';
import MyServicesProvider from '../screens/ProviderDashboard/MyServicesProvider';
import EditServiceProvider from '../screens/ProviderDashboard/EditServiceProvider';
import ProvidersBooking from '../screens/ProviderDashboard/ProvidersBooking';
import ProvProfile from '../screens/ProviderDashboard/ProvProfile';
import EditProfileProvider from '../screens/ProviderDashboard/EditProfileProvider'; 
import RatingsReviewsProvider from '../screens/ProviderDashboard/RatingsReviewsProvider';
import ReportScreen from '../screens/ProviderScreens/ReportScreen';

// --- UTILITY / COMMON SCREENS ---
import NotificationScreen from '../screens/NotificationScreen';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      {/* 1. Auth & Onboarding */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="PasswordUpdated" component={PasswordUpdated} />
      <Stack.Screen name="RoleSelection" component={RoleSelection} />
      <Stack.Screen name="ProviderSetup" component={ProviderSetup} />
      <Stack.Screen name="PendingApproval" component={PendingApprovalScreen} />
      <Stack.Screen name="ProviderRegisterScreen" component={ProviderRegisterScreen} />

      {/* 2. Main App / Customer Stack */}
      <Stack.Screen name="AppTabs" component={AppTabs} />
      <Stack.Screen name="serviceScreen" component={serviceScreen} />
      <Stack.Screen name="ViewDetail" component={ViewDetailScreen} />
      <Stack.Screen name="BookService" component={BookServiceScreen} />
      <Stack.Screen name="BookingSummary" component={BookingSummaryScreen} />
      <Stack.Screen name="BookingSuccess" component={BookingSuccessScreen} />
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="CancelBooking" component={CancelBookingScreen} />
      <Stack.Screen name="BookingCancelSuccess" component={BookingCancelSuccess} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ProviderProfile" component={ProviderProfileScreen} />
      <Stack.Screen name="LeaveReview" component={LeaveReviewScreen} />
      <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />

      {/* 3. Provider Stack */}
      <Stack.Screen name="ProviderDashboard" component={ProviderDashboard} />
      <Stack.Screen name="CreateService" component={CreateServiceScreen} />
      <Stack.Screen name="ServicePublished" component={ServicePublishedScreen} />
      <Stack.Screen name="MyServicesProvider" component={MyServicesProvider} />
      <Stack.Screen name="EditServiceProvider" component={EditServiceProvider} />
      <Stack.Screen name="ProvidersBooking" component={ProvidersBooking} />
      <Stack.Screen name="ProvProfileScreen" component={ProvProfile} />
      <Stack.Screen name="EditProfileProvider" component={EditProfileProvider} />
      <Stack.Screen name="RatingsReviewsProvider" component={RatingsReviewsProvider} />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />

      {/* 4. Common / Notifications */}
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;