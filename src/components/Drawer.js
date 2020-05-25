import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer"; // npm install react-navigation-drawer
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import UserProfileStack from "../screens/UserProfileScreen";
import CareerProfileStack from "../screens/CareerProfileScreen";
import SettingsStack from "../screens/SettingsScreen";
import SupportStack from "../screens/SupportScreen";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import BottomTabs from "./BottomTabs";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";
import { Text, TouchableOpacity, View } from "react-native";
import ChatStack from "../screens/ChatScreen";

const DrawerNavigator = createDrawerNavigator(
  {
    Tabs: BottomTabs,
  },
  {
    initialRouteName: "Tabs",
    contentComponent: (props) => {
      return (
        <ScrollView>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("UserProfile");
                  props.navigation.closeDrawer();
                }}
              >
                <View style={styles.row}>
                  <Ionicons name='md-person' style={styles.icon} />
                  <Text style={styles.title}>User Profile</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("CareerProfile");
                  props.navigation.closeDrawer();
                }}
              >
                <View style={styles.row}>
                  <FontAwesome name='pencil-square-o' style={styles.icon} />
                  <Text style={styles.title}>Career Profile</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Settings");
                  props.navigation.closeDrawer();
                }}
              >
                <View style={styles.row}>
                  <Ionicons name='md-settings' style={styles.icon} />
                  <Text style={styles.title}>Settings</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Support");
                  props.navigation.closeDrawer();
                }}
              >
                <View style={styles.row}>
                  <FontAwesome name='question' style={styles.icon} />
                  <Text style={styles.title}>Support</Text>
                </View>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      );
    },
  }
);

const Stack = createStackNavigator({
  Drawer: {
    screen: DrawerNavigator,
    navigationOptions: {
      headerShown: false,
    },
  },
  UserProfile: {
    screen: UserProfileStack,
    navigationOptions: {
      headerShown: false,
    },
  },
  CareerProfile: {
    screen: CareerProfileStack,
    navigationOptions: {
      headerShown: false,
    },
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      headerShown: false,
    },
  },
  Support: {
    screen: SupportStack,
    navigationOptions: {
      headerShown: false,
    },
  },
  Chat: {
    screen: ChatStack,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 200,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
    backgroundColor: "darkslategrey",
  },
  title: {
    fontSize: 18,
    color: "yellow",
    marginVertical: 5,
  },
  icon: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 15,
    color: "yellow",
  },
});

export default createAppContainer(Stack);
