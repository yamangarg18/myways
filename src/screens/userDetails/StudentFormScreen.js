import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import StudentInfoScreen from "./StudentInfoScreen";
import axios from "axios";

const StudentFormScreen = () => {
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
    if (step - 1 <= 0) navigation.navigate("dashboard");
    else setStep(step - 1);
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
      default:
        return null;
    }
  };

  return formData && currentForm();
};

export default StudentFormScreen;
