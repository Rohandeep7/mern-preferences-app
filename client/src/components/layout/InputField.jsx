import React, { useState } from "react";

function InputField({ id, input, setValue, label }) {
  // const [input,setInput]=useState('')
  return (
    <>
      <div className="m-4 p-4 mb-6 ">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>

        {/* <div className="input-group"></div> */}
        <input
          id={id}
          value={input}
          onChange={(e) => setValue(id, e.target.value)}
          type="text"
          placeholder={`Search for...`}
          className="input input-bordered input-primary mb-4 w-full max-w-xl lg:max-w-2xl"
        />
        
      </div>

      
    </>
  );
}

export default InputField;
