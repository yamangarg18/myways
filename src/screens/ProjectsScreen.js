// Button - Add (To AddProjectScreen)
import React from "react";
import { View, StyleSheet, Text, Image, Button } from "react-native";
import { createStackNavigator } from "react-navigation-stack";

const ProjectsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/favicon.png")} />
      <Text style={styles.text}>Add your Projects</Text>
      <Text style={styles.text}>
        Empty Fields don't look good. Consider adding something?
      </Text>
      <Button title='Add' onPress={() => navigation.navigate("CP1")} />
      <Button
        title='Continue'
        onPress={() => navigation.navigate("Certifications")}
      />
      <Button
        title='Go Back'
        onPress={() => navigation.navigate("Experiences")}
      />
    </View>
  );
};

// const UserProfileStack = createStackNavigator(
//   {
//     UserProfile: UserProfileScreen,
//   },
//   {
//     defaultNavigationOptions: {
//       title: "User Profile",
//       headerLeft: () => <BackButton />,
//       headerStyle: {
//         backgroundColor: "darkslategrey",
//       },
//       headerTitleStyle: {
//         fontWeight: "bold",
//         color: "yellow",
//       },
//       headerTitleAlign: "center",
//     },
//   }
// );

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

export default ProjectsScreen;
