import axios from "axios"

const userActions = {
  createUser: (user) => {
    return async () => {
      try {
        let res = await axios.post("http://localhost:4000/api/user/register", {
          ...user,
        })
        if (res.data.success) {
          return {success: true, response: res.data.response}
        } else {
          return {success: false, errors: res.data.errors}
        }
      } catch {
        return {success: false, errors: "Error de conexión. Intente mas tarde"}
      }
    }
  },
  
  logIn: (user) => {
    return async (dispatch) => {
      try {
        let res = await axios.post("http://localhost:4000/api/user/login", {
          ...user,
        })
        if (res.data.success) {
          dispatch({ type: "LOG_IN", payload: res.data.response })
        } else {
          dispatch({ type: "LOG_OUT" })
        }
      } catch {
        return {success: false, error: "Error de conexión. Intente mas tarde"}
      }
    }
  },

  validationUserToken: (token) => {
    return async () => {
      try {
        let res = await axios.get("http://localhost:4000/api/user/validatemail", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        if (res.data.success) {
          return {success: true, response: res.data.response}
        } else {
          throw new Error()
        }
      } catch {
        return {success: false, error: "Error de conexión. Intente mas tarde"}
      }
    }
  },

  validationUserEmail: (eMail) => {
    return async () => {
      try {
        let res = await axios.post(
          "http://localhost:4000/api/user/validatemail",
          { eMail }
        )
        if (res.success) {
          return {success: true, response: res.data.response}
        } else {
          throw new Error()
        }
      } catch {
        return {success: false, error: "Error de conexión. Intente mas tarde"}
      }
    }
  },

  changePassword: (eMail) => {
    return async () => {
      try {
        let res = await axios.post(
          "http://localhost:4000/api/user/resetpassword",
          { eMail }
        )
        if (res.data.success) {
          return {success: true, response: res.data.response}
        } else {
          throw new Error()
        }
      } catch {
        return {success: false, error: "Error de conexión. Intente mas tarde"}
      }
    }
  },

  sendIdValidation: (id) => {
    return async () => {
      try {
        let res = await axios.get(
          `http://localhost:4000/api/user/validatemail/${id}`
        )
        if (res.data.success) {
          return {success: true, response: res.data.response}
        } else {
          throw new Error()
        }
      } catch {
        return {success: false, error: "Error de conexión. Intente mas tarde"}
      }
    }
  },

  sendIdPassword: (id, password) => {
    return async () => {
      try {
        let res = await axios.put(
          `http://localhost:4000/api/user/resetpassword/${id}`,
          password
        )
        if (res.data.success) {
          return {success: true, response: res.data.response}
        } else {
          throw new Error()
        }
      } catch {
        return {success: false, error: "Error de conexión. Intente mas tarde"}
      }
    }
  },

  logOut: () => {
    return (dispatch) => {
      try {
        dispatch({ type:"LOG_OUT" })
        return {success: true}
      } catch {
        return {success: false, error: "Error de conexión. Intente mas tarde"}
      }
    }
  },

  putSubscribeEmail: (token) => {
    return async () => {
      try {
        let response = await axios.put(
          `http://localhost:4000/api/user/managefilter`,
          {actionToDo: "add"},
          {headers: {
            authorization: 'Bearer ' + token
          }}
        )
        if (response.data.success) {
          return {success: true, response: response.data.response}
        } else {
          throw new Error()
        }
      } catch {
        return{success: false, error: "Error de conexión. Intente mas tarde"}
      }
    }
  },

  updateWishList: (token, propertyId) => {
    try {
      console.log("token en updateWishList", token)
      return async (dispatch) => {
        let res = await axios.get(
          `http://localhost:4000/api/user/like/${propertyId}`,
          {headers: {
            authorization: 'Bearer ' + token
          }}
        )
        if(res.data.success) {
          dispatch({ type:"UPDATE_WISHLIST", payload: res.data.response})
          return {success: true, response: res.data.response}
        } else {
          throw new Error()
        }
      }
    } catch {
      return {success: false, error: "Error de conexión. Intente mas tarde"}
    }
  },

  getWishList: (token) => {
    return async (dispatch) => {
      try {
        let res = await axios.get("http://localhost:4000/api/user/favourites", { headers: { authorization: "Bearer " + token }})
        if (res.data.response) {
          dispatch({ type: "GET_USERS_FAVOURITES", payload: res.data.response }) 
          return {success: true, response: res.data.response}
        } else {
          throw new Error()
        }
      } catch {
        return {success: false, error: "Error de conexión. Intente mas tarde"}
      }
    }
  },
}

export default userActions