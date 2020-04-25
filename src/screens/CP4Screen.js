import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import TestScreen from "./TestScreen";
import { AntDesign } from "@expo/vector-icons";

const CP4Screen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/favicon.png")} />
      <Text style={styles.text}>
        Please, it is recommended to be honest and answer these questions
        seriously
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Text>{"\u2022"}</Text>
        <Text style={{ flex: 1, paddingLeft: 5 }}></Text>
      </View>
      <Button
        title='Start Analysis'
        onPress={() => navigation.navigate("Test")}
      />
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("CP3")}>
          <View style={styles.navigationView}>
            <AntDesign style={styles.navigationIcon} name='caretleft' />
            <Text style={styles.navigationText}>Previous</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CP4Stack = createStackNavigator({
  CP4: CP4Screen,
  Test: TestScreen,
});

CP4Screen.navigationOptions = () => {
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
});

export default CP4Stack;