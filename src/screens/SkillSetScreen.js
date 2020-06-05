import React, { useState, useEffect, Component } from "react";
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
  const [skillsQuestions, setSkillsQuestions] = useState([]);
  const [questionType, setQuestionType] = useState(0);
  const [currentTypeQuestion, setCurrentTypeQuestion] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [previousDisabled, setPreviousDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  const [alreadyTaken, setAlreadyTaken] = useState(false);

  // useEffect(() => {
  //   const getSkillsForQuestions = async () => {
  //     try {
  //       // console.log(localStorage.getItem("college_id").split(',')[0]);
  //       const res = await axios.post(
  //         `https://myways-server.myways.in/related_skills?get_top=10&college_id=open&intern_id=${localStorage.getItem(
  //           "user_id"
  //         )}`
  //       );
  //       if (res.data["related skills"].length !== undefined) {
  //         let questions = [],
  //           totalQues = 0,
  //           answers = [];

  //         res.data["related skills"].map((skill) => {
  //           if (questions.length === 0) {
  //             questions.push({ questionSet: [{ question: skill }] });
  //             answers.push({ questionSet: [{ question: skill, answer: "" }] });
  //             totalQues++;
  //           } else {
  //             questions[0].questionSet.push({ question: skill });
  //             answers[0].questionSet.push({ question: skill, answer: "" });
  //             totalQues++;
  //           }
  //         });
  //         setSkillsQuestions(questions);
  //         setTotalQuestions(totalQues);
  //         setAnswers(answers);
  //       } else {
  //         setIsTestCompleted(true);
  //         if (submit.current !== null) {
  //           submit.current.click();
  //         }
  //       }
  //     } catch (error) {
  //       if (error.response === undefined) {
  //         console.log(error.message);
  //       } else {
  //         console.log(error.response.data.message);
  //       }
  //       setIsTestCompleted(true);
  //       if (submit.current !== null) {
  //         submit.current.click();
  //       }
  //     }
  //   };
  //   if (skillsQuestions.length === 0 && !alreadyTaken) getSkillsForQuestions();
  // }, [skillsQuestions, alreadyTaken]);

  useEffect(() => {
    const getSkillsForQuestions = async () => {
      try {
        // console.log(localStorage.getItem("college_id").split(',')[0]);
        const res = skills;
        if (res.data["related skills"].length !== undefined) {
          let questions = [],
            totalQues = 0,
            answers = [];

          res.data["related skills"].map((skill) => {
            if (questions.length === 0) {
              questions.push({ questionSet: [{ question: skill }] });
              answers.push({ questionSet: [{ question: skill, answer: "" }] });
              totalQues++;
            } else {
              questions[0].questionSet.push({ question: skill });
              answers[0].questionSet.push({ question: skill, answer: "" });
              totalQues++;
            }
          });
          setSkillsQuestions(questions);
          setTotalQuestions(totalQues);
          setAnswers(answers);
        } else {
          setIsTestCompleted(true);
          if (submit.current !== null) {
            submit.current.click();
          }
        }
      } catch (error) {
        if (error.response === undefined) {
          console.log(error.message);
        } else {
          console.log(error.response.data.message);
        }
        setIsTestCompleted(true);
        if (submit.current !== null) {
          submit.current.click();
        }
      }
    };
    if (skillsQuestions.length === 0 && !alreadyTaken) getSkillsForQuestions();
  }, [skillsQuestions, alreadyTaken]);

  const handlePrevious = (e) => {
    e.preventDefault();
    if (totalQuestions >= currentQuestion) {
      if (skillsQuestions[questionType] !== undefined) {
        //when array contains these question types
        if (
          skillsQuestions[questionType].questionSet[currentTypeQuestion - 1] !==
          undefined
        ) {
          //if there are more questions of these type then set it
          setCurrentTypeQuestion(currentTypeQuestion - 1);
          setCurrentQuestion(currentQuestion - 1);
          setNextDisabled(false);
        } else {
          //check if there are more types
          if (skillsQuestions[questionType - 1] !== undefined) {
            setQuestionType(questionType - 1);
            setCurrentTypeQuestion(
              skillsQuestions[questionType].questionSet.length - 1
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
      if (skillsQuestions[questionType] !== undefined) {
        //when array contains these question types
        if (
          skillsQuestions[questionType].questionSet[currentTypeQuestion + 1] !==
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
          if (skillsQuestions[questionType + 1] !== undefined) {
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

  class StarRatingBar extends Component {
    UpdateRating(key) {
      let newAnswers = [...answers];
      newAnswers[questionType].questionSet[
        currentTypeQuestion
      ].answer = `${key}`;
      setAnswers(newAnswers);
    }
    render() {
      if (answers.length > 0) {
        let React_Native_Bar = [];
        for (var i = 1; i <= 5; i++) {
          React_Native_Bar.push(
            <TouchableOpacity
              activeOpacity={0.5}
              key={i}
              onPress={this.UpdateRating.bind(this, i)}
            >
              <Image
                style={styles.star}
                source={
                  i <=
                    answers[questionType].questionSet[currentTypeQuestion].answer
                    ? require("../../assets/star_filled.png")
                    : require("../../assets/star_corner.png")
                }
              ></Image>
            </TouchableOpacity>
          );
        }
        return <View style={styles.mainContainer}>{React_Native_Bar}</View>;
      }
    }
  }

  const handleSubmitTest = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/response/skills`,
        { response: answers }
      );
      history.push("/analysis/expectation");
    } catch (error) {
      if (error.response === undefined) {
        console.log(error.message);
      } else {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <>
      {isTestCompleted ? (
        <View style={styles.container2}>
          <Text style={styles.text1}>
            Are you sure you want to finish this test?
          </Text>
          <View style={styles.navigationContainer}>
            <Button
              title="No "
              onPress={() => {
                setIsTestCompleted(false);
                setNextDisabled(false);
              }}
            />
            <Button title="Submit " onPress={() => handleSubmitTest()} />
          </View>
        </View>
      ) : (
          <>
            {skillsQuestions.length > 0 ? (
              <View style={styles.container1}>
                <Text style={styles.text1}>Rate yourself in following: </Text>
                <Text style={styles.text2}>
                  {
                    skillsQuestions[questionType].questionSet[currentTypeQuestion]
                      .question
                  }
                </Text>
                <StarRatingBar></StarRatingBar>
                <View style={styles.navigationContainer}>
                  <Button
                    style={styles.navigationButton}
                    title="Previous "
                    onPress={() => handlePrevious()}
                  />
                  <Button
                    style={styles.navigationButton}
                    title="Next"
                    onPress={() => handleNext()}
                  />
                </View>
              </View>
            ) : null}
          </>
        )}
    </>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: "center",

    // flexDirection: "row",
    // marginVertical: 50,
    // marginHorizontal: 30,
    // width: 320,
  },
  child1: {
    // flexDirection: "row",
    alignItems: "center",
    marginVertical: 200,

    // height,
    justifyContent: "center",
    // marginHorizontal: 5,
  },
  child2: {
    justifyContent: "center",

    flexDirection: "row",
    // alignItems: "center",
    // height,
    // width,
    // justifyContent: "center",
    // marginHorizontal: 5,
  },
  container2: {
    // flex: 1,
    alignItems: "center",
    // marginBottom: 1,
    // width: 320,
  },
  logo: {
    // alignSelf: "center",
    width: 125,
    height: 120,
    // marginBottom: 5,
    marginTop: 50,
  },
  text1: {
    color: "black",
    textAlign: "center",
    fontSize: 30,
    marginVertical: 40,
    marginHorizontal: 10,
  },
  text2: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
    marginHorizontal: 10,
  },
  navigationContainer: {
    flexDirection: "row",
    // alignItems: "flex-end",

    justifyContent: "space-around", // flex: 1,
    // marginBottom: 5,
  },
  navigationView: {
    flexDirection: "row",
    marginTop: 20,
  },
  navigationButton: {
    width: 50,
    height: 50,
    // color: "black",
    // marginVertical: 10,
    // marginHorizontal: 5,
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
    marginBottom: 5,
    textAlign: "center",
  },
  icon: {
    fontSize: 24,
  },
  mainContainer: {
    // flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    marginVertical: 30,
    flexDirection: "row",
  },
  childView: {
    // justifyContent: "center",
    flexDirection: "row",
    // marginTop: 20,
  },
  star: {
    height: 40,
    width: 40,
    resizeMode: "cover",
  },
});

export default SkillSetScreen;
