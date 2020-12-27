import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./login.css";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { SignIn } from "../../server/actions/authActions";

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
  return (

    <Grid container direction="column" justify="center" alignItems="center">
      <div className="container">
        <form className="login-form" noValidate autoComplete="off">
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            direction="column"
            spacing="6"
          >
            <Grid item>
              <h1>Login Now</h1>
            </Grid>
            <Grid item>
              <TextField
                name="username"
                id="loginUserName"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                label="Email"
              />
            </Grid>
            <Grid item>
              <TextField
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="loginPassword"
                label="Password"
              />
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
                Login Now
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
