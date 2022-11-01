import { createContext, useState, useEffect, useReducer } from "react";
import PersonalSearchReducer from "./PersonalSearchReducer";
const PersonalSearchContext = createContext();

export const PersonalSearchProvider = ({ children }) => {
  const initialState = {
    results: [],
    profResults:[],
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(PersonalSearchReducer, initialState);


  return (
    <PersonalSearchContext.Provider
      value={{ ...state, dispatch }}
    >
      {children}
    </PersonalSearchContext.Provider>
  );
};

export default PersonalSearchContext;
