import createTestContext from "./dataTestContext";
import axios from "axios";
import { REACT_APP_BASE_URL } from "react-native-dotenv";
import someapi from "../api/someapi";

const testReducer = (state, action) => {
  switch (action.type) {
    case "get_tests":
      return action.payload, console.log(payload);
    default:
      return state;
  }
};

const getTests = (dispatch) => {
  return async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/tests`);
    console.log(response.data);

    dispatch({ type: "get_tests", payload: response.data.questions });
  };
};

export const { Context, Provider } = createTestContext(
  testReducer,
  { getTests },
  null
);
