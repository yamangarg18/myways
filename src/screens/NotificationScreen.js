import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const NotificationScreen = () => {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.logo}
                source={require('../../assets/logo.png')}
            />
            <Text style={styles.text}>Notifications</Text>
        </View>
    );
};

NotificationScreen.navigationOptions = {
    title: 'Notifications',
};

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

export default NotificationScreen;