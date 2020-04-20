import { createDrawerNavigator } from 'react-navigation-drawer';

import { Ionicons, FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const Dashboard = DashboardScreen;

const UserProfile = UserProfileScreen;

const CareerProfile = CareerProfileScreen;

const Settings = SettingsScreen;

const Support = SupportScreen;

Dashboard.navigationOptions = {
    drawerLabel: 'Dashboard',
    drawerIcon: ({ tintColot }) => <FontAwesome name="home" size={30}/>
  };
  
  UserProfile.navigationOptions = {
    drawerLabel: 'User Profile',
    drawerIcon: ({ tintColot }) => <Ionicons name='md-person' size={30}/>
  };
  
  CareerProfile.navigationOptions = {
    drawerLabel: 'Career Profile',
    drawerIcon: ({ tintColot }) => <MaterialCommunityIcons name='pencil-box-outline' size={30}/>
  };
  
  Settings.navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: ({ tintColot }) => <MaterialIcons name='settings' size={30}/>
  };
  
  Support.navigationOptions = {
    drawerLabel: 'Support',
    drawerIcon: ({ tintColot }) => <FontAwesome5 name='question' size={30}/>
  };
