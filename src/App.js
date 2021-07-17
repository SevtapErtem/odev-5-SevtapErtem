import "bootstrap/dist/css/bootstrap.min.css";
import { TheLayout } from "./container";
import { Login } from "./view";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./app.css";
import { useState } from "react";

const App = () => {
  let isUser = JSON.parse(localStorage.getItem("isLoggedIn")) ?? false;

  const [isLoggedIn, setisLoggedIn] = useState(isUser);
  console.log(isLoggedIn);
  return (
    <Router>
      <Switch>
        <Route exact path="/404">
          <div>404</div>
        </Route>
        <Route exact path="/login">
          {!isLoggedIn ? (
            <Login setisLoggedIn={setisLoggedIn} />
          ) : (
            <Redirect to="/home" />
          )}
        </Route>

        <Route path="/">
          {isLoggedIn ? <TheLayout /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
