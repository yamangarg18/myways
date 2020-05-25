import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { Text } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { startAddTests } from "../actions/test";
import { createStackNavigator } from "react-navigation-stack";

const InstructionsScreen = ({ navigation }) => {
  const field = navigation.state.params.id;

  // const tests = useSelector((state) => state.test.tests);
  // const dispatch = useDispatch();
  const tests = [
    {
      assesmentType: "skill_set",
      assesmentName: "Skill Set Analysis",
      hasTaken: false,
      instructions:
        "In each question choose how much interest you have in doing the activity as a Career. Choose Completely Agree if you love to have it as a Career and Completely Disagree if you do not like doing it at all. Choose other options if your interest level is in between. Please be thoughtful and honest in answering all questions. Some questions might look repetitive but they serve different purposes. Hence, be patient in answering.",
    },
    {
      assesmentType: "personality",
      hasTaken: false,
      assesmentName: "Career Values and Personality Analysis",
      instructions:
        "This test is highly customised and will present different questions based on your earlier responses. Each response helps us recommend you the right opportunities for you and avoid the wrong/wasteful opportunities. The responses will be kept confidential. Hence, please be thoughtful and honest in answering all questions.Some questions might look repetitive but they serve different purposes. Hence, be patient in answering.Sometimes you may wish to choose both or neither of the options, in such cases choose the one which describes you comparatively more often. Think of examples and reasons behind your behaviour in such cases to choose the best option",
    },
    {
      assesmentType: "expectation",
      hasTaken: false,
      assesmentName: "Expectation Analysis",
      instructions:
        "In this section, a statement will be provided followed by a series of suggested conclusions. Here, you must take the statement to be true. After reading each conclusion underneath the statement, you must decide whether you think it follows from the statement provided.If you agree that the conclusion exactly follows the statement, chose Conclusion follows. However, if you do not agree that the conclusion exactly follows then chose Conclusion does not follow.You must select your answer based only on the information presented; not using general knowledge. Similarly, you are advised not to let your own opinions or prejudices influence your decisions; stick to the statements and base your judgements on the facts presented.",
    },
    {
      assesmentType: "work_orientation",
      hasTaken: false,
      assesmentName: "Work Orientation Analysis",
      instructions:
        " In each question choose how much interest you have in doing a certain activity. Choose Completely Agree (5 stars) if you love to do the activity and Completely Disagree",
    },
  ];
  // useEffect(() => {
  //   if (!tests) dispatch(startAddTests());
  // }, [dispatch, tests]);

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

  const renderTest = (testName) => {
    if (testName === "skill_set") {
      navigation.navigate("SkillSet");
    } else if (testName === "expectation") {
      navigation.navigate("Expectation");
    } else if (testName === "work_orientation") {
      navigation.navigate("WorkOrientation");
    } else if (testName === "personality") {
      navigation.navigate("Personality");
    } else {
      navigation.navigate("CP4");
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/favicon.png")} />
      <Button title='Start Analysis' onPress={() => renderTest(field)} />
      <Text>{field}</Text>
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
