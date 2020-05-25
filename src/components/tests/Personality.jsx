import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
// import Progress from "react-progressbar";
// import Timer from "react.timer";
// import { history } from "../../routers/AppRouter";
// import useEventListener from "use-event-listener";
// import styles from "./styles/expectation.module.scss";
// import Loader from "../Loader";

const Personality = () => {
  const [isLoading, setisLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [type, setType] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [previousDisabled, setPreviousDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  const [alreadyTaken, setAlreadyTaken] = useState(true);

  // const [key, setKey] = useState("");

  // const right = useRef(null);
  // const left = useRef(null);

  // useEffect(() => {
  //   const getTestsStatus = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `${process.env.REACT_APP_BASE_URL}/api/user/getTestsStatus`
  //       );
  //       let isCompleted = data.response["personality"].status ? true : false;
  //       setAlreadyTaken(isCompleted);
  //       if (isCompleted) {
  //         history.push("/careerProfile");
  //       }
  //     } catch (error) {
  //       if (error.response === undefined) {
  //         console.log(error.message);
  //       } else {
  //         console.log(error.response.data.message);
  //       }
  //     }
  //   };
  //   getTestsStatus();
  // }, []);

  // useEffect(() => {
  //   if (key === "ArrowRight") {
  //     if (right.current !== null) {
  //       right.current.click();
  //       setKey("");
  //     }
  //   }
  //   if (key === "ArrowLeft") {
  //     if (left.current !== null) {
  //       left.current.click();
  //       setKey("");
  //     }
  //   }
  // }, [key]);

  // useEventListener(
  //   "keydown", // event to listen to
  //   (event) => setKey(event.key)
  //   // callback
  // );

  useEffect(() => {
    const getQuestions = async () => {
      try {
        if (type === 1) {
          const res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/test/personalityOne`
          );
          console.log(res.data);
          res.data.questions.questions.map((type) => {
            type.answer = "";
          });
          setQuestions(res.data.questions.questions);
          setTotalQuestions(res.data.questions.questions.length);
          setAnswers(res.data.questions.questions);
          setisLoading(false);
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
  }, [questions, type, alreadyTaken]);

  // useEffect(() => {
  //   if (totalQuestions > 0)
  //     setProgress((currentQuestion / totalQuestions) * 100);
  // }, [currentQuestion, totalQuestions]);

  const handlePrevious = (e) => {
    console.log(currentQuestion);
    e.preventDefault();
    if (totalQuestions >= currentQuestion) {
      if (currentQuestion - 1 !== 0) {
        setCurrentQuestion(currentQuestion - 1);
        setNextDisabled(false);
      }
    }
  };
  const handleNext = (e) => {
    e.preventDefault();
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

  const handleOption = (e) => {
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
        history.push("/careerProfile");
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
                    <div className='test__paragraph'>
                      <h2>{questions[currentQuestion - 1].question}</h2>
                    </div>
                    <div className={`${styles.question}`}>
                      {renderOptions(questions[currentQuestion - 1].options)}
                    </div>
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

export default Personality;

<View>{renderOptions(questions[currentQuestion - 1].options)}</View>;
