function ProfessionalInfoReducer(state,action){
  switch (action.type) {
    case "GET_PROFESSIONAL_DATA":
      return {
        ...state,
        professionalData: action.payload.data,
        loading: false,
        error: null,
      };
    case "SET_PROFESSIONAL_DATA":
      return {
        ...state,
        professionalData: action.payload.data,
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
        professionalData: {},
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}

export default ProfessionalInfoReducer