import React, { useContext, useEffect } from "react";
import { useNavigate , NavLink, Outlet} from "react-router-dom";
import {toast} from 'react-toastify'
import AuthContext from "../../context/AuthContext";
import Navbar from "../layout/Navbar";

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
  return loading ? (
    <div className="h-screen bg-black">Loading...</div>
  ) : (
    <div className="h-screen bg-base-100">
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
    </div>
  );
}

export default Home;
