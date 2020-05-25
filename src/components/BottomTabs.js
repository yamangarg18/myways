import DashboardStack from '../screens/DashboardScreen';
import CareerInsightStack from '../screens/CareerInsightScreen';
import InternshipStack from '../screens/InternshipScreen';
import CoursesStack from '../screens/CoursesScreen';
import NotificationStack from '../screens/NotificationScreen';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

const BottomTabs = createBottomTabNavigator({
    Dashboard: {
      screen: DashboardStack,
      navigationOptions: {
        title: "Dashboard"
      }
    },
    CareerInsight: {
      screen: CareerInsightStack,
      navigationOptions: {
        title: "Career Insights"
      }
    },
    Internship: {
      screen: InternshipStack,
      navigationOptions: {
        title: "Internships"
      }
    },
    Courses: {
      screen: CoursesStack,
      navigationOptions: {
        title: "Suggested Courses"
      }
    },
    Notification: {
      screen: NotificationStack,
      navigationOptions: {
        title: "Notifications"
      }
    }
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

  export default createAppContainer(BottomTabs);