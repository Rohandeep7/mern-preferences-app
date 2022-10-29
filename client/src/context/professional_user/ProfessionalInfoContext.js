import { createContext,useState ,useEffect, useReducer } from "react";
import ProfessionalInfoReducer from "./ProfessionalInfoReducer";
import { getPersonalData } from "./ProfessionalInfoActions";
const ProfessionalInfoContext = createContext();

export const ProfessionalInfoProvider = ({ children }) => {
  const initialState = {
    professionalData:{},
    loading: false,
    error: null,
  };


  const [state, dispatch] = useReducer(ProfessionalInfoReducer, initialState);


  return (
    <ProfessionalInfoContext.Provider value={{ ...state, dispatch}}>
      {children}
    </ProfessionalInfoContext.Provider>
  );
};

export default ProfessionalInfoContext;
