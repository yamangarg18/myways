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
import { ScrollView } from "react-native-gesture-handler";

import { REACT_APP_BASE_URL } from "react-native-dotenv";
import { CheckBox } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

const ExpectationScreen = ({ navigation }) => {
  const test = [
    {
      questionNumber: "1",
      paragraph: "",
      questionSet: [
        {
          questionNumber: "1",
          question:
            "Please select the MOST IMPORTANT 2 expectations you have currently from your career:-",
          options: [
            {
              optionNumber: "1",
              option:
                "Company Culture: The environment in which you work or want to work is positive for you.",
            },
            {
              optionNumber: "2",
              option:
                "Skill Development: Company should help you in analyzing your skill gaps and developing and master them.",
            },
            {
              optionNumber: "3",
              option:
                "Work Life Balance: You are able to divide your time/energy between work and other important aspects of your life.",
            },
            {
              optionNumber: "4",
              option:
                "Job Security: High probability that you will not lose your job due to market or company uncertainities.",
            },
            {
              optionNumber: "5",
              option:
                "Work Satisfaction: You need the feeling of self-satisfaction or accomplishment from  your job",
            },
            {
              optionNumber: "6",
              option:
                "Salary and Benefits: You need salary and other perks like housing, utilities, insurance, retirement benefits.",
            },
            {
              optionNumber: "7",
              option:
                "Career Growth : You wish to see your career going in terms of role promotion to help you achieve your career go.",
            },
          ],
        },
        {
          questionNumber: "2",
          question:
            "Please select 2 expectations LEAST IMPORTANT to you or you DO NOT WANT currently from your career:-",
          options: [
            {
              optionNumber: "1",
              option:
                "Company Culture: The environment in which you work or want to work is positive for you.",
            },
            {
              optionNumber: "2",
              option:
                "Skill Development: Company should help you in analyzing your skill gaps and developing and master them.",
            },
            {
              optionNumber: "3",
              option:
                "Work Life Balance: You are able to divide your time/energy between work and other important aspects of your life.",
            },
            {
              optionNumber: "4",
              option:
                "Job Security: High probability that you will not lose your job due to market or company uncertainities.",
            },
            {
              optionNumber: "5",
              option:
                "Work Satisfaction: You need the feeling of self-satisfaction or accomplishment from  your job",
            },
            {
              optionNumber: "6",
              option:
                "Salary and Benefits: You need salary and other perks like housing, utilities, insurance, retirement benefits.",
            },
            {
              optionNumber: "7",
              option:
                "Career Growth : You wish to see your career going in terms of role promotion to help you achieve your career go.",
            },
          ],
        },
      ],
    },
  ];
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState(0);
  const [currentTypeQuestion, setCurrentTypeQuestion] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [previousDisabled, setPreviousDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  const [isTestCompleted, setIsTestCompleted] = useState(false);

  //this is custom for 2 pages
  const [firstPageOptions, setFirstPageOptions] = useState([]);
  const [firstPageOptionsSelected, setFirstPageOptionsSelected] = useState([]);
  const [secondPageOptions, setSecondPageOptions] = useState([]);
  const [secondPageOptionsSelected, setSecondPageOptionsSelected] = useState(
    []
  );

  const [firstSelected, setFirstSelected] = useState([]);
  const [secondSelected, setSecondSelected] = useState([]);

  const [alreadyTaken, setAlreadyTaken] = useState(false);

  //   useEffect(() => {
  //     const getQuestions = async () => {
  //       try {
  //         const res = await axios.get(
  //           `${process.env.REACT_APP_BASE_URL}/api/test/expectation`
  //         );
  //         let totalQues = 0;
  //         res.data.questions.questions.map((type) => {
  //           type.questionSet = type.questionSet.map((ques) => {
  //             totalQues++;
  //             return ques;
  //           });
  //         });
  //         setQuestions(res.data.questions.questions);
  //         setTotalQuestions(totalQues);
  //         setFirstPageOptions(
  //           res.data.questions.questions[0].questionSet[0].options
  //         );
  //         setisLoading(false);
  //       } catch (error) {
  //         if (error.response === undefined) {
  //           console.log(error.message);
  //         } else {
  //           console.log(error.response.data.message);
  //         }
  //       }
  //     };
  //     if (questions.length === 0 && !alreadyTaken) {
  //       getQuestions();
  //     }
  //   }, [questions, alreadyTaken]);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = test;
        let totalQues = 0;
        res.forEach((type) => {
          type.questionSet = type.questionSet.map((ques) => {
            totalQues++;
            return ques;
          });
        });
        const options = res[0].questionSet[0].options;
        let response = new Array(options.length).fill(0);
        setFirstSelected(response);
        setQuestions(res);
        setTotalQuestions(totalQues);
        setFirstPageOptions(res[0].questionSet[0].options);
      } catch (error) {
        if (error.response === undefined) {
          console.log(error.message);
        } else {
          console.log(error.response.data.message);
        }
      }
    };
    if (questions.length === 0 && !alreadyTaken) {
      getQuestions();
    }
  }, [
    questions,
    totalQuestions,
    firstPageOptions,
    firstSelected,
    alreadyTaken,
  ]);

  // console.log(questions, "hi2");
  // console.log(totalQuestions, "hello2");
  // console.log(firstPageOptions, "bye2");
  // console.log(firstSelected);

  const handlePrevious = () => {
    if (totalQuestions >= currentQuestion && currentQuestion !== 1) {
      if (questions[questionType] !== undefined) {
        //when array contains these question types
        if (
          questions[questionType].questionSet[currentTypeQuestion - 1] !==
          undefined
        ) {
          //if there are more questions of these type then set it
          setCurrentTypeQuestion(currentTypeQuestion - 1);
          setCurrentQuestion(currentQuestion - 1);
          setSecondPageOptionsSelected([]);

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
    } else {
      if (currentQuestion == 1) {
        navigation.navigate("Instructions", { id: "expectation" });
      }
    }
  };

  const handleNext = () => {
    if (totalQuestions !== currentQuestion) {
      if (questions[questionType] !== undefined) {
        //when array contains these question types
        if (
          questions[questionType].questionSet[currentTypeQuestion + 1] !==
          undefined
        ) {
          //if there are more questions of these type then set it
          if (firstPageOptionsSelected.length === 2) {
            setCurrentTypeQuestion(currentTypeQuestion + 1);
            let newOptions = [];
            firstPageOptions.map((option, index) => {
              if (!firstPageOptionsSelected.includes(String(index + 1))) {
                newOptions.push(option);
              }
            });
            if (secondSelected.length === 0) {
              let response = new Array(newOptions.length).fill(0);
              setSecondSelected(response);
            }
            setSecondPageOptions(newOptions);
            // setSecondPageOptionsSelected([]);
            setCurrentQuestion(currentQuestion + 1);
            setPreviousDisabled(false);
          } else {
            alert("Please select 2 options");
          }
        } else {
          //check if there are more types
          if (questions[questionType + 1] !== undefined) {
            setQuestionType(questionType + 1);
            setCurrentTypeQuestion(0);
            setCurrentQuestion(currentQuestion + 1);
            setPreviousDisabled(false);
          }
        }
      }
    } else {
      if (secondPageOptionsSelected.length === 2) {
        setNextDisabled(true);
        setPreviousDisabled(false);
        setIsTestCompleted(true);
      } else {
        alert("Please select 2 options");
      }
    }
  };

  const handleOptionChange = (optionNumber) => {
    if (currentTypeQuestion === 0) {
      let newOptions = [...firstPageOptionsSelected];
      if (newOptions.includes(optionNumber)) {
        newOptions.splice(newOptions.indexOf(optionNumber), 1);
        let newSelected = [...firstSelected];
        {
          firstSelected[optionNumber - 1] === 0
            ? (newSelected[optionNumber - 1] = 1)
            : (newSelected[optionNumber - 1] = 0);
        }
        setFirstSelected(newSelected);
      } else {
        if (newOptions.length === 2) {
          alert("select only 2 options");
        } else {
          newOptions.push(optionNumber);
          let newSelected = [...firstSelected];
          {
            firstSelected[optionNumber - 1] === 0
              ? (newSelected[optionNumber - 1] = 1)
              : (newSelected[optionNumber - 1] = 0);
          }
          setFirstSelected(newSelected);
        }
      }
      setFirstPageOptionsSelected(newOptions);
    } else if (currentTypeQuestion === 1) {
      let newOptions = [...secondPageOptionsSelected];
      if (newOptions.includes(optionNumber)) {
        newOptions.splice(newOptions.indexOf(optionNumber), 1);
        let newSelected = [...secondSelected];
        {
          secondSelected[optionNumber - 1] === 0
            ? (newSelected[optionNumber - 1] = 1)
            : (newSelected[optionNumber - 1] = 0);
        }
        setSecondSelected(newSelected);
      } else {
        if (newOptions.length === 2) {
          alert("select only 2 options");
        } else {
          newOptions.push(optionNumber);
          let newSelected = [...secondSelected];
          {
            secondSelected[optionNumber - 1] === 0
              ? (newSelected[optionNumber - 1] = 1)
              : (newSelected[optionNumber - 1] = 0);
          }
          setSecondSelected(newSelected);
        }
      }
      setSecondPageOptionsSelected(newOptions);
    }
  };

  const renderOptions = (options) => {
    if (options.length > 0) {
      if (currentTypeQuestion === 0) {
        return (
          <View>
            <FlatList
              data={options}
              keyExtractor={(option) => option.option}
              renderItem={({ item }) => {
                const [iconName] =
                  firstSelected[item.optionNumber - 1] === 1
                    ? ["dot-circle-o"]
                    : ["circle-o"];
                return (
                  <TouchableOpacity
                    onPress={() => handleOptionChange(item.optionNumber)}
                  >
                    <View
                      style={
                        firstSelected[item.optionNumber - 1] === 1
                          ? styles.row3
                          : styles.row2
                      }
                    >
                      <FontAwesome name={iconName} style={styles.icon} />
                      <Text style={styles.text2}>{item.option}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        );
      } else if (currentTypeQuestion === 1) {
        return (
          <View>
            <FlatList
              data={options}
              keyExtractor={(option) => option.option}
              renderItem={({ item }) => {
                const [iconName] =
                  secondSelected[item.optionNumber - 1] === 1
                    ? ["dot-circle-o"]
                    : ["circle-o"];
                return (
                  <TouchableOpacity
                    onPress={() => handleOptionChange(item.optionNumber)}
                  >
                    <View
                      style={
                        secondSelected[item.optionNumber - 1] === 1
                          ? styles.row3
                          : styles.row2
                      }
                    >
                      <FontAwesome name={iconName} style={styles.icon} />
                      <Text style={styles.text2}>{item.option}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        );
      }
    }
  };

  const handleSubmitTest = async () => {
    let firstOptions = [...firstPageOptionsSelected],
      secondOptions = [...secondPageOptionsSelected],
      allOptions = [...firstPageOptions];
    let newAnswers = {};
    allOptions.map((option) => {
      let name = option.option.split(":")[0].toLowerCase().split(" ").join("_");
      if (firstOptions.includes(String(option.optionNumber))) {
        newAnswers[`${name}`] = 5;
      } else if (secondOptions.includes(String(option.optionNumber))) {
        newAnswers[`${name}`] = 1;
      } else {
        newAnswers[`${name}`] = 3;
      }
    });
    try {
      navigation.navigate("Instructions", { id: "work_orientation" });
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
        <View style={styles.container1}>
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
            {questions.length > 0 ? (
              <ScrollView>
                <View>
                  <Text style={styles.text1}>
                    {
                      questions[questionType].questionSet[currentTypeQuestion]
                        .question
                    }
                  </Text>
                  <View>
                    {currentTypeQuestion === 0
                      ? renderOptions(firstPageOptions)
                      : renderOptions(secondPageOptions)}
                  </View>
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
              </ScrollView>
            ) : null}
          </>
        )}
    </>
  );
};

ExpectationScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
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
    fontSize: 20,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  text2: {
    color: "black",
    // textAlign: "center",
    fontSize: 15,
    marginHorizontal: 10,

    // marginTop: 20,
    // marginHorizontal: 10,
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
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginHorizontal: 5,
    alignItems: "center",
    paddingHorizontal: 5,
    borderRadius: 30,
  },
  row3: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginHorizontal: 5,
    alignItems: "center",
    paddingHorizontal: 5,
    borderRadius: 30,
    backgroundColor: "yellow",
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
  },
  icon: {
    fontSize: 24,
    marginVertical: 10,
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
  icon: {
    fontSize: 15,
  },
});

export default ExpectationScreen;
