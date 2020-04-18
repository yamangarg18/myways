import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Image } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Ionicons, Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import NavLink from '../components/NavLink';

const SignupScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.logo}
                source={require('../../assets/logo.png')}
            />
            <View  style={styles.backgroundStyle}>
                <Ionicons 
                    name='md-person'
                    style={styles.iconStyle}
                />
                <TextInput 
                    placeholder='Name'
                    style={styles.inputStyle} 
                />
            </View>
            <View  style={styles.backgroundStyle}>
                <MaterialIcons 
                    name='email'
                    style={styles.iconStyle}
                />
                <TextInput 
                    placeholder='Email Address' 
                    style={styles.inputStyle}
                />
            </View>
            <View  style={styles.backgroundStyle}>
                <Entypo 
                    name='phone' 
                    style={styles.iconStyle}
                />
                <TextInput 
                    placeholder='Phone' 
                    style={styles.inputStyle}
                />
            </View>
            <View  style={styles.backgroundStyle}>
                <FontAwesome 
                    name='lock' 
                    style={styles.iconStyle}
                />
                <TextInput 
                    placeholder='Password'
                    style={styles.inputStyle}
                />
            </View>
            <View  style={styles.backgroundStyle}>
                <FontAwesome 
                    name='lock' 
                    style={styles.iconStyle}
                />
                <TextInput 
                    placeholder='Confirm Password' 
                    style={styles.inputStyle}
                />
            </View>
            <Spacer>
                <Text h4>If any:</Text>
            </Spacer>
            <View style={styles.backgroundStyle}>
                <FontAwesome 
                    name='lock' 
                    style={styles.iconStyle}
                />
                <TextInput 
                    placeholder='College Access ID'
                    style={styles.inputStyle} 
                />
            </View>
            <Spacer>
                <Button 
                    title='Register' 
                    onPress={() => navigation.navigate('mainFlow')}
                />
            </Spacer>
            <NavLink
                routeName='Signin'
                text='Already have an account? Sign in instead'
            />

        </View>
    )
};

SignupScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }, 
    logo: {
        alignSelf: 'center',
        width: 125,
        height: 120,
        marginBottom: 5,
    },
    backgroundStyle: {
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    inputStyle: {
        flex: 1,
        fontSize: 18,
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15,
    }
});

export default SignupScreen;