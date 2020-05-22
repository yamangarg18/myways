import React, { useState, memo, useCallback, useEffect } from "react";
import {
  Button,
  Form,
  Grid,
  Image,
  List,
  Search,
  Label,
} from "semantic-ui-react";
import styled from "styled-components";
import { Dropdown } from "semantic-ui-react";
import { city } from "../../globalvariables/citites";
import { degrees } from "../../globalvariables/degrees";
import styles from "./StudentInfo.module.css";
import axios from "axios";
import { debounce } from "./../../util/helpers";
import swal from "sweetalert";

const getStartYear = () => {
  var currentYear = new Date().getFullYear();
  var years = [];
  var startYear = 1980;
  for (var i = startYear; i < currentYear; i++) {
    years.push({ text: startYear + 1, value: startYear + 1 });
    startYear++;
  }
  return years;
};

const getEndYear = () => {
  var endYear = new Date().getFullYear() + 20;
  var years = [];
  var startYear = 1980;
  for (var i = startYear; i < endYear; i++) {
    years.push({ text: startYear + 1, value: startYear + 1 });
    startYear++;
  }
  return years;
};

const startYearOptions = getStartYear();
const endYearOptions = getEndYear();
const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  background: white;
  align-items: center;
  justify-content: center;
  .profile-card {
    width: 50vw;
    padding: 0 2rem;
    display: flex;
    justify-self: center;
    align-items: center;
    //  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 5px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    border-radius: 1rem;
    overflow: hidden;
  }
  .profile-banner {
    align-self: start;
    height: 100%;
    background: rgb(63, 61, 86);
    color: #ffd369;
    text-align: center;
    font-size: 2.2rem;
  }
  .btn {
    background: #ffd369 !important;
    padding: 0 1rem;
    &:active {
      transform: translateY(2px);
    }
  }
  .form-font-btn {
    font-size: 1.8rem;
    color: rgb(47, 46, 65);
  }
  .ast {
    color: red;
  }
  .form-label {
    font-weight: bold;
    font-size: 1rem;
  }
  .form-label-date {
    font-weight: bold;
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }
  .form-font-label {
    font-size: 1.3rem;
  }
  .project__buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .form-font-btn {
    font-size: 1.8rem;
    color: #2f353f;
  }
  .girl-img {
    height: 100%;
  }
  .ui.grid > .row {
    margin-top: 2rem;
    height: 90vh;
    padding: 0;
  }
  .ui.grid > .row > .column {
    margin-bottom: 1.5rem;
  }
  .ui.button {
    padding: 0.5rem 1rem;
  }
  .not-listed: hover {
    color: grey;
    cursor: pointer;
  }
  .not-listed {
    margin-left: 2%;
  }

  @media screen and (min-height: 800px) {
    input[type="text"],
    input[type="number"] {
      height: 3.5rem;
    }
    .ui.grid > .row > .column {
      margin-bottom: 3rem;
    }
    .dropdown {
      height: 3.5rem;
    }
  }
`;

function StudentInfo({ formData, prevStep, nextStep, setFormData, errors }) {
  const [subValues, setSubValues] = useState({
    school: "",
    cgpa: "",
    degree: "",
    fieldOfStudy: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [education, setEducation] = useState(formData.education);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentEdu, setCurrentEdu] = useState(null);

  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [degreeFlag, setDegreeFlag] = useState(false);
  const [cityFlag, setCityFlag] = useState(false);

  const [formError, setFormError] = useState("");

  const handleSubChange = (event, result) => {
    let { name, value } = result || event.target;
    setSubValues({ ...subValues, [name]: value });
  };

  const handleSearchChange = async (e, data) => {
    setIsLoading(true);
    setSchools([]);
    if (data.value !== "") {
      let { data: results } = await axios.get(
        `${process.env.REACT_APP_ML_URL}/college_autocomplete?search=${data.value}`
      );
      let schools = [];
      results.result.map((res) => {
        schools.push({ school: res });
      });
      setSchools(schools);
    }
    setIsLoading(false);
  };
  const debouncedHandleSearch = useCallback(
    debounce(handleSearchChange, 500),
    []
  );
  const resultRenderer = ({ id, school }) => {
    return <Label key={id} content={school} />;
  };

  const handleResultSelect = (e, { result }) =>
    setSubValues({ ...subValues, school: result.school });

  useEffect(() => {
    if (subValues.school === "" || subValues.school.trim() === "") {
      setFormError("Please enter the college name.");
    } else if (subValues.degree === "" || subValues.degree.trim() === "") {
      setFormError("Please provide the degree.");
    } else if (
      subValues.fieldOfStudy === "" ||
      subValues.fieldOfStudy.trim() === ""
    ) {
      setFormError("Please provide the field of study.");
    } else if (subValues.location === "" || subValues.location.trim() === "") {
      setFormError("Please provide the location.");
    } else if (subValues.cgpa === "") {
      setFormError("Please enter the grade.");
    } else if (subValues.startDate === "") {
      setFormError("Please provide the start year.");
    } else if (subValues.endDate === "") {
      setFormError("Please provide the end year.");
    } else if (Number(subValues.startDate) >= Number(subValues.endDate)) {
      setFormError("Please provide correct start and end year.");
    } else {
      setFormError("");
    }
  }, [subValues]);

  const save = (e) => {
    e.preventDefault();
    let educationList = [...education];
    let isDataValid = true;
    Object.keys(subValues).map((key) => {
      if (
        key === "school" ||
        key === "cgpa" ||
        key === "degree" ||
        key === "fieldOfStudy" ||
        key === "location" ||
        key === "startDate" ||
        key === "endDate"
      ) {
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
          educationList.map((edu) => {
            if (edu.id === currentEdu) {
              edu.school = subValues.school;
              edu.cgpa = subValues.cgpa;
              edu.degree = subValues.degree;
              edu.fieldOfStudy = subValues.fieldOfStudy;
              edu.location = subValues.location;
              edu.description = subValues.description;
              edu.startDate = subValues.startDate;
              edu.endDate = subValues.endDate;
            }
          });
        } else {
          educationList.push({
            ...subValues,
            id: educationList.length,
          });
        }
        setEducation(educationList);
        setFormData({ ...formData, education: educationList });
      }
      setSubValues({
        school: "",
        cgpa: "",
        degree: "",
        fieldOfStudy: "",
        location: "",
        description: "",
        startDate: "",
        endDate: "",
      });
      isEditing ? setIsEditing(false) : setIsAdding(false);
    }
  };

  return (
    <>
      {education.length >= 0 && !isAdding ? (
        isEditing ? (
          <Wrapper
            className='student-form-wrapper'
            style={{ position: "relative" }}
          >
            <div className='student-form profile-card animated fadeInDown'>
              {/* <div className="profile-banner"><div>
        </div><FontAwesomeIcon icon={faUsers} />Profile</div> */}
              <Form>
                <Grid
                  style={{
                    height: "fit-content",
                    margin: 0,
                    background: "white",
                  }}
                  verticalAlign='middle'
                >
                  <Grid.Row style={{}}>
                    <Grid.Column width='6'>
                      <div className='form-label'>
                        College Name
                        <span className='ast'>*</span>
                      </div>
                    </Grid.Column>
                    <Grid.Column width='10'>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <Search
                          className='form-font'
                          placeholder='E.g. IIT Delhi'
                          loading={isLoading}
                          onResultSelect={handleResultSelect}
                          onSearchChange={(e, data) => {
                            setSubValues({
                              ...subValues,
                              school: data.value,
                            });
                            debouncedHandleSearch(e, data);
                          }}
                          results={schools}
                          resultRenderer={resultRenderer}
                          noResultsMessage={"Loading suggestions..."}
                          value={subValues.school}
                        />
                      </div>
                    </Grid.Column>
                    <Grid.Column width='6'>
                      <div className='form-label'>
                        Degree
                        <span className='ast'>*</span>
                      </div>
                    </Grid.Column>
                    {!degreeFlag ? (
                      <Grid.Column width='10'>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Dropdown
                            placeholder='E.g. Bachelor of Technology'
                            fluid
                            search
                            selection
                            value={subValues.degree}
                            onChange={handleSubChange}
                            name='degree'
                            options={degrees}
                            className='form-font'
                          />
                          <span
                            className='not-listed'
                            onClick={() => setDegreeFlag(true)}
                          >
                            Not Listed?
                          </span>
                        </div>
                      </Grid.Column>
                    ) : (
                      <Grid.Column width='10'>
                        <Form.Input
                          placeholder='E.g. Bachelor of Technology'
                          fluid
                          type='text'
                          value={subValues.degree}
                          onChange={handleSubChange}
                          name='degree'
                          options={degrees}
                          className='form-font'
                        />
                      </Grid.Column>
                    )}
                    <Grid.Column width='6'>
                      <div className='form-label'>
                        Field Of Study
                        <span className='ast'>*</span>
                      </div>
                    </Grid.Column>
                    <Grid.Column width='10'>
                      <Form.Input
                        fluid
                        name='fieldOfStudy'
                        type='text'
                        value={subValues.fieldOfStudy}
                        error={errors ? true : false}
                        onChange={handleSubChange}
                        placeholder='E.g. Electronics Engineering'
                        className='form-font'
                      />
                    </Grid.Column>
                    <Grid.Column width='6'>
                      <div className='form-label'>
                        Location
                        <span className='ast'>*</span>
                      </div>
                    </Grid.Column>
                    {!cityFlag ? (
                      <Grid.Column width='10'>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
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
                            onClick={() => setCityFlag(true)}
                          >
                            Not Listed?
                          </span>
                        </div>
                      </Grid.Column>
                    ) : (
                      <Grid.Column width='10'>
                        <Form.Input
                          placeholder='E.g. Mumbai'
                          fluid
                          type='text'
                          name='location'
                          value={subValues.location}
                          onChange={handleSubChange}
                          options={city}
                          className='form-font'
                        />
                      </Grid.Column>
                    )}
                    <Grid.Column width='6'>
                      <div className='form-label'>
                        Grade
                        <span className='ast'>*</span>
                      </div>
                    </Grid.Column>
                    <Grid.Column width='10'>
                      <Form.Input
                        fluid
                        name='cgpa'
                        type='number'
                        value={subValues.cgpa}
                        error={errors ? true : false}
                        onChange={handleSubChange}
                        placeholder='CGPA(on 10)/Percentage '
                        className='form-font'
                      />
                    </Grid.Column>

                    {/* <Grid.Column width="6">
											<div className="form-label">
												Summary
											</div>
										</Grid.Column>
										<Grid.Column width="10">
											<Form.Input
												fluid
												name="description"
												type="text"
												value={subValues.deescription}
												error={errors ? true : false}
												onChange={handleSubChange}
												placeholder="Profile Headline"
												className="form-font"
											/>
										</Grid.Column> */}

                    <Grid.Column width={8}>
                      <div className='form-label-date'>
                        Starting Year
                        <span className='ast'>*</span>
                      </div>
                      <Dropdown
                        placeholder='E.g 2020'
                        fluid
                        search
                        selection
                        name='startDate'
                        value={subValues.startDate}
                        onChange={handleSubChange}
                        options={startYearOptions}
                        className='form-font'
                      />
                    </Grid.Column>

                    <Grid.Column width={8}>
                      <div className='form-label-date'>
                        Ending Year
                        <span className='ast'>*</span>
                      </div>
                      <Dropdown
                        placeholder='E.g 2020'
                        fluid
                        search
                        selection
                        name='endDate'
                        value={subValues.endDate}
                        onChange={handleSubChange}
                        options={endYearOptions}
                        className='form-font'
                      />
                    </Grid.Column>
                    <div className='project__buttons'>
                      <Button className='btn' type='submit' onClick={save}>
                        <span className='form-font-btn'>Save</span>
                      </Button>
                      <Button
                        size='large'
                        className='btn'
                        onClick={() => {
                          setSubValues({
                            school: "",
                            cgpa: "",
                            degree: "",
                            fieldOfStudy: "",
                            location: "",
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
                  </Grid.Row>
                </Grid>
              </Form>
            </div>
            <Image
              src={process.env.PUBLIC_URL + "/student-profile.svg"}
              alt=''
              className='student-form-img girl-img animated fadeIn'
            />
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
            <div className={`${styles["education-page"]}`}>
              <div className={`${styles["custom-card"]}`}>
                <div
                  className='intro-box'
                  style={{
                    display: "flex",
                    color: "#2f353f",
                    justifyContent: "center",
                    alignSelf: "center",
                    fontSize: "5vh",
                    fontWeight: "700",
                    textAlign: "center",
                    gridColumn: "1 / span 2",
                  }}
                >
                  Add your education
                </div>
                <div className={`${styles["custom-card-header"]}`}>
                  {education.length === 0 ? (
                    <h3>
                      Empty fields don't look good. Consider adding something?
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
                      {education.map((edu, index) => (
                        <List.Item key={index}>
                          <List.Content floated='right'>
                            <Button
                              onClick={() => {
                                setCurrentEdu(edu.id);
                                setSubValues(edu);
                                setIsEditing(true);
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
                              {edu.degree}
                            </span>
                          </List.Content>
                          <List.Content>
                            <span
                              className='font-weight-normal'
                              style={{
                                fontSize: "1.2rem",
                              }}
                            >
                              {edu.school}
                            </span>
                          </List.Content>
                          <List.Content>
                            <span
                              className='font-weight-light'
                              style={{
                                fontSize: "1.2rem",
                              }}
                            >
                              {edu.startDate} - {edu.endDate}
                            </span>
                          </List.Content>
                        </List.Item>
                      ))}
                    </List>
                  )}
                </div>

                <Button
                  className={`${styles.btn} ${styles["footer-button"]}`}
                  style={{ alignSelf: "start" }}
                  onClick={() => {
                    setSubValues({
                      school: "",
                      cgpa: "",
                      degree: "",
                      fieldOfStudy: "",
                      location: "",
                      links: "",
                      skillsUsed: [],
                      description: "",
                      startDate: "",
                      endDate: "",
                    });
                    setIsAdding(true);
                  }}
                >
                  <span className={`${styles["form-font-btn"]}`}>Add</span>
                </Button>

                <div
                  className={`${styles["footer-button"]}`}
                  style={{ alignSelf: "end" }}
                >
                  {education.length !== 0 ? (
                    <Button
                      size='large'
                      className={`${styles.btn}`}
                      onClick={prevStep}
                    >
                      <span className={`${styles["form-font-btn"]}`}>
                        Go back
                      </span>
                    </Button>
                  ) : null}
                  <Button onClick={nextStep} className={`${styles.btn}`}>
                    <span className={`${styles["form-font-btn"]}`}>
                      {education.length !== 0 ? "Continue" : "Skip"}
                    </span>
                  </Button>
                </div>
              </div>
              <div className='animated fadeIn'>
                <Image
                  className='student-form-img'
                  src={process.env.PUBLIC_URL + "/student-profile.svg"}
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
          style={{ position: "relative" }}
        >
          <div className='student-form profile-card animated fadeInDown'>
            {/* <div className="profile-banner"><div>
        </div><FontAwesomeIcon icon={faUsers} />Profile</div> */}
            <Form>
              <Grid
                style={{
                  height: "fit-content",
                  margin: 0,
                  background: "white",
                }}
                verticalAlign='middle'
              >
                <Grid.Row style={{}}>
                  <Grid.Column width='6'>
                    <div className='form-label'>
                      College Name
                      <span className='ast'>*</span>
                    </div>
                  </Grid.Column>
                  <Grid.Column width='10'>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <Search
                        className='form-font'
                        placeholder='E.g. IIT Delhi'
                        loading={isLoading}
                        onResultSelect={handleResultSelect}
                        onSearchChange={(e, data) => {
                          setSubValues({
                            ...subValues,
                            school: data.value,
                          });
                          debouncedHandleSearch(e, data);
                        }}
                        results={schools}
                        resultRenderer={resultRenderer}
                        noResultsMessage={"Loading suggestions..."}
                        value={subValues.school}
                      />
                    </div>
                  </Grid.Column>
                  <Grid.Column width='6'>
                    <div className='form-label'>
                      Degree<span className='ast'>*</span>
                    </div>
                  </Grid.Column>
                  {!degreeFlag ? (
                    <Grid.Column width='10'>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Dropdown
                          placeholder='E.g. Bachelor of Technology'
                          fluid
                          search
                          selection
                          value={subValues.degree}
                          onChange={handleSubChange}
                          name='degree'
                          options={degrees}
                          className='form-font'
                        />
                        <span
                          className='not-listed'
                          onClick={() => setDegreeFlag(true)}
                        >
                          Not Listed?
                        </span>
                      </div>
                    </Grid.Column>
                  ) : (
                    <Grid.Column width='10'>
                      <Form.Input
                        placeholder='E.g. Bachelor of Technology'
                        fluid
                        type='text'
                        value={subValues.degree}
                        onChange={handleSubChange}
                        name='degree'
                        options={degrees}
                        className='form-font'
                      />
                    </Grid.Column>
                  )}
                  <Grid.Column width='6'>
                    <div className='form-label'>
                      Field Of Study
                      <span className='ast'>*</span>
                    </div>
                  </Grid.Column>
                  <Grid.Column width='10'>
                    <Form.Input
                      fluid
                      name='fieldOfStudy'
                      type='text'
                      value={subValues.fieldOfStudy}
                      error={errors ? true : false}
                      onChange={handleSubChange}
                      placeholder='E.g. Electronics Engineering'
                      className='form-font'
                    />
                  </Grid.Column>
                  <Grid.Column width='6'>
                    <div className='form-label'>
                      Location
                      <span className='ast'>*</span>
                    </div>
                  </Grid.Column>
                  {!cityFlag ? (
                    <Grid.Column width='10'>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
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
                          onClick={() => setCityFlag(true)}
                        >
                          Not Listed?
                        </span>
                      </div>
                    </Grid.Column>
                  ) : (
                    <Grid.Column width='10'>
                      <Form.Input
                        placeholder='E.g. Mumbai'
                        fluid
                        type='text'
                        name='location'
                        value={subValues.location}
                        onChange={handleSubChange}
                        options={city}
                        className='form-font'
                      />
                    </Grid.Column>
                  )}
                  <Grid.Column width='6'>
                    <div className='form-label'>
                      Grade<span className='ast'>*</span>
                    </div>
                  </Grid.Column>
                  <Grid.Column width='10'>
                    <Form.Input
                      fluid
                      name='cgpa'
                      type='number'
                      value={subValues.cgpa}
                      error={errors ? true : false}
                      onChange={handleSubChange}
                      placeholder='CGPA(on 10)/Percentage '
                      className='form-font'
                    />
                  </Grid.Column>

                  {/* <Grid.Column width="6">
										<div className="form-label">
											Summary
										</div>
									</Grid.Column>
									<Grid.Column width="10">
										<Form.Input
											fluid
											name="description"
											type="text"
											value={subValues.description}
											error={errors ? true : false}
											onChange={handleSubChange}
											placeholder="Profile Headline"
											className="form-font"
										/>
									</Grid.Column> */}

                  <Grid.Column width={8}>
                    <div className='form-label-date'>
                      Starting Year
                      <span className='ast'>*</span>
                    </div>
                    <Dropdown
                      placeholder='E.g 2020'
                      fluid
                      search
                      selection
                      name='startDate'
                      value={subValues.startDate}
                      onChange={handleSubChange}
                      options={startYearOptions}
                      className='form-font'
                    />
                  </Grid.Column>

                  <Grid.Column width={8}>
                    <div className='form-label-date'>
                      Ending Year
                      <span className='ast'>*</span>
                    </div>
                    <Dropdown
                      placeholder='E.g 2020'
                      fluid
                      search
                      selection
                      name='endDate'
                      value={subValues.endDate}
                      onChange={handleSubChange}
                      options={endYearOptions}
                      className='form-font'
                    />
                  </Grid.Column>
                  <div className='project__buttons'>
                    <Button className='btn' type='submit' onClick={save}>
                      <span className='form-font-btn'>Save</span>
                    </Button>
                    <Button
                      size='large'
                      className='btn'
                      onClick={() => {
                        setSubValues({
                          school: "",
                          cgpa: "",
                          degree: "",
                          fieldOfStudy: "",
                          location: "",
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
                </Grid.Row>
              </Grid>
            </Form>
          </div>
          <Image
            src={process.env.PUBLIC_URL + "/student-profile.svg"}
            alt=''
            className='student-form-img girl-img animated fadeIn'
          />
        </Wrapper>
      )}
    </>
  );
}

export default memo(StudentInfo);
