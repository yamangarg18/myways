import React from "react";
import { View, StyleSheet, Text, Image, Button } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import BackButton from "../components/BackButton";
import CP1Screen from "./CP1Screen";
import CP2Screen from "./CP2Screen";
import CP3Screen from "./CP3Screen";
import CP4Stack from "./CP4Screen";

const CareerProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/favicon.png")} />
      <Text style={styles.text}>Career Profile</Text>
      <Button title='Get Started' onPress={() => navigation.navigate("CP1")} />
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
});

export default CareerProfileStack;
