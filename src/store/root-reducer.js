import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
// import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from "react-native";

import authReducer from "../reducers/auth";
// import filterReducer from "../reducers/filters";
// import * as SearchStore from "./SearchStore";
// import * as SideMenu from "./SideMenu";
// import employerReducer from "../reducers/employer";
// import studentReducer from "../reducers/student";
// import internshipReducer from "../reducers/internship";
import testReducer from "../reducers/test";
// import ApplicantsData from "../reducers/applicants";
import otpModal from "../reducers/otpModal";
// import CareerInsight from "../reducers/careerInsightsModalData";
// import StudentEditingModal from "../reducers/EditStudentProfile";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [],
};

const rootReducer = combineReducers({
  auth: authReducer,
  // sideMenu: SideMenu.reducer,
  // searchStore: SearchStore.reducer,
  // filters: filterReducer,
  // employer: employerReducer,
  // internship: internshipReducer,
  // student: studentReducer,
  test: testReducer,
  // careerInsight: CareerInsight,
  // applicants: ApplicantsData,
  otpModal: otpModal,
  // StudentEditingModal: StudentEditingModal,
});

export default persistReducer(persistConfig, rootReducer);
