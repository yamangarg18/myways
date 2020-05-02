import axios from "axios";
import { history } from "../routers/AppRouter";
import {
  LOGIN,
  LOGOUT,
  LOADING_UI,
  UNLOADING_UI,
  SET_ERRORS,
  UNSET_ERRORS,
  SET_USER_TYPE,
  SET_TEST_COMPLETED,
} from "./constants";
import { startSetInternships } from "./internship";
import { disableOTPmodal, enableOTPmodal } from "./otpModal";
import jwt_decode from "jwt-decode";
import { startAddTests } from "./test";

export const login = () => ({
  type: LOGIN,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setUserType = (userType) => ({
  type: SET_USER_TYPE,
  userType,
});

export const setError = (error) => ({
  type: SET_ERRORS,
  error,
});

// dispatched after user gives a test
// this changes the user state ( for e.g deductiveReasoning is changed from false to true)
export const setTestCompleted = (test) => ({
  type: SET_TEST_COMPLETED,
  test,
});

// export const API_URI = "http://localhost:2000/api";

export const startSignUp = (newUser) => {
  return (dispatch) => {
    dispatch({ type: LOADING_UI });
    console.log(newUser);
    return axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/register`, {
        ...newUser,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "user already exist with same email id") {
          alert("User already exists");
          dispatch(disableOTPmodal());
          history.push("/login");
          // return alert("user already exists with this email id")
        } else {
          if (newUser.passcode > 0) {
            let obj = {
              email: newUser.email,
              passcode: newUser.passcode,
            };
            axios
              .post(`${process.env.REACT_APP_BASE_URL}/api/updatePascode`, obj)
              .then((data) => {
                return data;
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
        dispatch({ type: UNLOADING_UI });
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: SET_ERRORS,
          error: err.response
            ? err.response.data.general ||
              err.response.data.email ||
              err.response.data.password
            : "",
        });
      });
  };
};

export const verifyOtp = (inputEmail, otp, inputUserType) => {
  const email = inputEmail || localStorage.getItem("email");
  const userType = inputUserType || localStorage.getItem("userType");
  localStorage.setItem("email", email);
  localStorage.setItem("userType", userType);

  return (dispatch) => {
    dispatch({ type: LOADING_UI });
    return axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/verifyotp`, {
        email,
        otp,
        userType,
      })
      .then((res) => {
        console.log("=======>", res);
        if (!res.data.profileCompleted) {
          localStorage.setItem("profileCompleted", "incomplete");
        }
        localStorage.removeItem("email");
        localStorage.removeItem("userType");
        if (res.data.token) {
          localStorage.removeItem("email");
          localStorage.removeItem("userType");

          setAuthorizationHeader(res.data.token, res.data.userType);
          dispatch({
            type: SET_USER_TYPE,
            userType: res.data.userType,
          });
          saveUserToLocalStorage(res.data.data);

          dispatch(login());
          const token = jwt_decode(res.data.token);
          localStorage.setItem("name", email.split("@")[0]);
          localStorage.setItem("user_id", token.user_id);
          localStorage.setItem("college_id", token.college_id);

          // localStorage.removeItem('email');
          // localStorage.removeItem('userType');
          // let user_id = localStorage.user_id;
          // let college_id = localStorage.college_id;
          dispatch(disableOTPmodal());
          // axios.post(
          // 	`${process.env.REACT_APP_ML_URL}/save_user?college_id=${college_id}&intern_id=${user_id}&skills=["marketing","sales","team building","business","communication","networking","management"]&college=IIT GUWAHATI`
          // );
          userType === "student"
            ? history.push("/student/profile")
            : history.push("/recruiter/profile");
        }
        dispatch({ type: UNLOADING_UI });
        return { res: res, status: true };
      })
      .catch((err) => {
        console.log("err ===> ", err);
        dispatch({
          type: SET_ERRORS,
          error: err.response
            ? "OTP does not match. Please enter the correct OTP."
            : "",
        });
        return {
          res: undefined,
          status: false,
          message: "OTP does not match. Please enter the correct OTP.",
        };
      });
  };
};

export const startLogin = (credentials) => {
  return (dispatch) => {
    dispatch({ type: LOADING_UI });
    return axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/login`, credentials)
      .then(async (res) => {
        if (!res.data.profileCompleted) {
          localStorage.setItem("profileCompleted", "incomplete");
        }
        setAuthorizationHeader(res.data.token, res.data.userType);
        dispatch(startAddTests());
        dispatch({ type: SET_USER_TYPE, userType: res.data.userType });
        localStorage.setItem("name", credentials.email.split("@")[0]);
        dispatch(login());
        const token = jwt_decode(res.data.token);
        localStorage.setItem("user_id", token.user_id);
        localStorage.setItem("college_id", token.college_id);
        dispatch({ type: UNLOADING_UI });
        dispatch(startSetInternships());
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.userType) {
          localStorage.setItem("userType", err.response.data.userType);
        }
        dispatch({
          type: SET_ERRORS,
          error: err.response ? err.response.data.message : "",
        });
      });
  };
};

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
    history.push("/login");
    dispatch(logout());
  };
};

// stores the user data to local storage
export const saveUserToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("user", serializedState);
  } catch (e) {
    console.log(e);
  }
};

export const setAuthorizationHeader = (token, userType) => {
  const FBIdToken = `${token}`;
  localStorage.setItem("token", FBIdToken);
  localStorage.setItem("userType", userType);
  axios.defaults.headers.common["x-access-token"] = FBIdToken;
};
