import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';

// Auth Screens
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';

// Main App Screens
import VendorListScreen from '../screens/vendor/VendorListScreen';
import VendorDetailsScreen from '../screens/vendor/VendorDetailsScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import ProfileScreen from '../screens/dashboard/ProfileScreen';
import ContactVendorScreen from '../screens/vendor/ContactVendorScreen';

// Profile Screens
import BookingsScreen from '../screens/profile/BookingsScreen';
import PaymentMethodsScreen from '../screens/profile/PaymentMethodsScreen';
import NotificationsScreen from '../screens/profile/NotificationsScreen';
import HelpSupportScreen from '../screens/profile/HelpSupportScreen';
import PrivacyPolicyScreen from '../screens/profile/PrivacyPolicyScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';

// Money Management Screens
import AddBalanceScreen from '../screens/money-management/AddBalanceScreen';
import SendMoneyScreen from '../screens/money-management/SendMoneyScreen';
import ReceiveMoneyScreen from '../screens/money-management/ReceiveMoneyScreen';

// Detail Screens
import RevenueDetailsScreen from '../screens/details/RevenueDetailsScreen';
import BookingsListScreen from '../screens/details/BookingsListScreen';
import CustomersListScreen from '../screens/details/CustomersListScreen';
import CustomerDetailsScreen from '../screens/details/CustomerDetailsScreen';
import RatingsReviewsScreen from '../screens/details/RatingsReviewsScreen';
import AllActivitiesScreen from '../screens/details/AllActivitiesScreen';
import BookingDetailsScreen from '../screens/details/BookingDetailsScreen';
import PaymentDetailsScreen from '../screens/details/PaymentDetailsScreen';
import ReviewDetailsScreen from '../screens/details/ReviewDetailsScreen';
import ChatScreen from '../screens/chat/ChatScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen 
        name="ProfileMain" 
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{ 
          title: 'Edit Profile',
          headerStyle: {
            backgroundColor: '#F5F6FA',
          },
          headerTintColor: '#2D3436',
        }}
      />
      <ProfileStack.Screen 
        name="Bookings" 
        component={BookingsScreen}
        options={{ 
          title: 'My Bookings',
          headerStyle: {
            backgroundColor: '#F5F6FA',
          },
          headerTintColor: '#2D3436',
        }}
      />
      <ProfileStack.Screen 
        name="PaymentMethods" 
        component={PaymentMethodsScreen}
        options={{ 
          title: 'Payment Methods',
          headerStyle: {
            backgroundColor: '#F5F6FA',
          },
          headerTintColor: '#2D3436',
        }}
      />
      <ProfileStack.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{ 
          title: 'Notifications',
          headerStyle: {
            backgroundColor: '#F5F6FA',
          },
          headerTintColor: '#2D3436',
        }}
      />
      <ProfileStack.Screen 
        name="Support" 
        component={HelpSupportScreen}
        options={{ 
          title: 'Help & Support',
          headerStyle: {
            backgroundColor: '#F5F6FA',
          },
          headerTintColor: '#2D3436',
        }}
      />
      <ProfileStack.Screen 
        name="Privacy" 
        component={PrivacyPolicyScreen}
        options={{ 
          title: 'Privacy Policy',
          headerStyle: {
            backgroundColor: '#F5F6FA',
          },
          headerTintColor: '#2D3436',
        }}
      />
    </ProfileStack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'dashboard' : 'dashboard';
          } else if (route.name === 'Vendors') {
            iconName = focused ? 'store' : 'store';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} type="material" size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff4500',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          title: 'Home'
        }}
      />
       <Tab.Screen 
        name="Profile" 
        component={ProfileStackNavigator}
        options={{ headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* {!user ? (
        // Auth Stack
        <> */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        {/* </>
      ) : (
        // Main App Stack
        <> */}
          <Stack.Screen name="MainApp" component={MainTabNavigator} />
          <Stack.Screen 
            name="VendorDetails" 
            component={VendorDetailsScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen 
            name="ContactVendor" 
            component={ContactVendorScreen}
            options={{ 
              title: 'Contact Vendor',
              headerStyle: {
                backgroundColor: '#F5F6FA',
              },
              headerTintColor: '#2D3436',
            }}
          />
          <Stack.Screen name="AddBalance" component={AddBalanceScreen} />
          <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
          <Stack.Screen name="ReceiveMoney" component={ReceiveMoneyScreen} />
          <Stack.Screen name="RevenueDetails" component={RevenueDetailsScreen} />
          <Stack.Screen name="BookingsList" component={BookingsListScreen} />
          <Stack.Screen name="CustomersList" component={CustomersListScreen} />
          <Stack.Screen name="CustomerDetails" component={CustomerDetailsScreen} />
          <Stack.Screen name="RatingsReviews" component={RatingsReviewsScreen} />
          <Stack.Screen name="AllActivities" component={AllActivitiesScreen} />
          <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
          <Stack.Screen name="PaymentDetails" component={PaymentDetailsScreen} />
          <Stack.Screen name="ReviewDetails" component={ReviewDetailsScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
        {/* </>
      // )} */}
    </Stack.Navigator>
  );
};

export default AppNavigator; 