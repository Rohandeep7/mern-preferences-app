import React, { useContext, useEffect } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../context/auth/AuthContext";
import Navbar from "../layout/Navbar";
import PersonalSearchContext from "../../context/admin/PersonalSearchContext";
import Spinner from "../shared/Spinner";
import { useState } from "react";
function Admin() {
  const { user, admin, loading, dispatch } = useContext(AuthContext);
  const { dispatch: altDispatch } = useContext(PersonalSearchContext);

  const navigate = useNavigate();

  const [tpLoad, setTpLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTpLoad(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    toast.success("Logout Successful");
    dispatch({ type: "LOGOUT" });
    altDispatch({ type: "RESET" });
    navigate("/login");
  };

  return tpLoad ? (
    <div className="h-screen my-96 bg-base-100">
      <Spinner />
    </div>
  ) : (
    <div className="bg-base-100">
      <Navbar user={admin} handleLogout={handleLogout} />
      <div className="my-12 gap-4 md:gap-16 tabs flex justify-center mx-auto">
        <NavLink
          end
          to="/admin/"
          className={({ isActive }) =>
            isActive
              ? "text-2xl tab tab-bordered tab-active"
              : "text-2xl tab tab-bordered"
          }
        >
          Personal Search
        </NavLink>
        <NavLink
          to="/admin/professional-search"
          className={({ isActive }) =>
            isActive
              ? "text-2xl tab tab-bordered tab-active"
              : "text-2xl tab tab-bordered"
          }
        >
          Professional Search
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

export default Admin;
