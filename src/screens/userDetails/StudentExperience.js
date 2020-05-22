import React, { useState, memo, useCallback, useEffect } from "react";
import {
  Button,
  Form,
  Image,
  Dropdown,
  Input,
  TextArea,
  List,
  Label,
  Checkbox,
} from "semantic-ui-react";
import styled from "styled-components";
//import { city,options } from './data';
import moment from "moment";

import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css";
import axios from "axios";
import { debounce } from "./../../util/helpers";

import { city } from "../../globalvariables/citites";
import swal from "sweetalert";

const Wrapper = styled.div`
	.expertise {
		height: 100vh;
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		background-attachment: fixed;
		background-position: center;
	}
	.expertise-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
	}
	.form-font {
		font-size: 1rem;
		padding: 0 0vw;
		flex: 1;
	}
	.form-font-btn {
		font-size: 1.2rem;
		color: #2f353f;
	}
	.register-redirect {
		font-size: 1.5rem;
		display: flex;
		flex-direction: column;
	}
	.title-header {
		color: #2f353f;
		font-size: 2rem;
	}
	.btn {
		&:active {
			transform: translateY(4px);
		}
		background: #ffd369 !important;
	}
	.logo {
		height: 15vh;
	}
	.intro-box {
		display: flex;
		color: #2f353f;
		justify-content: center;
		align-self: center;
		font-size: 4vh;
		font-weight: 700;
		text-align: center;
		grid-column: 1 / span 2;,
	}
	.logo-box {
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
	}
	.mid-container {
		display: flex;
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
	}
	.forgot {
		margin-left: auto;
	}
	.reg-icons {
		font-size: 3.5rem;
	}
	.question {
		font-size: 4vh;
		margin-bottom: 1.3rem;
	}
	.custom-card {
		justify-self: center;
		${"" /* align-self: center; */}
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-row-gap: 0.5em;
		grid-column-gap: 0.2em;
	}
	.custom-card-header {
		grid-column: 1 / -1;
	}

	.custom-card-header > h3 {
		text-align: center;
	}
	.go-back {
		grid-column: 1 / span 1;
	}

	.experience-page {
		display: grid;
		grid-template-columns: 0.5fr 1fr;
		grid-template-rows: 500px;
	}
	@media (max-width: 767px) {
		.experience-page {
			display: grid;
			grid-template-columns: 1fr;
		}
	}
`;

const employmentTypes = [
  { key: "fullTime", text: "Full Time", value: "fullTime" },
  { key: "partTime", text: "Part Time", value: "partTime" },
  { key: "SelfEmployed", text: "Self Employed", value: "SelfEmployed" },
  { key: "freelance", text: "Freelance", value: "freelance" },
  { key: "contract", text: "Contract", value: "contract" },
  { key: "internship", text: "Internship", value: "internship" },
  { key: "apprenticeship", text: "Apprenticeship", value: "apprenticeship" },
  {
    key: "extra",
    text: "Extra-curricular activity",
    value: "Extra-curricular activity",
  },
];

function StudentExperience({
  nextStep,
  prevStep,
  formData,
  setFormData,
  errors,
}) {
  const [subStep, setSubStep] = useState(1);
  const [subValues, setSubValues] = useState({
    title: "",
    employmentType: "",
    company: "",
    links: "",
    location: "",
    skillsUsed: [],
    description: "",
    startDate: "",
    endDate: "",
  });
  const [experiences, setExperiences] = useState(formData.experiences);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentExp, setCurrentExp] = useState(null);
  const [tag, setTag] = useState("");
  const [suggestedSkills, setSuggestedSkills] = useState([]);

  const [cityFlg, setCityFlag] = useState(false);

  const [formError, setFormError] = useState(null);

  const nextSubStep = () => {
    if (formError !== null && subStep === formError.step) {
      swal({
        title: formError.error,
        icon: "warning",
      });
    } else {
      setSubStep(subStep + 1);
    }
  };
  const prevSubStep = () => {
    setSubStep(subStep - 1);
  };
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
      setFormError({
        error: "Please enter the employment title.",
        step: 1,
      });
    } else if (subValues.employmentType === "") {
      setFormError({
        error: "Please choose the employment type.",
        step: 2,
      });
    } else if (subValues.company === "" || subValues.company.trim() === "") {
      setFormError({
        error: "Please provide the organization name.",
        step: 3,
      });
    } else if (subValues.location === "") {
      setFormError({ error: "Please select the location.", step: 3 });
    } else if (subValues.skillsUsed.length === 0) {
      setFormError({ error: "Please provide the skills used.", step: 4 });
    } else if (subValues.startDate === "") {
      setFormError({ error: "Please provide the start date.", step: 6 });
    } else if (subValues.endDate === "") {
      setFormError({ error: "Please provide the end date.", step: 6 });
    } else if (
      typeof subValues.endDate === "number" &&
      Number(subValues.startDate) >= Number(subValues.endDate)
    ) {
      setFormError({
        error: "Please provide correct start and end dates.",
        step: 6,
      });
    } else if (
      subValues.description === "" ||
      subValues.description.trim() === ""
    ) {
      setFormError({
        error: "Please provide the employment description.",
        step: 7,
      });
    } else {
      setFormError(null);
    }
  }, [subValues]);

  const save = (e) => {
    e.preventDefault();
    let experienceList = [...experiences];
    let isDataValid = true;
    Object.keys(subValues).map((key) => {
      if (
        key === "title" ||
        key === "employmentType" ||
        key === "company" ||
        key === "location" ||
        key === "startDate" ||
        key === "endDate"
      ) {
        if (subValues[key] === "") isDataValid = false;
      }
    });
    if (formError !== null) {
      swal({
        title: formError.error,
        icon: "warning",
      });
      setSubStep(formError.step);
    } else {
      if (isDataValid) {
        if (isEditing) {
          experienceList.map((exp) => {
            if (exp.id === currentExp) {
              exp.title = subValues.title;
              exp.employmentType = subValues.employmentType;
              exp.company = subValues.company;
              exp.links = subValues.links;
              exp.location = subValues.location;
              exp.skillsUsed = subValues.skillsUsed;
              exp.description = subValues.description;
              exp.startDate = subValues.startDate;
              exp.endDate = subValues.endDate;
            }
          });
        } else {
          experienceList.push({
            ...subValues,
            id: experienceList.length,
          });
        }
        setExperiences(experienceList);
        setFormData({ ...formData, experiences: experienceList });
      }
      setSubValues({
        title: "",
        employmentType: "",
        company: "",
        location: "",
        skillsUsed: [],
        description: "",
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
              What were you working as? <span style={{ color: "red" }}>*</span>
            </div>
            <Input
              fluid
              name='title'
              type='text'
              value={subValues.title}
              onChange={handleSubChange}
              placeholder='E.g Front End Dev'
            />
          </>
        );
      case 2:
        return (
          <>
            <div className='question' style={{ marginRight: "auto" }}>
              What was your Employment Type?{" "}
              <span style={{ color: "red" }}>*</span>
            </div>
            <Dropdown
              name='employmentType'
              fluid
              search
              selection
              type='text'
              value={subValues.employmentType}
              options={employmentTypes}
              onChange={handleSubChange}
              placeholder='E.g Internship'
            />
          </>
        );
      case 3:
        return (
          <>
            <div className='question' style={{ marginRight: "auto" }}>
              Name of the organization you worked for:{" "}
              <span style={{ color: "red" }}>*</span>
            </div>
            <Input
              fluid
              name='company'
              type='text'
              value={subValues.company}
              onChange={handleSubChange}
              placeholder='E.g Oracle'
            />
            <div
              className='question'
              style={{ marginRight: "auto", marginTop: "1rem" }}
            >
              and its location: <span style={{ color: "red" }}>*</span>
            </div>
            {!cityFlg ? (
              <div style={{ display: "flex", flex: 1 }}>
                <Dropdown
                  id='student-location'
                  placeholder='E.g. Mumbai'
                  fluid
                  search
                  selection
                  name='location'
                  value={subValues.location}
                  onChange={handleSubChange}
                  options={[
                    {
                      key: "virtual",
                      value: "Virtual",
                      text: "Virtual",
                    },
                    ...city,
                  ]}
                  className='form-font'
                />

                <span
                  className='not-listed'
                  style={{ marginLeft: "8px" }}
                  onClick={() => setCityFlag(true)}
                >
                  Not Listed?
                </span>
              </div>
            ) : (
              <div style={{ display: "flex", flex: 1 }}>
                <Form.Input
                  placeholder='Location (E.g. Mumbai)'
                  fluid
                  size={"large"}
                  type='text'
                  onChange={handleSubChange}
                  name='location'
                  style={{ padding: "0px 0vw", flex: 1 }}
                  className='form-font'
                  value={subValues.location}
                />
              </div>
            )}
          </>
        );
      case 4:
        return (
          <>
            <div className='question' style={{ marginRight: "auto" }}>
              Skills you used or learned while working there?{" "}
              <span style={{ color: "red" }}>*</span>
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
                placeholder: "E.g NodeJs, ReactJs",
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
          </>
        );
      case 5:
        return (
          <>
            <div className='question' style={{ marginRight: "auto" }}>
              Have any links to provide?
            </div>
            <Input
              fluid
              name='links'
              type='text'
              value={subValues.links}
              onChange={handleSubChange}
              placeholder='E.g https://github.com/Your_Project_Repo'
            />
          </>
        );
      case 6:
        return (
          <>
            <div className='question' style={{ marginRight: "auto" }}>
              Tell us the start date and end date{" "}
              <span style={{ color: "red" }}>*</span>
            </div>
            <Checkbox
              checked={subValues.endDate === "Present"}
              label='I am currently working in this role'
              onChange={handleCheckBoxChange}
            />
            <div>
              <Input
                className='form-field'
                onChange={handleSubChange}
                style={{ marginRight: "1rem" }}
                type='date'
                name='startDate'
                value={
                  subValues.startDate
                    ? moment.unix(subValues.startDate).format("YYYY-MM-DD")
                    : subValues.startDate
                }
                placeholder='Optical Character Recognition'
              />
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
          </>
        );
      case 7:
        return (
          <>
            <div className='question' style={{ marginRight: "auto" }}>
              Shortly describe your experience working here.{" "}
              <span style={{ color: "red" }}>*</span>
            </div>
            <TextArea
              className='form-field'
              onChange={handleSubChange}
              style={{ marginRight: "1rem" }}
              name='description'
              value={subValues.description}
            />
          </>
        );
      default:
        break;
    }
  };
  return (
    <>
      {experiences.length >= 0 && !isAdding ? (
        isEditing ? (
          <Wrapper
            className='student-form-wrapper'
            style={{ width: "100%", padding: "0px 5vw" }}
          >
            <div className='expertise'>
              <div className='expertise-box animated fadeIn'>
                <Form
                  size='large'
                  className='form-font'
                  style={{ border: "none" }}
                  noValidate
                >
                  {currentQuestion()}
                  <div className='row flex-nowrap mt-2'>
                    {subStep === 1 && (
                      <Button
                        className='btn m-1'
                        onClick={() => setIsEditing(false)}
                      >
                        <span className='form-font-btn'>Go back</span>
                      </Button>
                    )}
                    {subStep > 1 && (
                      <Button
                        className='btn m-1'
                        onClick={
                          subStep === 7
                            ? () => {
                                setSubValues({
                                  title: "",
                                  employmentType: "",
                                  company: "",
                                  links: "",
                                  location: "",
                                  skillsUsed: [],
                                  description: "",
                                  startDate: "",
                                  endDate: "",
                                });
                                setIsEditing(false);
                              }
                            : prevSubStep
                        }
                      >
                        <span className='form-font-btn'>
                          {subStep === 7 ? "Cancel" : "Go Back"}
                        </span>
                      </Button>
                    )}
                    <Button
                      className='btn m-1 '
                      onClick={subStep === 7 ? save : nextSubStep}
                    >
                      <span className='form-font-btn'>
                        {subStep === 7 ? "Save" : "Continue"}
                      </span>
                    </Button>
                  </div>
                </Form>
              </div>
              <div className='animated fadeIn'>
                <Image
                  className='student-form-img'
                  src={process.env.PUBLIC_URL + "/experience.svg"}
                  alt=''
                />
              </div>
            </div>
          </Wrapper>
        ) : (
          <Wrapper
            className=''
            style={{
              width: "100%",
              padding: "0px 5vw",
              marginTop: "10vh",
            }}
          >
            <div className='experience-page'>
              <div className='custom-card'>
                <div className='intro-box'>
                  Add your work experiences (Internships/Extra Curricular
                  Activities/Jobs)
                </div>
                <div className='custom-card-header'>
                  {experiences.length === 0 ? (
                    <h3>
                      Empty Fields don't look good. Consider adding something?
                    </h3>
                  ) : (
                    <List
                      divided
                      verticalAlign='middle'
                      style={{
                        height: "10em",
                        overflow: "auto",
                      }}
                    >
                      {experiences.map((exp, index) => (
                        <List.Item key={index}>
                          <List.Content floated='right'>
                            <Button
                              onClick={() => {
                                setCurrentExp(exp.id);
                                setSubValues(exp);
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
                              {exp.title}
                            </span>
                          </List.Content>
                          <List.Content>
                            <span
                              className='font-weight-normal'
                              style={{
                                fontSize: "1.2rem",
                              }}
                            >
                              {exp.company}
                            </span>
                          </List.Content>
                          <List.Content>
                            <span
                              className='font-weight-light'
                              style={{
                                fontSize: "1.2rem",
                              }}
                            >
                              {moment.unix(exp.startDate).format("ll")} -{" "}
                              {moment.unix(exp.endDate).format("ll")}
                            </span>
                          </List.Content>
                        </List.Item>
                      ))}
                    </List>
                  )}
                </div>
                <Button
                  className='btn'
                  style={{
                    width: "fit-content",
                    gridColumn: "1 / span 2",
                    justifySelf: "center",
                  }}
                  onClick={() => {
                    setSubValues({
                      title: "",
                      employmentType: "",
                      company: "",
                      links: "",
                      location: "",
                      skillsUsed: [],
                      description: "",
                      startDate: "",
                      endDate: "",
                    });
                    setSubStep(1);
                    setIsAdding(true);
                  }}
                >
                  <span className='form-font-btn'>Add</span>
                </Button>
                <Button className='btn go-back' onClick={prevStep}>
                  <span className='form-font-btn'>Go back</span>
                </Button>
                <Button fluid onClick={nextStep} className='btn'>
                  <span className='form-font-btn'>
                    {experiences.length !== 0 ? "Continue" : "Skip"}
                  </span>
                </Button>
              </div>
              <div className='animated fadeIn'>
                <Image
                  className='student-form-img'
                  src={process.env.PUBLIC_URL + "/experience.svg"}
                  alt=''
                  style={{ height: "100%" }}
                />
              </div>
            </div>
          </Wrapper>
        )
      ) : (
        <Wrapper
          className='student-form-wrapper'
          style={{ width: "100%", padding: "0px 5vw" }}
        >
          <div className='expertise'>
            <div className='expertise-box animated fadeIn'>
              <Form
                size='large'
                className='form-font'
                style={{ border: "none" }}
                noValidate
              >
                {currentQuestion()}
                <div className='row flex-nowrap mt-2'>
                  {subStep === 1 && (
                    <Button
                      className='btn m-1'
                      onClick={() => setIsAdding(false)}
                    >
                      <span className='form-font-btn'>Go back</span>
                    </Button>
                  )}
                  {subStep > 1 && (
                    <Button
                      className='btn m-1'
                      onClick={
                        subStep === 7
                          ? () => {
                              setSubValues({
                                title: "",
                                employmentType: "",
                                company: "",
                                links: "",
                                location: "",
                                skillsUsed: [],
                                description: "",
                                startDate: "",
                                endDate: "",
                              });
                              setIsAdding(false);
                            }
                          : prevSubStep
                      }
                    >
                      <span className='form-font-btn'>
                        {subStep === 7 ? "Cancel" : "Go Back"}
                      </span>
                    </Button>
                  )}
                  <Button
                    className='btn m-1 '
                    onClick={subStep === 7 ? save : nextSubStep}
                  >
                    <span className='form-font-btn'>
                      {subStep === 7 ? "Save" : "Continue"}
                    </span>
                  </Button>
                </div>
              </Form>
            </div>
            <div className='animated fadeIn'>
              <Image
                className='student-form-img'
                src={process.env.PUBLIC_URL + "/experience.svg"}
                alt=''
              />
            </div>
          </div>
        </Wrapper>
      )}
    </>
  );
}

export default memo(StudentExperience);
