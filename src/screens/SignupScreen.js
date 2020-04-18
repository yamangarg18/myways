import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { MaterialIcons, } from '@expo/vector-icons';

const SignupScreen = () => {
    return (
        <View style={styles.container}>
            <Spacer>
                <Text h3>Register</Text>
            </Spacer>
            <Input label='Name' />
            <Input label='Email Address' />
            <Input label='Phone' />
            <Input label='Password' />
            <Input label='Confirm Password' />
            <Text>If any:</Text>
            <Input label='Campus Access ID' />
            <Spacer>
                <Button title='Register' />
            </Spacer>
            
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
        marginBottom: 200
    }, 
});

export default SignupScreen;