import "./styles/App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import PropertiesList from "./pages/PropertiesList";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import UserChat from "./components/UserChat";
import Admin from "./pages/Admin";
import { connect } from "react-redux";
function App (props) {
  const {admin, token} = props
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/lista-de-propiedades" component={PropertiesList} />
        {!token && <Route path="/registrarse" component={SignUp} />}
        {!token && <Route path="/iniciar-sesion" component={SignIn} />}
        {admin && <Route path="/admin" component={Admin}/>}
        <Redirect to="/" />
      </Switch>
      {(!admin) && <UserChat/>}
    </BrowserRouter>
  );
}
const mapStateToProps = (state) =>{
  return {
    admin: state.user.admin,
    token: state.user.token
  } 
}
export default connect(mapStateToProps)(App);
