import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import Spacer from '../components/Spacer';
import { Ionicons, Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import NavLink from '../components/NavLink';
import { useRegisterForm } from "../util/hooks";
import { startSignUp, verifyOtp, setUserType } from "../actions/auth";
import axios from "axios";

const SignupScreen = ({ navigation, props }) => {
    const [errors, setErrors] = useState({});
    const [otp, setOtp] = useState("");
    const [verified, setVerified] = useState(false);
    const [userType, getUserType] = useState("student");
    const [disabledButton, setButton] = useState(true);
    const authError = useSelector(state => state.auth.error);
    const dispatch = useDispatch();

    const {
        onChange,
        onSubmit,
        values,
        error,
        formError,
        modal
    } = useRegisterForm(startSignUp, userType, {
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        passcode: ""
    });

    console.log("props :- ", props);

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/favicon.png')}
            />
            <View style={styles.background}>
                <Ionicons
                    name='md-person'
                    style={styles.icon}
                />
                <TextInput
                    placeholder='Name'
                    textContentType='password'
                    style={styles.input}
                    value={values.name}
                    error={errors.name}
                    onChange={onChange}
                />
            </View>
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
                <Entypo
                    name='phone'
                    style={styles.icon}
                />
                <TextInput
                    placeholder='Phone'
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
            <View style={styles.background}>
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
                <Text style={styles.text}>If any:</Text>
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
                    onPress={() => {
                        console.log("formError :- ", formError)
                        navigation.navigate('mainFlow')
                    }}
                >
                    <Text
                        style={styles.buttonText}
                    >
                        Register/
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

export default SignupScreen;