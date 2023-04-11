const initialState = {
  publications: [],
  users: [],
  countries: [],
};

interface Action {
  type: string;
  payload?: any;
}

const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "GET_PUBLICATIONS":
      return {
        ...state,
        publications: action.payload,
      };
    case "GET_USER":
      return {
        ...state,
        users: action.payload,
      };
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
