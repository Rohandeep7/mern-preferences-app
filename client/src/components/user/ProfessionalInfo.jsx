import React, { useState } from "react";

import SearchBar from "../layout/SearchBar";
import { getProfessionalData } from '../../context/professional_user/ProfessionalInfoActions';

import ProfessionalInfoContext from "../../context/professional_user/ProfessionalInfoContext";
import SingleSearchBar from "../layout/SingleSearchBar";
import { useContext } from "react";
import { useEffect } from "react";
function PersonalPreferences() {
  const { professionalData, loading, error, dispatch } =
    useContext(ProfessionalInfoContext);

  return (

      <div className="w-11/12 md:w-10/12 mx-auto  bg-base-200">
        <div className="hero">
          <div className="flex flex-col hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-2xl font-bold">
                Manage your professional data
              </h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <SearchBar tab='professional' label="Skills" ph="skill" type="skills" />
          <SearchBar tab='professional' label="Experience" ph="experience" type="experience" />

          <SearchBar tab='professional' label="Active on" ph="social" type="socials" />

          <SearchBar tab='professional' label="Certifications" ph="certification" type="certifications" />

          <SingleSearchBar
            tab='professional'
            label="Highest Qualification"
            ph="highest qualification"
            type="qualification"
          />
          <SingleSearchBar tab='professional' label="Current Role" ph="current role" type="role" />
        </div>
      </div>

  );
}

export default PersonalPreferences;