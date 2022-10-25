import React,{useState} from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import {getPersonalData} from '../../context/PersonalInfoActions'
import PersonalInfoContext from '../../context/PersonalInfoContext';
import {FaEdit} from 'react-icons/fa'
function SearchBar({data,label,ph,type}) {
    const {personalData,loading}=useContext(PersonalInfoContext)

    // console.log(personalData)
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      
    };

    if (loading) return <h1>Loading...</h1>;

  return (
    <div className="m-4 p-4 ">
      <form
        onSubmit={handleSubmit}
        className="form-control w-full h-full max-w-xl"
      >
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
      {/* {type === "foods" &&
        personalData.foods.map((item) => {
          return <h1>{item.text}</h1>;
        })}
      {type === "hobbies" &&
        personalData.hobbies.map((item) => {
          return <h1>{item.text}</h1>;
        })} */}
    </div>
  );
}

export default SearchBar