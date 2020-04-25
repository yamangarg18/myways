import React from 'react';
import { View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Ionicons, Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import NavLink from '../components/NavLink';

const SignupScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.logo}
                source={require('../../assets/favicon.png')}
            />
            <View  style={styles.background}>
                <Ionicons 
                    name='md-person'
                    style={styles.icon}
                />
                <TextInput 
                    placeholder='Name'
                    style={styles.input} 
                />
            </View>
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
                <Entypo 
                    name='phone' 
                    style={styles.icon}
                />
                <TextInput 
                    placeholder='Phone' 
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
            <View  style={styles.background}>
                <FontAwesome 
                    name='lock' 
                    style={styles.icon}
                />
                <TextInput 
                    placeholder='Confirm Password' 
                    style={styles.input}
                />
            </View>
            <Spacer>
                <Text h4>If any:</Text>
            </Spacer>
            <View style={styles.background}>
                <FontAwesome 
                    name='lock' 
                    style={styles.icon}
                />
                <TextInput 
                    placeholder='College Access ID'
                    style={styles.input} 
                />
            </View>
            <Spacer>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('mainFlow')}
                >
                    <Text 
                        style={styles.buttonText}
                        size={30}
                    >
                        Register as a Student
                    </Text>
                </TouchableOpacity>
            </Spacer>
            <NavLink
                routeName='Signin'
                text='Already have an account? Sign In'
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
        backgroundColor: '#6a8d7b'
    }, 
    logo: {
        alignSelf: 'center',
        width: 125,
        height: 120,
        marginBottom: 5,
    },
    background: {
        backgroundColor: '#F0EEEE',
        height: 30,
        width: 300,
        borderRadius: 15,
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        alignSelf: 'center',
    },
    input: {
        flex: 1,
        fontSize: 18,
    },
    icon: {
        fontSize: 25,
        alignSelf: 'center',
        marginHorizontal: 15,
    },
    button: {
        backgroundColor: 'yellow',
        borderRadius: 25,
        alignItems: 'center',
        height: 50,
        width: 150,
        padding: 13,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#2f4f4f',
    }
});

export default SignupScreen;