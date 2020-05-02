import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import Stack from "./src/components/Drawer";
import CareerProfileStack from "./src/screens/CareerProfileScreen";
import UserProfileStack from "./src/screens/UserProfileScreen";
import EnterSkillsScreen from "./src/screens/EnterSkillsScreen";
import { Provider } from "./src/context/EducationContext";

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: Stack,
});

const App = createAppContainer(CareerProfileStack);

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
