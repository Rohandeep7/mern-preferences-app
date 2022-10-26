import React,{useContext} from 'react'
import PersonalInfoContext from '../context/PersonalInfoContext';
import ProfessionalInfoContext from '../context/ProfessionalInfoContext';
import PersonalPrefItem from './PersonalPrefItem';
import { Collapse } from '@mui/material';
import { TransitionGroup } from "react-transition-group";
function PersonalPrefList({tab,type}) {
    const {personalData,error,loading}=useContext(PersonalInfoContext);
    const {professionalData}=useContext(ProfessionalInfoContext);

    console.log(tab);
  return tab==='personal' ? (

    <>  

        {personalData && personalData[type] &&
          personalData[type].map((item) => {
            return <PersonalPrefItem tab={tab} key={item._id} type={type} item={item} />;
          })}

    </>
  ) : (
    <>

        {professionalData && professionalData[type] &&
          professionalData[type].map((item) => {
            return <PersonalPrefItem tab={tab} key={item._id} type={type} item={item} />;
          })}

    </>
  );
}

export default PersonalPrefList