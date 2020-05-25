import React, { useState } from "react";
import { Button, Form, Image, Input } from "semantic-ui-react";
import styled from "styled-components";

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

function StudentProfile({ nextStep, prevStep, formData, setFormData, errors }) {
  const [profileLinks, setProfileLinks] = useState(formData.profileLinks);

  const handleSubChange = (event, result) => {
    let { name, value } = result || event.target;
    setProfileLinks({ ...profileLinks, [name]: value });
  };

  const save = (e) => {
    e.preventDefault();

    let isDataValid = false;
    Object.keys(profileLinks).map((key) => {
      if (profileLinks[key] !== "") isDataValid = true;
    });
    if (isDataValid) {
      setFormData({ ...formData, profileLinks });
      nextStep();
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
              <div
                className='question'
                style={{
                  marginRight: "auto",
                  fontSize: "1.4em",
                }}
              >
                Github Profile url:
              </div>
              <Input
                fluid
                name='github'
                type='text'
                value={profileLinks.github}
                onChange={handleSubChange}
                placeholder='E.g https://github.com/username'
              />
              <div
                className='question'
                style={{
                  marginRight: "auto",
                  fontSize: "1.4em",
                }}
              >
                Linkedin Profile url:
              </div>
              <Input
                fluid
                name='linkedin'
                type='text'
                value={profileLinks.linkedin}
                onChange={handleSubChange}
                placeholder='E.g https://linkedin.com/in/username'
              />
              <div
                className='question'
                style={{
                  marginRight: "auto",
                  fontSize: "1.4em",
                }}
              >
                Portfolio Link (if any):
              </div>
              <Input
                fluid
                name='portfolio'
                type='text'
                value={profileLinks.portfolio}
                onChange={handleSubChange}
                placeholder='E.g https://myportfolio.com'
              />
              <div
                className='question'
                style={{
                  marginRight: "auto",
                  fontSize: "1.4em",
                  marginTop: "1rem",
                  marginBottom: "0",
                }}
              >
                Other links (seperated by comma):
              </div>
              <Input
                fluid
                name='other'
                type='text'
                value={profileLinks.other}
                onChange={handleSubChange}
                placeholder='google.com, facebook.com'
              />
            </div>
            <div className='row flex-nowrap mt-2 justify-content-center'>
              {profileLinks.github === "" &&
              profileLinks.linkedin === "" &&
              profileLinks.portfolio === "" &&
              profileLinks.other === "" ? (
                <>
                  <Button
                    className='btn m-1'
                    onClick={prevStep}
                    style={{ width: "200px" }}
                  >
                    <span className='form-font-btn'>Go Back</span>
                  </Button>
                  <Button
                    className='btn m-1'
                    onClick={nextStep}
                    style={{ width: "200px" }}
                  >
                    <span className='form-font-btn'>Skip</span>
                  </Button>
                </>
              ) : (
                <>
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
                    style={{ width: "250px" }}
                  >
                    <span className='form-font-btn'>Save and continue</span>
                  </Button>
                </>
              )}
            </div>
          </Form>
        </div>
        <div
          className='profileForm__image animated fadeIn'
          style={{ width: "250px" }}
        >
          <Image
            className='image'
            src={process.env.PUBLIC_URL + "/hire.svg"}
            alt=''
          />
        </div>
      </div>
    </Wrapper>
  );
}

export default StudentProfile;
