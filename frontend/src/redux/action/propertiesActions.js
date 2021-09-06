import axios from "axios"

const propertiesActions = {
    getPropertiesFiltered: (filter) => {
        return async (dispatch) => {
            let res = await axios.put("http://localhost:4000/api/properties", {filter: filter})
            dispatch({ type: "GET_PROPERTIES_FILTERED", payload:{ filterObj: filter, response: res.data.response }})
            return res
        }
    },
}

export default propertiesActions
