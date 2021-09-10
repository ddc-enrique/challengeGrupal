const initState = {
    token: null,
    admin: false,
    likedProperties: []
}
const userReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOG_IN":
            return {
                token: action.payload.token,
                admin: action.payload.admin,
            }
        case "LOG_OUT": 
            return initState
        case "GET_USERS_FAVOURITES":
            return {
                ...state,
                likedProperties: action.payload
            }
        default: 
            return state
    }
}

export default userReducer;