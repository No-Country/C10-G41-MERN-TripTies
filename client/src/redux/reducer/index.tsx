const initialState = {
  users: [],
  countries: [],
};

interface Action {
  type: string;
  payload?: any;
}

const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        users: action.payload,
      };
    case "GET_COUNTRIES":
      console.log(action.payload);
      return {
        ...state,
        countries: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
