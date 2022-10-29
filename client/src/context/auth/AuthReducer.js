function AuthReducer(state,action){
    switch (action.type) {
      case "REGISTER_USER":

        return {
          ...state,
          user: action.payload.data,
          loading: false,
          error: null,
        };
      case "REGISTER_FAILURE":
        return {
          ...state,
          loading: false,
          error: action.payload.data,
        };
      case "LOGIN_USER":
        return {
          ...state,
          user: action.payload.data,
          loading: false,
          error: null,
        };
      case "LOGIN_ADMIN":
        return {
          ...state,
          admin: action.payload.data,
          loading: false,
          error: null,
        };
      case "SET_LOADING":
        return {
          ...state,
          loading: true,
        };
      case "LOGIN_FAILURE":
        return {
          ...state,
          loading: false,
          error: action.payload.data,
        };
      case "LOGOUT":
        return {
          ...state,
          user: null,
          loading: false,
          error: null,
          admin:null
        };
      case "CLEAR_ERROR":
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
}

export default AuthReducer