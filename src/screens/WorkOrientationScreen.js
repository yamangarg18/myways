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

const WorkOrientationScreen = ({ navigation }) => {
  const test = [
    {
      questionNumber: 1,
      paragraph:
        "working through hands with real world materials, using & operating machines, objects, tools, plants & animals in order to solve real world problems in the surrounding. generally in a practical manner. in outdoor and physical environment",
      questionSet: [
        {
          questionNumber: "1",
          question: "activities that require strength & coordination",
        },
        {
          questionNumber: "2",
          question: "driving",
        },
        {
          questionNumber: "3",
          question: "playing with gadgets",
        },
        {
          questionNumber: "4",
          question: "repairing and fixing",
        },
        {
          questionNumber: "5",
          question: "doing puzzles/ word game",
        },
        {
          questionNumber: "6",
          question: "building",
        },
        {
          questionNumber: "7",
          question: "camping and trekking",
        },
        {
          questionNumber: "8",
          question: "assembling",
        },
        {
          questionNumber: "9",
          question: "caring for animals & plants",
        },
        {
          questionNumber: "10",
          question: "playing a sport",
        },
      ],
    },
    {
      questionNumber: "2",
      paragraph:
        "working through brain with logics & concepts, information, abstract ideas and theories in order to discover ideas , ask questions, solve problems. generally in a scholarly and reserved way in a well organized and analytical environment",
      questionSet: [
        {
          questionNumber: "1",
          question: "figuring out problems on mental level",
        },
        {
          questionNumber: "2",
          question: "doing research",
        },
        {
          questionNumber: "3",
          question: "thinking analytically and logically",
        },
        {
          questionNumber: "4",
          question: "computing and formulating",
        },
        {
          questionNumber: "5",
          question: "calculating",
        },
        {
          questionNumber: "6",
          question: "explore different ideas",
        },
        {
          questionNumber: "7",
          question: "investigating and questioning to learn more",
        },
        {
          questionNumber: "8",
          question: "search for facts",
        },
        {
          questionNumber: "9",
          question: "evaluating situation",
        },
        {
          questionNumber: "10",
          question: "observing",
        },
      ],
    },
    {
      questionNumber: 3,
      paragraph:
        "working through your imagination and creativity, with words, art, music & drama, forms, patterns & design in order to to express (artistically), perform, communicate, design or create things. generally in unstructures setups and in anemotional or expressive way",
      questionSet: [
        {
          questionNumber: 1,
          question: "performing",
        },
        {
          questionNumber: 2,
          question: "designing",
        },
        {
          questionNumber: 3,
          question: "presenting",
        },
        {
          questionNumber: 4,
          question: "rearranging",
        },
        {
          questionNumber: 5,
          question: "composing",
        },
        {
          questionNumber: 6,
          question: "playing instrument/ music/ singing",
        },
        {
          questionNumber: 7,
          question: "dancing",
        },
        {
          questionNumber: 8,
          question: "reading",
        },
        {
          questionNumber: 9,
          question: "decorate",
        },
        {
          questionNumber: 10,
          question: "take photographs",
        },
      ],
    },
    {
      questionNumber: 4,
      paragraph:
        "working with people, helping them in order to enlighten, inform, serve or greet them. mainly concerned with welfare of others, assisting others to promote learning & personal growth, in a compassionate and friendly way and warm and supportive environment",
      questionSet: [
        {
          questionNumber: 1,
          question: "volunteer for a social work",
        },
        {
          questionNumber: 2,
          question: "caring and supporting",
        },
        {
          questionNumber: 3,
          question: "work with youth & elderly",
        },
        {
          questionNumber: 4,
          question: "greeting people",
        },
        {
          questionNumber: 5,
          question: "assisting/ helping",
        },
        {
          questionNumber: 6,
          question: "guiding/ teaching/ training",
        },
        {
          questionNumber: 7,
          question: "studying other cultures",
        },
        {
          questionNumber: 8,
          question: "attending events",
        },
        {
          questionNumber: 9,
          question: "making new friends",
        },
        {
          questionNumber: 10,
          question: "make people laugh",
        },
      ],
    },
    {
      questionNumber: 5,
      paragraph:
        "working with people, through your mind in an influential way in order to to direct, persuade, lead, perform or manage people for organisational goals or economic gain. generally in a business and action oriented environment, in an adventurous, outgoing and energetic manner",
      questionSet: [
        {
          questionNumber: 1,
          question: "promoting and persuading/convincing",
        },
        {
          questionNumber: 2,
          question: "buying and selling",
        },
        {
          questionNumber: 3,
          question: "public speaking",
        },
        {
          questionNumber: 4,
          question: "managing and organizing",
        },
        {
          questionNumber: 5,
          question: "leading and captaining",
        },
        {
          questionNumber: 6,
          question: "planning/ strategizing",
        },
        {
          questionNumber: 7,
          question: "risk-taking for profit",
        },
        {
          questionNumber: 8,
          question: "debating an issue",
        },
        {
          questionNumber: 9,
          question: "taking charge/ inititate/ start",
        },
        {
          questionNumber: 10,
          question: "making decisions",
        },
      ],
    },
    {
      questionNumber: 6,
      paragraph:
        "working with data, details, information and numbers through your mind (analyzing and organizing) in order to structurize things, doing things in details, planning work & events. generally in an environment with set rules and clear line of authority, in a careful, conforming, little or no imaginative, well organised manner",
      questionSet: [
        {
          questionNumber: 1,
          question: "recording data/ keyboarding",
        },
        {
          questionNumber: 2,
          question: "doing calculations/ computing",
        },
        {
          questionNumber: 3,
          question: "handling money",
        },
        {
          questionNumber: 4,
          question: "organizing",
        },
        {
          questionNumber: 5,
          question: "structuring plans",
        },
        {
          questionNumber: 6,
          question: "working in a routine ( 9am to 5pm)",
        },
        {
          questionNumber: 7,
          question: "following rules & regulations",
        },
        {
          questionNumber: 8,
          question: "do paper work",
        },
        {
          questionNumber: 9,
          question: "keeping records/ notes",
        },
        {
          questionNumber: 10,
          question: "working at desk",
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
  const [answers, setAnswers] = useState([]);

  const [isTestCompleted, setIsTestCompleted] = useState(false);

  const [alreadyTaken, setAlreadyTaken] = useState(false);

  // useEffect(() => {
  //   const getQuestions = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://5307bd43.ngrok.io/api/test/workOrientation`
  //       );
  //       let totalQues = 0,
  //         answers = [];
  //       res.data.questions.questions.forEach((type) => {
  //         type.questionSet = type.questionSet.map((ques) => {
  //           ques.answer = "";
  //         totalQues++;
  //           return ques;
  //         });
  //         answers.push(type);
  //       });
  //       setQuestions(res.data.questions.questions);
  //       setTotalQuestions(totalQues);
  //       setAnswers(answers);
  //     } catch (error) {
  //       if (error.response === undefined) {
  //         console.log(error.message);
  //       } else {
  //         console.log(error.response.data.message);
  //       }
  //     }
  //   };
  //   if (questions.length === 0 && !alreadyTaken) getQuestions();
  // }, [questions, totalQuestions, answers, alreadyTaken]);

  // console.log(questions);
  // console.log(totalQuestions);
  // console.log(answers);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = test;
        let totalQues = 0,
          answers = [];
        res.forEach((type) => {
          type.questionSet = type.questionSet.map((ques) => {
            ques.answer = "0";
            totalQues++;
            return ques;
          });
          answers.push(type);
        });
        setQuestions(res);
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

  console.log(questions, "hi3");
  console.log(totalQuestions, "Hello3");
  console.log(answers, "bye3");

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
        navigation.navigate("Instructions", { id: "work_orientation" });
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
          if (
            answers[questionType].questionSet[currentTypeQuestion].answer ===
            "0"
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
              "0"
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
          answers[questionType].questionSet[currentTypeQuestion].answer === "0"
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

  const handleSubmitTest = () => {
    try {
      navigation.navigate("Instructions", { id: "personality" });
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
              title='No '
              onPress={() => {
                setIsTestCompleted(false);
                setNextDisabled(false);
              }}
            />
            <Button title='Submit ' onPress={() => handleSubmitTest()} />
          </View>
        </View>
      ) : (
        <>
          {questions.length > 0 ? (
            <View style={styles.container1}>
              <Text style={styles.text1}>
                How much does this activity interest you?
              </Text>
              <Text style={styles.text2}>
                {
                  questions[questionType].questionSet[currentTypeQuestion]
                    .question
                }
              </Text>
              <StarRatingBar></StarRatingBar>
              <View style={styles.navigationContainer}>
                <Button
                  style={styles.navigationButton}
                  title='Previous '
                  onPress={() => handlePrevious()}
                />
                <Button
                  style={styles.navigationButton}
                  title='Next'
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

WorkOrientationScreen.navigationOptions = () => {
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
export default WorkOrientationScreen;
