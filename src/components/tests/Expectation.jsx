import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
// import Progress from "react-progressbar";
// import Timer from "react.timer";
// import { history } from "../../routers/AppRouter";
// import useEventListener from "use-event-listener";
import styles from "./styles/expectation.module.scss";
import Loader from "../Loader";

const Expectation = () => {
  const [isLoading, setisLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState(0);
  const [currentTypeQuestion, setCurrentTypeQuestion] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [previousDisabled, setPreviousDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  //this is custom for 2 pages
  const [firstPageOptions, setFirstPageOptions] = useState([]);
  const [firstPageOptionsSelected, setFirstPageOptionsSelected] = useState([]);
  const [secondPageOptions, setSecondPageOptions] = useState([]);
  const [secondPageOptionsSelected, setSecondPageOptionsSelected] = useState(
    []
  );

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
  //       let isCompleted = data.response["expectation"].status ? true : false;
  //       setAlreadyTaken(isCompleted);
  //       if (isCompleted) {
  //         history.push("/analysis/work_orientation");
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
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/test/expectation`
        );
        let totalQues = 0;
        res.data.questions.questions.map((type) => {
          type.questionSet = type.questionSet.map((ques) => {
            totalQues++;
            return ques;
          });
        });
        setQuestions(res.data.questions.questions);
        setTotalQuestions(totalQues);
        setFirstPageOptions(
          res.data.questions.questions[0].questionSet[0].options
        );
        setisLoading(false);
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
  }, [questions, alreadyTaken]);

  // useEffect(() => {
  //   if (totalQuestions > 0)
  //     setProgress((currentQuestion / totalQuestions) * 100);
  // }, [currentQuestion, totalQuestions]);

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
          if (firstPageOptionsSelected.length === 2) {
            setCurrentTypeQuestion(currentTypeQuestion + 1);
            let newOptions = [];
            firstPageOptions.map((option, index) => {
              if (!firstPageOptionsSelected.includes(String(index + 1))) {
                newOptions.push(option);
              }
            });

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

  const handleOptionChange = (e) => {
    if (currentTypeQuestion === 0) {
      let newOptions = [...firstPageOptionsSelected];
      if (newOptions.includes(e.target.id)) {
        newOptions.splice(newOptions.indexOf(e.target.id), 1);
      } else {
        if (newOptions.length === 2) {
          alert("select only 2 options");
        } else {
          newOptions.push(e.target.id);
        }
      }
      setFirstPageOptionsSelected(newOptions);
    }
    if (currentTypeQuestion === 1) {
      let newOptions = [...secondPageOptionsSelected];
      if (newOptions.includes(e.target.id)) {
        newOptions.splice(newOptions.indexOf(e.target.id), 1);
      } else {
        if (newOptions.length === 2) {
          alert("select only 2 options");
        } else {
          newOptions.push(e.target.id);
        }
      }
      setSecondPageOptionsSelected(newOptions);
    }
  };

  const renderOptions = (options) => {
    if (options.length > 0) {
      return (
        <div className={`${styles.radios}`}>
          {options.map((option) => (
            <button className={`${styles.radio} ${styles["button-select"]}`}>
              <input
                // ref={radioRef1}
                type="checkbox"
                id={`${option.optionNumber}`}
                name={`radio${option.optionNumber}`}
                value={option.option}
                checked={
                  currentTypeQuestion === 0
                    ? firstPageOptionsSelected.includes(option.optionNumber)
                      ? true
                      : false
                    : secondPageOptionsSelected.includes(option.optionNumber)
                    ? true
                    : false
                }
                onChange={handleOptionChange}
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
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/response/expectation`,
        { response: newAnswers }
      );
      history.push("/analysis/work_orientation");
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
          <Link className="goto-dashboard" to="/careerProfile">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <Progress completed={progress} color={"#FFC765"} />
          <div title="elapsed time" className="test-timer">
            <Timer />
          </div>
          <div className="test__item2">
            {isTestCompleted ? (
              <div className="test-feedback">
                <h2 className="test__title">
                  Are you sure you want to finish this test?
                </h2>
                <div className="stars">
                  <button
                    className="button-form"
                    onClick={(e) => {
                      setIsTestCompleted(false);
                      setNextDisabled(false);
                    }}
                  >
                    No
                  </button>
                  <button className="button-form" onClick={handleSubmitTest}>
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <>
                {questions.length > 0 ? (
                  <>
                    <div className="test__sub-question">
                      <h2>
                        {
                          questions[questionType].questionSet[
                            currentTypeQuestion
                          ].question
                        }
                      </h2>
                    </div>
                    <div className={`${styles.question}`}>
                      {currentTypeQuestion === 0
                        ? renderOptions(firstPageOptions)
                        : renderOptions(secondPageOptions)}
                    </div>
                    <div className="d-flex flex-column">
                      <div className="d-flex">
                        <button
                          ref={left}
                          className="button button-left ml-auto mr-5"
                          onClick={handlePrevious}
                          disabled={previousDisabled}
                        >
                          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
                        </button>
                        <button
                          ref={right}
                          className="button button-right mr-auto ml-5"
                          onClick={handleNext}
                          disabled={nextDisabled}
                        >
                          <FontAwesomeIcon icon={faArrowRight} size="2x" />
                        </button>
                      </div>
                      <h3 className="font-weight-light m-2 align-self-center">
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

export default Expectation;
<button>
  <input
    // ref={radioRef1}
    type="checkbox"
    id={`${option.optionNumber}`}
    name={`radio${option.optionNumber}`}
    value={option.option}
    checked={
      currentTypeQuestion === 0
        ? firstPageOptionsSelected.includes(option.optionNumber)
          ? true
          : false
        : secondPageOptionsSelected.includes(option.optionNumber)
        ? true
        : false
    }
    onChange={handleOptionChange}
  />
  <label htmlFor={`${option.optionNumber}`}>
    <View className={`${styles.checker}`}></View>
    {option.option}
  </label>
</button>;
