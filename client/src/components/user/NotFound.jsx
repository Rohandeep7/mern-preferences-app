import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/auth/AuthContext';
function NotFound() {

  const {user,admin}=useContext(AuthContext)
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-white">Oops !</h1>
          <p className="text-white py-6">
            404 Error - Page Not Found
          </p>
          {admin  && <Link to='/admin' className="btn btn-base-200">Back To Home</Link>}
          {user && <Link to='/' className="btn btn-base-200">Back To Home</Link>}
          {!user && !admin && <Link to='/login' className="btn btn-base-200">Back To Login</Link>}
        </div>
      </div>
    </div>
  );
}

export default NotFound