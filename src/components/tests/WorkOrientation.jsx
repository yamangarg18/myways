import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Button, Popup } from "semantic-ui-react";
import Progress from "react-progressbar";
import Timer from "react.timer";
import { history } from "../../routers/AppRouter.js";
import useEventListener from "use-event-listener";
import Loader from "../Loader";

const WorkOrientation = () => {
  const [isLoading, setisLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
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

  useEffect(() => {
    const getTestsStatus = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/user/getTestsStatus`
        );
        let isCompleted = data.response["work_orientation"].status
          ? true
          : false;
        setAlreadyTaken(isCompleted);
        if (isCompleted) {
          history.push("/analysis/personality");
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

  useEventListener(
    "keydown", // event to listen to
    (event) => setKey(event.key)
    // callback
  );

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/test/workOrientation`
        );
        let totalQues = 0,
          answers = [];
        res.data.questions.questions.map((type) => {
          type.questionSet = type.questionSet.map((ques) => {
            ques.answer = "";
            totalQues++;
            return ques;
          });
          answers.push(type);
        });
        setQuestions(res.data.questions.questions);
        setTotalQuestions(totalQues);
        setAnswers(answers);
        setisLoading(false);
      } catch (error) {
        if (error.response === undefined) {
          console.log(error.message);
        } else {
          console.log(error.response.data.message);
        }
      }
    };
    if (questions.length === 0 && !alreadyTaken) getQuestions();
  }, [questions, alreadyTaken]);

  useEffect(() => {
    if (totalQuestions > 0)
      setProgress((currentQuestion / totalQuestions) * 100);
  }, [currentQuestion, totalQuestions]);

  const handlePrevious = (e) => {
    e.preventDefault();
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
        `${process.env.REACT_APP_BASE_URL}/api/response/workOrientation`,
        { response: answers }
      );
      history.push("/analysis/personality");
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
          <div title='elapsed time' className='test-timer'>
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
                  <button className='button-form' onClick={handleSubmitTest}>
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <>
                {questions.length > 0 ? (
                  <>
                    <div className='test__paragraph d-flex flex-column align-items-center'>
                      <h2>How much does this activity interest you? </h2>
                    </div>
                    <div className='test__sub-question'>
                      <h2>
                        {
                          questions[questionType].questionSet[
                            currentTypeQuestion
                          ].question
                        }
                        <Popup
                          trigger={
                            <Button
                              icon='eye'
                              style={{ width: "4em", background: "white" }}
                            />
                          }
                          content={`${questions[questionType].paragraph}`}
                          style={{
                            borderRadius: 0,
                            opacity: 0.7,
                            padding: "2em",
                          }}
                          inverted
                        />
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

export default WorkOrientation;
