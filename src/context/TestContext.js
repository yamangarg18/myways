import React, { useReducer } from "react";

const initState = {
  tests: null,
  questions: [],
  response: {},
  currentItem: {},
  isCompleted: true,
};

export default (reducer, actions) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState);

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
