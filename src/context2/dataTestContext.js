import React, { useReducer } from "react";

const initState = {
  tests: [],
  questions: [],
  response: {},
  currentItem: {},
  isCompleted: true,
};

export default (reducer, actions, defaultValues) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValues);

    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
