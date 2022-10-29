import axios from 'axios'
const API_URL = "/api/personal-pref/";


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
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL+url,{type,text}, config);

  return response.data;

}

export const setPersonalData = async (type, text, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, { type, text }, config);

  return response.data;
};

export const deletePersonalData = async (type,id,token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  const response = await axios.delete(API_URL+id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      type: type,
    },
  });

  console.log(response.data)
  return response.data;
};
