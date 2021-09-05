import "./styles/App.css"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from './routes/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        {/* <Redirect to="/" /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
