import {
  LOGIN,
  LOGOUT,
  LOADING_UI,
  UNSET_ERRORS,
  UNLOADING_UI,
  SET_ERRORS,
  SET_USER_TYPE,
} from "../actions/constants";

const initialState = {
  isAuthenticated: false,
  loading: false,
  userType: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        isAuthenticated: false,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case UNLOADING_UI:
      return {
        ...state,
        loading: false,
      };

    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SET_USER_TYPE:
      return {
        ...state,
        userType: action.userType,
      };
    case UNSET_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
