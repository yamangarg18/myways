import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TextInput,
  FlatList,
} from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";
import { Context } from "../context/EducationContext";

const EditEducationScreen = ({ navigation }) => {
  const { state, editEducation } = useContext(Context);

  const id = navigation.getParam("id");

  const education = state.find((education) => education.id === id);

  const [college, setCollege] = useState(education.college);
  const [degree, setDegree] = useState(education.degree);
  const [field, setField] = useState(education.field);
  const [location, setLocation] = useState(education.location);
  const [grade, setGrade] = useState(education.grade);
  const [summary, setSummary] = useState(education.summary);
  const [starting, setStarting] = useState(education.starting);
  const [ending, setEnding] = useState(education.ending);

  return (
    <ScrollView>
      <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
        <View style={styles.container}>
          <Text style={styles.label}>College Name*</Text>
          <TextInput
            placeholder='E.g. NIT,Trichy'
            style={styles.input}
            value={college}
            onChangeText={(text) => setCollege(text)}
          />
          <Text style={styles.label}>Degree*</Text>
          <TextInput
            placeholder='E.g. Bachelor of Technology'
            style={styles.input}
            value={degree}
            onChangeText={(text) => setDegree(text)}
          />
          <Text style={styles.text}>Not Listed?</Text>
          <Text style={styles.label}>Field Of Study*</Text>
          <TextInput
            placeholder='E.g. Electronics Engineering'
            style={styles.input}
            value={field}
            onChangeText={(text) => setField(text)}
          />
          <Text style={styles.label}>Location*</Text>
          <TextInput
            placeholder='E.g. Mumbai'
            style={styles.input}
            value={location}
            onChangeText={(text) => setLocation(text)}
          />
          <Text style={styles.text}>Not Listed?</Text>
          <Text style={styles.label}>Grade*</Text>
          <TextInput
            placeholder='CGPA(on 10)/Percentage '
            style={styles.input}
            value={grade}
            onChangeText={(text) => setGrade(text)}
          />
          <Text style={styles.label}>Summary</Text>
          <TextInput
            placeholder='Profile Headline'
            style={styles.input}
            value={summary}
            onChangeText={(text) => setSummary(text)}
          />
          <Text style={styles.label}>Starting Year*</Text>
          <TextInput
            placeholder='E.g 2020'
            style={styles.input}
            value={starting}
            onChangeText={(text) => setStarting(text)}
          />
          <Text style={styles.label}>Ending Year*</Text>
          <TextInput
            placeholder='E.g 2020'
            style={styles.input}
            value={ending}
            onChangeText={(text) => setEnding(text)}
          />
          <Button
            title='Save'
            onPress={() =>
              editEducation(
                id,
                college,
                degree,
                field,
                location,
                grade,
                summary,
                starting,
                ending,
                () => {
                  navigation.navigate("UserProfile");
                }
              )
            }
          />
          <Button
            title='Go Back'
            onPress={() => navigation.navigate("UserProfile")}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
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
EditEducationScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 50,
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
    fontSize: 20,
  },
  input: {
    flex: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginHorizontal: 10,
  },
});

export default EditEducationScreen;
