import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { SignIn } from "../server/actions/authActions";
import config from "../server/config";
import Backdrop from "@material-ui/core/Backdrop";
import swal from "sweetalert";

import CircularProgress from "@material-ui/core/CircularProgress";
const auth = config.auth();
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function ForgetPass(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [openLoading, setOpenLoading] = React.useState(false);

  const handleCloseLoading = () => {
    setOpenLoading(false);
  };

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
              <h1>Enter your eamil to reset your password</h1>
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
              <Button
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenLoading(true);
                  auth
                    .sendPasswordResetEmail(email)
                    .then(() => {
                      setOpenLoading(false);

                      swal("Email sent");
                    })
                    .catch((error) => {
                      setOpenLoading(false);
                      console.log(error);
                      swal("error happend");
                    });
                }}
                color="primary"
                disableElevation
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Backdrop
        className={classes.backdrop}
        open={openLoading}
        onClick={handleCloseLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
export default connect(mapStateToProps, mapDispatchToProps)(ForgetPass);
