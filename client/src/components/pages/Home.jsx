import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import {Slide } from "@mui/material";
import AuthContext from "../../context/AuthContext";
function Home() {
  const { user, loading, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if (!user) {
      navigate("/login");
    }
    // eslint-disable-next-line
  },[user])

  const handleLogout = () => {
    toast.success("Logout Successful");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <>
      {loading ? (
        <div className="h-screen bg-black">Loading...</div>
      ) : (
        <>
            <Slide in={true}>
              <div className="h-screen bg-gray-900 flex flex-col items-center justify-center">
                <h1 className="text-5xl my-8 text-center text-white">
                  Hello {user && user.name}
                </h1>
                <button className="btn btn-primary" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </Slide>
        </>
      )}
    </>
  );
}

export default Home;
