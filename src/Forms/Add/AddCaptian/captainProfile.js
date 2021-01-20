import React, { useState, useEffect } from "react";
import "./addCaptain.css";
import ReactStars from "react-rating-stars-component";
import ReactImageMagnify from 'react-image-magnify';


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
  const [personalIMGURL, setPersonalIMGURL] = React.useState("")
  const [name, setName] = React.useState("")
  const [phoneNumber, setPhoneNumber] = React.useState("")
  const [personalID, setPersonalID] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [rank, setRank] = React.useState(0)
  const [birthdate, setBirthdate] = React.useState(new Date())
  const [feshIMGURL, setFeshIMGURL] = React.useState("")
  const [lincenceFrontIMGURL, setLincenceFrontIMGURL] = React.useState("")
  const [lincenceBackIMGURL, setLincenceBackIMGURL] = React.useState("")
  const [IDFrontIMGURL, setIDFrontIMGURL] = React.useState("")
  const [IDBackIMGURL, setIDBackIMGURL] = React.useState("")

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
        setPersonalIMGURL(data.data().capPicUrl)
        setName(data.data().name)
        setPhoneNumber(data.data().phoneNumber)
        setPersonalID(data.data().capratinID)
        setEmail(data.data().email)
        setRank(data.data().rank)
        setBirthdate(data.data().birthDate)
        setFeshIMGURL(data.data().feshUrl)
        setLincenceFrontIMGURL(data.data().licenceFrontUrl)
        setLincenceBackIMGURL(data.data().licenceBackUrl)
        setIDFrontIMGURL(data.data().idFrontUrl)
        setIDBackIMGURL(data.data().idBackUrl)

      });

  }, [id]);
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <div>
      {captainProfile ? (
        <>
          <div className="captain-profile-container add-captain-form">
            <h2>{`${captainProfile.name}'s Profile Data`}</h2>


            <Grid container direction="column"
              justify="center"
              alignItems="center" spacing={3}>

              <Grid item xs={12} sm={6} className="captain-profile-imgs">
                <p> {`${captainProfile.name}'s Profile `} IMG (الصورة الشخصية)
                <ReactImageMagnify {...{
                    alt: 'Wristwatch by Ted Baker London',
                    smallImage: {
                      isFluidWidth: true,
                      src: captainProfile.capPicUrl,
                      isActivatedOnTouch: true
                    },
                    largeImage: {
                      src: captainProfile.capPicUrl,
                      width: 1200,
                      height: 800
                    }
                  }}

                  />
                </p>
              </Grid>
            </Grid>
            <Grid container direction="row"
              justify="center"
              alignItems="center" spacing={3}>
              <Grid item xs={12} sm={6}>
                <p>
                  Captain's Name : {captainProfile.name}
                </p>

              </Grid>
              <Grid item xs={12} sm={6}>
                <p>

                  Captain's Phone Number : {captainProfile.phoneNumber}
                </p>

              </Grid>
              <Grid item xs={12} sm={6}>
                <p>

                  Captain's Personal ID Number :  {captainProfile.capratinID}
                </p>

              </Grid>
              <Grid item xs={12} sm={6}>
                <p>

                  Captain's Email : {captainProfile.email}
                </p>

              </Grid>
              <Grid item xs={12} sm={6}  >
                <p>
                  <span>

                    Captain's Rank :  {captainProfile.rank}/5
                </span>
                  <span>


                    <ReactStars
                      count={5}
                      value={captainProfile.rank}
                      size={45}
                      activeColor="#ffd700"
                      edit={false}
                      classNames="captain-rank"
                    />
                  </span>

                </p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <p>

                  Captain's Birthdate :  {captainProfile.birthDate.toDate}
                </p>


              </Grid>





              <Grid container direction="column"
                justify="flex-start"
                alignItems="flex-start"
                spacing={3}>

                <Grid item xs={12} sm={6} className="captain-profile-imgs">
                  <p> Criminal newspaper IMG (الفيش الجنائي)
                <ReactImageMagnify {...{
                      alt: 'Wristwatch by Ted Baker London',
                      smallImage: {
                        isFluidWidth: true,
                        src: captainProfile.feshUrl,
                        isActivatedOnTouch: true
                      },
                      largeImage: {
                        src: captainProfile.feshUrl,
                        width: 1200,
                        height: 800
                      }
                    }}

                    />
                  </p>
                </Grid>
                <Grid item xs={12} sm={6} className="captain-profile-imgs">
                  <p> Lincence Front IMG (الرخصة امام)
                <ReactImageMagnify {...{
                      alt: 'Wristwatch by Ted Baker London',
                      smallImage: {
                        isFluidWidth: true,
                        src: captainProfile.licenceFrontUrl,
                        isActivatedOnTouch: true
                      },
                      largeImage: {
                        src: captainProfile.licenceFrontUrl,
                        width: 1200,
                        height: 1800
                      }
                    }}

                    />
                  </p>


                </Grid>


                <Grid item xs={12} sm={6} className="captain-profile-imgs">
                  <p> Lincence Back IMG (الرخصة خلف)
                <ReactImageMagnify {...{
                      alt: 'Wristwatch by Ted Baker London',
                      smallImage: {
                        isFluidWidth: true,
                        src: captainProfile.licenceBackUrl,
                        isActivatedOnTouch: true
                      },
                      largeImage: {
                        src: captainProfile.licenceBackUrl,
                        width: 1200,
                        height: 1800
                      }
                    }}

                    />
                  </p>


                </Grid>

                <Grid item xs={12} sm={6} className="captain-profile-imgs">
                  <p> Personal ID IMG Front Face (اثبات الشخصية امام)
                <ReactImageMagnify {...{
                      alt: 'Wristwatch by Ted Baker London',
                      smallImage: {
                        isFluidWidth: true,
                        src: captainProfile.idFrontUrl,
                        isActivatedOnTouch: true
                      },
                      largeImage: {
                        src: captainProfile.idFrontUrl,
                        width: 1200,
                        height: 1800
                      }
                    }}

                    />
                  </p>


                </Grid>



                <Grid item xs={12} sm={6} className="captain-profile-imgs">
                  <p> Personal ID IMG Back Face(اثبات الشخصية خلف)
                <ReactImageMagnify {...{
                      alt: 'Wristwatch by Ted Baker London',
                      smallImage: {
                        isFluidWidth: true,
                        src: captainProfile.idBackUrl,
                        isActivatedOnTouch: true
                      },
                      largeImage: {
                        src: captainProfile.idBackUrl,
                        width: 1200,
                        height: 1800
                      }
                    }}

                    />
                  </p>


                </Grid>



              </Grid>

            </Grid>


          </div>







        </>) : null
      }
      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div >
  );

};

export default CaptainProfile;
