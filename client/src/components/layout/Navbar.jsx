import React from 'react'
import {Link} from 'react-router-dom'
import { Slide } from "@mui/material";
function Navbar({user,handleLogout}) {
  return (
    <>
      {/* <Slide in={true}> */}
        <div className="navbar bg-neutral text-neutral-content">
          <div className="navbar-start">
            <Link to="/" className="btn btn-ghost normal-case text-xl">
              Preferences
            </Link>
          </div>
          <div className="navbar-end">
            <h2 className="mx-4 sm:mx-2 text-sm">
              Hello, {user ? user.name : 'Admin'}
            </h2>
            <btn
              className="btn mx-2 btn-xs md:mx-4 btn-error"
              onClick={handleLogout}
            >
              Logout
            </btn>
          </div>
        </div>
      {/* </Slide> */}
    </>
  );
}

export default Navbar