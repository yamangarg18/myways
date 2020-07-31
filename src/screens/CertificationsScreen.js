// Button - Add (To AddCertificationScreen)
import React from "react";
import { View, StyleSheet, Text, Image, Button } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import AddCertificationScreen from "./AddCertificationScreen";

const CertificationsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/favicon.png")} />
      <Text style={styles.text}>Add your Certifications</Text>
      <Text style={styles.text}>
        Empty Fields don't look good. Consider adding something?
      </Text>
      <Button title='Add' onPress={() => navigation.navigate("AddCertifications")} />
      <Button
        title='Continue'
        onPress={() => navigation.navigate("Portfolios")}
      />
      <Button title='Go Back' onPress={() => navigation.navigate("Projects")} />
    </View>
  );
};

const CertificationsStack = createStackNavigator(
  {
    Cert: CertificationsScreen,
    AddCertifications: AddCertificationScreen

  },
  {
    defaultNavigationOptions: {
      title: "User Profile",
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
    justifyContent: "center",
    marginBottom: 200,
  },
  logo: {
    alignSelf: "center",
    width: 125,
    height: 120,
    marginBottom: 5,
  },
  text: {
    color: "black",
    textAlign: "center",
    fontSize: 30,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
});

export default CertificationsScreen;
