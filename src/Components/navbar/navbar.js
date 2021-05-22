import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import "./navbar.css";
import Logo from '../../goSawa.jpg'
import { signOut } from "../../server/actions/authActions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Nav(props) {
  const { auth, admin, owner, SignOut } = props;
  return (
      <div className="navBar-container">
        <Link to="/" className="brand-logo">
          <img className = "logo-image-TM" src = {Logo}/>
          GOSAWA
        </Link>
        <ul id="nav-mobile">
          {owner ? (
            <li>
              <Link to="/add-admin" className="navBar-links-TM">Add Admin</Link>
            </li>
          ) : null}

          {owner || admin ? (
            <li>
              <Link to="/add-route" className="navBar-links-TM">Add Route</Link>
            </li>

          ) : null}

          {owner || admin ? (
            <li>
              <Link to="/add-captain" className="navBar-links-TM">Add Captain</Link>
            </li>

          ) : null}


          {owner || admin ? (
            <li>
              <Link to="/add-car" className="navBar-links-TM">Add Car</Link>
            </li>

          ) : null}

          {auth.uid ? (
            <li>
              <Link 
                className="navBar-links"
                to="/#"
                onClick={(e) => {
                  e.preventDefault();
                  SignOut();
                }}
              >
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" className="navBar-links-TM">Login</Link>
            </li>
          )}
        </ul>
      </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    SignOut: (id) => dispatch(signOut(id)),
    // search: data => {
    //   dispatch(saveSearchStudents(data));
    // },
  };
};
const mapState = (state) => {
  return {
    auth: state.firebase.auth,

    owner: state.auth.owner,
    admin: state.auth.admin,
  };
};
export default connect(mapState, mapDispatchToProps)(Nav);
