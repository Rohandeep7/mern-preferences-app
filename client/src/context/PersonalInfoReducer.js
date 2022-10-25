
function PersonalInfoReducer(state,action){
    switch (action.type) {
      case "GET_PERSONAL_DATA":
        return {
          ...state,
          personalData: action.payload.data,
          loading: false,
          error: null,
        };
      case "SET_PERSONAL_DATA":
        return {
          ...state,
          personalData: action.payload.data,
          loading: false,
          error: null,
        };
      case "SET_LOADING":
        return {
          ...state,
          loading: true,
        };
      case "CLEAR_ERROR":
        return {
          ...state,
          error: null,
        };
      case "RESET":
        return {
          ...state,
          personalData: null,
          loading: false,
          error: null,
        };
      default:
        return state;
    }
}

export default PersonalInfoReducer