const initialState = {
    users: []
}

const rootReducer = (state = initialState, action:any) => {
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