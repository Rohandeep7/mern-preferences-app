import React, { useState } from 'react'
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import {Zoom} from '@mui/material'
function Register() {
  const [registerData,setRegisterData]=useState({})

  const {name,email,password,confirmPassword}=registerData

  const handleChange=(e)=>{
    setRegisterData((prev)=>({
        ...prev,
        [e.target.name]:e.target.value        
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration Form Submitted");
  };

  return (
    <>
      <div className="h-screen rounded-lg ">
        <Zoom in={true}>
          <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <h2 className="header text-white text-6xl text-center">
                  Preferences
                </h2>
                <hr />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                  Create a new account
                </h2>
                <p
                  className="mt-2 text-center text-sm
            font-medium text-white"
                >
                  Welcome !
                </p>
              </div>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" value="true" />
                <div className="-space-y-px space-8 rounded-md shadow-sm">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      value={email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="text" className="sr-only">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={handleChange}
                      required
                      className="relative block w-full appearance-none rounded-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirm-password" className="sr-only">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={handleChange}
                      autoComplete="current-password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>

                <div>
                  <Link
                    to="/login"
                    className="text-gray-50 text-xs hover:text-gray-200"
                  >
                    Already a user ? Login
                  </Link>
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Zoom>
      </div>
    </>
  );
}

export default Register