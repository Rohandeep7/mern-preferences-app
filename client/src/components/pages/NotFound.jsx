import React from 'react'
import {Link} from 'react-router-dom'
function NotFound() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-white">Oops !</h1>
          <p className="text-white py-6">
            404 Error - Page Not Found
          </p>
          <Link to='/' className="btn btn-base-200">Back To Home</Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound