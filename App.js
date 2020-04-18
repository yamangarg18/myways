import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CareerInsightScreen from './src/screens/CareerInsightScreen';
import CareerProfileScreen from './src/screens/CareerProfileScreen';
import CoursesScreen from './src/screens/CoursesScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import InternshipScreen from './src/screens/InternshipScreen';
import NortificationScreen from './src/screens/NortificationScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import SupportScreen from './src/screens/SupportScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
    Dashboard: DashboardScreen,
    CareerInsight: CareerInsightScreen,
    Internship: InternshipScreen,
    Courses: CoursesScreen,
    Nortification: NortificationScreen
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => { setNavigator(navigator) }}/>
    </AuthProvider>
  );
};

