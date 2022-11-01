import React, { useState } from "react";
import { TransitionGroup } from "react-transition-group";
import { Collapse } from "@mui/material";
import { MdOutlineAdd, MdOutlineRemove } from "react-icons/md";
function InputField({
  id,
  inputList,
  addMultipleValue,
  removeMultipleValue,
  setMultipleValue,
  label,
}) {


  const handleInputChange = (e, index) => {
    const { value } = e.target;
    setMultipleValue(id, index, value);
  };

  const handleRemove = (e, index) => {
    e.preventDefault();
    removeMultipleValue(id, index);
  };

  const handleNew = (e, index) => {
    e.preventDefault();

    if (inputList.length !== 0 && inputList[index] !== "")
      addMultipleValue(id, index);
  };
  return (
    <>
      <div className="m-4 p-4 mb-6 ">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>

        <TransitionGroup>
          {inputList &&
            inputList.map((x, i) => {
              return (
                <Collapse key={i}>
                  <div className="flex flex-row space-x-2">
                    <input
                      id={id}
                      value={x}
                      onChange={(e) => handleInputChange(e, i)}
                      type="text"
                      placeholder={`Search for...`}
                      className="input input-bordered input-primary mb-4 w-full max-w-xl lg:max-w-2xl"
                    />
                    {inputList.length !== 1 && (
                      <button
                        className="btn btn-ghost text-xl"
                        onClick={(e) => handleRemove(e, i)}
                      >
                        <MdOutlineRemove />
                      </button>
                    )}
                    {inputList.length - 1 === i && (
                      <button
                        className="btn btn-ghost text-xl"
                        onClick={(e) => handleNew(e, i)}
                      >
                        <MdOutlineAdd />
                      </button>
                    )}
                  </div>
                </Collapse>
              );
            })}
        </TransitionGroup>
      </div>
    </>
  );
}

export default InputField;
