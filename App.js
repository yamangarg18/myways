import React from 'react';
import { Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CareerInsightScreen from './src/screens/CareerInsightScreen';
import CareerProfileScreen from './src/screens/CareerProfileScreen';
import CoursesScreen from './src/screens/CoursesScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import InternshipScreen from './src/screens/InternshipScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import SupportScreen from './src/screens/SupportScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { FontAwesome, FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons';

const DashboardStack = createStackNavigator({
  Dashboard: DashboardScreen
},{
  defaultNavigationOptions: {
    title: 'Dashboard',
    headerStyle: {
      backgroundColor: 'darkslategrey'
    },
    headerTitleStyle: {
      fontWeight: "bold",
      color: "yellow",
    },
    headerTitleAlign: 'center'
  }
});

const CareerInsightStack = createStackNavigator({
  CareerInsight: CareerInsightScreen
},{
  defaultNavigationOptions: {
    title: 'Career Insight',
    headerStyle: {
      backgroundColor: 'darkslategrey'
    },
    headerTitleStyle: {
      fontWeight: "bold",
      color: "yellow",
    },
    headerTitleAlign: 'center'
  }
});

const InternshipStack = createStackNavigator({
  Internship: InternshipScreen
},{
  defaultNavigationOptions: {
    title: 'Interships',
    headerStyle: {
      backgroundColor: 'darkslategrey'
    },
    headerTitleStyle: {
      fontWeight: "bold",
      color: "yellow",
    },
    headerTitleAlign: 'center'
  }
});

const CoursesStack = createStackNavigator({
  Courses: CoursesScreen
},{
  defaultNavigationOptions: {
    title: 'Suggested Courses',
    headerStyle: {
      backgroundColor: 'darkslategrey'
    },
    headerTitleStyle: {
      fontWeight: "bold",
      color: "yellow",
    },
    headerTitleAlign: 'center'
  }
});

const NotificationStack = createStackNavigator({
  Notification: NotificationScreen
},{
  defaultNavigationOptions: {
    title: 'Notifications',
    headerStyle: {
      backgroundColor: 'darkslategrey'
    },
    headerTitleStyle: {
      fontWeight: "bold",
      color: "yellow",
    },
    headerTitleAlign: 'center'
  }
});


const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
    Dashboard: DashboardStack,
    CareerInsight: CareerInsightStack,
    Internship: InternshipStack,
    Courses: CoursesStack,
    Notification: NotificationStack
  },{
    defaultNavigationOptions:({ navigation }) => {
      return {
        tabBarIcon: ({tintColor}) => {
          const { routeName } = navigation.state;
          let myicon
          if (routeName=='Dashboard') {
            myicon = 'home'
          }else if (routeName=='CareerInsight') {
            myicon = 'info'
          }else if (routeName=='Internship') {
            myicon = 'th-list'
          }else if (routeName=='Courses') {
            myicon = 'laptop'
          }else if (routeName=='Notification') {
            myicon = 'sticky-note'
          }

          return <FontAwesome name={myicon} size={30} color={tintColor} />
        },
        tabBarOptions:{
          activeTintColor: 'yellow',
          inactiveTintColor: 'grey',
          activeBackgroundColor: 'darkslategrey',
          inactiveBackgroundColor: 'white'
        },
      }
    }
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App/>
    </AuthProvider>
  );
};

