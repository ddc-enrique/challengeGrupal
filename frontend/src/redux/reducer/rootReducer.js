import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import propertiesReducer from "./propertiesReducer";

const rootReducer = combineReducers({
  allCities: citiesReducer,
  properties: propertiesReducer,

});

export default rootReducer;
