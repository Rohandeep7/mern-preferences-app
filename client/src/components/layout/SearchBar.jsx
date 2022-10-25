import React,{useState} from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import {getPersonalData,setPersonalData} from '../../context/PersonalInfoActions'
import PersonalInfoContext from '../../context/PersonalInfoContext';
import PersonalPrefList from '../PersonalPrefList';
import {FaEdit} from 'react-icons/fa'
function SearchBar({data,label,ph,type}) {
    const {personalData,editPersonalData,loading,dispatch}=useContext(PersonalInfoContext)
    const userData = JSON.parse(localStorage.getItem("user"));
    // console.log(personalData)
    const [input, setInput] = useState("");

    // useEffect(()=>{
    //   if(editPersonalData.edit===true){
    //     setInput(editPersonalData.item.text)
    //   }
    // })

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(input){
          dispatch({ type: "SET_LOADING" });
          const response = await setPersonalData(type, input, userData.token);
          dispatch({
            type: "SET_PERSONAL_DATA",
            payload: {
              data: response,
            },
          });
          setInput("");
      }
      
    };


  return (
    <div className="m-4 p-4 ">
      <form onSubmit={handleSubmit} className="w-full mb-6">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>

        <div className="input-group">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder={`Add your favourite ${ph}...`}
            className="input input-bordered input-primary w-full max-w-xl"
          />
          <button className="btn btn-square px-8">Add</button>
        </div>
      </form>
      <PersonalPrefList type={type} />
      
    </div>
  );
}

export default SearchBar