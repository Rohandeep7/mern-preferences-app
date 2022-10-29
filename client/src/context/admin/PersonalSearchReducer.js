function PersonalSearchReducer(state, action) {
  switch (action.type) {
    case "GET_PERSONAL_RESULTS":
      return {
        ...state,
        results: action.payload.data,
        loading: false,
        error: null,
      };
    case "SET_PERSONAL_RESULTS":
      return {
        ...state,
        results: action.payload.data,
        loading: false,
        error: null,
      };
    case "SET_PROFESSIONAL_RESULTS":
      return {
        ...state,
        profResults: action.payload.data,
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
        results: [],
        profResults:[],
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}

export default PersonalSearchReducer;
