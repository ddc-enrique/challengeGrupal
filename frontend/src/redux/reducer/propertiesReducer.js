const initState = {
    properties: [],
    filterObj: {},
}
const propertiesReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_PROPERTIES_FILTERED":
            return {
                ...state,
                properties: action.payload.response,
                filterObj: action.payload.filterObj,
            }
        case "RESET": 
            return initState
        default: 
            return state
    }
}

export default propertiesReducer;
