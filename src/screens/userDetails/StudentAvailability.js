import React, { useState, useEffect } from "react";
import { DatesRangeInput } from "semantic-ui-calendar-react";
import { Dropdown, Button, Form, Image } from "semantic-ui-react";
import { city } from "../../globalvariables/citites";
import swal from "sweetalert";
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

const StudentAvailability = ({ nextStep, prevStep, formData, setFormData }) => {
  const calculateCurrentRange = () => {
    if (formData.availability) {
      const { startDate, endDate } = formData.availability;
      if (startDate && endDate) {
        return `${startDate} - ${endDate}`;
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  const [currentRange, setCurrentRange] = useState(calculateCurrentRange());
  const [location, setLocation] = useState(formData.location || "");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (
      currentRange === "" ||
      !currentRange.split(" - ")[1] ||
      currentRange.split(" - ")[1].length === 0
    ) {
      setFormError("Please select start and end dates.");
    } else if (location === "") {
      setFormError("Please choose a location.");
    } else {
      setFormError("");
    }
  }, [currentRange, location]);

  const onDateChange = (event, { name, value }) => {
    setCurrentRange(value);
  };

  const handleLocationChange = (event, result) => {
    const { value } = result || event.target;
    setLocation(value);
  };

  const handleCitySearch = (options, value) => {
    return [
      {
        key: "work-from-home",
        value: "Work from Home",
        text: "Work from Home",
      },
      ...options.filter((option) =>
        option.value.toLowerCase().includes(value.toLowerCase())
      ),
    ];
  };

  const save = (event) => {
    event.preventDefault();

    if (formError) {
      swal({
        title: formError,
        icon: "warning",
      });
    } else {
      let startDate = currentRange.split(" - ")[0],
        endDate = currentRange.split(" - ")[1];

      setFormData({
        ...formData,
        availability: {
          startDate,
          endDate,
        },
        location,
      });

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
              <div className='question' style={{ marginRight: "auto" }}>
                Availability and Location for Internships{" "}
                <span style={{ color: "red" }}>*</span>
              </div>

              <div className='d-flex align-items-center mt-3 ml-1'>
                <DatesRangeInput
                  name='datesRange'
                  placeholder='Internship availability'
                  value={currentRange}
                  iconPosition='left'
                  onChange={onDateChange}
                />
              </div>

              <div className='d-flex align-items-center mt-3 mb-3 ml-1'>
                <Dropdown
                  id='student-location-top-menu'
                  placeholder='Set Work Location'
                  search={handleCitySearch}
                  selection
                  value={location}
                  onChange={handleLocationChange}
                  options={[
                    {
                      key: "work-from-home",
                      value: "Work from Home",
                      text: "Work from Home",
                    },
                    ...city,
                  ]}
                  className='form-font'
                  icon='null'
                />
              </div>

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
            </div>
          </Form>
        </div>

        <div className='profileForm__image animated fadeIn'>
          <Image
            className='image'
            src={process.env.PUBLIC_URL + "/internships.svg"}
            alt='Availability & Location for Internships'
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default StudentAvailability;
