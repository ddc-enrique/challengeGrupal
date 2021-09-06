import "./styles/App.css"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './routes/Home';
import PropertiesList from "./routes/PropertiesList";

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
