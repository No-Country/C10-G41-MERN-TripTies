const initialState = {
  publications: [],
  user: {},
  users: [],
  profile: {},
  countries: [],
  conversations: [],
  tags: [],
  save: [],
  followers: [],
  following: [],
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
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "GET_TAGS":
      return {
        ...state,
        tags: action.payload,
      };
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
      };
    case "GET_CONVERSATIONS":
      return {
        ...state,
        conversations: action.payload,
      };
    case "GET_SAVE":
      return {
        ...state,
        save: action.payload,
      };
    case "GET_FOLLOWING":
      return {
        ...state,
        following: action.payload,
      };
    case "GET_FOLLOWERS":
      return {
        ...state,
        followers: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
