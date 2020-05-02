import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startAddTests } from "../../actions/test";
import { View, StyleSheet, Image, Button, FlatList } from "react-native";
import { Text } from "react-native-elements";
// import axios from "axios";
import SkillSet from "./SkillSet";
import WorkOrientation from "./WorkOrientation";
import Expectation from "./Expectation";
import Personality from "./Personality";

const AnalysisPage = (props) => {
  const tests = useSelector((state) => state.test.tests);
  const dispatch = useDispatch();
  const [isTestActive, setIsTestActive] = useState(false);

  useEffect(() => {
    if (!tests) dispatch(startAddTests());
  }, [dispatch, tests]);

  const renderTestIntructions = (testName) => {
    if (tests) {
      let [result] = tests.filter((test) => test.assesmentType === testName);
      return (
        <View style={styles.container}>
          <Text h1>{result.assesmentName}: Instructions</Text>
          <View>{result.instructions}</View>
          <Button title='Start' onPress={() => setIsTestActive(true)} />
        </View>
      );
    }
  };
  const renderTest = (testName) => {
    switch (testName) {
      case "skill_set":
        return <SkillSet />;
      case "work_orientation":
        return <WorkOrientation />;
      case "expectation":
        return <Expectation />;
      case "personality":
        return <Personality />;
      default:
        return "Invalid test";
    }
  };

  return (
    <View>
      {tests && !isTestActive && renderTestIntructions(props.match.params.name)}
      {tests && isTestActive && renderTest(props.match.params.name)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 200,
  },
  logo: {
    width: 125,
    height: 120,
    marginTop: 50,
  },
  text: {
    color: "black",
    textAlign: "center",
    fontSize: 30,
    marginTop: 50,
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    // borderTopWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 18,
    marginRight: 10,
  },
  icon: {
    fontSize: 24,
  },
});

export default AnalysisPage;
