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

  // const [formData,setFormData]=useState({
  //   cuisine: [''],
  //   hobby: [''],
  //   place: [''],
  //   language: [''],
  //   shirtSize: [''],
  //   height: [''],
  // })

  // const handleFormData=(id,val)=>{
  //   setFormData((prev) => ({
  //     ...prev,
  //     [id]: val,
  //   }));
  // }

  return (
    <PersonalSearchContext.Provider
      value={{ ...state, dispatch }}
    >
      {children}
    </PersonalSearchContext.Provider>
  );
};

export default PersonalSearchContext;
