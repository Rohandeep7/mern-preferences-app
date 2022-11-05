import React, { useState } from "react";
import { Zoom } from "@mui/material";
import { Fab } from "@mui/material";
import SearchBar from "../layout/SearchBar";
import {FaEdit} from 'react-icons/fa'
import { getPersonalData,updatePersonalData} from "../../context/personal_user/PersonalInfoActions";
import PersonalInfoContext from "../../context/personal_user/PersonalInfoContext";
import SingleSearchBar from "../layout/SingleSearchBar";
import { useContext } from "react";
import { useEffect } from "react";
function PersonalPreferences() {
  const { personalData, loading, error, dispatch } =
    useContext(PersonalInfoContext);
    const userData = JSON.parse(localStorage.getItem("user"));
    let inputValue=''
    if(personalData && personalData.shirtSize) inputValue=personalData.shirtSize 
    const [edit,setEdit]=useState(false)
    const [shirtInput,setShirtInput]=useState(inputValue)

    const handleClick=async (e)=>{
      e.preventDefault()
      if(edit){
          const response=await updatePersonalData('shirtSize',shirtInput.trim(),personalData._id,userData.token)
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
    <div className="w-11/12 md:w-10/12 mx-auto  bg-base-200">
      <div className="hero">
        <div className="flex flex-col hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-2xl font-bold">
              Manage your personal preferences
            </h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <SearchBar
          tab="personal"
          label="Favourite Cuisines"
          ph="cuisine"
          type="cuisines"
        />
        <SearchBar tab="personal" label="Hobbies" ph="hobby" type="hobbies" />

        <SearchBar
          tab="personal"
          label="Favourite Places"
          ph="place"
          type="places"
        />
        <SearchBar
          tab="personal"
          label="Languages Known"
          ph="language"
          type="languages"
        />

        <div className="m-4 p-4 mb-6 ">
          <label className="label">
            <span className="label-text">Shirt Size</span>
          </label>
          <div className="input-group">
            <select
              id="shirtSize"
              disabled={!edit && "disabled"}
              value={shirtInput}
              onChange={(e) => setShirtInput(e.target.value)}
              className="select select-primary w-10/12 md:w-11/12"
            >
              <option value="">None</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
            <button onClick={handleClick} className="btn ">
              {edit ? "Save" : <FaEdit />}
            </button>
          </div>
        </div>

        <SingleSearchBar
          tab="personal"
          label="Height (cm)"
          ph="height"
          type="height"
        />
      </div>
    </div>
  );
}

export default PersonalPreferences;
