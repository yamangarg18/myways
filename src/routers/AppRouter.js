import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TextInput,
  FlatList,
} from "react-native";

import CareerProfile from "../screens/CareerProfileScreen";

import AnalysisPage from "../components/tests/AnalysisPage";

export const history = createBrowserHistory();

const { pathname } = history.location;

const AppRouter = () => (
  <Router history={history}>
    <div className=''>
      <Switch>
        <PrivateRoute
          exact
          path='/skill_test'
          component={() => <SkillTest />}
        />
        <PrivateRoute
          exact
          path='/careerProfile'
          component={CareerProfile}
          scope={["student"]}
        />
        <PrivateRoute
          path='/analysis/:name'
          component={AnalysisPage}
          scope={["student"]}
        />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
