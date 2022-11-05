import React, { useRef, useState } from 'react'
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

    const ref=useRef(null)
    
    const { personalData,loading, editPersonalData, handleEditData, dispatch } =
      useContext(PersonalInfoContext);
      const { professionalData, dispatch : altDispatch } = 
      useContext(ProfessionalInfoContext);

    const [input,setInput]=useState(item.text)
    const [edit,setEdit]=useState(false)


    const userData = JSON.parse(localStorage.getItem("user"));

  
  const handleEdit=async ()=>{
    
    if(edit){
      if(tab==='personal'){
        dispatch({type:'SET_LOADING'})
        const response=await updatePersonalData(type,input.trim().toLowerCase(),item._id,userData.token)
        dispatch({type:'SET_PERSONAL_DATA',payload:{
            data:response
        }})
      }
      else if(tab==='professional'){
        altDispatch({type:'SET_LOADING'})
        const response = await updateProfessionalData(
          type,
          input.trim().toLowerCase(),
          item._id,
          userData.token
        );
        altDispatch({type:'SET_PROFESSIONAL_DATA',payload:{
            data:response
        }})
      }
      setEdit(false);
    }
    else{
      ref.current.focus()
      setEdit(true)
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
    
      <div className="bg-base-200 shadow-lg flex flex-row m-2 px-4 rounded-lg items-center justify-around w-12/12 text-center">
        <div className="">
  
          <input
            type="text"
            ref={ref}
            onChange={(e) => setInput(e.target.value)}
            className="input input-primary w-full max-w-xl capitalize"
            value={input}
            disabled={!edit && 'disabled'}
          />
        </div>
        <div className="ml-auto flex flex-row">
          <button
            onClick={handleEdit}
            className={`btn md:mx-2 ${edit? 'text-md' : 'text-lg'}  btn-ghost`}
          >
            {edit ? 'Save' : <MdOutlineEdit />}
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