import React, { useState } from 'react'
import { useContext } from 'react';
import {FaEdit} from 'react-icons/fa'
import PersonalInfoContext from '../../context/PersonalInfoContext';
import {updatePersonalData} from '../../context/PersonalInfoActions'
function SingleSearchBar({label,ph,type}) {
    const {personalData,error,loading,dispatch}=useContext(PersonalInfoContext)

    const userData = JSON.parse(localStorage.getItem("user"));

    console.log(personalData.shirtSize)
    let inputValue
    if(type==='shirtSize' && personalData.shirtSize) inputValue=personalData.shirtSize
    else if(type==='height' && personalData.height)
    inputValue=personalData.height

    const [input,setInput]=useState(inputValue)
    const [edit,setEdit]=useState(false)

    // console.log(personalData)
    const handleClick=async (e)=>{
        e.preventDefault()
        if(edit && input){
            dispatch({type:'SET_LOADING'})
            const response=await updatePersonalData(type,input,personalData._id,userData.token)
            dispatch({type:'SET_PERSONAL_DATA',payload:{
                data:response
            }})
            setEdit(false)
        }
        else{
            setEdit(true)
        }
    }

  return (
    <div className="m-4 p-4 ">
      <form className="form-control w-full h-full max-w-xl">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>

        <div className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Enter your ${ph}...`}
            className="input input-bordered input-primary w-full max-w-xl"
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