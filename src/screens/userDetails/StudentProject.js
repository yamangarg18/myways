import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import {
  Button,
  Form,
  Image,
  Input,
  TextArea,
  List,
  Label,
  Checkbox,
} from "semantic-ui-react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import styles from "./StudentProject.module.css";
import axios from "axios";
import { debounce } from "./../../util/helpers";
import swal from "sweetalert";

const Wrapper = styled.div`
  .projectForm {
    display: grid;
    grid-template-columns: 1fr 0.8fr;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 0 2em;
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
    font-size: 2.5vh;
  }
  .projectForm__card {
    padding: 0 4vw;
  }
`;

const StudentProject = ({
  nextStep,
  prevStep,
  formData,
  setFormData,
  errors,
}) => {
  const [subStep, setSubStep] = useState(1);
  const [subValues, setSubValues] = useState({
    title: "",
    links: "",
    skillsUsed: [],
    description: "",
    startDate: "",
    endDate: "",
  });
  const [projects, setProjects] = useState(formData.projects);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentPro, setCurrentPro] = useState(null);
  const [tag, setTag] = useState("");
  const [suggestedSkills, setSuggestedSkills] = useState([]);

  const [formError, setFormError] = useState("");

  const handleSubChange = (event, result) => {
    let { name, value } = result || event.target;
    if (name === "startDate" || name === "endDate") {
      value = moment(value).unix();
    }
    setSubValues({ ...subValues, [name]: value });
  };
  const handleSkillsUsed = (skills) => {
    setSubValues({ ...subValues, skillsUsed: skills });
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
      skillsUsed: [...subValues.skillsUsed, tag],
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

  const handleCheckBoxChange = (e) => {
    e.preventDefault();
    if (subValues.endDate === "Present") {
      setSubValues({ ...subValues, endDate: "" });
    } else {
      setSubValues({ ...subValues, endDate: "Present" });
    }
  };

  useEffect(() => {
    if (subValues.title === "" || subValues.title.trim() === "") {
      setFormError("Please enter the project title.");
    } else if (subValues.startDate === "") {
      setFormError("Please provide the start date.");
    } else if (subValues.endDate === "") {
      setFormError("Please provide the end date.");
    } else if (
      typeof subValues.endDate === "number" &&
      Number(subValues.startDate) >= Number(subValues.endDate)
    ) {
      setFormError("Please provide correct start and end dates.");
    } else if (
      subValues.description === "" ||
      subValues.description.trim() === ""
    ) {
      setFormError("Please provide the description.");
    } else if (subValues.skillsUsed.length === 0) {
      setFormError("Please provide the skills used.");
    } else {
      setFormError("");
    }
  }, [subValues]);

  const save = (e) => {
    e.preventDefault();
    let projectsList = [...projects];
    let isDataValid = true;
    Object.keys(subValues).map((key) => {
      if (key === "title" || key === "startDate" || key === "endDate") {
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
          projectsList.map((pro) => {
            if (pro.id === currentPro) {
              pro.title = subValues.title;
              pro.links = subValues.links;
              pro.skillsUsed = subValues.skillsUsed;
              pro.description = subValues.description;
              pro.startDate = subValues.startDate;
              pro.endDate = subValues.endDate;
            }
          });
        } else {
          projectsList.push({
            ...subValues,
            id: projectsList.length,
          });
        }
        setProjects(projectsList);
        setFormData({ ...formData, projects: projectsList });
      }
      setSubValues({
        title: "",
        links: "",
        skillsUsed: [],
        description: "",
        startDate: "",
        endDate: "",
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
              Project Title <span style={{ color: "red" }}>*</span>
            </div>
            <Input
              fluid
              name='title'
              type='text'
              value={subValues.title}
              onChange={handleSubChange}
              placeholder='E.g Siri'
            />
            <div className='d-flex justify-content-center align-items-center mt-4'>
              <div className='question2 mr-2'>
                Starting Date <span style={{ color: "red" }}>*</span>
              </div>
              <Input
                className='form-field'
                onChange={handleSubChange}
                type='date'
                name='startDate'
                value={
                  subValues.startDate
                    ? moment.unix(subValues.startDate).format("YYYY-MM-DD")
                    : subValues.startDate
                }
                placeholder='Optical Character Recognition'
                style={{ marginRight: "1rem  " }}
              />
              <div className='question2 mr-2'>
                Ending Date <span style={{ color: "red" }}>*</span>
              </div>
              {subValues.endDate === "" ? (
                <Input
                  className='form-field'
                  onChange={handleSubChange}
                  type='date'
                  name='endDate'
                  value={
                    subValues.endDate
                      ? moment.unix(subValues.endDate).format("YYYY-MM-DD")
                      : subValues.endDate
                  }
                  placeholder='Optical Character Recognition'
                />
              ) : !Number.isNaN(Number(subValues.endDate)) ? (
                <Input
                  className='form-field'
                  onChange={handleSubChange}
                  type='date'
                  name='endDate'
                  value={
                    subValues.endDate
                      ? moment.unix(subValues.endDate).format("YYYY-MM-DD")
                      : subValues.endDate
                  }
                  placeholder='Optical Character Recognition'
                />
              ) : (
                "Present"
              )}
            </div>
            <Checkbox
              checked={subValues.endDate === "Present"}
              label='I am currently working on this project'
              onChange={handleCheckBoxChange}
            />
            <>
              <div className='question mt-4' style={{ marginRight: "auto" }}>
                Work Description <span style={{ color: "red" }}>*</span>
              </div>
              <TextArea
                fluid
                name='description'
                type='text'
                value={subValues.description}
                onChange={handleSubChange}
                placeholder='E.g I built a chatbot which can...'
              />
              <div
                className='question'
                style={{
                  marginRight: "auto",
                  marginTop: "1rem",
                  marginBottom: "0",
                }}
              >
                Skills Used <span style={{ color: "red" }}>*</span>
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
                  placeholder: "What skills you used?",
                }}
                value={subValues.skillsUsed}
                onChange={handleSkillsUsed}
                inputValue={tag}
                onChangeInput={(tag) => {
                  setTag(tag);
                  debouncedHandleChangeInput(tag);
                }}
              />
              {suggestedSkills.length > 0
                ? resultRenderer(suggestedSkills)
                : null}
              <div className='question' style={{ marginRight: "auto" }}>
                Project Link
              </div>
              <Input
                fluid
                name='links'
                type='text'
                value={subValues.links}
                onChange={handleSubChange}
                placeholder='E.g https://project.com'
              />
            </>
          </>
        );
      default:
        break;
    }
  };

  return (
    <>
      {projects.length >= 0 && !isAdding ? (
        isEditing ? (
          <Wrapper className='student-form-wrapper' style={{ width: "100%" }}>
            <div className='projectForm'>
              <div className='expertise-box animated fadeIn'>
                <Form>
                  <div className='projectForm__card'>{currentQuestion()}</div>
                  <div className='row flex-nowrap mt-2'>
                    <Button className='btn m-1 ' onClick={save}>
                      <span className='form-font-btn'>Save</span>
                    </Button>
                    <Button
                      className='btn m-1'
                      onClick={() => {
                        setSubValues({
                          title: "",
                          links: "",
                          skillsUsed: [],
                          description: "",
                          startDate: "",
                          endDate: "",
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
                  src={process.env.PUBLIC_URL + "/project.svg"}
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
            <div className={`${styles["projects-page"]}`}>
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
                  Add your projects
                </div>
                <div className={`${styles["custom-card-header"]}`}>
                  {projects.length === 0 ? (
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
                      {projects.map((pro, index) => (
                        <List.Item key={index}>
                          <List.Content floated='right'>
                            <Button
                              onClick={() => {
                                setCurrentPro(pro.id);
                                setSubValues(pro);
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
                              {pro.title}
                            </span>
                          </List.Content>
                          <List.Content>
                            <span
                              className='font-weight-light'
                              style={{
                                fontSize: "1.2rem",
                              }}
                            >
                              {moment.unix(pro.startDate).format("ll")} -{" "}
                              {moment.unix(pro.endDate).format("ll")}
                            </span>
                          </List.Content>
                        </List.Item>
                      ))}
                    </List>
                  )}
                </div>

                <Button
                  className={`${styles.btn} `}
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
                    {projects.length !== 0 ? "Continue" : "Skip"}
                  </span>
                </Button>
              </div>
              <div className='animated fadeIn'>
                <Image
                  className='student-form-img'
                  src={process.env.PUBLIC_URL + "/project.svg"}
                  alt=''
                  style={{ height: "100%" }}
                />
              </div>
            </div>
          </div>
        )
      ) : (
        <Wrapper className='student-form-wrapper' style={{ width: "100%" }}>
          <div className='projectForm'>
            <div className='expertise-box animated fadeIn'>
              <Form>
                <div className='projectForm__card'>{currentQuestion()}</div>
                <div className='row flex-nowrap mt-2'>
                  <Button className='btn m-1 ' onClick={save}>
                    <span className='form-font-btn'>Save</span>
                  </Button>
                  <Button
                    className='btn m-1'
                    onClick={() => {
                      setSubValues({
                        title: "",
                        links: "",
                        skillsUsed: [],
                        description: "",
                        startDate: "",
                        endDate: "",
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
                src={process.env.PUBLIC_URL + "/project.svg"}
                alt=''
              />
            </div>
          </div>
        </Wrapper>
      )}
    </>
  );
};
export default StudentProject;
