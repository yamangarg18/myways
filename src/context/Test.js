import TestContext from "./TestContext";
import axios from "axios";

const TestReducer = (state, action) => {
  switch (action.payload.type) {
    case "ADD_TESTS":
      return {
        ...state,
        tests: action.payload.tests,
      };

    /*
                There are two types of tests.
                A. with paragraph and its sub questions
                B. only questions
                the below code is used to store the the answers being giving by the user into redux
            */
    case "ADD_ANSWERS":
      const currentQuestion = action.payload.currentQuestion;
      if (!!action.payload.currentSubquestion) {
        //we're checking if subquestions are being passed. if yes then it means that this is test A
        return {
          ...state,
          response: {
            ...state.response,
            [currentQuestion]: {
              ...state.response[currentQuestion],
              [action.payload.currentSubquestion]: action.payload.answerNumber,
            },
          },
        };
      } else {
        return {
          ...state,
          response: {
            ...state.response,
            [currentQuestion]: action.payload.answerNumber,
          },
        };
      }
    case "CURRENT_ANSWERS":
      return {
        ...state,
        answers: action.payload.answers,
      };
    case "GET_DIFFICULTY":
      state.answers.userDifficulty = action.payload.difficulty;
      return state;
    case "CURRENT_TEST":
      return {
        ...state,
        questions: action.payload.questions,
      };
    case "SET_CURRENT_ITEM":
      return {
        ...state,
        currentItem: action.payload.item,
      };
    case "CLEAR_RESPONSE":
      return {
        ...state,
        response: {},
      };
    default:
      return state;
  }
};

// to load all the tests into redux
const addTests = (tests) => ({
  type: "ADD_TESTS",
  payload: tests,
});

// api call to get all the tests from the backend. used in the dashboard
const startAddTests = (dispatch) => {
  return async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/tests`
      );
      dispatch(addTests(res.data.questions));
    } catch (err) {
      console.log(err);
    }
  };
};

// this stores all the questions of the current test
const currentTest = (questions) => ({
  type: "CURRENT_TEST",
  payload: questions,
});

// I dont think If I use this anymore but I'm gonna let it stay here.
const currentAnswers = (answers) => ({
  type: "CURRENT_ANSWERS",
  payload: answers,
});

// const addQuetions = (questions) => ({
//     type: ADD_QUESTIONS,
//     questions,
//   });

// const questionState = (current) => ({
//     type: QUESTION_STATE,
//     current,
//   });

// const testState = (assesmentType) => ({
//     type: TEST_STATE,
//     assesmentType,
//   });

const getDifficulty = (difficulty) => ({
  type: "GET_DIFFICULTY",
  payload: difficulty,
});

const setCurrentItem = (item) => ({
  type: "SET_CURRENT_ITEM",
  payload: item,
});

const clearResponse = () => ({
  type: "CLEAR_RESPONSE",
});

// to add the answers
const addAnswers = (
  answerNumber,
  answer,
  currentQuestion,
  currentSubquestion
) => {
  return {
    type: "ADD_ANSWERS",
    payload: { answerNumber, answer, currentQuestion, currentSubquestion },
  };
};

// export const API_URI = "http://edoflip.myways.in/api";
// export const API_URI = "http://localhost:2000/api";

// api call to get all the tests from the backend. used in the dashboard

// api call to get the questions for the selected test
const getCurrentTest = (testName = "deductiveReasoning") => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/test/${testName.toLowerCase()}`
      );
      dispatch(currentTest(res.data));
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
};

// export const getCurrentTest = (testName = "interestTest") => {
//     return (dispatch, getState) => {
//         dispatch({ type: LOADING_UI });
//         return axios.get(`${API_URI}/user/setTestCompleted/${testName.toLowerCase()}`).then(res => {
//             dispatch(currentTest(res.data));
//             dispatch({ type: UNLOADING_UI });
//             console.log(res.data)
//         }).catch(err => {
//             console.log(err)
//         })
//     }
// }

// this sends the answers to the backend
const sendAnswers = (testName, answers) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/test/${testName.toLowerCase()}`,
        {
          response: answers,
          user_id: window.localStorage.getItem("user_id"),
        }
      );
      dispatch(currentTest(res.data)); //loads up new questions if anny
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
};

// this is for personality test as in it we have to send the ans twice so this is for sending the ans the second time
const sendAnswers2 = (testName, answers) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/test/${testName.toLowerCase()}2`,
        {
          response: answers,
          user_id: window.localStorage.getItem("user_id"),
        }
      );
      dispatch(currentTest(res.data));
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
};

// export const sendAnswers2 = (testName,answers) => {
//     return (dispatch, getState) => {
//         dispatch({ type: LOADING_UI });
//         return axios.post(`${API_URI}/test/${testName.toLowerCase()}2`, {response:answers}).then(res => {
//             dispatch(currentTest(res.data));
//             dispatch({ type: UNLOADING_UI });
//             return res.data;
//         }).catch(err => {
//             console.log(err)
//         })
//     }
// }

export const { Context, Provider } = TestContext(TestReducer, {
  addTests,
  currentTest,
  currentAnswers,
  getDifficulty,
  setCurrentItem,
  clearResponse,
  addAnswers,
  startAddTests,
  getCurrentTest,
  sendAnswers,
  sendAnswers2,
});
