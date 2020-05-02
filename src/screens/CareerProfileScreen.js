import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, Button, FlatList } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import BackButton from "../components/BackButton";
import CP1Screen from "./CP1Screen";
import CP2Screen from "./CP2Screen";
import CP3Screen from "./CP3Screen";
import CP4Stack from "./CP4Screen";
import axios from "axios";
import { Icon } from "react-native-elements";
import { REACT_APP_BASE_URL } from "react-native-dotenv";

const CareerProfileScreen = ({ navigation }) => {
  const [testsStatus, setTestsStatus] = useState([
    {
      id: 1,
      testName: "Skill Set analysis",
      isCompleted: false,
      link: "/analysis/skill_set",
      field: "skill_set",
    },
    {
      id: 2,
      testName: "Expectation Analysis",
      isCompleted: false,
      link: "/analysis/expectation",
      field: "expectation",
    },
    {
      id: 3,
      testName: "Work Orientation Analysis",
      isCompleted: false,
      link: "/analysis/work_orientation",
      field: "work_orientation",
    },
    {
      id: 4,
      testName: "Career Values and Personality Analysis",
      isCompleted: false,
      link: "/analysis/personality",
      field: "personality",
    },
  ]);

  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const getTestsStatus = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/user/getTestsStatus`
        );
        let newTestsStatus = [...testsStatus];
        newTestsStatus = newTestsStatus.map((test) => {
          test.isCompleted = data.response[test.field].status ? true : false;
          return test;
        });

        setDataFetched(true);
        setTestsStatus(newTestsStatus);
      } catch (error) {
        if (error.response === undefined) {
          console.log(error.message);
        } else {
          console.log(error.response.data.message);
        }
      }
    };
    if (!dataFetched) getTestsStatus();
  }, [testsStatus, dataFetched]);

  const renderTestsStatus = (testsStatus) => {
    return (
      <FlatList
        data={testsStatus}
        keyExtractor={(test) => test.testName}
        renderItem={({ item }) => {
          const [iconName, iconColor] = item.isCompleted
            ? ["checkcircle", "green"]
            : ["exclamationcircle", "red"];
          return (
            <View style={styles.row}>
              <Text style={styles.title}>{item.testName}</Text>
              <Icon
                name={iconName}
                color={iconColor}
                type='antdesign'
                style={styles.icon}
              />
            </View>
          );
        }}
      />
    );
  };

  const startTest = (testsStatus) => {
    if (!testsStatus[0].isCompleted) {
      this.navigation.push(`${testsStatus[0].link}`);
    } else if (!testsStatus[1].isCompleted) {
      history.push(`${testsStatus[1].link}`);
    } else if (!testsStatus[2].isCompleted) {
      history.push(`${testsStatus[2].link}`);
    } else if (!testsStatus[3].isCompleted) {
      history.push(`${testsStatus[3].link}`);
    } else {
      history.push("/internships/careerOptions");
    }
  };

  const pageVisit = (testsStatus) => {
    if (
      testsStatus[0].isCompleted &&
      testsStatus[1].isCompleted &&
      testsStatus[2].isCompleted &&
      testsStatus[3].isCompleted
    ) {
      return "Explore Career Insights";
    } else {
      return "Start Analyzing";
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/favicon.png")} />
      <Text style={styles.text}>Career Profile</Text>
      <Button
        title={pageVisit(testsStatus)}
        onPress={() => startTest(this.testsStatus)}
      />
      <View>{renderTestsStatus(testsStatus)}</View>
    </View>
  );
};

const CareerProfileStack = createStackNavigator(
  {
    CareerProfile: CareerProfileScreen,
    CP1: CP1Screen,
    CP2: CP2Screen,
    CP3: CP3Screen,
    CP4: {
      screen: CP4Stack,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    defaultNavigationOptions: {
      title: "Career Profile",
      headerLeft: () => <BackButton />,
      headerStyle: {
        backgroundColor: "darkslategrey",
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "yellow",
      },
      headerTitleAlign: "center",
    },
  }
);

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

export default CareerProfileStack;
