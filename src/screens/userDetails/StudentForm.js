import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import StudentInfo from "./StudentInfo";
import StudentSkills from "./StudentSkills";
import StudentExperience from "./StudentExperience";
import StudentProject from "./StudentProject";
import StudentProfile from "./StudentProfileLinks";
import Achievement from "./Achievement";
import Courses from "./Courses";
import { sendStudentProfile } from "../../actions/student";
import { history } from "../../routers/AppRouter";
import { Redirect } from "react-router-dom";
import axios from "axios";
import StudentAvailability from "./StudentAvailability";

const StudentForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(null);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const getStudentData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/student/profile`
      );
      let {
        education,
        skills,
        experiences,
        projects,
        courses,
        profileLinks,
        achievement,
        availability,
        location,
      } = data.response;
      profileLinks =
        profileLinks === undefined
          ? {
              github: "",
              linkedin: "",
              portfolio: "",
              other: "",
            }
          : profileLinks;
      setFormData({
        education,
        skills,
        experiences,
        projects,
        courses,
        profileLinks,
        achievement,
        availability,
        location,
      });
    };

    getStudentData();
  }, []);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step - 1 <= 0) history.push("/dashboard");
    else setStep(step - 1);
  };

  const sendDataToMLServer = (values) => {
    let user_id = localStorage.user_id;
    console.log(user_id);
    let college_id = localStorage.college_id.split(",");
    let link = `${process.env.REACT_APP_ML_URL}/save_user`;
    const postData = {
      college_id: college_id,
      intern_id: user_id,
      courses_data: values.courses,
      experience_data: values.experiences,
      education_data: values.education,
      projects_data: values.projects,
      skills: values.skills.present,
      aspirational_skills: values.skills.aspirational_skills,
    };
    axios
      .post(link, { ...postData })
      .then((data) => {
        console.log("save_user ML Server :- ", data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const currentForm = () => {
    switch (step) {
      case 1:
        return (
          <StudentInfo
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
            error={error}
          />
        );
      case 2:
        return (
          <StudentSkills
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
            error={error}
          />
        );
      case 3:
        return (
          <StudentExperience
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
            error={error}
          />
        );
      case 4:
        return (
          <StudentProject
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
            error={error}
          />
        );
      case 5:
        return (
          <Courses
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
            error={error}
          />
        );
      case 6:
        return (
          <Achievement
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
            error={error}
          />
        );
      case 7:
        return (
          <StudentProfile
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
            error={error}
          />
        );
      case 8:
        return (
          <StudentAvailability
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 9:
        dispatch(sendStudentProfile(formData));
        sendDataToMLServer(formData);
        return <Redirect to='/dashboard' />;
      default:
        return null;
    }
  };

  return formData && currentForm();
};

export default StudentForm;
