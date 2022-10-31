import React,{useContext} from 'react'
import PersonalInfoContext from '../../context/personal_user/PersonalInfoContext';
import ProfessionalInfoContext from "../../context/professional_user/ProfessionalInfoContext";
import PersonalPrefItem from './PersonalPrefItem';
import { Collapse } from '@mui/material';
import { TransitionGroup } from "react-transition-group";
function PersonalPrefList({tab,type}) {
    const {personalData,error,loading}=useContext(PersonalInfoContext);
    const {professionalData}=useContext(ProfessionalInfoContext);


  return tab === "personal" ? (
    <>
      <TransitionGroup>
        {personalData &&
          personalData[type] &&
          personalData[type].map((item) => {
            return (
              <Collapse key={item._id}>
                <PersonalPrefItem
                  tab={tab}
                  key={item._id}
                  type={type}
                  item={item}
                />
              </Collapse>
            );
          })}
      </TransitionGroup>
    </>
  ) : (
    <>
      <TransitionGroup>
        {professionalData &&
          professionalData[type] &&
          professionalData[type].map((item) => {
            return (
              <Collapse key={item._id}>
                <PersonalPrefItem
                  tab={tab}
                  key={item._id}
                  type={type}
                  item={item}
                />
              </Collapse>
            );
          })}
      </TransitionGroup>
    </>
  );
}

export default PersonalPrefList