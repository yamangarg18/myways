import React from "react";
import { View, StyleSheet, Text, Image, Button, TextInput } from "react-native";
import { createStackNavigator } from "react-navigation-stack";

const EnterSkillsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/favicon.png")} />
      <Text style={styles.text}>Let's personalize your experience</Text>
      <Text style={styles.text}>Tell us about all the skills you know</Text>
      <TextInput placeholder='Current skills' style={styles.input} />
      <Text style={styles.text}>Tell us about skills you wish to learn</Text>
      <TextInput placeholder='Skills you want to learn' style={styles.input} />
      <Text style={styles.text}>Press 'ENTER' Key to separate two skills</Text>
      <Button
        title='Continue'
        onPress={() => navigation.navigate("Experiences")}
      />
      <Button
        title='Go Back'
        onPress={() => navigation.navigate("UserProfile")}
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

export default EnterSkillsScreen;
