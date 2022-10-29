import React, { useState } from "react";
import { Zoom } from "@mui/material";
import { Fab } from "@mui/material";
import InputField from "../layout/InputField";

import { useContext } from "react";
import { useEffect } from "react";
import PersonalSearchContext from "../../context/admin/PersonalSearchContext";
import Spinner from "../shared/Spinner";
import axios from "axios";
import PersonalSearchList from "./PersonalSearchList";
function AdminPersonalSearch() {

  const tab='personal'
  const {results,error,loading,dispatch}=useContext(PersonalSearchContext)

  const [formData,setFormData]=useState({
    cuisine:'',
    hobby:'',
    place:'',
    language:'',
    shirtSize:'',
    height:''
  })

  const {cuisine,hobby,place,language,shirtSize,height}=formData

  const setValue=(id,val)=>{
    
    setFormData((prev) => ({
      ...prev,
      [id]: val,
    }));
  }

  let o = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v != ''));
 
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if (
      cuisine === "" &&
      hobby === "" &&
      place === "" &&
      language === "" &&
      shirtSize === "" &&
      height === ""
    ) {
      return;
    }
      Object.keys(o).forEach((k) => (o[k] = o[k].trim()));
    dispatch({type:'SET_LOADING'})
    const response = await axios.post("/admin/search",{tab:'personal',...o})
    dispatch({type:'SET_PERSONAL_RESULTS',payload:{
      data:response.data
    }})
    
    
  }

  return (
    <div className="w-11/12 md:w-10/12 mx-auto  bg-base-200">
      <div className="hero">
        <div className="flex flex-col hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-2xl text-white font-bold">Search For Users</h1>
          </div>
        </div>
      </div>

      <div>
        <div className="">
          <form
            className={`grid grid-cols-1 ${
              true ? "md:grid-cols-3" : "md:grid-cols-2"
            }`}
            onSubmit={handleSubmit}
          >
            <InputField id='cuisine' input={cuisine} setValue={setValue} label="Cuisine"/>
            <InputField id='hobby' input={hobby} setValue={setValue} label="Hobby"/>
            <InputField id='place' input={place} setValue={setValue} label="Place"/>
            <InputField id='language' input={language} setValue={setValue} label="Language"/>
            <InputField id='shirtSize' input={shirtSize} setValue={setValue} label="Shirt Size"/>
            <InputField id='height' input={height} setValue={setValue} label="Height (cm)"/>
            <button type='submit' className="p-4 mt-6 btn md:col-span-3  btn-block btn-primary">
              Submit
            </button>
          </form>
        </div>

      </div>
      {
        loading ?  <Spinner/> : <PersonalSearchList results={results}/>
      }
      
    </div>
  );
}

export default AdminPersonalSearch;
