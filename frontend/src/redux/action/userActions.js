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
    return async () => {
      let res = await axios.post("http://localhost:4000/api/user/login", {
        ...user,
      });
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
};

export default userActions;
