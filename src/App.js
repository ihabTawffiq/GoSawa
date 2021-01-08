
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ComponentGuard from "./guards/ComponentGuard";
import Home from "./Components/Home/home";
import store from "./server/store";
import Login from "./Components/Login/login";
import AddAdmin from "./Forms/Add/AddAdmin/addAdmin";
import AddCaptain from "./Forms/Add/AddCaptian/addCaptain"
import { connect } from "react-redux";


import AddRoute from "./Forms/Add/AddRoute/addRoute";
import Nav from "./Components/navbar/navbar";
function App(props) {
  const { auth, admin, owner } = props;
  return (
    <BrowserRouter>
      <div className="App">
        <Nav></Nav>
        <Switch>
          <ComponentGuard exact path="/" component={Home} authRules={true} />
          <ComponentGuard
            exact
            path="/login"
            component={Login}
            authRules={!auth.uid}
            redirectPath={"/"}
          />
          <ComponentGuard
            exact
            path="/add-admin"
            component={AddAdmin}
            authRules={owner}
            redirectPath={"/"}
          />
          <ComponentGuard
            exact
            path="/add-route"
            component={AddRoute}
            authRules={owner || admin}
            redirectPath={"/"}
          />


          <ComponentGuard
            exact
            path="/add-captain"
            component={AddCaptain}
            authRules={owner || admin}
            redirectPath={"/"}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
const mapState = (state) => {
  return {
    auth: state.firebase.auth,

    admin: state.auth.admin,
    owner: state.auth.owner,
  };
};
export default connect(mapState)(App);
