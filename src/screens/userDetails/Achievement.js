import React, { useState, useEffect } from "react";
import { Button, Form, Image, TextArea } from "semantic-ui-react";
import styled from "styled-components";
import swal from "sweetalert";

const Wrapper = styled.div`
  .profileForm {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .profileForm__image {
    margin-right: 1rem;
    & img {
      height: 20em;
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
    font-size: 4vh;
  }
  .question2 {
    font-size: 3vh;
  }
  .profileForm__card {
    padding: 0 4vw;
  }

  @media (max-width: 767px) {
    .profileForm__image {
      display: none;
    }
    .profileForm {
      display: grid;
      grid-template-columns: 1fr;
    }
  }
`;

function Achievement({ nextStep, prevStep, formData, setFormData, errors }) {
  const [achievement, setAchievement] = useState(formData.achievement);
  const [formError, setFormError] = useState("");

  const handleSubChange = (event, result) => {
    let { name, value } = result || event.target;
    setAchievement(value);
  };

  useEffect(() => {
    if (achievement === "") {
      setFormError("Please enter the achievement.");
    } else if (achievement.length > 150) {
      setFormError("The maximum character limit is 150.");
    } else {
      setFormError("");
    }
  }, [achievement]);

  const save = (e) => {
    e.preventDefault();

    let isDataValid = false;
    if (achievement !== "") isDataValid = true;
    if (formError !== "") {
      swal({
        title: formError,
        icon: "warning",
      });
    } else {
      if (isDataValid) {
        setFormData({ ...formData, achievement });
        nextStep();
      }
    }
  };

  return (
    <Wrapper
      className='student-form-wrapper'
      style={{ width: "100%", padding: "0px 5vw" }}
    >
      <div className='profileForm'>
        <div className='expertise-box animated fadeIn'>
          <Form>
            <div className='profileForm__card'>
              <div className='question' style={{ marginRight: "auto" }}>
                Key achievement <span style={{ color: "red" }}>*</span>
              </div>
              <TextArea
                fluid
                rows='5'
                name='github'
                type='text'
                value={achievement}
                onChange={handleSubChange}
                placeholder='Mention your key achievement in about 150 characters.'
              />
            </div>
            <div className='row flex-nowrap mt-2 justify-content-center'>
              <Button
                className='btn m-1'
                onClick={prevStep}
                style={{ width: "200px" }}
              >
                <span className='form-font-btn'>Go Back</span>
              </Button>
              <Button
                className='btn m-1'
                onClick={save}
                style={{ width: "200px" }}
              >
                <span className='form-font-btn'>Continue</span>
              </Button>
            </div>
          </Form>
        </div>
        <div className='profileForm__image animated fadeIn'>
          <Image
            className='image'
            src={process.env.PUBLIC_URL + "/achievement.svg"}
            alt=''
          />
        </div>
      </div>
    </Wrapper>
  );
}

export default Achievement;
