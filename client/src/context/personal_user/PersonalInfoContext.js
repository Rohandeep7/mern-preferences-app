import { createContext,useState ,useEffect, useReducer } from "react";
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

  const [editPersonalData,setEditPersonalData]=useState({
    item:{},
    edit:false
  })

  const handleEditData=(item)=>{
    setEditPersonalData({
      item,
      edit:true
    })
  }

  return (
    <PersonalInfoContext.Provider value={{ ...state, dispatch ,editPersonalData,handleEditData}}>
      {children}
    </PersonalInfoContext.Provider>
  );
};

export default PersonalInfoContext;
