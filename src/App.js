import "bootstrap/dist/css/bootstrap.min.css";
import { TheLayout } from "./container";
import { Login } from "./view";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./app.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn"))
  );

  return (
    <Router>
      <Switch>
        <Route exact path="/404">
          <div>404</div>
        </Route>
        <Route exact path="/login">
          <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        </Route>

        <Route path="/">
          {isLoggedIn === null ? (
            <Redirect to="/login" />
          ) : (
            <Redirect to="/home" />
          )}
          <TheLayout />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
