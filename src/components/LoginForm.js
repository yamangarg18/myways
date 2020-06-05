import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Form,
    Header,
    Image,
    Input,
    Checkbox,
    Modal,
    Icon
} from "semantic-ui-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGooglePlus, faFacebook } from "@fortawesome/free-brands-svg-icons";
// import Background from "../images/bg.png";
import styled from "styled-components";
import { startLogin } from '../actions/auth'
import { useForm } from '../util/hooks';
// import loginSVG from '../images/login2.svg'
import Loader from "./Loader";
import { verifyOtp } from '../actions/auth';
import { Grid } from 'semantic-ui-react'
import axios from 'axios';
import swal from 'sweetalert';

const Wrapper = styled.div`
background-color: white;
background-repeat: repeat;
overflow:hidden;
  .loginPage{
    display:grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    height: 100vh;
  }
  .login-image{
    align-self: center;
    & img{
      height: 90vh;
    }
  }
  .login-card{
    width: 35vw;
    height: 80vh;
    align-self: center;
    justify-self: center;
  }
  .form-font {
    font-size: 1rem;
  }
  .form-font-btn {
    font-size: 1.8rem;
  }
  .register-redirect {
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
  }
  .title-header {
    color: #2e2e2e;
    font-size: 3rem;
  }
  .btn {
    color: white;
    cursor: pointer;
    text-align: center;
    border: none;
    outline:none;
    height: 3.5rem;
    box-shadow: 0 0 10px 0 #ffd369 inset, 0 0 5px 1px #ffd369;
    background: #ffd369 !important;
    width: 20vw;
    border-radius: 4rem;
    &:active{
      transform: translateY(4px);
    }
  }
  .form-container {
    background: #f8f8f9 !important;
  }
  .logo {

    width: 70%;
    height: 7rem;
    margin-bottom: 1rem;
    @media screen and (min-height: 800px){
      height: 10rem;
    }
  }
  .logo-box {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }
  .mid-container {
    display: flex;
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  .forgot {
    margin-left: auto;
    font-size: 1rem;
  }
  .reg-icons {
    font-size: 3.5rem;
  }
  .empty{
    background: transparent!important;
    border: none!important;
    box-shadow: none!important;
  }
  .margin-bottom{
    margin-bottom: 2rem;
  }
  .margin-top{
    margin-top:2rem;
  }
  .register-redirect {
    margin: 1rem;
    line-height: 2rem;
    font-size: 1.5rem;
    text-align:center;
    background-color:white;
    display: flex;
    flex-direction: column;
    & a {
      margin-top:0.5rem;
    }
  }
  .login-button{
    display:flex;
    justify-content:center;
  }
  
  .modal-button {
    margin-top: 30px;
  }

  .modal-radio {
    color: white;
  }

  @media screen and (min-height: 800px){
        input[type=text], input[type=number], input[type=password]{
          height:3.5rem;
          width:10rem;
        }
        .margin-bottom{
          margin-bottom: 3rem;
        }
        .margin-top{
          margin-top:3rem;
        }
        .ui.grid>.row{
          margin-bottom: 3rem;
        }
        .dropdown{
          height:3.5rem;
        }
        .ui.grid{
          height:10vh;
        }
      }

    @media screen and (max-width: 1000px){
      .login-card{
        width:100%
      }
      .login-image{
        display:none
      }
      .loginPage{
        display:block
      }
    }



`;

function Login(props) {
    const { onChange, onSubmit, values, error } = useForm(startLogin, {
        email: "",
        password: ""
    });
    const isLoading = useSelector((state) => state.auth.loading);
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const resendOTP = () => {
        const body = { email: values.email };
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/resendotp`, body)
            .then(response => {
                response.data && response.data.message === 'OTP is sent' &&
                    swal({
                        title: 'Success',
                        text: 'OTP has been resent.',
                        icon: "success",
                    })
            })
            .catch(console.log);
    };

    return (
        <Wrapper>
            {isLoading ?
                <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Loader />
                </div>
                :
                (
                    <div className="loginPage animated fadeIn">
                        <div className="login-image animated fadeInRight ">
                            <img src={process.env.PUBLIC_URL + '/login2.svg'} alt="login" />
                        </div>
                        <div className="login-card">
                            <Form
                                size="large"
                                className="form-font"
                                style={{ border: "none", marginBottom: "2.5rem" }}
                                onSubmit={onSubmit}
                                noValidate
                            >
                                <div style={{ padding: "1.5rem 3rem 0 3rem" }}>
                                    <div className="logo-box">
                                        <Image src={process.env.PUBLIC_URL + '/logo.svg'} className="logo" />
                                    </div>
                                    <div className="margin-bottom margin-top">
                                        <Form.Input
                                            fluid
                                            name="email"
                                            icon="mail"
                                            iconPosition="left"
                                            type="text"
                                            value={values.email}
                                            error={error ? true : false}
                                            onChange={(e) => { onChange(e); setEmail(e.target.value) }}
                                            placeholder="E-mail Address"
                                            className="form-font"
                                        />
                                    </div>
                                    <div className="margin-bottom">
                                        <Form.Input
                                            fluid
                                            name="password"
                                            icon="lock"
                                            type="password"
                                            value={values.password}
                                            error={error ? true : false}
                                            onChange={onChange}
                                            iconPosition="left"
                                            placeholder="Password"
                                            className="form-font"
                                        />
                                    </div>
                                    <div className="mid-container margin-bottom">
                                        <Checkbox label="Remember Me" style={{ fontSize: "1rem", }} />
                                        <a href="/forget" className="forgot">
                                            Forgot Password?
                </a>
                                    </div>
                                </div>
                                <div className="login-button">
                                    <button size="large" className="btn login-btn" type="submit" style={{ marginTop: 0 }}>
                                        <span className="form-font-btn">Login</span>
                                    </button>
                                </div>
                                <div className="register-redirect" >
                                    Don't have an account yet? <a href="register">Register</a>
                                </div>
                                {!!error && <div className="mx-5 mb-0 alert alert-danger" role="alert">
                                    {
                                        error === 'user not verified' ? (
                                            <Modal open={true} basic size='small'>
                                                <Header icon='archive' content='An OTP has been sent to your email. Please enter the OTP here to proceed further.' />
                                                <Modal.Content>
                                                </Modal.Content>
                                                <Modal.Actions>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Input placeholder='input otp' onChange={(e) => setOtp(e.target.value)} />

                                                        <Button className='modal-button' color='green' style={{ marginTop: '1%' }} onClick={() => dispatch(verifyOtp(email, otp, localStorage.getItem('userType')))}>
                                                            <span className="form-font-btn">Verify</span>
                                                        </Button>
                                                        <Button color="green" onClick={resendOTP} inverted>
                                                            <Icon name="send" /> Resend OTP
				              </Button>
                                                    </div>
                                                </Modal.Actions>
                                            </Modal>

                                        ) : error
                                    }
                                </div>}
                            </Form>
                        </div>
                    </div>
                )
            }
        </Wrapper>
    );
}
export default Login;
