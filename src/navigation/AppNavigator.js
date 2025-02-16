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
        tabBarActiveTintColor: '#FF6B6B',
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
      <Tab.Screen name="Vendors" component={VendorListScreen} />
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
      {!user ? (
        // Auth Stack
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      ) : (
        // Main App Stack
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator; 