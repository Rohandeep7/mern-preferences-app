import { createContext, useEffect, useReducer } from "react";
import PersonalInfoReducer from "./PersonalInfoReducer";
import { getPersonalData } from "./PersonalInfoActions";
const PersonalInfoContext = createContext();

export const PersonalInfoProvider = ({ children }) => {
  const initialState = {
    personalData:{},
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(PersonalInfoReducer, initialState);

  


  return (
    <PersonalInfoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PersonalInfoContext.Provider>
  );
};

export default PersonalInfoContext;
