import axios from "axios";

const propertiesActions = {
    getPropertiesFiltered: (filter) => {
        return async (dispatch) => {
            let res = await axios.put("http://localhost:4000/api/properties", {filter: filter})
            dispatch({ type: "GET_PROPERTIES_FILTERED", payload:{ filterObj: filter, response: res.data.response }})
            return res
        }
    },

  getNumberOfProperties: (id) => {
    return async () => {
      let res = await axios.get(
        `http://localhost:4000/api/getnumberofprops/${id}`
      );
      return res.data;
    };
  },
};

export default propertiesActions;
