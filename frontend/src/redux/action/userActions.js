import axios from "axios";
const userActions = {
    createUser: (user) => {
    return async () => {
        let res = await axios.post("http://localhost:4000/api/user/register", {...user});
        return res.data
    };
  },
  logIn: (user) => {
    return async () => {
        let res = await axios.post("http://localhost:4000/api/user/login", {...user});
        return res.data
    };
  },
};

export default userActions;










