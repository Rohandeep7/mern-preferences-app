import React, { useState } from "react";
import { Zoom } from "@mui/material";
import { Fab } from "@mui/material";
import SearchBar from "../layout/SearchBar";
import { getPersonalData } from "../../context/personal_user/PersonalInfoActions";
import PersonalInfoContext from "../../context/personal_user/PersonalInfoContext";
import SingleSearchBar from "../layout/SingleSearchBar";
import { useContext } from "react";
import { useEffect } from "react";
function PersonalPreferences() {
  const { personalData, loading, error, dispatch } =
    useContext(PersonalInfoContext);

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

        <SingleSearchBar
          tab="personal"
          label="T-Shirt Size"
          ph="shirt size"
          type="shirtSize"
        />
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
