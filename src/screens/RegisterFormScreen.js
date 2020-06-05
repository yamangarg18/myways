import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import { useRegisterForm } from "../util/hooks";
import { startSignUp, verifyOtp, setUserType } from "../actions/auth";
import axios from "axios";

const Register = (props) => {
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

    // const onVerify = () => {
    //     console.log("inside verify");
    //     dispatch(setUserType(userType));
    //     dispatch(verifyOtp(values.email, otp, userType))
    //         .then(res => {
    //             if (res.status) {
    //                 setVerified(true);
    //             } else {
    //                 setVerified(false);
    //             }
    //         })
    //         .catch(err => {
    //             setVerified(false);
    //         });
    // };

    // const resendOTP = () => {
    //     const body = { email: values.email };
    //     axios
    //         .post(`${process.env.REACT_APP_BASE_URL}/api/resendotp`, body)
    //         .then(response => {
    //             response.data &&
    //                 response.data.message === "OTP is sent" &&
    //                 swal({
    //                     title: "Success",
    //                     text: "OTP has been resent.",
    //                     icon: "success"
    //                 });
    //         })
    //         .catch(console.log);
    // };

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/favicon.png')}
            />
        </View>
    )
}

Register.navigationOptions = () => {
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

export default Register;