// Button - Go Back (Back to CertificationsScreen)
// Button - Skip (Save and Navigate to CareerProfileScreen)
import React from "react";
import { View, StyleSheet, Text, Image, Button, TextInput } from "react-native";
import { createStackNavigator } from "react-navigation-stack";

const PortfoliosScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/favicon.png")} />
      <Text style={styles.text}>Github Profile url:</Text>
      <TextInput
        placeholder='E.g.https://github.com/username'
        style={styles.input}
      />
      <Text style={styles.text}>Linkedin Profile url:</Text>
      <TextInput
        placeholder='E.g.https://linkedin.com/in/username'
        style={styles.input}
      />
      <Text style={styles.text}>Portfolio Link (if any):</Text>
      <TextInput
        placeholder='E.g.https://myportfolio.com'
        style={styles.input}
      />
      <Text style={styles.text}>Other links (seperated by comma):</Text>
      <TextInput placeholder='google.com, facebook.com' style={styles.input} />
      <Button
        title='Continue'
        onPress={() => navigation.navigate("CareerProfile")}
      />
      <Button
        title='Go Back'
        onPress={() => navigation.navigate("Certifications")}
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

export default PortfoliosScreen;
