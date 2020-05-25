import React from 'react';
import { View, StyleSheet, TextInput, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import NavLink from '../components/NavLink';


const SigninScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.logo}
                source={require('../../assets/logo.png')}
            />
            <View  style={styles.background}>
                <MaterialIcons 
                    name='email'
                    style={styles.icon}
                />
                <TextInput 
                    placeholder='Email Address' 
                    style={styles.input}
                />
            </View>
            <View  style={styles.background}>
                <FontAwesome 
                    name='lock' 
                    style={styles.icon}
                />
                <TextInput 
                    placeholder='Password'
                    style={styles.input}
                />
            </View>
            <Spacer>
                <Button 
                    title='Login' 
                    onPress={() => navigation.navigate('mainFlow')}
                />
            </Spacer>
            <NavLink
                routeName='Signup'
                text='Dont have an account yet? Register'
            />
        </View>

    );
};

SigninScreen.navigationOptions = () => {
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
    logo: {
        alignSelf: 'center',
        width: 125,
        height: 120,
        marginBottom: 5,
    },
    background: {
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    input: {
        flex: 1,
        fontSize: 18,
    },
    icon: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15,
    }
});

export default SigninScreen;