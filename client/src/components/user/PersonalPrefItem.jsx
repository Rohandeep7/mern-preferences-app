import React, { useState } from 'react'
import { useContext } from 'react'
import {MdOutlineEdit,MdOutlineDelete} from 'react-icons/md'
import Spinner from '../shared/Spinner'
import {Zoom,Collapse} from '@mui/material'
import PersonalInfoContext from '../../context/personal_user/PersonalInfoContext'
import ProfessionalInfoContext from "../../context/professional_user/ProfessionalInfoContext";
import {
  deleteProfessionalData,
  updateProfessionalData,
} from "../../context/professional_user/ProfessionalInfoActions";
import {deletePersonalData,updatePersonalData} from '../../context/personal_user/PersonalInfoActions'
import { useEffect } from 'react'
function PersonalPrefItem({tab,type,item}) {

    const { personalData,loading, editPersonalData, handleEditData, dispatch } =
      useContext(PersonalInfoContext);
      const { professionalData, dispatch : altDispatch } = 
      useContext(ProfessionalInfoContext);

    const [input,setInput]=useState(item.text)

    const userData = JSON.parse(localStorage.getItem("user"));

  
  const handleEdit=async ()=>{
    
    if(tab==='personal'){
      dispatch({type:'SET_LOADING'})
      const response=await updatePersonalData(type,input,item._id,userData.token)
      dispatch({type:'SET_PERSONAL_DATA',payload:{
          data:response
      }})
    }
    else if(tab==='professional'){
      altDispatch({type:'SET_LOADING'})
      const response=await updateProfessionalData(type,input,item._id,userData.token)
      altDispatch({type:'SET_PROFESSIONAL_DATA',payload:{
          data:response
      }})
    }
    
  }

  const handleDelete=async ()=>{
    if(tab==='personal'){
      dispatch({type:'SET_LOADING'})
      const response=await deletePersonalData(type,item._id,userData.token)
      dispatch({type:'SET_PERSONAL_DATA',payload:{
          data:response
      }})
    }
    else if(tab==='professional'){
      altDispatch({type:'SET_LOADING'})
      const response=await deleteProfessionalData(type,item._id,userData.token)
      altDispatch({type:'SET_PROFESSIONAL_DATA',payload:{
          data:response
      }})
    }
    
  
  }

  return (

    <Zoom in={true}>
    
      <div className="bg-base-300 flex flex-row m-2 px-4 rounded-lg items-center justify-around w-12/12 text-center">
        <div className="">
  
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            className="input input-ghost w-full max-w-xl"
            value={input}
          />
        </div>
        <div className="ml-auto">
          <button
            onClick={handleEdit}
            className="btn md:mx-2 text-lg btn-ghost"
          >
            <MdOutlineEdit />
          </button>
          <button
            onClick={handleDelete}
            className="btn  md:mx-2 text-lg btn-ghost"
          >
            <MdOutlineDelete />
          </button>
        </div>
      </div>

    </Zoom>
  );
}

export default PersonalPrefItem