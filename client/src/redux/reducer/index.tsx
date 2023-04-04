const initialState = {
    users: []
}

interface Action {
    type: string;
    payload?: any;
}

const rootReducer = (state = initialState, action:Action) => {
    switch(action.type) {
        case "GET_USER":
            return {
                ...state,
                users: action.payload,
            }
        default:
            return { ...state };
    }
}

export default rootReducer;