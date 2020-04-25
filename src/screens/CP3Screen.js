import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CP3Screen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/favicon.png")} />
      <Text style={styles.text}>
        This section is completely to analyse you for better career planning and
        this section directly impacts the Career Insights Section and all your
        recommendations.
      </Text>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("CP2")}>
          <View style={styles.navigationView}>
            <AntDesign style={styles.navigationIcon} name='caretleft' />
            <Text style={styles.navigationText}>Previous</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CP4")}>
          <View style={styles.navigationView}>
            <Text style={styles.navigationText}>Next</Text>
            <AntDesign style={styles.navigationIcon} name='careright' />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

CP3Screen.navigationOptions = () => {
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

export default CP3Screen;
