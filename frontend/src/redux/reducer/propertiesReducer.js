const propertiesReducer = (state = { properties: [] }, action) => {
  switch (action.type) {
    case "GET_PROPERTIES_FILTERED":
      console.log("reducer");
      return {
        ...state,
        properties: action.payload,
      };
    default:
      return state;
  }
};

export default propertiesReducer;
