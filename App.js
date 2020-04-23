import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { FontAwesome } from '@expo/vector-icons';
import { createDrawerNavigator } from 'react-navigation-drawer';  // npm install react-navigation-drawer
import UserProfileStack from './src/screens/UserProfileScreen';
import CareerProfileStack from './src/screens/CareerProfileScreen';
import SettingsStack from './src/screens/SettingsScreen';
import SupportStack from './src/screens/SupportScreen';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Text, Image } from 'react-native';
import Stack from './src/components/Drawer';

const App = createAppContainer(Stack);

export default () => {
  return (
    <AuthProvider>
      <App/>
    </AuthProvider>
  );
};

