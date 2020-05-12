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

const SkillSetScreen = ({ navigation }) => {
  return (
    <View>
      <Text>SkillSet</Text>
      <Button
        title='Submit'
        onPress={() =>
          navigation.navigate("Instructions", { id: "work_orientation" })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SkillSetScreen;
