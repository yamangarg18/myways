import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CP2Screen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/favicon.png")} />
      <Text style={styles.text}>
        Please note that we do not share any of the responses you give in this
        section with the employers.
      </Text>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("CP1")}>
          <View style={styles.navigationView}>
            <AntDesign style={styles.navigationIcon} name='caretleft' />
            <Text style={styles.navigationText}>Previous</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CP3")}>
          <View style={styles.navigationView}>
            <Text style={styles.navigationText}>Next</Text>
            <AntDesign style={styles.navigationIcon} name='caretright' />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

CP2Screen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
    marginTop: 40,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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

export default CP2Screen;
