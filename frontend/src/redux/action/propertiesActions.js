import axios from "axios";

const propertiesActions = {
  getPropertiesFiltered: (filter) => {
      return async (dispatch) => {
          let res = await axios.put("http://localhost:4000/api/properties", {filter: filter})
          dispatch({ type: "GET_PROPERTIES_FILTERED", payload:{ filterObj: filter, response: res.data.response }})
          return res
      }
  },
  
  getProperty: (id) => {
    return async () => {
      try {
        let response = await axios.get(`http://localhost:4000/api/property/${id}`)
        if (response.data.success) {
          return {success: true, response: response.data.response}
        } else {
          throw new Error
        }
      } catch {
        return{success: false, error: "Error de conexión. Intente mas tarde"}
      }
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

  setFilter: (filter) => {
    return (dispatch) => {
      dispatch({ type: "SET_FILTER", payload: filter})
    }
  }

};

export default propertiesActions;