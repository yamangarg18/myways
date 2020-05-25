import React, { useState, memo, useCallback, useEffect } from "react";
import { city } from "../../globalvariables/cities";
import { degrees } from "../../globalvariables/degrees";
import axios from "axios";
import { debounce } from "../../util/helpers";
import { Button } from "react-native";

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

function StudentInfoScreen({
  formData,
  prevStep,
  nextStep,
  setFormData,
  errors,
}) {
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

  const save = () => {
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
          <View></View>
        ) : (
          <View>
            <Text> Add your education</Text>
            <View>
              {education.length === 0 ? (
                <Text>
                  Empty fields don't look good. Consider adding something?
                </Text>
              ) : (
                <View>
                  {education.map((edu, index) => (
                    <View>
                      <Button
                        title='Edit'
                        onPress={() => {
                          setCurrentEdu(edu.id);
                          setSubValues(edu);
                          setIsEditing(true);
                        }}
                      />
                      <Text> {edu.degree}</Text>
                      <Text> {edu.school}</Text>
                      <Text>
                        {edu.startDate} - {edu.endDate}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
            <Button
              title='Add'
              onPress={() => {
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
            />
            <View>
              {education.length !== 0 ? (
                <Button title='Go Back' onPress={prevStep} />
              ) : null}
              <Button
                title={education.length !== 0 ? "Continue" : "Skip"}
                onPress={nextStep}
              />
            </View>
          </View>
        )
      ) : (
        <></>
      )}
    </>
  );
}

export default memo(StudentInfoScreen);
