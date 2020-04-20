import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const CoursesScreen = () => {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.logo}
                source={require('../../assets/logo.png')}
            />
            <Text style={styles.text}>Suggested Courses</Text>
        </View>
    );
};

CoursesScreen.navigationOptions = {
    title: 'Suggested Courses',
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

export default CoursesScreen;