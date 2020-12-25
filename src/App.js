import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ComponentGuard from "./guards/ComponentGuard";
import Home from "./Components/Home/home";
import store from "./server/store";
import Login from "./Components/Login/login";
import AddAdmin from "./Forms/Add/AddAdmin/addAdmin";
import AddRoute from "./Forms/Add/AddRoute/addRoute";
import Nav from "./Components/navbar/navbar";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav></nav>
        <Switch>
          <ComponentGuard exact path="/" component={Home} authRules={true} />
          <ComponentGuard
            exact
            path="/login"
            component={Login}
            authRules={true}
            redirectPath={"/"}
          />
          <ComponentGuard
            exact
            path="/add-admin"
            component={AddAdmin}
            authRules={true}
            redirectPath={"/"}
          />
          <ComponentGuard
            exact
            path="/add-route"
            component={AddRoute}
            authRules={true}
            redirectPath={"/"}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
