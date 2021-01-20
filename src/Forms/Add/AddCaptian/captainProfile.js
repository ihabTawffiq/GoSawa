import React, { useState, useEffect } from "react";


import {
  Button,
  Grid,
  CircularProgress,
  Backdrop,
  makeStyles,
  Avatar,
  Paper,
} from '@material-ui/core';


import config from "../../../server/config";

const firestore = config.firestore();
// const functions = config.functions();
const functions = config.app().functions("europe-west3");
const storage = config.storage();



const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
}));

const CaptainProfile = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);


  const id = props.match.params.id;
  const [captainProfile, setCaptainProfile] = useState(null);
  useEffect(async () => {
    firestore
      .collection("captains")
      .doc(id)
      .get()
      .then((data) => {
        console.log({ ...data.data() });
        setCaptainProfile({ ...data.data() });
        setOpen(false);
      });

  }, [id]);
  return (
    <div>
      {captainProfile ? (<>
        <Grid container direction="column"
          justify="center"
          alignItems="center" spacing={3}>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.paper}>
              {captainProfile.name}
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.paper}>
              {captainProfile.phoneNumber}
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.paper}>
              {captainProfile.capratinID}
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.paper}>
              {captainProfile.email}
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.paper}>
              {captainProfile.rank}
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.paper}>
              {captainProfile.birthDate.toDate}

            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.paper}>
              <Avatar alt={"Fesh"} src={captainProfile.feshUrl} className={classes.large} />
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.paper}>
              <Avatar alt={"ID Front IMG"} src={captainProfile.idFrontUrl} className={classes.large} />
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.paper}>
              <Avatar alt={"ID Back IMG"} src={captainProfile.idBackUrl} className={classes.large} />
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.paper}>
              <Avatar alt={"Licence Front IMG"} src={captainProfile.licenceFrontUrl} className={classes.large} />
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.paper}>
              <Avatar alt={"Lincence Back IMG"} src={captainProfile.licenceBackUrl} className={classes.large} />
            </Paper>
          </Grid>
        </Grid>









      </>) : null
      }
      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div >
  );

};

export default CaptainProfile;
