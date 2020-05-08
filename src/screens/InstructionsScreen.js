import React, { useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { startAddTests } from "../actions/test";

const InstructionsScreen = ({ navigation }) => {
  const field = navigation.state.params.id;

  const tests = useSelector((state) => state.test.tests);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!tests) dispatch(startAddTests());
  }, [dispatch, tests]);

  const renderTestIntructions = (testName) => {
    if (tests) {
      let [result] = tests.filter((test) => test.assesmentType === testName);
      return (
        <View style={styles.container}>
          <Text style={styles.text1}>{result.assesmentName}</Text>
          <Text style={styles.text2}>{result.instructions}</Text>
        </View>
      );
    }
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/favicon.png")} />
      <View>{renderTestIntructions(field)}</View>
    </View>
  );
};

InstructionsScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

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
  text1: {
    color: "black",
    textAlign: "center",
    fontSize: 30,
    marginTop: 40,
  },
  text2: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    marginTop: 40,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginBottom: 36,
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
});

export default InstructionsScreen;
