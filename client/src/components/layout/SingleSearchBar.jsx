import React, { useState } from 'react'
import { useContext } from 'react';
import {FaEdit} from 'react-icons/fa'
import PersonalInfoContext from '../../context/personal_user/PersonalInfoContext';
import {updatePersonalData} from '../../context/personal_user/PersonalInfoActions'
import ProfessionalInfoContext from '../../context/professional_user/ProfessionalInfoContext';
import {updateProfessionalData} from '../../context/professional_user/ProfessionalInfoActions'
function SingleSearchBar({tab,label,ph,type}) {
    const {personalData,error,loading,dispatch}=useContext(PersonalInfoContext)
    const {professionalData,loading:loading2,dispatch:altDispatch}=useContext(ProfessionalInfoContext)
    const userData = JSON.parse(localStorage.getItem("user"));

   
    let inputValue
    if(tab==='personal'){
      if(type==='shirtSize' && personalData && personalData.shirtSize) inputValue=personalData.shirtSize
      else if(type==='height' && personalData && personalData.height)
      inputValue=personalData.height
    }
    else if(tab==='professional'){
      if(type==='qualification' && professionalData && professionalData.qualification) 
        inputValue=professionalData.qualification
      else if(type==='role' && professionalData && professionalData.role)
        inputValue=professionalData.role
    }
    

    const [input,setInput]=useState(inputValue)
    const [edit,setEdit]=useState(false)

    const handleClick=async (e)=>{
        e.preventDefault()
        if(edit && input){
          if(tab==='personal'){
            dispatch({type:'SET_LOADING'})
            const response=await updatePersonalData(type,input.trim(),personalData._id,userData.token)
            dispatch({type:'SET_PERSONAL_DATA',payload:{
                data:response
            }})
          }
          else if(tab==='professional'){
            altDispatch({type:'SET_LOADING'})
            const response=await updateProfessionalData(type,input.trim(),professionalData._id,userData.token)
            altDispatch({type:'SET_PROFESSIONAL_DATA',payload:{
                data:response
            }})
          } 
            setEdit(false)
        }
        else{
            setEdit(true)
        }
    }

  return (  
 
    <div className="m-4 p-4 ">
      <form className="w-full h-full max-w-xl lg:max-w-3xl">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>

        <div className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Enter your ${ph}...`}
            className="input input-bordered input-primary w-full input-w-xl max-w-2xl"
            disabled={!edit}
          />
          <button onClick={handleClick} className="btn ">
            {edit ? "Submit" : <FaEdit />}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SingleSearchBar