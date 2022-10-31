import { createContext, useEffect, useReducer } from "react"
import AuthReducer from './AuthReducer'
const AuthContext=createContext()

export const AuthProvider=({children})=>{

    const initialState = {
      user: JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem('user')) : null,
      admin:JSON.parse(localStorage.getItem("admin")) ? JSON.parse(localStorage.getItem('admin')) : null,
      loading: false,
      error: null,
    };

    const [state,dispatch]=useReducer(AuthReducer,initialState)

     useEffect(() => {
       localStorage.setItem("user", JSON.stringify(state.user));
       localStorage.setItem('admin',JSON.stringify(state.admin))
     }, [state.user,state.admin]);

    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext