import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { signOut } from "../../server/actions/authActions";
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
        <a href="/" className="brand-logo">
          GO SAWA
        </a>
        <ul id="nav-mobile" className="right ">
          {owner ? (
            <li>
              <a href="/add-admin">Add Admin</a>
            </li>
          ) : null}

          {owner || admin ? (
            <li>
              <a href="/add-route">Add Route</a>
            </li>
          ) : null}

          {auth.uid ? (
            <li>
              <a
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                  SignOut();
                }}
              >
                Logout
              </a>
            </li>
          ) : (
            <li>
              <a href="/login">Login</a>
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
