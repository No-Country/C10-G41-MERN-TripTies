const initialState = {
  publications: [],
  user: {},
  profile: {},
  countries: [],
  conversations: []
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
    case "GET_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };
    case "CLEAN_PROFILE":
      return {
        ...state,
        profile: {},
      };
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
      };
      case "GET_COUNTRIES":
          return {
          ...state,
          countries: action.payload,
        };
        case "GET_CONVERSATIONS":
          return {
            ...state,
            conversations: action.payload
          };
    default:
      return { ...state };
  }
};

export default rootReducer;
