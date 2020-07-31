import React from 'react';
import { View, StyleSheet, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import NavLink from '../components/NavLink';


const SigninScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/favicon.png')}
            />
            <View style={styles.background}>
                <MaterialIcons
                    name='email'
                    style={styles.icon}
                />
                <TextInput
                    placeholder='Email Address'
                    style={styles.input}
                />
            </View>
            <View style={styles.background}>
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('mainFlow')
                    }}
                >
                    <Text
                        style={styles.buttonText}
                    >
                        Login/
                    </Text>
                </TouchableOpacity>
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
        // backgroundColor: '#6a8d7b'
    },
    logo: {
        alignSelf: 'center',
        width: 125,
        height: 120,
        marginBottom: 5,
    },
    background: {
        // backgroundColor: '#F0EEEE',
        // justifyContent: "space-between",
        paddingHorizontal: 2,
        height: 40,
        width: 300,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        alignSelf: 'center',
    },
    input: {
        flex: 1,
        fontSize: 18,
        // alignItems: 'center'
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
        justifyContent: 'center',
        height: 50,
        width: 150,
        padding: 13,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#2f4f4f',
        fontWeight: 'bold',
        fontSize: 20

    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default SigninScreen;