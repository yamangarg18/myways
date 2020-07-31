// Certification Title:
// Input - E.g Python Masterclass Certificate
// Certificate Link:
// Input - E.g https://coursera.com/view/id
// Course Link:
// Input - E.g https://udemy.com/course/python
// Description:
// Input - What was it about?
// Skills Information:
// Input - What skills you acquired?
// Button - Save (To CertificationsScreen)
// Button - Cancel (To CertificationsScreen)
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

const AddCertificationScreen = ({ navigation }) => {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [course, setCourse] = useState("");
    const [location, setLocation] = useState("");
    const [grade, setGrade] = useState("");
    const [summary, setSummary] = useState("");
    const [starting, setStarting] = useState("");
    const [ending, setEnding] = useState("");
    const { addEducation } = useContext(Context);

    return (
        <ScrollView>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
                <View style={styles.container}>
                    <Text style={styles.label}>Certification Title:</Text>
                    <TextInput
                        placeholder='E.g Python Masterclass Certificate'
                        style={styles.input}
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                    />
                    <Text style={styles.label}>Certificate Link:</Text>
                    <TextInput
                        placeholder='E.g https://coursera.com/view/id'
                        style={styles.input}
                        value={link}
                        onChangeText={(text) => setLink(text)}
                    />
                    <Text style={styles.label}>Course Link:</Text>
                    <TextInput
                        placeholder='E.g https://udemy.com/course/python'
                        style={styles.input}
                        value={course}
                        onChangeText={(text) => setCourse(text)}
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
                            addEducation(
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

AddCertificationScreen.navigationOptions = () => {
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

export default AddCertificationScreen;
