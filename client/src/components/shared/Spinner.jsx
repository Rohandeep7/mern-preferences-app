import React from 'react'
import {CircularProgress} from '@mui/material'
function Spinner() {
  return (
    <div className="w-100 mt-20 text-center mx-auto">
      {/* <img width={180} className="text-center mx-auto" src={spinner} alt="Loading..." /> */}

      <CircularProgress color="success"/>
    </div>
  );
}

export default Spinner