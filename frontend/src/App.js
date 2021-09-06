import "./styles/App.css"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from './routes/Home';
import PropertiesList from "./routes/PropertiesList";
import Form from "./components/Form";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/lista-de-propiedades" component={PropertiesList}/>
        {/* <Redirect to="/" /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
