import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import {
//     Button,
//     Form,
//     // Message,
//     Header,
//     Image,
//     Input,
//     Modal,
//     Icon
//     // Segment
// } from "semantic-ui-react";
import { useRegisterForm } from "../util/hooks";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGooglePlus, faFacebook } from "@fortawesome/free-brands-svg-icons";
// import { Checkbox } from "semantic-ui-react";
// import {
//     FacebookLoginButton,
//     GoogleLoginButton
// } from "react-social-login-buttons";
// import styled from "styled-components";
import { startSignUp, verifyOtp, setUserType } from "../actions/auth";
// import loginSVG from "../images/register.svg";
// import { Link } from "react-router-dom";
import axios from "axios";
// import swal from "sweetalert";

// const Wrapper = styled.div`
// background-color: white;
// background-repeat: repeat;
// $yellow: #ffd369;
// overflow:hidden;
// .terms:hover{
//   cursor: pointer;
//   color: skyblue;
// }
//   .loginPage{
//     display:grid;
//     grid-template-columns: 1fr 1fr;
//     justify-content: space-between;
//     height: 100vh;
//   }
//   .login-image{
//     align-self: center;
//     & img{
//       height: 70vh;
//     }
//   }
//   .login-card{
//     width: 35vw;
//     height: 95vh;
//     justify-self: center;
//     @media screen and (max-height: 800px){
//       align-self: start;
//     }
//     align-self: center;
//     overflow: scroll !important;
//   }
//   .form-font {
//     font-size: 1rem;

//   }
//   .form-font-btn {
//     font-size: 1.1vw;
//     font-weight:500;
//     @media screen and (min-height: 800px){
//       font-size: 1.1vw;
//     }
//   }
//   .register-redirect {
//     margin: 1rem 1rem 0 1rem;
//     line-height: 1.5rem;
//     font-size: 1.2rem;
//     text-align:center;
//     background-color:white;
//     display: flex;
//     flex-direction: column;
//     & a {
//       margin-top:0.5rem;
//     }
//   }
//   .title-header {
//     color: #2e2e2e;
//     font-size: 3rem;
//   }
//   .btn {
//     color: white;
//     cursor: pointer;
//     text-align: center;
//     border: none;
//     margin:auto;
//     outline:none;
//     height: 3.5rem;
//     box-shadow: 0 0 10px 0 #ffd369 inset, 0 0 5px 1px #ffd369;
//     background: #ffd369 !important;
//     width: 13vw;
//     border-radius: 4rem;
//     &:active{
//       transform: translateY(4px);
//     }
//   }
//   .form-container {
//     background: #f8f8f9 !important;
//   }
//   .logo {
//     width: 70%;
//     height: 7rem;
//     margin-bottom: 1rem;
//   }
//   .logo-box {
//     display: flex;
//     justify-content: center;
//     margin-bottom: 2rem;
//   }
//   .mid-container {
//     display: flex;
//     font-size: 1rem;
//     justify-content: flex-end;
//     margin-bottom: 1.5rem;
//     @media screen and (min-height: 800px){
//       margin-bottom: 2rem;
//     }
//   }
//   .forgot {
//     margin-left: auto;
//     font-size: 1rem;
//   }
//   .reg-icons {
//     font-size: 3.5rem;
//   }
//   .empty{
//     background: transparent!important;
//     border: none!important;
//     box-shadow: none!important;
//   }
//   .margin-bottom{
//     margin-bottom: 1rem;
//   }
//   .button-list{
//     display: flex;
//     margin: 0 3rem;
//     justify-content: space-between;
//     @media screen and (min-height: 800px){
//       margin: 0 4rem;
//     }
//   }

//   @media screen and (min-height: 800px){
//     input[type=text], input[type=number], input[type=password]{
//       height:3.5rem;
//       width:10rem;
//     }
//     .margin-bottom{
//       margin-bottom: 3rem;
//     }
//     .margin-top{
//       margin-top:3rem;
//     }
//     // .ui.grid>.row{
//     //   margin-bottom: 3rem;
//     // }
//     .dropdown{
//       height:3.5rem;
//     }
//   }
//   .dimmed.dimmable > .ui.modals.dimmer.visible {
//     display: flex !important;
//   }

//   @media screen and (max-width: 1000px){
//     .login-card{
//       width:100%;
//       margin-top:-4%
//     }
//     .login-image{
//       display:none
//     }
//     .loginPage{
//       display:block
//     }
//     .form-font-btn{
//       font-size: 1.6rem
//     }
//     .margin-bottom{
//       margin-bottom:1rem
//     }
//     .btn{
//       width:100%
//     }


// `;

function Register(props) {
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

    // const verificationModal = () => (
    //     <Modal open={true} onClose={verified} basic size="small">
    //         <Header
    //             icon="archive"
    //             content="An OTP has been sent to your email. Please enter the OTP here to proceed further."
    //         />
    //         <Modal.Content>
    //             <h1>{authError}</h1>
    //         </Modal.Content>
    //         <Modal.Actions>
    //             <Input type="text" onChange={e => setOtp(e.target.value)} />

    //             <Button color="green" onClick={onVerify} inverted>
    //                 <Icon name="checkmark" /> Submit
    // 			</Button>
    //             <Button color="green" onClick={resendOTP} inverted>
    //                 <Icon name="send" /> Resend OTP
    // 			</Button>
    //         </Modal.Actions>
    //     </Modal>
    // );

    return (
        <Wrapper>
            <div className="loginPage">
                <div className="login-image animated fadeInRight">
                    <img src={loginSVG} alt="login" />
                </div>
                <div className="login-card">
                    <Form
                        size="large"
                        className="form-font"
                        style={{ border: "none" }}
                        onSubmit={() => {
                            console.log("formError :- ", formError);
                            onSubmit();
                        }}
                        noValidate
                    >
                        <div
                            style={{
                                padding: "1.5rem 3rem 0 3rem",
                                paddingTop: 0
                            }}
                        >
                            <div className="logo-box">
                                <Image
                                    src={process.env.PUBLIC_URL + "/logo.svg"}
                                    className="logo"
                                />
                            </div>
                            <div className="margin-bottom">
                                <Form.Input
                                    fluid
                                    name="name"
                                    icon="user"
                                    iconPosition="left"
                                    type="text"
                                    value={values.name}
                                    error={errors.name ? true : false}
                                    onChange={onChange}
                                    placeholder="Name"
                                    className="form-font"
                                />
                                {formError.name.length > 0 && (
                                    <div
                                        className="mx-12 alert alert-danger"
                                        role="alert"
                                    >
                                        {formError.name}
                                    </div>
                                )}
                            </div>
                            <div className="margin-bottom">
                                <Form.Input
                                    fluid
                                    name="email"
                                    icon="mail"
                                    iconPosition="left"
                                    type="text"
                                    value={values.email}
                                    error={errors.email ? true : false}
                                    onChange={onChange}
                                    placeholder="E-mail Address"
                                    className="form-font"
                                />
                                {formError.email.length > 0 && (
                                    <div
                                        className="mx-12 alert alert-danger"
                                        role="alert"
                                    >
                                        {formError.email}
                                    </div>
                                )}
                            </div>
                            <div className="margin-bottom">
                                <Form.Input
                                    fluid
                                    name="phone"
                                    icon="phone"
                                    type="text"
                                    value={values.phone}
                                    error={errors.phone ? true : false}
                                    onChange={onChange}
                                    iconPosition="left"
                                    placeholder="Phone"
                                    className="form-font"
                                />
                                {formError.phone.length > 0 && (
                                    <div
                                        className="mx-12 alert alert-danger"
                                        role="alert"
                                    >
                                        {formError.phone}
                                    </div>
                                )}
                            </div>
                            <div className="margin-bottom">
                                <Form.Input
                                    fluid
                                    name="password"
                                    icon="lock"
                                    type="password"
                                    value={values.password}
                                    error={errors.password ? true : false}
                                    onChange={onChange}
                                    iconPosition="left"
                                    placeholder="Password"
                                    className="form-font"
                                />
                                {formError.password.length > 0 && (
                                    <div
                                        className="mx-12 alert alert-danger"
                                        role="alert"
                                    >
                                        {formError.password}
                                    </div>
                                )}
                            </div>
                            <div style={{ marginBottom: "2rem" }}>
                                <Form.Input
                                    fluid
                                    name="confirmPassword"
                                    icon="lock"
                                    type="password"
                                    value={values.confirmPassword}
                                    error={
                                        errors.confirmPassword ? true : false
                                    }
                                    onChange={onChange}
                                    iconPosition="left"
                                    placeholder="Confirm password"
                                    className="form-font"
                                />
                                {formError.confirmPassword && (
                                    <div
                                        className="mx-12 alert alert-danger"
                                        role="alert"
                                    >
                                        {formError.confirmPassword}
                                    </div>
                                )}
                                <span style={{ marginBottom: "20px" }}>
                                    If any:
								</span>
                                <Form.Input
                                    fluid
                                    name="passcode"
                                    icon="lock"
                                    type="text"
                                    value={values.passcode}
                                    error={errors.passcode ? true : false}
                                    onChange={onChange}
                                    iconPosition="left"
                                    placeholder="Campus Access ID"
                                    className="form-font"
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                marginBottom: "3%"
                            }}
                        >
                            <input
                                type="checkbox"
                                style={{ marginRight: "5px" }}
                                onChange={() => setButton(!disabledButton)}
                            />
							I agree to the
							<Link
                                to="/terms"
                                className="terms"
                                style={{ marginLeft: "3px", color: "blue" }}
                            >
                                Terms & Conditions
							</Link>
							&nbsp;and
							<Link
                                to="/privacy_policy"
                                className="terms"
                                style={{ marginLeft: "3px", color: "blue" }}
                            >
                                Privacy Policy
							</Link>
                        </div>
                        <div className="button-list">
                            <button
                                disabled={disabledButton ? true : false}
                                size="large"
                                className="btn"
                                type="submit"
                                onClick={() => getUserType("student")}
                                style={{ marginTop: 0 }}
                            >
                                <span
                                    className="form-font-btn"
                                    style={{ color: "black", fontSize: "1rem" }}
                                >
                                    Register as a Student
								</span>
                            </button>

                            {/* <button size="large" className="btn" type="submit" onClick={() => getUserType('recruiter')}>
                  <span className="form-font-btn" >Register as a Recruiter</span>
                </button> */}
                        </div>
                        <div
                            className="mt-2"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center"
                            }}
                        >
                            {/* <FacebookLoginButton style={{ width: '40%'}} onClick={() => alert("Hello")} />
                  <GoogleLoginButton style={{ width: '40%'}}  onClick={() => alert("Hello")} /> */}
                        </div>
                        <div
                            className="register-redirect mb-1"
                            style={{ fontSize: "1.1rem" }}
                        >
                            Already have an account?{" "}
                            <Link to="/login">Sign In</Link>
                            <Link to="/register/employer">
                                Register as Employer
							</Link>
                        </div>
                    </Form>
                </div>
            </div>
            {/* {modal && verificationModal()} */}
        </Wrapper>
    );
}
export default Register;