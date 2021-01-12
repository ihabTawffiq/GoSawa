import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
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
    <nav>

      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          GO SAWA
        </Link>
        <ul id="nav-mobile" className="right ">
          {owner ? (
            <li>
              <Link to="/add-admin">Add Admin</Link>
            </li>
          ) : null}

          {owner || admin ? (
            <li>
              <Link to="/add-route">Add Route</Link>
            </li>

          ) : null}

          {owner || admin ? (
            <li>
              <Link to="/add-captain">Add Captain</Link>
            </li>

          ) : null}


          {owner || admin ? (
            <li>
              <Link to="/add-car">Add Car</Link>
            </li>

          ) : null}

          {auth.uid ? (
            <li>
              <Link to="/#"
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
                <Link to="/login">Login</Link>
              </li>
            )}
        </ul>
      </div>

    </nav>
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
