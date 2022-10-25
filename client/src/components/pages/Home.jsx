import React, { useContext, useEffect } from "react";
import { useNavigate , NavLink, Outlet} from "react-router-dom";
import {toast} from 'react-toastify'
import AuthContext from "../../context/AuthContext";
import Navbar from "../layout/Navbar";
import PersonalInfoContext from "../../context/PersonalInfoContext";
import {getPersonalData} from '../../context/PersonalInfoActions'
import Spinner from "../shared/Spinner";
import { useState } from "react";
function Home() {
  const { user, loading, dispatch } = useContext(AuthContext);
  const {loading:dataLoader,personalData,dispatch : altDispatch}=useContext(PersonalInfoContext)

  
  const navigate = useNavigate();

  useEffect(()=>{
    if (!user) {
      navigate("/login");
    }
    else if(user){
      getAsyncData();
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


  const handleLogout = () => {
    toast.success("Logout Successful");
    dispatch({ type: "LOGOUT" });
    altDispatch({type:'RESET'})
    navigate("/login");
  };

 
  return (
    dataLoader ? (
      <div className="h-screen my-96 bg-base-100">
        <Spinner />
      </div>
    ) :
    <div className=" bg-base-100">
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
