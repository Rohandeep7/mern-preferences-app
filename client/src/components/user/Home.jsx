import React, { useContext, useEffect } from "react";
import { useNavigate , NavLink, Outlet} from "react-router-dom";
import {toast} from 'react-toastify'
import AuthContext from "../../context/auth/AuthContext";
import Navbar from "../layout/Navbar";
import PersonalInfoContext from "../../context/personal_user/PersonalInfoContext";
import {getPersonalData} from '../../context/personal_user/PersonalInfoActions'
import Spinner from "../shared/Spinner";
import ProfessionalInfoContext from "../../context/professional_user/ProfessionalInfoContext";
import { getProfessionalData } from "../../context/professional_user/ProfessionalInfoActions";
import { useState } from "react";
function Home() {
  const { user, loading, dispatch } = useContext(AuthContext);
  const {loading:dataLoader,personalData,dispatch : altDispatch}=useContext(PersonalInfoContext)

  const {loading:dataLoader2,professionalData,dispatch : altDispatch2}=useContext(ProfessionalInfoContext)
  
  const navigate = useNavigate();
  

  useEffect(()=>{
    
    if(user){
      getAsyncData();
      getAsyncProfData()
    }
    else if(user===null){
      
      navigate("/login");
    }

    
    // eslint-disable-next-line
  },[user])

  const userData = JSON.parse(localStorage.getItem("user"));

  const getAsyncData = async () => {
    altDispatch({ type: "SET_LOADING" });
    const response = await getPersonalData(userData.token);
    setTimeout(()=>{
      altDispatch({
        type: "GET_PERSONAL_DATA",
        payload: {
          data: response[0],
        },
      });
    },1000)
    
  };

  const getAsyncProfData = async () => {
    altDispatch2({ type: "SET_LOADING" });
    const response = await getProfessionalData(userData.token);
    setTimeout(()=>{
      altDispatch2({
        type: "GET_PROFESSIONAL_DATA",
        payload: {
          data: response[0],
        },
      });
    },1000)
    
  };


  const handleLogout = () => {
    toast.success("Logout Successful");
    dispatch({ type: "LOGOUT" });
    altDispatch({type:'RESET'})
    altDispatch2({type:'RESET'})
    navigate("/login");
  };

 
  return (
    (dataLoader && dataLoader2)? (
      <div className="h-screen my-96 bg-base-100">
        <Spinner />
      </div>
    ) :
    <div className="bg-base-100">
      <Navbar user={user} handleLogout={handleLogout} />
      <div className="my-12 gap-4 md:gap-16 tabs flex justify-center mx-auto">
        <NavLink
          end
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-2xl tab tab-bordered tab-active"
              : "text-2xl tab tab-bordered"
          }
        >
          Personal Preferences
        </NavLink>
        <NavLink
          to="/professional-info"
          className={({ isActive }) =>
            isActive
              ? "text-2xl tab tab-bordered tab-active"
              : "text-2xl tab tab-bordered"
          }
        >
          Professional Info
        </NavLink>
      </div>

      <Outlet />
      <footer className="mt-24 mb-8 text-center">
        <p className="text-lg">
          Copyright © 2022 - All right reserved | Preferences-App{" "}
        </p>
      </footer>
    </div>
  );
}

export default Home;
