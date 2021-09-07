import axios from "axios";
const userActions = {
    createUser: (user) => {
    return async () => {
        let res = await axios.post("http://localhost:4000/api/user/register", {...user});
        return res.data
    };
  },
  logIn: (user) => {
    return async (dispatch) => {
        let res = await axios.post("http://localhost:4000/api/user/login", {...user});
        if(res.data.success){
          dispatch({ type: "LOG_IN", payload: res.data.response})
        }else{
          dispatch({ type: "LOG_OUT"})
        }
        return res.data
    };
  }
};

export default userActions;










