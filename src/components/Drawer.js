import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';  // npm install react-navigation-drawer
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import UserProfileStack from '../screens/UserProfileScreen';
import CareerProfileStack from '../screens/CareerProfileScreen';
import SettingsStack from '../screens/SettingsScreen';
import SupportStack from '../screens/SupportScreen';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import BottomTabs from './BottomTabs'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import { Text } from 'react-native';
import ChatStack from '../screens/ChatScreen';

const DrawerNavigator = createDrawerNavigator(
    {
        Tabs: BottomTabs,
    },
    {
        initialRouteName: 'Tabs',
        contentComponent: props => {
            return (
                <ScrollView>
                    <SafeAreaView
                    forceInset={{ top: 'always', horizontal: 'never' }}
                    >
                    <Text
                        onPress={() => {
                        props.navigation.navigate('UserProfile');
                        props.navigation.closeDrawer();
                        }}
                    >
                        User Profile
                    </Text>
                    <Text
                        onPress={() => {
                        props.navigation.navigate('CareerProfile');
                        props.navigation.closeDrawer();
                        }}
                    >
                        Career Profile
                    </Text>
                    <Text
                        onPress={() => {
                        props.navigation.navigate('Settings');
                        props.navigation.closeDrawer();
                        }}
                    >
                        Settings
                    </Text>
                    <Text
                        onPress={() => {
                        props.navigation.navigate('Support');
                        props.navigation.closeDrawer();
                        }}
                    >
                        Support
                    </Text>
                    </SafeAreaView>
                </ScrollView>
            )
        }
    }
 );

 const Stack = createStackNavigator(
    {
        Drawer: {
            screen: DrawerNavigator,
            navigationOptions: {
                headerShown: false,
            }
        },
        UserProfile:  {
            screen: UserProfileStack,
            navigationOptions: {
              drawerIcon: ({ tintColor }) => {
                  <FontAwesome 
                      name='md-person'
                      style={styles.iconStyle}
                  />
              }
            }
          },
          CareerProfile: {
            screen: CareerProfileStack,
            navigationOptions: {
              drawerLabel: "Career Profile ",
              drawerIcon: ({ tintColor }) => {
                  <Ionicons 
                      name='pencil-square-o'
                      style={styles.iconStyle}
                  />
              }
            }
          },
          Settings: {
            screen: SettingsStack,
            navigationOptions: {
              drawerLabel: "Settings ",
              drawerIcon: ({ tintColor }) => {
                  <Ionicons 
                      name='md-settings'
                      style={styles.iconStyle}
                  />
              }
            }
          },
          Support: {
            screen: SupportStack,
            navigationOptions: {
              drawerLabel: "Support  ",
            //   drawerIcon: () => {
            //       <FontAwesome 
            //           name='question'
            //           style={styles.iconStyle}
            //       />
            //   }
            }
          },
          Chat: ChatStack
    }
 );

const styles = StyleSheet.create({
    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15,
    }
});

export default createAppContainer(Stack);