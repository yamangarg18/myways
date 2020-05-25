import createDataContext from "./createDataContext";

const educationReducer = (state, action) => {
  switch (action.type) {
    case "add_education":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          college: action.payload.college,
          degree: action.payload.degree,
          field: action.payload.field,
          location: action.payload.location,
          grade: action.payload.grade,
          summary: action.payload.summary,
          starting: action.payload.starting,
          ending: action.payload.ending,
        },
      ];
    case "edit_education":
      return state.map((education) => {
        return education.id === action.payload.id ? action.payload : education;
        // if (education.id === action.payload.id) {
        //   return action.payload;
        // } else {
        //   return education;
        // }
      });
  }
};

const addEducation = (dispatch) => {
  return (
    college,
    degree,
    field,
    location,
    grade,
    summary,
    starting,
    ending,
    callback
  ) => {
    dispatch({
      type: "add_education",
      payload: {
        college,
        degree,
        field,
        location,
        grade,
        summary,
        starting,
        ending,
      },
    });
    if (callback) {
      callback();
    }
  };
};

const editEducation = (dispatch) => {
  return (
    id,
    college,
    degree,
    field,
    location,
    grade,
    summary,
    starting,
    ending,
    callback
  ) => {
    dispatch({
      type: "edit_education",
      payload: {
        id,
        college,
        degree,
        field,
        location,
        grade,
        summary,
        starting,
        ending,
      },
    });
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  educationReducer,
  { addEducation, editEducation },
  [{ college: "ABC" }]
);
