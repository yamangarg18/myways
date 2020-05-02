import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Progress from "react-progressbar";
import Timer from "react.timer";
import { history } from "../../routers/AppRouter.js";
import useEventListener from "use-event-listener";
import Loader from "../Loader";

const SkillSet = (props) => {
  const [isLoading, setisLoading] = useState(true);
  const [skillsQuestions, setSkillsQuestions] = useState([]);
  const [questionType, setQuestionType] = useState(0);
  const [currentTypeQuestion, setCurrentTypeQuestion] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [previousDisabled, setPreviousDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  const [alreadyTaken, setAlreadyTaken] = useState(true);

  const [key, setKey] = useState("");

  const right = useRef(null);
  const left = useRef(null);
  const submit = useRef(null);
  /*-------------------------------------------------------------------------------To get the status of the test*/
  useEffect(() => {
    const getTestsStatus = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/user/getTestsStatus`
        );
        let isCompleted = data.response["skill_set"].status ? true : false;
        setAlreadyTaken(isCompleted);
        if (isCompleted) {
          history.push("/analysis/expectation");
        }
      } catch (error) {
        if (error.response === undefined) {
          console.log(error.message);
        } else {
          console.log(error.response.data.message);
        }
      }
    };
    getTestsStatus();
  }, []);
  /*-----------------------------------------------------------------------------Not useful------------------*/
  useEffect(() => {
    if (key === "ArrowRight") {
      if (right.current !== null) {
        right.current.click();
        setKey("");
      }
    }
    if (key === "ArrowLeft") {
      if (left.current !== null) {
        left.current.click();
        setKey("");
      }
    }
  }, [key]);
  /*---------------------------------------------------------------------------------No clue--------------*/
  useEventListener(
    "keydown", // event to listen to
    (event) => setKey(event.key)
    // callback
  );
  console.log(isTestCompleted);

  useEffect(() => {
    const getSkillsForQuestions = async () => {
      try {
        // console.log(localStorage.getItem("college_id").split(',')[0]);
        const res = await axios.post(
          `https://myways-server.myways.in/related_skills?get_top=10&college_id=open&intern_id=${localStorage.getItem(
            "user_id"
          )}`
        );
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
          setisLoading(false);
        } else {
          setisLoading(false);
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

  useEffect(() => {
    if (totalQuestions > 0)
      setProgress((currentQuestion / totalQuestions) * 100);
  }, [currentQuestion, totalQuestions]);

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

  const handleStarClick = (e) => {
    // e.preventDefault();
    console.log("called");
    let newAnswers = [...answers];
    newAnswers[questionType].questionSet[currentTypeQuestion].answer =
      e.target.value;
    setAnswers(newAnswers);
    if (right.current !== null) {
      right.current.click();
    }
  };

  const renderStars = (answers) => {
    if (answers.length > 0) {
      return (
        <div className='container'>
          <div className='feedback'>
            <div className='rating'>
              {["5", "4", "3", "2", "1"].map((num) => (
                <>
                  <input
                    key={num}
                    type='radio'
                    name='rating'
                    value={num}
                    id={`rating-${num}`}
                    checked={
                      answers[questionType].questionSet[currentTypeQuestion]
                        .answer === num
                        ? true
                        : false
                    }
                    onChange={handleStarClick}
                  />
                  <label htmlFor={`rating-${num}`}></label>
                </>
              ))}
            </div>
          </div>
        </div>
      );
    }
  };

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
      {isLoading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          <Link className='goto-dashboard' to='/careerProfile'>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <Progress completed={progress} color={"#FFC765"} />
          <div>
            <Timer />
          </div>
          <div className='test__item'>
            {isTestCompleted ? (
              <div className='test-feedback'>
                <h2 className='test__title'>
                  Are you sure you want to finish this test?
                </h2>
                <div className='stars'>
                  <button
                    className='button-form'
                    onClick={(e) => {
                      setIsTestCompleted(false);
                      setNextDisabled(false);
                    }}
                  >
                    No
                  </button>
                  <button
                    ref={submit}
                    className='button-form'
                    onClick={handleSubmitTest}
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <>
                {skillsQuestions.length > 0 ? (
                  <>
                    <div className='test__paragraph'>
                      <h2>Rate yourself in following:</h2>
                    </div>
                    <div className='test__sub-question'>
                      <h2>
                        {
                          skillsQuestions[questionType].questionSet[
                            currentTypeQuestion
                          ].question
                        }
                      </h2>
                    </div>
                    {renderStars(answers)}
                    <div className='d-flex flex-column'>
                      <div className='d-flex'>
                        <button
                          ref={left}
                          className='button button-left ml-auto mr-5'
                          onClick={handlePrevious}
                          disabled={previousDisabled}
                        >
                          <FontAwesomeIcon icon={faArrowLeft} size='2x' />
                        </button>
                        <button
                          ref={right}
                          className='button button-right mr-auto ml-5'
                          onClick={handleNext}
                          disabled={nextDisabled}
                        >
                          <FontAwesomeIcon icon={faArrowRight} size='2x' />
                        </button>
                      </div>
                      <h3 className='font-weight-light m-2 align-self-center'>
                        Use keyboard arrows to navigate
                      </h3>
                    </div>
                  </>
                ) : null}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SkillSet;
