const initState = {
    token: null,
    admin: false,
    wishList: [],
    userId: null
}
const userReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOG_IN":
            return {
                token: action.payload.token,
                admin: action.payload.admin,
                userId: action.payload.userId
            }
        case "UPDATE_WISHLIST":
            return {
                ...state,
                wishList: action.payload,
            }
        case "LOG_OUT": 
            return initState
        default: 
            return state
    }
}

export default userReducer;