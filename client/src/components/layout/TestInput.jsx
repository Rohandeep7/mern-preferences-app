import React, { useState } from "react";
import {TransitionGroup} from 'react-transition-group'
import {Collapse} from '@mui/material'
import {MdOutlineAdd,MdOutlineRemove} from 'react-icons/md'
function TestInput({ id,inputList,addMultipleValue,removeMultipleValue,setMultipleValue,label }) {
  // const [input,setInput]=useState('')

  // const [inputList, setInputList] = useState(['']);

  const handleInputChange=(e, index)=>{
    const {value}= e.target;
    // const list= [...inputList];
    // list[index]= value;
    // setInputList(list);
    setMultipleValue(id,index,value)
    // setValue(id,inputList)
  }
 

  const handleRemove=(e,index)=>{
    e.preventDefault()
    console.log(index)
    // const list=[...inputList];
    // list.splice(index,1);
    // setInputList(list);
    removeMultipleValue(id,index)
  }

  const handleNew=(e,index)=>{
    e.preventDefault()
    
    // setInputList([...inputList, '']);
    if(inputList.length!==0 && inputList[index]!=='')
      addMultipleValue(id,index)
  }
  return (
    <>
      <div className="m-4 p-4 mb-6 ">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>

        {/* <div className="input-group"></div> */}
        <TransitionGroup>
        {inputList && inputList.map((x, i) => {
          return (
            <Collapse key={i}>
            <div className="flex flex-row space-x-2">
              <input
                id={id}
                value={x}
                // onChange={(e) => setValue(id, e.target.value)}
                onChange={(e)=>handleInputChange(e,i)}
                type="text"
                placeholder={`Search for...`}
                className="input input-bordered input-primary mb-4 w-full max-w-xl lg:max-w-2xl"
              />
              {inputList.length !== 1 && (
                <button className="btn btn-ghost text-xl" onClick={(e)=>handleRemove(e,i)}><MdOutlineRemove/></button>
              )}
              {inputList.length - 1 == i && (
                <button className="btn btn-ghost text-xl" onClick={(e)=>handleNew(e,i)}><MdOutlineAdd/></button>
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

export default TestInput;
