import axios from "axios";
const userActions = {
  createUser: (user) => {
    return async () => {
      let res = await axios.post("http://localhost:4000/api/user/register", {
        ...user,
      });
      return res.data;
    };
  },
  logIn: (user) => {
    return async (dispatch) => {
      let res = await axios.post("http://localhost:4000/api/user/login", {
        ...user,
      });
      if (res.data.success) {
        dispatch({ type: "LOG_IN", payload: res.data.response });
      } else {
        dispatch({ type: "LOG_OUT" });
      }
      return res.data;
    };
  },
  validationUserToken: (token) => {
    return async () => {
      let res = await axios.get("http://localhost:4000/api/user/validatemail", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return res.data;
    };
  },
  validationUserEmail: (eMail) => {
    return async () => {
      let res = await axios.post(
        "http://localhost:4000/api/user/validatemail",
        { eMail }
      );
      return res.data;
    };
  },
  changePassword: (eMail) => {
    return async () => {
      let res = await axios.post(
        "http://localhost:4000/api/user/resetpassword",
        { eMail }
      );
      return res.data;
    };
  },
  sendIdValidation: (id) => {
    return async () => {
      let res = await axios.get(
        `http://localhost:4000/api/user/validatemail/${id}`
      );
      return res.data;
    };
  },
  sendIdPassword: (id, password) => {
    return async () => {
      let res = await axios.put(
        `http://localhost:4000/api/user/resetpassword/${id}`,
        password
      );
      return res.data;
    };
  },
  logOut: () => {
    return (dispatch) => {
      dispatch({ type:"LOG_OUT" })
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
  getWishList: (token) => {
    return async (dispatch) => {
        let response = await axios.get("http://localhost:4000/api/user/favourites", { headers: { authorization: "Bearer " + token }})
        console.log(response.data.response) 
        dispatch({ type: "GET_USERS_FAVOURITES", payload: response.data.response }) 
        return response
    }
  },
};

export default userActions;
