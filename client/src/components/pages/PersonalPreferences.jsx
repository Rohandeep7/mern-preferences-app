import React, { useState } from "react";
import { Zoom } from "@mui/material";
import { Fab } from "@mui/material";
import SearchBar from "../layout/SearchBar";
import { getPersonalData } from "../../context/PersonalInfoActions";
import PersonalInfoContext from "../../context/PersonalInfoContext";
import SingleSearchBar from "../layout/SingleSearchBar";
import { useContext } from "react";
import { useEffect } from "react";
function PersonalPreferences() {
  const { personalData, loading, error, dispatch } =
    useContext(PersonalInfoContext);

    

  // console.log(personalData);
  return (
    // <Zoom in={true}>
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
          <SearchBar label="Favourite Foods" ph="food" type="foods" />
          <SearchBar label="Hobbies" ph="hobby" type="hobbies" />

          <SearchBar label="Favourite Places" ph="place" type="places" />
          <SearchBar label="Favourite Movies" ph="movie" type="movies" />

          <SingleSearchBar
            label="T-Shirt Size"
            ph="shirt size"
            type="shirtSize"
          />
          <SingleSearchBar label="Height (cm)" ph="height" type="height" />
        </div>
      </div>
    // </Zoom>
  );
}

export default PersonalPreferences;
