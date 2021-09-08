import "./styles/App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import PropertiesList from "./pages/PropertiesList";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ValidateEmail from "./pages/ValidateEmail";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/lista-de-propiedades" component={PropertiesList} />
        <Route path="/registrarse" component={SignUp} />
        <Route path="/iniciar-sesion" component={SignIn} />
        <Route path="/user/validar-email/:id" component={ValidateEmail} />
        {/* <Redirect to="/" /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
