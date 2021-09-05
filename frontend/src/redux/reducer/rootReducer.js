import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";

const rootReducer = combineReducers({
  allCities: citiesReducer,
});

export default rootReducer;
