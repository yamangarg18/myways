import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, Button, FlatList } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import BackButton from "../components/BackButton";
import CP1Screen from "./CP1Screen";
import CP4Stack from "./CP4Screen";
import axios from "axios";
import { Icon } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { REACT_APP_BASE_URL } from "react-native-dotenv";

const CareerProfileScreen = ({ navigation }) => {
  const [testsStatus, setTestsStatus] = useState([
    {
      id: 1,
      testName: "Skill Set Analysis",
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

  // const [dataFetched, setDataFetched] = useState(false);

  // useEffect(() => {
  //   const getTestsStatus = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `${process.env.REACT_APP_BASE_URL}/api/user/getTestsStatus`
  //       );
  //       let newTestsStatus = [...testsStatus];
  //       newTestsStatus = newTestsStatus.map((test) => {
  //         test.isCompleted = data.response[test.field].status ? true : false;
  //         return test;
  //       });

  //       setDataFetched(true);
  //       setTestsStatus(newTestsStatus);
  //     } catch (error) {
  //       if (error.response === undefined) {
  //         console.log(error.message);
  //       } else {
  //         console.log(error.response.data.message);
  //       }
  //     }
  //   };
  //   if (!dataFetched) getTestsStatus();
  // }, [testsStatus, dataFetched]);

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
              <AntDesign
                name={iconName}
                color={iconColor}
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
      navigation.navigate("CP1", { id: testsStatus[0].field });
    } else if (!testsStatus[1].isCompleted) {
      navigation.navigate("CP1", { id: testsStatus[1].field });
    } else if (!testsStatus[2].isCompleted) {
      navigation.navigate("CP1", { id: testsStatus[2].field });
    } else if (!testsStatus[3].isCompleted) {
      navigation.navigate("CP1", { id: testsStatus[3].field });
    } else {
      navigation.navigate("CareerInsight");
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
        onPress={() => startTest(testsStatus)}
      />
      <View>{renderTestsStatus(testsStatus)}</View>
    </View>
  );
};

const CareerProfileStack = createStackNavigator(
  {
    CareerProfile: CareerProfileScreen,
    CP1: CP1Screen,
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
