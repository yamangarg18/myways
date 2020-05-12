import {
  ADD_TESTS,
  ADD_ANSWERS,
  CURRENT_TEST,
  CURRENT_ANSWERS,
  CLEAR_RESPONSE,
  GET_DIFFICULTY,
  SET_CURRENT_ITEM,
} from "../actions/constants";

const initState = {
  tests: null,
  questions: [],
  response: {},
  currentItem: {},
  isCompleted: true,
};

export default (state = initState, action) => {
  // debugger
  switch (action.type) {
    case ADD_TESTS:
      return {
        ...state,
        tests: action.tests,
      };

    /*
            There are two types of tests.
            A. with paragraph and its sub questions
            B. only questions
            the below code is used to store the the answers being giving by the user into redux
        */
    // case ADD_ANSWERS:
    //   const currentQuestion = action.currentQuestion;
    //   if (!!action.currentSubquestion) {
    //     //we're checking if subquestions are being passed. if yes then it means that this is test A
    //     return {
    //       ...state,
    //       response: {
    //         ...state.response,
    //         [currentQuestion]: {
    //           ...state.response[currentQuestion],
    //           [action.currentSubquestion]: action.answerNumber,
    //         },
    //       },
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       response: {
    //         ...state.response,
    //         [currentQuestion]: action.answerNumber,
    //       },
    //     };
    //   }
    // case CURRENT_ANSWERS:
    //   return {
    //     ...state,
    //     answers: action.answers,
    //   };
    // case GET_DIFFICULTY:
    //   state.answers.userDifficulty = action.difficulty;
    //   return state;
    case CURRENT_TEST:
      return {
        ...state,
        questions: action.questions,
      };
    // case SET_CURRENT_ITEM:
    //   return {
    //     ...state,
    //     currentItem: action.item,
    //   };
    // case CLEAR_RESPONSE:
    //   return {
    //     ...state,
    //     response: {},
    //   };
    default:
      return state;
  }
};
