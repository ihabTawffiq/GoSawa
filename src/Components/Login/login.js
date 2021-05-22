import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./login.css";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { SignIn } from "../../server/actions/authActions";
import AOS from 'aos';
import 'aos/dist/aos.css';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function BasicTextFields(props) {

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 2000
    });
  }, []);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <div className="container">
        <form className="login-form" noValidate autoComplete="off" data-aos="fade-left">
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            direction="column"
            spacing="6"
          >
            <Grid item>
              <h1 className="form-header-TM" data-aos="fade-left">Login</h1>
            </Grid>
            <Grid item>
              <TextField
                placeholder="Enter Your Email"
                className={classes.margin}
                name="username"
                id="loginUserName"
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                placeholder="Enter Your Password"
                className={classes.margin}
                name="password"
                id="loginPassword"
                label="Password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <a href="/forget-password">Forget Password?</a>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  props.signiIn({
                    email: email,
                    password: password,
                  });
                }}
                color="primary"
                disableElevation
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Grid>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    signiIn: (cred) => {
      dispatch(SignIn(cred));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    authError: state.auth.loginerror,
    auth: state.firebase.auth,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BasicTextFields);
