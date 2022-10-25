import React,{useContext} from 'react'
import PersonalInfoContext from '../context/PersonalInfoContext';
import PersonalPrefItem from './PersonalPrefItem';
import { TransitionGroup } from "react-transition-group";
function PersonalPrefList({type}) {
    const {personalData,error,loading}=useContext(PersonalInfoContext);
  return (
    <>
      <TransitionGroup>
        {personalData[type] &&
          personalData[type].map((item) => {
            return <PersonalPrefItem key={item._id} type={type} item={item} />;
          })}
      </TransitionGroup>
    </>
  );
}

export default PersonalPrefList