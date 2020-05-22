import React, { useState, useCallback, useEffect } from "react";
import { Button, Form, Image, List, Input, Label } from "semantic-ui-react";
import styled from "styled-components";
import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css";
import styles from "./Courses.module.css";
import axios from "axios";
import { debounce } from "./../../util/helpers";
import swal from "sweetalert";

const Wrapper = styled.div`
  .projectForm {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .projectForm__image {
    margin-right: 1rem;
    & img {
      height: 90vh;
    }
  }
  .form-font-btn {
    font-size: 1.8rem;
    color: rgb(47, 46, 65);
  }
  .remove {
    display: flex;
    justify-content: flex-end;
    width: 90%;
  }
  .btn {
    &:active {
      transform: translateY(4px);
    }
    background: #ffd369 !important;
  }
  .cross {
    margin-top: 0.4rem;
    margin-left: 0.2rem;
    background: transparent;
    border: none;
    font-size: 1rem;
    outline: none;
    color: $color-subtitle;
  }
  .main-question {
    padding: 0 5rem;
    font-size: 7vh;
    margin-top: 1.3rem;
    text-align: center;
  }
  .question {
    font-size: 3vh;
  }
  .question2 {
    font-size: 3vh;
  }
  .projectForm__card {
    padding: 0 4vw;
  }
`;

function Courses({ nextStep, prevStep, formData, setFormData, errors }) {
  const [subStep, setSubStep] = useState(1);
  const [subValues, setSubValues] = useState({
    title: "",
    description: "",
    skillsLearned: [],
    certiLink: "",
    courseLink: "",
    issuer: "",
  });
  const [courses, setCourses] = useState(formData.courses);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [tag, setTag] = useState("");
  const [suggestedSkills, setSuggestedSkills] = useState([]);

  const [formError, setFormError] = useState("");

  const handleSubChange = (event, result) => {
    let { name, value } = result || event.target;
    setSubValues({ ...subValues, [name]: value });
  };

  const handleSkillsLearned = (skills) => {
    setSubValues({ ...subValues, skillsLearned: skills });
    setSuggestedSkills([]);
  };

  const handleChangeInput = async (tag) => {
    let skills = [];
    if (tag.length !== 0) {
      const { data: results } = await axios.get(
        `${process.env.REACT_APP_ML_URL}/skill_autocomplete?search=${tag}`
      );
      results.result.map((res) => {
        skills.push({ tag: res });
      });
      skills.unshift({ tag });
    }
    setSuggestedSkills(skills);
  };

  const debouncedHandleChangeInput = useCallback(
    debounce(handleChangeInput, 200),
    []
  );

  const handleResultSelect = (e, tag) => {
    setSubValues({
      ...subValues,
      skillsLearned: [...subValues.skillsLearned, tag],
    });
    setTag("");
    setSuggestedSkills([]);
  };

  const resultRenderer = (suggestions) => {
    return (
      <div
        id='skill-label'
        style={{
          position: "absolute",
          backgroundColor: "#fbfdff",
          textAlign: "left",
          width: "18em",
          marginTop: "0.5em",
          borderRadius: "0.28rem",
          border: "1px solid #d4d4d5",
          zIndex: "998",
          boxShadow:
            "0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15)",
          height: "10em",
          overflow: "auto",
        }}
      >
        {suggestions.map((sug, index) => (
          <div
            onClick={(e) => handleResultSelect(e, sug.tag)}
            key={index}
            style={{
              cursor: "pointer",
              display: "block",
              overflow: "hidden",
              fontSize: "1.2em",
              padding: "0.5em 1.2em",
              borderBottom: "1px solid rgba(34,36,38,.1)",
            }}
          >
            <Label content={sug.tag} style={{ backgroundColor: "#ffd369" }} />
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (subValues.title === "" || subValues.title.trim() === "") {
      setFormError("Please enter the certification title.");
    } else if (subValues.issuer === "" || subValues.issuer.trim() === "") {
      setFormError("Please provide the certificate issuer.");
    } else if (subValues.skillsLearned.length === 0) {
      setFormError("Please provide the skills learned.");
    } else {
      setFormError("");
    }
  }, [subValues]);

  const save = (e) => {
    e.preventDefault();
    let coursesList = [...courses];
    let isDataValid = true;
    Object.keys(subValues).map((key) => {
      if (key === "title") {
        if (subValues[key] === "") isDataValid = false;
      }
    });
    if (formError !== "") {
      swal({
        title: formError,
        icon: "warning",
      });
    } else {
      if (isDataValid) {
        if (isEditing) {
          coursesList.map((course) => {
            if (course.id === currentCourse) {
              course.title = subValues.title;
              course.skillsLearned = subValues.skillsLearned;
              course.description = subValues.description;
              course.certiLink = subValues.certiLink;
              course.courseLink = subValues.courseLink;
              course.issuer = subValues.issuer;
            }
          });
        } else {
          coursesList.push({ ...subValues, id: coursesList.length });
        }
        setCourses(coursesList);
        setFormData({ ...formData, courses: coursesList });
      }
      setSubValues({
        title: "",
        description: "",
        skillsLearned: [],
        certiLink: "",
        courseLink: "",
        issuer: "",
      });
      isEditing ? setIsEditing(false) : setIsAdding(false);
      setSubStep(1);
    }
  };

  const currentQuestion = () => {
    switch (subStep) {
      case 1:
        return (
          <>
            <div className='question' style={{ marginRight: "auto" }}>
              Certification Title <span style={{ color: "red" }}>*</span>
            </div>
            <Input
              fluid
              name='title'
              type='text'
              value={subValues.title}
              onChange={handleSubChange}
              placeholder='E.g Python Masterclass Certificate'
            />
            <div className='question' style={{ marginRight: "auto" }}>
              Certificate Link
            </div>
            <Input
              fluid
              name='certiLink'
              type='text'
              value={subValues.certiLink}
              onChange={handleSubChange}
              placeholder='E.g https://coursera.com/view/id'
            />
            <div className='question' style={{ marginRight: "auto" }}>
              Course Link
            </div>
            <Input
              fluid
              name='courseLink'
              type='text'
              value={subValues.courseLink}
              onChange={handleSubChange}
              placeholder='E.g https://udemy.com/course/python'
            />
            <div
              className='question'
              style={{
                marginRight: "auto",
                marginTop: "1rem",
                marginBottom: "0",
              }}
            >
              Description
            </div>
            <Input
              fluid
              name='description'
              type='text'
              value={subValues.description}
              onChange={handleSubChange}
              placeholder='What was it about?'
            />
            <div
              className='question'
              style={{
                marginRight: "auto",
                marginTop: "1rem",
                marginBottom: "0",
              }}
            >
              Certificate Issuing Organization{" "}
              <span style={{ color: "red" }}>*</span>
            </div>
            <Input
              fluid
              name='issuer'
              type='text'
              value={subValues.issuer}
              onChange={handleSubChange}
              placeholder='Eg: Coursera, Udemy'
            />

            <div
              className='question'
              style={{
                marginRight: "auto",
                marginTop: "1rem",
                marginBottom: "0",
              }}
            >
              Skills Information <span style={{ color: "red" }}>*</span>
            </div>
            <TagsInput
              style={{
                flex: "1",
                width: "calc(100%)",
                height: "10px",
                padding: "14px 0px 21px 10px",
                marginLeft: "20px",
                border: "1px solid #ccc",
              }}
              inputProps={{
                className: "react-tagsinput-input",
                placeholder: "What skills you acquired?",
              }}
              value={subValues.skillsLearned}
              onChange={handleSkillsLearned}
              inputValue={tag}
              onChangeInput={(tag) => {
                setTag(tag);
                debouncedHandleChangeInput(tag);
              }}
            />
            {suggestedSkills.length > 0
              ? resultRenderer(suggestedSkills)
              : null}
          </>
        );

      default:
        break;
    }
  };

  return (
    <>
      {courses.length >= 0 && !isAdding ? (
        isEditing ? (
          <Wrapper
            className='student-form-wrapper'
            style={{ width: "100%", padding: "0px 5vw" }}
          >
            <div className='projectForm'>
              <div className='expertise-box animated fadeIn'>
                <Form>
                  <div className='projectForm__card'>{currentQuestion()}</div>
                  <div className='row flex-nowrap mt-2 justify-content-center'>
                    <Button
                      className='btn m-1 '
                      onClick={save}
                      style={{ width: "200px" }}
                    >
                      <span className='form-font-btn'>Save</span>
                    </Button>
                    <Button
                      style={{ width: "200px" }}
                      className='btn m-1'
                      onClick={() => {
                        setSubValues({
                          title: "",
                          description: "",
                          skillsLearned: [],
                          certiLink: "",
                          courseLink: "",
                          issuer: "",
                        });
                        setIsEditing(false);
                      }}
                    >
                      <span className='form-font-btn'>Cancel</span>
                    </Button>
                  </div>
                </Form>
              </div>
              <div className='projectForm__image animated fadeIn'>
                <Image
                  className='student-form-img'
                  src={process.env.PUBLIC_URL + "/courses.svg"}
                  alt=''
                />
              </div>
            </div>
          </Wrapper>
        ) : (
          <div
            className=''
            style={{
              width: "100%",
              padding: "0px 5vw",
              marginTop: "10vh",
            }}
          >
            <div className={`${styles["courses-page"]}`}>
              <div className={`${styles["custom-card"]}`}>
                <div
                  className='intro-box'
                  style={{
                    display: "flex",
                    color: "#2f353f",
                    justifyContent: "center",
                    alignSelf: "center",
                    fontSize: "4vh",
                    fontWeight: "700",
                    textAlign: "center",
                    gridColumn: "1 / span 2",
                  }}
                >
                  Add your certifications
                </div>
                <div className={`${styles["custom-card-header"]}`}>
                  {courses.length === 0 ? (
                    <h3>
                      Empty Fields don't look good. Consider adding something?
                    </h3>
                  ) : (
                    <List
                      divided
                      verticalAlign='middle'
                      style={{
                        height: "5em",
                        overflow: "auto",
                      }}
                    >
                      {courses.map((course, index) => (
                        <List.Item key={index}>
                          <List.Content floated='right'>
                            <Button
                              onClick={() => {
                                setCurrentCourse(course.id);
                                setSubValues(course);
                                setIsEditing(true);
                                setSubStep(1);
                              }}
                            >
                              Edit
                            </Button>
                          </List.Content>
                          <List.Content>
                            <span
                              className='font-weight-bolder'
                              style={{
                                fontSize: "1.2rem",
                              }}
                            >
                              {course.title}
                            </span>
                          </List.Content>
                        </List.Item>
                      ))}
                    </List>
                  )}
                </div>

                <Button
                  className={`${styles.btn}`}
                  style={{
                    width: "fit-content",
                    gridColumn: "1 / span 2",
                    justifySelf: "center",
                  }}
                  onClick={() => {
                    setIsAdding(true);
                  }}
                >
                  <span className={`${styles["form-font-btn"]}`}>Add</span>
                </Button>
                <Button
                  className={`${styles.btn} ${styles["go-back"]}`}
                  onClick={prevStep}
                >
                  <span className={`${styles["form-font-btn"]}`}>Go back</span>
                </Button>
                <Button fluid onClick={nextStep} className={`${styles.btn}`}>
                  <span className={`${styles["form-font-btn"]}`}>
                    {courses.length !== 0 ? "Continue" : "Skip"}
                  </span>
                </Button>
              </div>
              <div className='animated fadeIn' style={{ width: "450px" }}>
                <Image
                  className='student-form-img'
                  src={process.env.PUBLIC_URL + "/courses.svg"}
                  alt=''
                  style={{ height: "100%" }}
                />
              </div>
            </div>
          </div>
        )
      ) : (
        <Wrapper
          className='student-form-wrapper'
          style={{ width: "100%", padding: "0px 5vw" }}
        >
          <div className='projectForm'>
            <div className='expertise-box animated fadeIn'>
              <Form>
                <div className='projectForm__card'>{currentQuestion()}</div>
                <div className='row flex-nowrap mt-2 justify-content-center'>
                  <Button
                    className='btn m-1 '
                    onClick={save}
                    style={{ width: "200px" }}
                  >
                    <span className='form-font-btn'>Save</span>
                  </Button>
                  <Button
                    style={{ width: "200px" }}
                    className='btn m-1'
                    onClick={() => {
                      setSubValues({
                        title: "",
                        description: "",
                        skillsLearned: [],
                        certiLink: "",
                        courseLink: "",
                        issuer: "",
                      });
                      setIsAdding(false);
                    }}
                  >
                    <span className='form-font-btn'>Cancel</span>
                  </Button>
                </div>
              </Form>
            </div>
            <div className='projectForm__image animated fadeIn'>
              <Image
                className='student-form-img'
                src={process.env.PUBLIC_URL + "/courses.svg"}
                alt=''
              />
            </div>
          </div>
        </Wrapper>
      )}
    </>
  );
}

export default Courses;
