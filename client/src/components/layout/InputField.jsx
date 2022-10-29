import React, { useState } from 'react'

function InputField({id,input,setValue,label}) {


  return (
    <div className="m-4 p-4 mb-6 ">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>


      <input
        id={id}
        value={input}
        onChange={(e) => setValue(id, e.target.value)}
        type="text"
        placeholder={`Search for...`}
        className="input input-bordered input-primary w-full max-w-xl lg:max-w-2xl"
      />
    </div>
  );
}

export default InputField