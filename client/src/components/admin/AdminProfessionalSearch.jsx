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
  const tab = "personal";
  const { results, profResults, error, loading, dispatch } = useContext(
    PersonalSearchContext
  );

  const [formData, setFormData] = useState({
    skill: [""],
    experience: [""],
    social: [""],
    certifications: [""],
    role: "",
    qualification: "",
  });

  const { skill, experience, social, certifications, role, qualification } =
    formData;

  const setValue = (id, val) => {
    setFormData((prev) => ({
      ...prev,
      [id]: val,
    }));
  };

  const setMultipleValue = (id, index, val) => {
    const form = { ...formData };
    form[id][index] = val.toLowerCase();
    setFormData(form);
  };

  const removeMultipleValue = (id, index) => {
    const form = { ...formData };
    const newForm = [...form[id]];
    newForm.splice(index, 1);
    setFormData({ ...form, [id]: newForm });
  };

  const addMultipleValue = (id, index, val) => {
    const form = { ...formData };
    const newForm = [...form[id], ""];
    setFormData({ ...form, [id]: newForm });
  };

  const arrayEquals = (a, b) => {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  };

  let o = Object.fromEntries(
    Object.entries(formData).filter(([_, v]) => {
      return Array.isArray(v) ? !arrayEquals(v, [""]) : v !== "";
    })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    Object.keys(o).forEach((k) => {
      Array.isArray(o[k])
        ? (o[k] = o[k].filter((item) => item !== "").map((ans) => ans.trim()))
        : (o[k] = o[k].trim());
    });
  
    if (
      skill.length === 1 &&
      skill[0] === "" &&
      social.length === 1 &&
      social[0] === "" &&
      experience.length === 1 &&
      experience[0] === "" &&
      certifications.length === 1 &&
      certifications[0] === "" &&
      qualification === "" &&
      role === ""
    ) {
      return;
    } else {
      dispatch({ type: "SET_LOADING" });
      const response = await axios.post("/admin/search", {
        tab: "professional",
        ...o,
      });
      dispatch({
        type: "SET_PROFESSIONAL_RESULTS",
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
              id="skill"
              inputList={skill}
              removeMultipleValue={removeMultipleValue}
              addMultipleValue={addMultipleValue}
              setMultipleValue={setMultipleValue}
              label="Skill"
            />
            <InputField
              id="experience"
              inputList={experience}
              removeMultipleValue={removeMultipleValue}
              addMultipleValue={addMultipleValue}
              setMultipleValue={setMultipleValue}
              label="Experience"
            />
            <InputField
              id="social"
              inputList={social}
              removeMultipleValue={removeMultipleValue}
              addMultipleValue={addMultipleValue}
              setMultipleValue={setMultipleValue}
              label="Active on"
            />
            <InputField
              id="certifications"
              inputList={certifications}
              removeMultipleValue={removeMultipleValue}
              addMultipleValue={addMultipleValue}
              setMultipleValue={setMultipleValue}
              label="Certification"
            />

            <div className="m-4 p-4 mb-6 ">
              <label className="label">
                <span className="label-text">Highest Qualifcation</span>
              </label>
              <input
                id='qualification'
                value={qualification}
                onChange={(e) => setValue("qualification", e.target.value)}
                type="text"
                placeholder={`Search for...`}
                className="input input-bordered input-primary mb-4 w-full max-w-xl lg:max-w-2xl"
              />
            </div>

            <div className="m-4 p-4 mb-6 ">
              <label className="label">
                <span className="label-text">Current Role</span>
              </label>
              <input
                id='role'
                value={role}
                onChange={(e) => setValue("role", e.target.value)}
                type="text"
                placeholder={`Search for...`}
                className="input input-bordered input-primary mb-4 w-full max-w-xl lg:max-w-2xl"
              />
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
      {loading ? <Spinner /> : <PersonalSearchList results={profResults} />}
    </div>
  );
}

export default AdminProfessionalSearch;
