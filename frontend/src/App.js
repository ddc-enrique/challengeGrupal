import "./styles/App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import PropertiesList from "./pages/PropertiesList";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Property from "./pages/Property"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/lista-de-propiedades" component={PropertiesList} />
        <Route path="/registrarse" component={SignUp} />
        <Route path="/iniciar-sesion" component={SignIn} />
        <Route path="/propiedad/:id" component={Property}/>
        {/* <Redirect to="/" /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
