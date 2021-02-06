import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { InputLabel, Typography } from "@material-ui/core";
import { Fragment } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import DeleteIcon from "@material-ui/icons/Delete";
import StreetviewIcon from "@material-ui/icons/Streetview";
import "./addCaptain.css";
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
  DatePicker,
} from "@material-ui/pickers";
import PhoneInput from "react-phone-number-input";
import config from "../../../server/config";
import CaptainsTable from "./captainsTable";
import DateFnsUtils from "@date-io/date-fns";
import { isFuture } from "date-fns/esm";
const firestore = config.firestore();
// const functions = config.functions();
const functions = config.app().functions("europe-west3");
const storage = config.storage();
const addCaptain = functions.httpsCallable("addCaptain");

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#2f253b",
    color: theme.palette.common.white,
    fontSize: "17px",
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);
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
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

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
  const [licenceExpireDate, setLicenceExpireDate] = React.useState(new Date());
  const [newCaptain, setnewCaptain] = React.useState({});
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [lodingms, setLodingMs] = React.useState("");
  const [openLoading, setOpenLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [currentRides, setCurrentRides] = React.useState([]);
  const [currentCaptianID, setCurrentCaptianID] = React.useState();
  const [cars, setCars] = React.useState([]);
  React.useEffect(() => {
    firestore
      .collection("cars")
      .get()
      .then((docs) => {
        const newCars = [];
        docs.docs.forEach((doc) => {
          if (doc.data().currentCaptainID === "") {
            newCars.push({ id: doc.id, ...doc.data() });
          }
        });
        setCars(newCars);
      });
  }, []);

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
  const captainPicUploader = async (picture) => {
    setCaptainPic(picture[0]);
    // console.log(await toBase64(picture[0]));
    // var img = await toBase64(picture[0]);
    // await firestore.collection("test").add({
    //   img: img,
    // });
    // var img2 = img.replace(/^data:image\/png;base64,/, "");
    // console.log(img2);
    // var img3 = new Buffer.from(img2, "base64");
    // console.log(img3);
  };
  const feshUploader = (picture) => {
    setfesh(picture[0]);
  };

  const handelAddCaptain = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      phone === "" ||
      idNumber === "" ||
      email === "" ||
      !licencesBack ||
      !licencesfront ||
      car === "" ||
      !idBack ||
      !idFront ||
      !fesh ||
      !captainPic
    ) {
      swal("empty inputs");
    } else {
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
              await storage
                .ref()
                .child(`idsPics/${id}_back.${ex[1]}`)
                .put(idBack)
            ).ref.getDownloadURL();
          }
          if (captainPic) {
            const ex = captainPic.type.split("/");
            setLodingMs("Uploading Captain's  Image ...");
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
    }
  };
  return (
    <div>
      <form
        className={(classes.root, "add-captain-form add-captain-form2")}
        noValidate
        autoComplete="off"
        style={{}}
      >
        <div className="add-captain-form-header">
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
            <InputLabel id="demo-simple-select-label">
              Select The Car
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={car}
              onChange={(e) => {
                setCar(e.target.value);
              }}
            >
              {cars.map((car) => {
                return <MenuItem value={car.id}>{`${car.carNumber}`}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <DatePicker
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
              <DatePicker
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="License Expire Date"
                value={licenceExpireDate}
                onChange={(date) => {
                  setLicenceExpireDate(date);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </div>

        <ImageUploader
          withIcon={true}
          label="Upload Captain Pic"
          buttonText="Captain Pic"
          onChange={captainPicUploader}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg", ".jfif"]}
          maxFileSize={5242880}
          fileContainerStyle={{ background: "rgba(0,0,0,0.3)" }}
          withPreview={true}
          singleImage={true}
        />
        <ImageUploader
          withIcon={true}
          buttonText="ID Front Face"
          label="Upload ID Front IMG"
          onChange={frontIDUploader}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg", ".jfif"]}
          maxFileSize={5242880}
          fileContainerStyle={{ background: "rgba(0,0,0,0.3)" }}
          withPreview={true}
          singleImage={true}
        />

        <ImageUploader
          withIcon={true}
          label="Upload ID Back IMG"
          buttonText="ID Back Face"
          onChange={backIDUploader}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg", ".jfif"]}
          maxFileSize={5242880}
          fileContainerStyle={{ background: "rgba(0,0,0,0.3)" }}
          withPreview={true}
          singleImage={true}
        />

        <ImageUploader
          withIcon={true}
          label="Upload Licences Front IMG"
          buttonText="Licences Front Face"
          onChange={licencesfrontUploader}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg", ".jfif"]}
          maxFileSize={5242880}
          fileContainerStyle={{ background: "rgba(0,0,0,0.3)" }}
          withPreview={true}
          singleImage={true}
        />

        <ImageUploader
          withIcon={true}
          label="Upload Licences Back IMG"
          buttonText="Licences Back Face"
          onChange={feshUploader}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg", ".jfif"]}
          maxFileSize={5242880}
          fileContainerStyle={{ background: "rgba(0,0,0,0.3)" }}
          withPreview={true}
        />

        <ImageUploader
          withIcon={true}
          label="Upload Criminal newspaper IMG"
          buttonText="Criminal newspaper IMG"
          onChange={licencesBackUploader}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg", ".jfif"]}
          maxFileSize={5242880}
          fileContainerStyle={{ background: "rgba(0,0,0,0.3)" }}
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
      <CaptainsTable></CaptainsTable>
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
      <Dialog open={open3} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Stations</DialogTitle>
        <DialogContent>
          <Paper style={{ overflowX: "scroll" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Station Name</StyledTableCell>
                  <StyledTableCell align="center">Remove</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRides.map((record) => {
                  return (
                    <StyledTableRow key={record.stationID}>
                      <StyledTableCell
                        style={{ background: "#fff" }}
                        align="center"
                      >
                        {record}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        <IconButton color="secondary">
                          <DeleteIcon></DeleteIcon>
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setCurrentCaptianID("");
              setCurrentRides([]);
              setOpen3(false);
            }}
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
