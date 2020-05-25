import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Button,
  FlatList,
} from "react-native";
import { startAddTests } from "../actions/test";
import { AntDesign } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation-stack";
import InstructionsScreen from "./InstructionsScreen";
import SkillSetScreen from "./SkillSetScreen";
import WorkOrientationScreen from "./WorkOrientationScreen";
import ExpectationScreen from "./ExpectationScreen";
import PersonalityScreen from "./PersonalityScreen";

const CP4Screen = ({ navigation }) => {
  const field = navigation.state.params.id;

  const [isTestActive, setIsTestActive] = useState(false);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/favicon.png")} />
      <Text style={styles.text}>
        Please, it is recommended to be honest and answer these questions
        seriously
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Text>{"\u2022"}</Text>
        <Text style={{ flex: 1, paddingLeft: 5 }}>There are 4 sections</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text>{"\u2022"}</Text>
        <Text style={{ flex: 1, paddingLeft: 5 }}>
          You won't be able to edit your response later, hence start only when
          you are free.
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text>{"\u2022"}</Text>
        <Text style={{ flex: 1, paddingLeft: 5 }}>
          Total time needed: 25-30 minutes. You can attempt different sections
          at different times.
        </Text>
      </View>
      <Button
        title='Instructions'
        onPress={() => navigation.navigate("Instructions", { id: field })}
      />
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("CP1")}>
          <View style={styles.navigationView}>
            <AntDesign style={styles.navigationIcon} name='caretleft' />
            <Text style={styles.navigationText}>Previous</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

CP4Screen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const CP4Stack = createStackNavigator({
  CP4: CP4Screen,
  Instructions: InstructionsScreen,
  SkillSet: SkillSetScreen,
  Expectation: ExpectationScreen,
  WorkOrientation: WorkOrientationScreen,
  Personality: PersonalityScreen,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // marginBottom: 200,
  },
  logo: {
    // alignSelf: "center",
    width: 125,
    height: 120,
    // marginBottom: 5,
    marginTop: 50,
  },
  text: {
    color: "black",
    textAlign: "center",
    fontSize: 30,
    marginTop: 40,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
    marginBottom: 5,
  },
  navigationView: {
    flexDirection: "row",
  },
  navigationIcon: {
    width: 20,
    height: 20,
    color: "black",
    marginHorizontal: 5,
  },
  navigationText: {
    color: "black",
    fontSize: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default CP4Stack;
