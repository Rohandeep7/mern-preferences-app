import axios from 'axios'

const API_URL = "http://localhost:5000/api/personal-pref/";


export const getPersonalData=async (token)=>{

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response=await axios.get(API_URL,config)

    return response.data
}

export const updatePersonalData=async (type,text,url,token)=>{
  console.log('hi')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL+url,{type,text}, config);

  return response.data;

}
