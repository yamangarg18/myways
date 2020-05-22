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

const PersonalityScreen = ({ navigation }) => {
  test1 = [
    {
      questionNumber: "1120",
      question: "in your dealings you",
      options: [
        {
          optionNumber: 1,
          option:
            "overcome your personal terms and follow principles to do what is right",
        },
        {
          optionNumber: 2,
          option: "prefer personal terms, sometimes not going by principles",
        },
      ],
    },
    {
      questionNumber: "1130",
      question: "your drive to improve comes from:",
      options: [
        {
          optionNumber: 1,
          option: "inner critic to do what is judged as right",
        },
        {
          optionNumber: 2,
          option: "drive to succeed and be recognized for your accomplishments",
        },
      ],
    },
    {
      questionNumber: "1140",
      question: "you get irritated of others when",
      options: [
        {
          optionNumber: 1,
          option: "they are inefficient ,sloppy",
        },
        {
          optionNumber: 2,
          option: "they are insensitive to oneself and you",
        },
      ],
    },
    {
      questionNumber: "1150",
      question:
        "how do you deal with people who you think are wrong or whom you do not like",
      options: [
        {
          optionNumber: 1,
          option:
            "you are convinced why you are correct and make efforts to make people understand that",
        },
        {
          optionNumber: 2,
          option:
            "you are not certain about your views and do not worry much if they do not agree with your view",
        },
      ],
    },
    {
      questionNumber: "1160",
      question: "while taking decisions you are",
      options: [
        {
          optionNumber: 1,
          option: "mostly sure and have one right way of doing something",
        },
        {
          optionNumber: 2,
          option:
            "generally unsure of the way to take and consider many ways of doing something",
        },
      ],
    },
    {
      questionNumber: "1170",
      question: "how do you like to lead your life?",
      options: [
        {
          optionNumber: 1,
          option:
            "be self controlled, focussed, do not like to deviate from careful preparations/plans and particular about time and procedures,reserved",
        },
        {
          optionNumber: 2,
          option:
            "be adventurous,spontaneous, follow your inspiration and do not like to stick to plans,not particular about procedures,open minded,flexible",
        },
      ],
    },
    {
      questionNumber: "1180",
      question: "how do you deal with anger?",
      options: [
        {
          optionNumber: 1,
          option: "you suppress anger and shows it when you think it is right",
        },
        {
          optionNumber: 2,
          option: "you express your anger openly and on the spot",
        },
      ],
    },
    {
      questionNumber: "1190",
      question: "you",
      options: [
        {
          optionNumber: 1,
          option: "do not compromise with your principles to avoid conflicts",
        },
        {
          optionNumber: 2,
          option:
            "do not want to get into conflicts with your loved ones and hold on your strong opinions to yourself",
        },
      ],
    },
    {
      questionNumber: "1230",
      question: "your focus is primarily on:",
      options: [
        {
          optionNumber: 1,
          option: "relationships and others‚ needs and feelings",
        },
        {
          optionNumber: 2,
          option: "tasks and on completing goals",
        },
      ],
    },
    {
      questionNumber: "1240",
      question: "you",
      options: [
        {
          optionNumber: 1,
          option: "tend to move towards others and engage them",
        },
        {
          optionNumber: 2,
          option: "tend to withdraw from others hoping they would seek you",
        },
      ],
    },
    {
      questionNumber: "1250",
      question: "which one do you appreciate more in people",
      options: [
        {
          optionNumber: 1,
          option: "feelings",
        },
        {
          optionNumber: 2,
          option: "intellectual approaches and conceptual thinking",
        },
      ],
    },
    {
      questionNumber: "1260",
      question: "what do you want more",
      options: [
        {
          optionNumber: 1,
          option: "to be loved and to be important to others",
        },
        {
          optionNumber: 2,
          option: "approval and support of others",
        },
      ],
    },
    {
      questionNumber: "1270",
      question: "with respect to expressing your feelings",
      options: [
        {
          optionNumber: 1,
          option:
            "you do not easily express anger and do not show wide range of feeling which are short lived",
        },
        {
          optionNumber: 2,
          option:
            "your feelings are quite short lived and you display wide range of emotions like anger, frustration, delight or excitement",
        },
      ],
    },
    {
      questionNumber: "1280",
      question: "while not happy about something",
      options: [
        {
          optionNumber: 1,
          option:
            "you find it difficult to show your feelings or anger and use indirect approaches",
        },
        {
          optionNumber: 2,
          option: "you directly communicate your aggression or disappointment",
        },
      ],
    },
    {
      questionNumber: "1290",
      question: "while in conflicts",
      options: [
        {
          optionNumber: 1,
          option:
            "you tend to remind others how much they are indebted to you for your help",
        },
        {
          optionNumber: 2,
          option: "you tend to become silent or avoid further conflicts",
        },
      ],
    },
    {
      questionNumber: "1340",
      question: "while feeling emotional at work you",
      options: [
        {
          optionNumber: 1,
          option: "focus on your task and are able to ignore your feelings",
        },
        {
          optionNumber: 2,
          option:
            "first need time to sort out your feelings and then proceed working",
        },
      ],
    },
    {
      questionNumber: "1350",
      question: "you engage yourself in any task / subject",
      options: [
        {
          optionNumber: 1,
          option:
            "to take it as a stepping stone to achieve your final goal and are quick to change your subject if it does not give you success or contribute in your final goal",
        },
        {
          optionNumber: 2,
          option:
            "to acquire knowledge and learn and do not care about the final goal in doing so; also you will not stop doing a particular thing until you or the subject or both are exhausted by its content",
        },
      ],
    },
    {
      questionNumber: "1360",
      question: "you",
      options: [
        {
          optionNumber: 1,
          option:
            "are self mobilised to work towards your set goal to achieve appreciation and recognition and like them",
        },
        {
          optionNumber: 2,
          option:
            "are reluctant to start working as you are uncertain of your goal and fear pitfalls and are uncomfortable with appreciation and recognition and doubt them",
        },
      ],
    },
    {
      questionNumber: "1370",
      question: "you",
      options: [
        {
          optionNumber: 1,
          option:
            "focus on your set goal and ignore your own pleasures in order to achieve success and maintain a good self image",
        },
        {
          optionNumber: 2,
          option:
            "focus on your own pleasures and desires and believe in keeping your options open in order to to achieve personal entitlement",
        },
      ],
    },
    {
      questionNumber: "1380",
      question: "for you",
      options: [
        {
          optionNumber: 1,
          option:
            "success and recognition is more important than power and authority",
        },
        {
          optionNumber: 2,
          option:
            "power and authority is more important than success and recognition",
        },
      ],
    },
    {
      questionNumber: "1390",
      question: "you",
      options: [
        {
          optionNumber: 1,
          option:
            "are fast paced, efficient , focussed and are impatient when obstruction comes their way in terms of others views, opinions etc",
        },
        {
          optionNumber: 2,
          option:
            "are slow paced,readily welcome others opinions and views and also may substitute their agendas over yours",
        },
      ],
    },
    {
      questionNumber: "1450",
      question: "you are:",
      options: [
        {
          optionNumber: 1,
          option:
            "emotional and okay with sharing your feelings with others with less personal boundaries preferred",
        },
        {
          optionNumber: 2,
          option:
            "do not feel like sharing your emotions with many people and want to keep clear personal boundaries, might feel detached sometime",
        },
      ],
    },
    {
      questionNumber: "1460",
      question: "choose",
      options: [
        {
          optionNumber: 1,
          option:
            "i am generally alone in life as i find it difficult to form bonds with others",
        },
        {
          optionNumber: 2,
          option: "i can make bonds with others but i fear losing them",
        },
      ],
    },
    {
      questionNumber: "1470",
      question: "you tend to:",
      options: [
        {
          optionNumber: 1,
          option:
            "become gloomy and think deeply about emotions, even accepting negative emotions as a part of life",
        },
        {
          optionNumber: 2,
          option: "be happy and avoid pain or negative feelings",
        },
      ],
    },
    {
      questionNumber: "1480",
      question: "while dealing with feelings of hurt or loneliness",
      options: [
        {
          optionNumber: 1,
          option:
            "you find it difficult to let go of them and find it okay to take help of others to overcome",
        },
        {
          optionNumber: 2,
          option:
            "you think taking help would make you dependent on others and you yourself can get over it",
        },
      ],
    },
    {
      questionNumber: "1490",
      question: "you tend to withdraw yourself from people:",
      options: [
        {
          optionNumber: 1,
          option:
            "to protect yourself and give some time to yourself to deal with your emotions",
        },
        {
          optionNumber: 2,
          option: "if you find them threatening or if they make you upset",
        },
      ],
    },
    {
      questionNumber: "1560",
      question: "while dealing with negative feelings",
      options: [
        {
          optionNumber: 1,
          option:
            "you detach from your feelings and delay your response to them",
        },
        {
          optionNumber: 2,
          option:
            "you magnify the danger and react immediately (often intensely) most of the times and find it difficult to detach from your feelings",
        },
      ],
    },
    {
      questionNumber: "1570",
      question: "you tend to",
      options: [
        {
          optionNumber: 1,
          option:
            "feel that being optimistic always is unreal and that dark or painful side of life should also be thought upon deeply",
        },
        {
          optionNumber: 2,
          option: "be optimistic and avoid dark or painful side of life",
        },
      ],
    },
    {
      questionNumber: "1580",
      question: "you",
      options: [
        {
          optionNumber: 1,
          option: "think before acting",
        },
        {
          optionNumber: 2,
          option: "generally act before thinking much",
        },
      ],
    },
    {
      questionNumber: "1590",
      question: "you are",
      options: [
        {
          optionNumber: 1,
          option:
            "intense, defensive, strong-minded, and highly resistant to the influence of others",
        },
        {
          optionNumber: 2,
          option: "gentle, patient, easygoing, accommodating and receptive",
        },
      ],
    },
    {
      questionNumber: "1670",
      question: "you",
      options: [
        {
          optionNumber: 1,
          option:
            "look for pitfalls,dangers in situations before doing anything and plan for handling those problems",
        },
        {
          optionNumber: 2,
          option:
            "look for positive things in situations, believe in going with the flow and plan for multiple possibilities",
        },
      ],
    },
    {
      questionNumber: "1680",
      question: "you",
      options: [
        {
          optionNumber: 1,
          option:
            "are hesitant to act, magnify hazards and sometime give way under pressure or doubt",
        },
        {
          optionNumber: 2,
          option:
            "are confident to act,deny dangers and always hold their ground",
        },
      ],
    },
    {
      questionNumber: "1690",
      question: "you",
      options: [
        {
          optionNumber: 1,
          option:
            "do not trust others easily and get along with others after careful questioning and tests",
        },
        {
          optionNumber: 2,
          option:
            "very welcoming, accepting and get along with others before testing or questioning",
        },
      ],
    },
    {
      questionNumber: "1780",
      question: "you",
      options: [
        {
          optionNumber: 1,
          option:
            "tend to escape pain or conflicts, explain away difficulties and plan about future a lot",
        },
        {
          optionNumber: 2,
          option:
            "accept pain, confront conflicts directly and mostly stay in the present",
        },
      ],
    },
    {
      questionNumber: "1790",
      question: "you",
      options: [
        {
          optionNumber: 1,
          option: "are fast paced, short tempered and impulsive in action",
        },
        {
          optionNumber: 2,
          option: "are steady paced, even tempered and cautious in action",
        },
      ],
    },
    {
      questionNumber: "1890",
      question: "you",
      options: [
        {
          optionNumber: 1,
          option: "are clear about your views and are decisive",
        },
        {
          optionNumber: 2,
          option:
            "are unclear about your opinions, indecisive and often go along with what others say",
        },
      ],
    },
  ];

  const [questions, setQuestions] = useState([]);
  const [type, setType] = useState(1);
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
  //       if (type === 1) {
  //         const res = await axios.get(
  //           `${process.env.REACT_APP_BASE_URL}/api/test/personalityOne`
  //         );
  //         console.log(res.data);
  //         res.data.questions.questions.map((type) => {
  //           type.answer = "";
  //         });
  //         setQuestions(res.data.questions.questions);
  //         setTotalQuestions(res.data.questions.questions.length);
  //         setAnswers(res.data.questions.questions);
  //         setisLoading(false);
  //       }
  //     } catch (error) {
  //       if (error.response === undefined) {
  //         console.log(error.message);
  //       } else {
  //         console.log(error.response.data.message);
  //       }
  //     }
  //   };
  //   if (questions.length === 0 && !alreadyTaken) getQuestions();
  // }, [questions, type, alreadyTaken]);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        if (type === 1) {
          const res = test1;
          res.map((type) => {
            type.answer = "";
          });
          setQuestions(res);
          setTotalQuestions(res.length);
          setAnswers(res);
        }
      } catch (error) {
        if (error.response === undefined) {
          console.log(error.message);
        } else {
          console.log(error.response.data.message);
        }
      }
    };
    if (questions.length === 0 && !alreadyTaken) getQuestions();
  }, [questions, type, totalQuestions, answers, alreadyTaken]);

  console.log(questions, "hi4");
  console.log(type, "heyaa4");
  console.log(totalQuestions, "hello4");
  console.log(answers, "bye4");

  const handlePrevious = () => {
    console.log(currentQuestion);
    e.preventDefault();
    if (totalQuestions >= currentQuestion) {
      if (currentQuestion - 1 !== 0) {
        setCurrentQuestion(currentQuestion - 1);
        setNextDisabled(false);
      }
    }
  };
  const handleNext = () => {
    if (totalQuestions !== currentQuestion) {
      if (questions[currentQuestion] !== undefined) {
        if (answers[currentQuestion - 1].answer === "") {
          alert("Please select an option to continue");
        } else {
          setCurrentQuestion(currentQuestion + 1);
          setPreviousDisabled(false);
        }
      }
    } else {
      if (totalQuestions === currentQuestion) {
        if (answers[currentQuestion - 1].answer === "") {
          alert("Please select an option to continue");
        } else {
          setIsTestCompleted(true);
          setNextDisabled(true);
          setPreviousDisabled(false);
        }
      }
    }
  };

  const handleOption = () => {
    let newAnswers = [...answers];
    console.log(e.target.id);
    newAnswers[currentQuestion - 1].answer = e.target.id;
    setAnswers(newAnswers);
    if (right.current !== null) {
      right.current.click();
    }
  };

  const renderOptions = (options) => {
    if (answers.length > 0) {
      return (
        <div className={`${styles.radios}`}>
          {options.map((option, index) => (
            <button
              htmlFor={`${option.optionNumber}`}
              className={`${styles.radio} ${styles["button-select"]}`}
            >
              <input
                type='radio'
                id={`${option.optionNumber}`}
                name={`radio${option.optionNumber}`}
                value={option.option}
                checked={
                  answers[currentQuestion - 1].answer ===
                  String(option.optionNumber)
                    ? true
                    : false
                }
                onChange={handleOption}
              />
              <label htmlFor={`${option.optionNumber}`}>
                <div className={`${styles.checker}`}></div>
                {option.option}
              </label>
            </button>
          ))}
        </div>
      );
    }
  };

  const handleSubmitTest = async (e) => {
    e.preventDefault();
    if (type === 1) {
      setisLoading(true);
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/response/personalityOne`,
          { response: answers }
        );
        res.data.questions.questions.map((type) => {
          type.answer = "";
        });
        setCurrentQuestion(1);
        setQuestions(res.data.questions.questions);
        setTotalQuestions(res.data.questions.questions.length);
        setIsTestCompleted(false);
        setType(2);
        setAnswers(res.data.questions.questions);
        setNextDisabled(false);
        setisLoading(false);
        // history.push("/analysis/personality");
      } catch (error) {
        if (error.response === undefined) {
          console.log(error.message);
        } else {
          console.log(error.response.data.message);
        }
      }
    } else if (type === 2) {
      try {
        await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/response/personalityTwo`,
          { response: answers }
        );
        navigation.navigate("CareerProfile");
      } catch (error) {
        if (error.response === undefined) {
          console.log(error.message);
        } else {
          console.log(error.response.data.message);
        }
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
            <View>
              <Text style={styles.text1}>
                {questions[currentQuestion - 1].question}
              </Text>
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
export default PersonalityScreen;
