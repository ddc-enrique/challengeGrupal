import axios from "axios"

const propertiesActions = {
    getPropertiesFiltered: (filter) => {
        console.log("action")
        return async (dispatch) => {
            let res = await axios.put("http://localhost:4000/api/properties", {filter: filter})
            console.log(res.data.response)
            console.log("vuelta del axios")
            dispatch({ type: "GET_PROPERTIES_FILTERED", payload: res.data.response })
            return res
        }
    },
}

export default propertiesActions
