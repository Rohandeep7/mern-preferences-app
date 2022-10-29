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
function AdminProfessionalSearch() {
  const tab='professional'
  const { results, profResults,error, loading, dispatch } = useContext(
    PersonalSearchContext
  );

  const [formData, setFormData] = useState({
    skill: "",
    experience: "",
    social: "",
    qualification: "",
    certifications: "",
    role: "",
  });

  const { skill, experience, social, qualification, certifications, role } = formData;

  const setValue = (id, val) => {
    setFormData((prev) => ({
      ...prev,
      [id]: val,
    }));
  };

  let o = Object.fromEntries(
    Object.entries(formData).filter(([_, v]) => v != "")
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING" });
    const response = await axios.post("http://localhost:5000/admin/search", {
      tab: "professional",
      ...o,
    });
    dispatch({
      type: "SET_PROFESSIONAL_RESULTS",
      payload: {
        data: response.data,
      },
    });
    console.log(response.data);
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
              id="skill"
              input={skill}
              setValue={setValue}
              label="Skill"
            />
            <InputField
              id="experience"
              input={experience}
              setValue={setValue}
              label="Experience"
            />
            <InputField
              id="social"
              input={social}
              setValue={setValue}
              label="Active On"
            />
            <InputField
              id="certifications"
              input={certifications}
              setValue={setValue}
              label="Certification"
            />
            <InputField
              id="qualification"
              input={qualification}
              setValue={setValue}
              label="Highest Qualifcation"
            />
            <InputField
              id="role"
              input={role}
              setValue={setValue}
              label="Current Role"
            />
            <button
              type="submit"
              className="p-4 mt-6 btn md:col-span-3  btn-block btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      {loading ? <Spinner /> : <PersonalSearchList results={tab==='personal' ? results : profResults} />}
    </div>
  );
}

export default AdminProfessionalSearch;
