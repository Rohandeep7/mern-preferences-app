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
  const tab = "personal";
  const { results, error, loading, dispatch } = useContext(
    PersonalSearchContext
  );

  const [formData, setFormData] = useState({
    cuisine: [''],
    hobby: [''],
    place: [''],
    language: [''],
    shirtSize: '',
    height: '',
  });

  const { cuisine, hobby, place, language, shirtSize, height } = formData;

  const setValue = (id, val) => {
        setFormData((prev) => ({
      ...prev,
      [id]: val,
    }));
  };

  const setMultipleValue=(id,index,val)=>{
    const form={...formData}
    form[id][index]=val
    setFormData(form)
  }

  const removeMultipleValue=(id,index)=>{
    const form={...formData}
    const newForm=[...form[id]]
    newForm.splice(index,1)
    setFormData({...form,[id]:newForm})
  }

  const addMultipleValue=(id,index,val)=>{
    const form={...formData}
    const newForm=[...form[id],'']
    setFormData({...form,[id]:newForm})
  }

  const arrayEquals=(a, b)=> {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }

  let o = Object.fromEntries(
    Object.entries(formData).filter(([_, v]) => {
      return Array.isArray(v) ? !arrayEquals(v,['']) : v!==''
    } )
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    Object.keys(o).forEach((k) => {
      Array.isArray(o[k]) ? o[k]=o[k].filter((item) => item !== "").map(ans=>ans.trim()) : o[k]=o[k].trim() 
    });
  
    if (
      (cuisine.length===1 && cuisine[0]==='') &&
      (hobby.length===1 && hobby[0]==='') &&
      (place.length===1 && place[0]==='') &&
      (language.length===1 && language[0]==='') &&
      shirtSize === "" &&
      height === ""
    ) {
      return;
    } else {
      dispatch({ type: "SET_LOADING" });
      const response = await axios.post("http://localhost:5000/admin/search", {
        tab: "personal",
        ...o,
      });
      dispatch({
        type: "SET_PERSONAL_RESULTS",
        payload: {
          data: response.data,
        },
      });
    }
  };


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
            
            <InputField
              id="cuisine"
              inputList={cuisine}
              removeMultipleValue={removeMultipleValue}
              addMultipleValue={addMultipleValue}
              setMultipleValue={setMultipleValue}
              label="Cuisine"
            />
            <InputField
              id="hobby"
              inputList={hobby}
              removeMultipleValue={removeMultipleValue}
              addMultipleValue={addMultipleValue}
              setMultipleValue={setMultipleValue}
              label="Hobby"
            />
            <InputField
              id="place"
              inputList={place}
              removeMultipleValue={removeMultipleValue}
              addMultipleValue={addMultipleValue}
              setMultipleValue={setMultipleValue}
              label="Place"
            />
            <InputField
              id="language"
              inputList={language}
              removeMultipleValue={removeMultipleValue}
              addMultipleValue={addMultipleValue}
              setMultipleValue={setMultipleValue}
              label="Language"
            />

            <div className="m-4 p-4 mb-6 ">
              <label className="label">
                <span className="label-text">Shirt Size</span>
              </label>
              <select
                id="shirtSize"
                onChange={(e) => setValue("shirtSize", e.target.value)}
                className="select select-primary w-full max-w-xl"
              >
                <option value="" selected>
                  None
                </option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>

            <div className="m-4 p-4 mb-6 ">
              <label className="label">
                <span className="label-text">Height (cm)</span>
              </label>
              <input
                type="range"
                min="150"
                max="200"
                value={height}
                className="range range-primary"
                step="10"
              />
              <div className="w-full flex justify-between text-xs px-2">
                <span
                  className="cursor-pointer"
                  value="150"
                  onClick={() => setValue("height", "150")}
                >
                  150
                </span>
                <span
                  className="cursor-pointer"
                  value="160"
                  onClick={() => setValue("height", "160")}
                >
                  160
                </span>
                <span
                  className="cursor-pointer"
                  value="170"
                  onClick={() => setValue("height", "170")}
                >
                  170
                </span>
                <span
                  className="cursor-pointer"
                  value="180"
                  onClick={() => setValue("height", "180")}
                >
                  180
                </span>
                <span
                  className="cursor-pointer"
                  value="190"
                  onClick={() => setValue("height", "190")}
                >
                  190
                </span>
                <span
                  className="cursor-pointer"
                  value="200"
                  onClick={() => setValue("height", "200")}
                >
                  200
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="p-4 mt-6 btn md:col-span-3  btn-block btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      {loading ? <Spinner /> : <PersonalSearchList results={results} />}
    </div>
  );
}

export default AdminPersonalSearch;
