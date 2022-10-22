import { createContext, useEffect, useReducer } from "react"
import AuthReducer from "./AuthReducer"
const AuthContext=createContext()

export const AuthProvider=({children})=>{

    const initialState = {
      user: JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem('user')) : null,
      loading: false,
      error: null,
    };

    const [state,dispatch]=useReducer(AuthReducer,initialState)

     useEffect(() => {
       localStorage.setItem("user", JSON.stringify(state.user));
     }, [state.user]);

    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext