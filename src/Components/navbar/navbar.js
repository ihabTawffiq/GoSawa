import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
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
  const [navbarState, setNavbarState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setNavbarState(open);
  };

  return (
      <div className="navBar-container">
        <Link to="/" className="brand-logo">
          <img className = "logo-image-TM" src = {Logo}/>
          GOSAWA
        </Link>
        {
          auth.uid ? (
            <div>
              <div className = "openDrawer-button-TM" onClick={toggleDrawer(true)}>
              <MenuIcon />
              </div>
              <Drawer anchor={'right'} open={navbarState} onClose={toggleDrawer(false)}>
                <div className = "sideBar-container" onClick={toggleDrawer(false)}>
                  <div  className = "brandLogo-sidebar-TM">
                      <img src = {Logo}/>
                      GOSAWA
                  </div>
                  <ul id="nav-mobile">
                    {owner ? (
                      <div>
                        <li className="navBar-links-TM">
                          <Link to="/add-admin"  style = {{color: "white"}}>Add Admin</Link>
                        </li>
                        <Divider />
                      </div>
                    ) : null}

                    {owner || admin ? (
                      <div className = "navBar-links-TM">
                        <li>
                          <Link to="/add-route" style = {{color: "white"}}>Add Route</Link>
                        </li>
                        <Divider />
                      </div>
                    ) : null}

                    {owner || admin ? (
                      <div className="navBar-links-TM">
                        <li>
                          <Link to="/add-captain" style = {{color: "white"}}>Add Captain</Link>
                        </li>
                        <Divider />
                      </div>
                    ) : null}


                    {owner || admin ? (
                      <div className="navBar-links-TM">
                        <li>
                          <Link to="/add-car" style = {{color: "white"}}>Add Car</Link>
                        </li>
                        <Divider />
                      </div>
                    ) : null}

                    {auth.uid ? (
                      <div className="navBar-links-TM">
                        <li>
                          <Link 
                            style = {{color: "white"}}
                            to="/#"
                            onClick={(e) => {
                              e.preventDefault();
                              SignOut();
                            }}
                          >
                            Logout
                          </Link>
                        </li>
                        <Divider />
                      </div>
                    ) : null}
                  </ul>
                </div>
              </Drawer>
            </div>
          ) : (
              <Link to="/login" style = {{color: "white", marginTop: 20}}>Login</Link>
          )
        }
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
