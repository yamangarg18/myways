import React from 'react';
import { View, StyleSheet, Text, Image, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import BackButton from '../components/BackButton';

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Image 
            style={styles.logo}
            source={require('../../assets/favicon.png')}
        />
        <Text style={styles.text}>Settings</Text>
        <Button
          title='Sign Out' 
          onPress = {() => navigation.navigate('loginFlow')}
        />
    </View>
  );
}

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen
},{
    defaultNavigationOptions: {
      title: 'Settings',
      headerLeft: () => <BackButton/>,
      headerStyle: {
        backgroundColor: 'darkslategrey'
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "yellow",
      },
      headerTitleAlign: 'center'
    },
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

export default SettingsStack;