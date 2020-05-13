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
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import Swiper from "react-native-swiper";

const WorkOrientationScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState(0);
  const [currentTypeQuestion, setCurrentTypeQuestion] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [answers, setAnswers] = useState([]);

  const [isTestCompleted, setIsTestCompleted] = useState(false);

  const [alreadyTaken, setAlreadyTaken] = useState(false);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await axios.get(
          `http://3164cdfe.ngrok.io/api/test/workOrientation`
        );
        let totalQues = 0,
          answers = [];
        res.data.questions.questions.forEach((type) => {
          type.questionSet = type.questionSet.map((ques) => {
            ques.answer = "";
            return ques;
          });
          totalQues++;
          answers.push(type);
        });
        setQuestions(res.data.questions.questions);
        setTotalQuestions(totalQues);
        setAnswers(answers);
      } catch (error) {
        if (error.response === undefined) {
          console.log(error.message);
        } else {
          console.log(error.response.data.message);
        }
      }
    };
    if (questions.length === 0 && !alreadyTaken) getQuestions();
  }, [questions, totalQuestions, answers, alreadyTaken]);

  console.log(questions);
  console.log(totalQuestions);
  console.log(answers);

  const handlePrevious = (e) => {
    if (totalQuestions >= currentQuestion) {
      if (questions[questionType] !== undefined) {
        //when array contains these question types
        if (
          questions[questionType].questionSet[currentTypeQuestion - 1] !==
          undefined
        ) {
          //if there are more questions of these type then set it
          setCurrentTypeQuestion(currentTypeQuestion - 1);
          setCurrentQuestion(currentQuestion - 1);
          setNextDisabled(false);
        } else {
          //check if there are more types
          if (questions[questionType - 1] !== undefined) {
            setQuestionType(questionType - 1);
            setCurrentTypeQuestion(
              questions[questionType].questionSet.length - 1
            );
            setCurrentQuestion(currentQuestion - 1);
            setNextDisabled(false);
          }
        }
      }
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (totalQuestions !== currentQuestion) {
      if (questions[questionType] !== undefined) {
        //when array contains these question types
        if (
          questions[questionType].questionSet[currentTypeQuestion + 1] !==
          undefined
        ) {
          //if there are more questions of these type then set it
          if (
            answers[questionType].questionSet[currentTypeQuestion].answer === ""
          ) {
            alert("Please select an option to continue");
          } else {
            setCurrentTypeQuestion(currentTypeQuestion + 1);
            setCurrentQuestion(currentQuestion + 1);
            setPreviousDisabled(false);
          }
        } else {
          //check if there are more types
          if (questions[questionType + 1] !== undefined) {
            if (
              answers[questionType].questionSet[currentTypeQuestion].answer ===
              ""
            ) {
              alert("Please select an option to continue");
            } else {
              setQuestionType(questionType + 1);
              setCurrentTypeQuestion(0);
              setCurrentQuestion(currentQuestion + 1);
              setPreviousDisabled(false);
            }
          }
        }
      }
    } else {
      if (totalQuestions === currentQuestion) {
        if (
          answers[questionType].questionSet[currentTypeQuestion].answer === ""
        ) {
          alert("Please select an option to continue");
        } else {
          setIsTestCompleted(true);
          setNextDisabled(true);
          setPreviousDisabled(false);
        }
      }
    }
  };

  return (
    <View>
      <Text>WorkOrientation</Text>
      <FlatList
        data={questions}
        keyExtractor={(questions) => questions.paragraph}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={styles.container1}>
              <AntDesign style={styles.navigationIcon} name='caretleft' />
              <View>
                <Text style={styles.title}>{item.paragraph}</Text>
                <FlatList
                  data={item.questionSet}
                  keyExtractor={(questions) => questions.question}
                  vertical
                  contentContainerStyle={styles.container2}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.row}>
                        <Text style={styles.title}>{item.question}</Text>
                      </View>
                    );
                  }}
                />
              </View>
              <AntDesign style={styles.navigationIcon} name='caretright' />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    // flex: 1,
    flexDirection: "row",

    alignItems: "center",
    marginBottom: 1,
    marginHorizontal: 30,
    width: 320,
  },
  container2: {
    // flex: 1,
    alignItems: "center",
    marginBottom: 1,
    width: 320,
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
  },
  navigationText: {
    color: "black",
    fontSize: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
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
export default WorkOrientationScreen;
