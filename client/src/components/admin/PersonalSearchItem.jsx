import React from 'react'
import {Zoom} from '@mui/material'
function PersonalSearchItem({item}) {
  return (
    <Zoom in={true}>
      <div className="card shadow-md compact side bg-base-100 m-4 ">
        <div className="flex-row items-center space-x-4 card-body">
          <div>
            <div className="avatar">
              <div className="rounded-full shadow w-14 h-14">
                <img
                  src="https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256__340.png"
                  alt="Profile"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="card-title">{item.user.name}</h2>
            <h3 className="text-base-content text-opacity-40">
              {item.user.email}
            </h3>
          </div>
        </div>
      </div>
    </Zoom>
  );
}

export default PersonalSearchItem