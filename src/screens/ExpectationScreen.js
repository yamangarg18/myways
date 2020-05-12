import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Button,
  FlatList,
} from "react-native";
import { REACT_APP_BASE_URL } from "react-native-dotenv";

const ExpectationScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Expectation</Text>
      <Button
        title='Submit'
        onPress={() =>
          navigation.navigate("Instructions", { id: "personality" })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ExpectationScreen;
