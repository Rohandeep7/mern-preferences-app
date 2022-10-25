import React from 'react'
import {Zoom} from '@mui/material'
function ProfessionalInfo() {
  return (
    <Zoom in={true}>
      <div className="hero mx-auto w-11/12 md:w-10/12 max-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-2xl font-bold">Manage your professional data</h1>
          </div>
        </div>
      </div>
    </Zoom>
  );
}

export default ProfessionalInfo