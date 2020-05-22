import React, { useState, useCallback, useEffect } from "react";
import { Button, Form, Image, Label } from "semantic-ui-react";
import styled from "styled-components";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css"; // If using WebPack and style-loader.
import axios from "axios";
import { debounce } from "./../../util/helpers";
import swal from "sweetalert";

const Wrapper = styled.div`
  .expertise {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
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
    padding: 5vw;
  }
  .form-font-btn {
    font-size: 1.4rem;
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
    width: fit-content !important;
  }
  .logo {
    height: 15vh;
  }
  .intro-box {
    display: flex;
    color: #2f353f;
    justify-content: center;
    margin-bottom: 5vh;
    font-size: 6vh;
    font-weight: 700;
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
`;

const StudentSkills = ({ nextStep, prevStep, formData, setFormData }) => {
  const [skills, setSkills] = useState(formData.skills.present);
  const [aspirational_skills, setAspirational_skills] = useState(
    formData.skills.aspirational_skills
  );
  const [skill, setSkill] = useState("");
  const [aspirational_skill, setAspirational_skill] = useState("");
  const [suggestedSkills, setSuggestedSkills] = useState([]);

  const [formError, setFormError] = useState("");

  const handleSkillsChange = (skills) => {
    setSkills(skills);
    setSuggestedSkills([]);
  };

  const handleAspirationChange = (aspirational_skills) => {
    setAspirational_skills(aspirational_skills);
    setSuggestedSkills([]);
  };

  const handleChangeInput = async (skill) => {
    let skills = [];
    if (skill.length !== 0) {
      const { data: results } = await axios.get(
        `${process.env.REACT_APP_ML_URL}/skill_autocomplete?search=${skill}`
      );
      results.result.map((res) => {
        skills.push({ tag: res });
      });
      skills.unshift({ tag: skill });
    }
    setSuggestedSkills(skills);
  };

  const debouncedHandleChangeInput = useCallback(
    debounce(handleChangeInput, 200),
    []
  );

  const handleResultSelect = (e, tag, type) => {
    if (type === "skill") {
      setSkills([...skills, tag]);
      setSkill("");
    } else if (type === "aspirational_skill") {
      setAspirational_skills([...aspirational_skills, tag]);
      setAspirational_skill("");
    }
    setSuggestedSkills([]);
  };

  const resultRenderer = (suggestions, type) => {
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
            onClick={(e) => handleResultSelect(e, sug.tag, type)}
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
    if (skills.length === 0) {
      setFormError("Please provide at least one skill you know");
    } else {
      setFormError("");
    }
  }, [skills]);

  const handleSkillSubmit = (e, { skills, aspirational_skills }) => {
    if (formError !== "") {
      swal({
        title: formError,
        icon: "warning",
      });
    } else {
      setFormData({
        ...formData,
        skills: {
          present: skills,
          aspirational_skills: aspirational_skills,
        },
      });
      nextStep();
    }
  };

  const pasteSplit = (data) => {
    const separators = [
      ",",
      ";",
      "\\(",
      "\\)",
      "\\*",
      "/",
      ":",
      "\\?",
      "\n",
      "\r",
    ];
    const splitData = data
      .split(new RegExp(separators.join("|")))
      .map((d) => d.trim());
    return splitData;
  };

  return (
    <Wrapper className='student-form-wrapper' style={{ width: "100%" }}>
      <div className='expertise student-form' style={{ display: "flex" }}>
        <div className='expertise-box student-form'>
          <Form
            size='large'
            className='form-font'
            style={{ border: "none" }}
            noValidate
          >
            <div
              className='intro-box animated fadeInLeft'
              style={{ fontSize: "1.8rem" }}
            >
              Let's personalize your experience!
            </div>
            <div
              className='question animated fadeIn delay-1s'
              style={{ marginRight: "auto", fontSize: "1.2rem" }}
            >
              Tell us about all the skills you know
            </div>
            <div className=' animated fadeIn delay-2s'>
              <div style={{ marginTop: "20px" }}>
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
                    placeholder: "Current skills",
                  }}
                  pasteSplit={pasteSplit}
                  value={skills}
                  onChange={handleSkillsChange}
                  inputValue={skill}
                  onChangeInput={(skill) => {
                    setSkill(skill);
                    debouncedHandleChangeInput(skill);
                  }}
                />
                {suggestedSkills.length > 0 && skill.length !== 0
                  ? resultRenderer(suggestedSkills, "skill")
                  : null}
              </div>

              <div style={{ marginTop: "20px" }}>
                <div
                  className='question animated fadeIn delay-1s'
                  style={{ fontSize: "1.2rem" }}
                >
                  Tell Us about skills you wish to learn
                </div>
                <TagsInput
                  style={{
                    flex: "1",
                    width: "calc(100%)",
                    height: "1px",
                    padding: "14px 0px 21px 10px",
                    marginLeft: "20px",
                    marginTop: "20px",
                    border: "1px solid #ccc",
                  }}
                  inputProps={{
                    className: "react-tagsinput-input",
                    placeholder: "Skills you want to learn",
                  }}
                  pasteSplit={pasteSplit}
                  value={aspirational_skills}
                  onChange={handleAspirationChange}
                  inputValue={aspirational_skill}
                  onChangeInput={(skill) => {
                    setAspirational_skill(skill);
                    debouncedHandleChangeInput(skill);
                  }}
                />
                {suggestedSkills.length > 0 && aspirational_skill.length !== 0
                  ? resultRenderer(suggestedSkills, "aspirational_skill")
                  : null}
              </div>

              <br />
              <p>Press 'ENTER' Key to separate two skills</p>

              <div className='row justify-content-center'>
                <Button
                  fluid
                  size='large'
                  onClick={(e) => {
                    handleSkillSubmit(e, {
                      skills,
                      aspirational_skills,
                    });
                    prevStep();
                  }}
                  className='btn m-1'
                  type='submit'
                >
                  <span className='form-font-btn'>Go Back</span>
                </Button>
                <Button
                  fluid
                  size='large'
                  onClick={(e) => {
                    handleSkillSubmit(e, {
                      skills,
                      aspirational_skills,
                    });
                  }}
                  className='btn m-1'
                  type='submit'
                >
                  <span className='form-font-btn'>
                    {aspirational_skills.length !== 0 || skills.length
                      ? "Continue"
                      : "Skip"}
                  </span>
                </Button>
              </div>
            </div>
          </Form>
        </div>
        <div className='animated fadeIn'>
          <Image
            className='student-form-img'
            src={process.env.PUBLIC_URL + "/expertise.svg"}
            alt=''
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default StudentSkills;
