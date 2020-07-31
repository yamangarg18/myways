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
  // const [step, setStep] = useState(1);

  // useEffect(() => {
  //   const getStudentData = () => {
  //     let {
  //       experiences: [],
  //       education: [],
  //       skills: {
  //         present: [],
  //         aspirational_skills: [],
  //       },
  //       courses: [],
  //       projects: [],
  //       profileLinks,
  //       achievement,
  //       availability,
  //       location,
  //     }
  //     profileLinks =
  //       profileLinks === undefined
  //         ? {
  //           github: "",
  //           linkedin: "",
  //           portfolio: "",
  //           other: "",
  //         }
  //         : profileLinks;
  //     setFormData({
  //       education,
  //       skills,
  //       experiences,
  //       projects,
  //       courses,
  //       profileLinks,
  //       achievement,
  //       availability,
  //       location,
  //     });
  //   };

  //   getStudentData();
  // }, []);

  // const nextStep = () => {
  //   setStep(step + 1);
  // };

  // const prevStep = () => {
  //   if (step - 1 <= 0) navigation.navigate("dashboard");
  //   else setStep(step - 1);
  // };

  // const currentForm = () => {
  //   switch (step) {
  //     case 1:
  //       return (
  //         <StudentInfo
  //           formData={formData}
  //           setFormData={setFormData}
  //           nextStep={nextStep}
  //           prevStep={prevStep}
  //           error={error}
  //         />
  //       );
  //     // case 2:
  //     //   return (
  //     //     <StudentSkills
  //     //       formData={formData}
  //     //       setFormData={setFormData}
  //     //       nextStep={nextStep}
  //     //       prevStep={prevStep}
  //     //       error={error}
  //     //     />
  //     //   );
  //     // case 3:
  //     //   return (
  //     //     <StudentExperience
  //     //       formData={formData}
  //     //       setFormData={setFormData}
  //     //       nextStep={nextStep}
  //     //       prevStep={prevStep}
  //     //       error={error}
  //     //     />
  //     //   );
  //     // case 4:
  //     //   return (
  //     //     <StudentProject
  //     //       formData={formData}
  //     //       setFormData={setFormData}
  //     //       nextStep={nextStep}
  //     //       prevStep={prevStep}
  //     //       error={error}
  //     //     />
  //     //   );
  //     // case 5:
  //     //   return (
  //     //     <Courses
  //     //       formData={formData}
  //     //       setFormData={setFormData}
  //     //       nextStep={nextStep}
  //     //       prevStep={prevStep}
  //     //       error={error}
  //     //     />
  //     //   );
  //     // case 6:
  //     //   return (
  //     //     <Achievement
  //     //       formData={formData}
  //     //       setFormData={setFormData}
  //     //       nextStep={nextStep}
  //     //       prevStep={prevStep}
  //     //       error={error}
  //     //     />
  //     //   );
  //     // case 7:
  //     //   return (
  //     //     <StudentProfile
  //     //       formData={formData}
  //     //       setFormData={setFormData}
  //     //       nextStep={nextStep}
  //     //       prevStep={prevStep}
  //     //       error={error}
  //     //     />
  //     //   );
  //     // case 8:
  //     //   return (
  //     //     <StudentAvailability
  //     //       formData={formData}
  //     //       setFormData={setFormData}
  //     //       nextStep={nextStep}
  //     //       prevStep={prevStep}
  //     //     />
  //     //   );
  //     default:
  //       return null;
  //   }
  // };

  return (
    // currentForm()
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
