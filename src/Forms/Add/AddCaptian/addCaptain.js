import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { InputLabel, Typography } from "@material-ui/core";

import ImageUploader from "react-images-upload";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import swal from "sweetalert";
import MuiPhoneInput from "material-ui-phone-number";
import ReactLoading from "react-loading";
import Dialog from "@material-ui/core/Dialog";
// import ProgressBar from "@ramonak/react-progress-bar";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DataList from "../../../Components/assits/captainLists";
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import PhoneInput from "react-phone-number-input";
import config from "../../../server/config";

import DateFnsUtils from "@date-io/date-fns";
import { isFuture } from "date-fns/esm";
const firestore = config.firestore();
// const functions = config.functions();
const functions = config.app().functions("europe-west3");
const storage = config.storage();
const addCaptain = functions.httpsCallable("addCaptain");
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Capain Name ", width: 130 },
  { field: "phone", headerName: "Captain Phone", width: 130 },
  { field: "actions", headerName: "Actions", width: 330 },
];
// baottot please read this rows from database as Captains to show it at table
const rows = [
  {
    id: 1,
    name: "Snow",
    phone: "01153354849",
    rides: [
      "giza",
      "haram",
      "faisal",
      "giza",
      "haram",
      "faisal",
      "giza",
      "haram",
      "faisal",
      "giza",
      "haram",
      "faisal",
      "giza",
      "haram",
      "faisal",
      "giza",
      "haram",
      "faisal",
    ],
  },
  {
    id: 2,
    name: "Lannister",
    phone: "01153354849",
    rides: ["giza", "haram", "faisal"],
  },
  {
    id: 3,
    name: "Lannister",
    phone: "01153354849",
    rides: ["giza", "haram", "faisal"],
  },
  {
    id: 4,
    name: "Stark",
    phone: "01153354849",
    rides: ["giza", "haram", "faisal"],
  },
  {
    id: 5,
    name: "Targaryen",
    phone: "01153354849",
    rides: ["giza", "haram", "faisal"],
  },
  {
    id: 6,
    name: "Melisandre",
    phone: null,
    rides: ["giza", "haram", "faisal"],
  },
  {
    id: 7,
    name: "Clifford",
    phone: "01153354849",
    rides: ["giza", "haram", "faisal"],
  },
  {
    id: 8,
    name: "Frances",
    phone: "01153354849",
    rides: ["giza", "haram", "faisal"],
  },
  {
    id: 9,
    name: "Roxie",
    phone: "01153354849",
    rides: ["giza", "haram", "faisal"],
  },
];

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    maxWidth: 420,
    minWidth: 220,
    color: "#fff",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
{
  /* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
            
           
            </Grid>
          </MuiPickersUtilsProvider>   */
}
export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [car, setCar] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [idNumber, setIdNumber] = React.useState("");
  const [licencesfront, setLicencesFront] = React.useState(null);
  const [licencesBack, setLicencesBack] = React.useState(null);
  const [idFront, setIdFront] = React.useState(null);
  const [idBack, setIdBack] = React.useState(null);
  const [fesh, setfesh] = React.useState(null);
  const [captainPic, setCaptainPic] = React.useState(null);
  const [brithDate, setBrithDate] = React.useState(new Date());
  const [newCaptain, setnewCaptain] = React.useState({});
  const [open2, setOpen2] = React.useState(false);
  const [lodingms, setLodingMs] = React.useState("");
  const [openLoading, setOpenLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const useDefaultPhoneInputProps = () => {
    return {
      placeholder: "Enter phone number",
      value: value,
      onChange: setValue,
      // Test with this commented out as well:
      country: "US",
    };
  };
  const handleCloseLoading = () => {
    setOpenLoading(false);
  };
  const handleToggle = () => {
    setOpenLoading(!openLoading);
  };

  const frontIDUploader = (picture) => {
    setIdFront(picture[0]);
  };
  const backIDUploader = (picture) => {
    setIdBack(picture[0]);
  };
  const licencesfrontUploader = (picture) => {
    setLicencesFront(picture[0]);
  };
  const licencesBackUploader = (picture) => {
    setLicencesBack(picture[0]);
  };
  const captainPicUploader = (picture) => {
    setCaptainPic(picture[0]);
  };
  const feshUploader = (picture) => {
    setfesh(picture[0]);
  };

  const handelAddCaptain = (e) => {
    e.preventDefault();

    console.log(
      name,
      phone,
      idNumber,
      email,
      licencesfront,
      licencesBack,
      idFront,
      car,
      idBack,
      fesh,
      captainPic,
      brithDate.toString()
    );
    setLodingMs("Creating captain account...");
    setOpen2(true);
    addCaptain({
      name,
      phone,
      idNumber,
      email,
      car,
      birthDate: brithDate.toString(),
    }).then(async (res) => {
      if (res.data.id) {
        const id = res.data.id;
        var idFrontUrl = "";
        var idBackUrl = "";
        var capPicUrl = "";
        var feshUrl = "";
        var licenceFrontUrl = "";
        var licenceBackUrl = "";
        if (idFront) {
          setLodingMs("Uploading ID image ( Front )...");
          const ex = idFront.type.split("/");
          idFrontUrl = await (
            await storage
              .ref()
              .child(`idsPics/${id}_front.${ex[1]}`)
              .put(idFront)
          ).ref.getDownloadURL();
        }
        if (idBack) {
          const ex = idBack.type.split("/");
          setLodingMs("Uploading ID image ( Back )...");
          idBackUrl = await (
            await storage.ref().child(`idsPics/${id}_back.${ex[1]}`).put(idBack)
          ).ref.getDownloadURL();
        }
        if (captainPic) {
          const ex = captainPic.type.split("/");
          setLodingMs("Uploading Captain's Pictuer ...");
          capPicUrl = await (
            await storage
              .ref()
              .child(`personalPics/${id}.${ex[1]}`)
              .put(captainPic)
          ).ref.getDownloadURL();
        }
        if (fesh) {
          const ex = fesh.type.split("/");
          setLodingMs("Uploading Captain's fesh iamge ...");
          feshUrl = await (
            await storage.ref().child(`feshPics/${id}.${ex[1]}`).put(fesh)
          ).ref.getDownloadURL();
        }
        if (licencesfront) {
          const ex = licencesfront.type.split("/");
          setLodingMs("Uploading  licenes image (Front)...");
          licenceFrontUrl = await (
            await storage
              .ref()
              .child(`licencesPics/${id}_front.${ex[1]}`)
              .put(licencesfront)
          ).ref.getDownloadURL();
        }
        if (licencesBack) {
          const ex = licencesBack.type.split("/");

          setLodingMs("Uploading  licenes image (Back)...");
          licenceBackUrl = await (
            await storage
              .ref()
              .child(`licencesPics/${id}_back.${ex[1]}`)
              .put(licencesBack)
          ).ref.getDownloadURL();
        }
        await firestore.collection("captains").doc(res.data.id).update({
          idFrontUrl,
          idBackUrl,
          capPicUrl,
          feshUrl,
          licenceFrontUrl,
          licenceBackUrl,
        });
        setOpen2(false);
        swal({
          icon: "success",
          title: "Captain Created !",
          text: ` The password is [ ${res.data.password} ] `,
          button: {
            text: "ok!",
            closeModal: false,
          },
          closeOnClickOutside: false,
        }).then(() => {
          window.location.reload();
        });
      } else {
        console.log(res.data);
        swal("error");
      }
    });
    let batotFInish = false;
    if (batotFInish) {
      setOpenLoading(false);
      swal(`Captain Created ${newCaptain.name} `);
    }
  };
  return (
    <div>
      <form
        className={(classes.root, "add-captain-form")}
        noValidate
        autoComplete="off"
        style={{}}
      >
        <h1>Add New Captain</h1>
        <FormControl className={classes.formControl}>
          <TextField
            id="name"
            label="Captain Name"
            variant="outlined"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="email"
            label="Captain Email"
            variant="outlined"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            id="Phone"
            label="Captain Phone"
            variant="outlined"
            onChange={(e) => setPhone(e.target.value)}
            type="number"
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            id="idNumber"
            label="Captain ID number"
            variant="outlined"
            type="number"
            onChange={(e) => {
              setIdNumber(e.target.value);
            }}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Select The Car</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={car}
            onChange={(e) => {
              setCar(e.target.value);
            }}
          >
            <MenuItem value={"بط528"}>كيا سيراتو ب ط 528</MenuItem>
            <MenuItem value={"سض558"}>بي واي دي اف 3 س ض 558</MenuItem>
            <MenuItem value={"صع515"}>شيفيروليه اوبترا ص ع 515</MenuItem>
          </Select>
        </FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="BirthDate"
              value={brithDate}
              onChange={(date) => {
                setBrithDate(date);
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <ImageUploader
          withIcon={true}
          label="Upload Captain Pic"
          buttonText="Captain Pic"
          onChange={captainPicUploader}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
          maxFileSize={5242880}
          fileContainerStyle={{ background: "rgba(255,255,255,0.3)" }}
          withPreview={true}
          singleImage={true}
        />
        <ImageUploader
          withIcon={true}
          buttonText="ID Front Face"
          label="Upload ID Front IMG"
          onChange={frontIDUploader}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
          maxFileSize={5242880}
          fileContainerStyle={{ background: "rgba(255,255,255,0.3)" }}
          withPreview={true}
          singleImage={true}
        />

        <ImageUploader
          withIcon={true}
          label="Upload ID Back IMG"
          buttonText="ID Front Face"
          onChange={backIDUploader}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
          maxFileSize={5242880}
          fileContainerStyle={{ background: "rgba(255,255,255,0.3)" }}
          withPreview={true}
          singleImage={true}
        />

        <ImageUploader
          withIcon={true}
          label="Upload Licences Front IMG"
          buttonText="ID Front Face"
          onChange={licencesfrontUploader}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
          maxFileSize={5242880}
          fileContainerStyle={{ background: "rgba(255,255,255,0.3)" }}
          withPreview={true}
          singleImage={true}
        />

        <ImageUploader
          withIcon={true}
          label="Upload Licences Back IMG"
          buttonText="ID Front Face"
          onChange={feshUploader}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
          maxFileSize={5242880}
          fileContainerStyle={{ background: "rgba(255,255,255,0.3)" }}
          withPreview={true}
        />

        <ImageUploader
          withIcon={true}
          label="Upload Criminal newspaper IMG"
          buttonText="ID Front Face"
          onChange={licencesBackUploader}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
          maxFileSize={5242880}
          fileContainerStyle={{ background: "rgba(255,255,255,0.3)" }}
          withPreview={true}
          singleImage={true}
        />

        <Button
          classname="addAdminBTN"
          variant="contained"
          onClick={handelAddCaptain}
          color="primary"
          disableElevation
        >
          Add New Captain
        </Button>
      </form>
      <div style={{ height: 400, width: "100%" }}>
        <DataList
          datatoshow={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
      <Backdrop
        className={classes.backdrop}
        open={openLoading}
        onClick={handleCloseLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog open={open2} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={{ alignSelf: "center" }}>
          Adding Captain
        </DialogTitle>
        <DialogContent style={{ width: "40vw" }}>
          <div style={{ marginLeft: "45%", alignContent: "center" }}>
            <ReactLoading
              type={"balls"}
              color={"#0088CF"}
              height={"10%"}
              width={"10%"}
            />
          </div>
          <Typography style={{ textAlign: "center" }}>{lodingms}</Typography>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
