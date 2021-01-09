import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert";
import { connect } from "react-redux";

import config from "../server/config";
import Backdrop from "@material-ui/core/Backdrop";
import { Redirect } from "react-router-dom";

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
const VerificationPage = (props) => {
  const classes = useStyles();

  const [openLoading, setOpenLoading] = React.useState(false);

  const handleCloseLoading = () => {
    setOpenLoading(false);
  };
  const auth = props.auth;
  if (auth.emailVerified) {
    return <Redirect to="/"></Redirect>;
  }
  return (
    <Fragment>
      <br />
      <br />
      <br />
      <br />
      <h3 className="center">Your Email not verified</h3>
      <br />
      <div className="center">
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={(e) => {
            e.preventDefault();
            setOpenLoading(true);

            var user = auth.currentUser;
            user
              .sendEmailVerification()
              .then(function () {
                setOpenLoading(false);

                swal("Email sent");
              })
              .catch(function (error) {
                console.log(error);
                swal("error happend");
              });
          }}
        >
          Send verification link
        </Button>
      </div>
      <Backdrop
        className={classes.backdrop}
        open={openLoading}
        onClick={handleCloseLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};
export default connect(mapStateToProps)(VerificationPage);
