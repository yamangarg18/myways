import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import DrawerButton from '../components/DrawerButton';

const NotificationScreen = () => {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.logo}
                source={require('../../assets/favicon.png')}
            />
            <Text style={styles.text}>Notifications</Text>
        </View>
    );
};

const NotificationStack = createStackNavigator({
    Notification: NotificationScreen
},{
    defaultNavigationOptions: {
      title: 'Notifications',
      headerLeft: () => <DrawerButton />,
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
    }, 
    logo: {
        alignSelf: 'center',
        width: 125,
        height: 120,
        marginBottom: 5,
    },
    text: {
        color: 'black',
        textAlign: 'center',
        fontSize: 30,
    },
});

export default NotificationStack;