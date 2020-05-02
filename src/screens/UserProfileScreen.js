import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import BackButton from "../components/BackButton";
import EnterSkillsScreen from "./EnterSkillsScreen";
import ExperiencesScreen from "./ExperiencesScreen";
import ProjectsScreen from "./ProjectsScreen";
import CertificationsScreen from "./CertificationsScreen";
import PortfoliosScreen from "./PortfoliosScreen";
import { Context } from "../context/EducationContext";
import { MaterialIcons } from "@expo/vector-icons";
import AddEducationScreen from "./AddEducationScreen";
import EditEducationScreen from "./EditEducationScreen";

const UserProfileScreen = ({ navigation }) => {
  const { state } = useContext(Context);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/favicon.png")} />
      <Text style={styles.text}>User Profile</Text>
      <FlatList
        data={state}
        keyExtractor={(education) => education.title}
        renderItem={({ item }) => {
          return (
            <View style={styles.row}>
              <Text style={styles.title}>
                {item.degree}
                {"\n"}
                {item.college}
                {"\n"}
                {item.starting}-{item.ending}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditEducation", {
                    id: item.id,
                  })
                }
              >
                <MaterialIcons name='edit' style={styles.icon} />
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <Button title='Add' onPress={() => navigation.navigate("AddEducation")} />
      <Button
        title='Continue'
        onPress={() => navigation.navigate("EnterSkills")}
      />
      <Button
        title='Go Back'
        onPress={() => navigation.navigate("Dashboard")}
      />
    </View>
  );
};

const UserProfileStack = createStackNavigator(
  {
    UserProfile: UserProfileScreen,
    AddEducation: AddEducationScreen,
    EditEducation: EditEducationScreen,
    EnterSkills: EnterSkillsScreen,
    Experiences: ExperiencesScreen,
    Projects: ProjectsScreen,
    Certifications: CertificationsScreen,
    Portfolios: PortfoliosScreen,
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default UserProfileStack;
