import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import { TableRow, Button } from "@material-ui/core";
import ImageUploader from "react-images-upload";
import "./addCar.css";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { InputLabel, Typography } from "@material-ui/core";
import { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import DeleteIcon from "@material-ui/icons/Delete";
import StreetviewIcon from "@material-ui/icons/Streetview";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import swal from "sweetalert";
import MuiPhoneInput from "material-ui-phone-number";
import ReactLoading from "react-loading";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
// import ProgressBar from "@ramonak/react-progress-bar";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from "@material-ui/pickers";
// import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
// import DatePicker from "@material-ui/lab/DatePicker";
// import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import CarsTable from "./carsTable";
import DateFnsUtils from "@date-io/date-fns";
import config from "../../../server/config";
const functions = config.app().functions("europe-west3");
const storage = config.storage();
const firestore = config.firestore();

const addCar = functions.httpsCallable("addCar");

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(name, code, population, size) {
  return { name, code, population, size };
}

const rows = [
  createData(
    "India",
    "IN",
    1324171354,
    <Button color="primary" variant="out">
      teest
    </Button>
  ),
  createData(
    "China",
    "CN",
    1403500365,
    <Button color="primary" variant="out">
      teest
    </Button>
  ),
  createData(
    "Italy",
    "IT",
    60483973,
    <Button color="primary" variant="out">
      teest
    </Button>
  ),
  createData(
    "United States",
    "US",
    327167434,
    <Button color="primary" variant="out">
      teest
    </Button>
  ),
  createData(
    "Canada",
    "CA",
    <Button color="primary" variant="out">
      teest
    </Button>,
    9984670
  ),
  createData(
    "Australia",
    "AU",
    25475400,
    <Button color="primary" variant="out">
      teest
    </Button>
  ),
  createData(
    "Germany",
    "DE",
    <Button color="primary" variant="out">
      teest
    </Button>,
    357578
  ),
  createData(
    "Ireland",
    "IE",
    <Button color="primary" variant="out">
      teest
    </Button>,
    70273
  ),
  createData(
    "Mexico",
    "MX",
    <Button color="primary" variant="out">
      teest
    </Button>,
    1972550
  ),
  createData(
    "Japan",
    "JP",
    <Button color="primary" variant="out">
      teest
    </Button>,
    377973
  ),
  createData(
    "France",
    "FR",
    <Button color="primary" variant="out">
      teest
    </Button>,
    640679
  ),
  createData(
    "United Kingdom",
    "GB",
    <Button color="primary" variant="out">
      teest
    </Button>,
    242495
  ),
  createData(
    "Russia",
    "RU",
    <Button color="primary" variant="out">
      teest
    </Button>,
    17098246
  ),
  createData(
    "Nigeria",
    "NG",
    <Button color="primary" variant="out">
      teest
    </Button>,
    923768
  ),
  createData(
    "Brazil",
    "BR",
    210147125,
    <Button color="primary" variant="out">
      teest
    </Button>
  ),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const [cars, setCars] = React.useState([]);
  useEffect(() => {
    firestore
      .collection("cars")
      .get()
      .then((docs) => {
        const newCars = docs.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        console.log(newCars);
        setCars(newCars);
      });
  }, []);

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [car, setCar] = React.useState({});
  const [carNumber, setCarNumber] = React.useState("");
  const [carColor, setCarColor] = React.useState("");
  const [carModel, setCarModel] = React.useState("");
  const [carBrand, setCarBrand] = React.useState("");
  const [carYear, setCarYear] = React.useState();
  const [carImg, setCarImg] = React.useState(null);
  const [carLicenceFront, setCarLicenceFront] = React.useState(null);
  const [carLicenceBack, setCarLicenceBack] = React.useState(null);
  const [carCheckImg, setCarCheckImg] = React.useState(null);
  const [lodingms, setLodingMs] = React.useState("");
  const [open2, setOpen2] = React.useState(false);
  const [carLicinsExpireDate, setCarLicinsExpireDate] = React.useState(
    new Date()
  );
  const handleAddCar = async () => {
    if (
      carNumber === "" ||
      carModel === "" ||
      !carImg ||
      !carCheckImg ||
      !carLicenceBack ||
      !carLicenceFront ||
      carYear === "" ||
      carColor === "" ||
      carBrand === ""
    ) {
      swal("empty inputs");
    } else {
      console.log({
        carNumber,
        carModel,
        carColor,
        carYear,
        carLicinsExpireDate: carLicinsExpireDate.toString(),
        carCheckImg,
        carImg,
        carLicenceFront,
        carLicenceBack,
        carCheckImg,
        carBrand,
      });
      setLodingMs("Creating  new car ...");
      setOpen2(true);
      addCar({
        carNumber,
        carModel,
        carColor,
        carYear,
        carLicinsExpireDate: carLicinsExpireDate.toString(),

        carBrand,
      }).then(async (res) => {
        if (res.data.error) {
          swal(res.data.error);
        } else if (res.data.id) {
          const id = res.data.id;
          var carImgURL = "";
          var carLicenceBackURL = "";
          var carLicenceFrontURL = "";
          var carCheckImgURL = "";
          try {
            if (carImg) {
              setLodingMs("Uploading Car's image ...");
              const ex = carImg.type.split("/");
              carImgURL = await (
                await storage
                  .ref()
                  .child(`carsPics/${id}_front.${ex[1]}`)
                  .put(carImg)
              ).ref.getDownloadURL();
            }
            if (carLicenceFront) {
              const ex = carLicenceFront.type.split("/");
              setLodingMs("Uploading Car's licence ( Front )...");
              carLicenceFrontURL = await (
                await storage
                  .ref()
                  .child(`carsLicence/${id}_front.${ex[1]}`)
                  .put(carLicenceFront)
              ).ref.getDownloadURL();
            }
            if (carLicenceBack) {
              const ex = carLicenceBack.type.split("/");
              setLodingMs("Uploading Car's licence   ( Back ) ...");
              carLicenceBackURL = await (
                await storage
                  .ref()
                  .child(`carsLicence/${id}.${ex[1]}`)
                  .put(carLicenceBack)
              ).ref.getDownloadURL();
            }

            if (carCheckImg) {
              const ex = carCheckImg.type.split("/");
              setLodingMs("Uploading cars's Check  ...");
              carCheckImgURL = await (
                await storage
                  .ref()
                  .child(`carsCheckPics/${id}.${ex[1]}`)
                  .put(carLicenceBack)
              ).ref.getDownloadURL();
            }
            await firestore.collection("cars").doc(res.data.id).update({
              carImgURL,
              carLicenceBackURL,
              carLicenceFrontURL,
              carCheckImgURL,
            });
            setOpen2(false);
            swal({
              icon: "success",
              title: "Car Added",
              button: {
                text: "ok!",
                closeModal: false,
              },
              closeOnClickOutside: false,
            }).then(() => {
              window.location.reload();
            });
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log(res.data);
        }
      });
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const carImgUpload = (picture) => {
    setCarImg(picture[0]);
  };

  const licencesfrontUploader = (picture) => {
    setCarLicenceFront(picture[0]);
  };

  const licencesbackUploader = (picture) => {
    setCarLicenceBack(picture[0]);
  };

  const carCgeckUploader = (picture) => {
    setCarCheckImg(picture[0]);
  };

  return (
    <>
      <form
        className={(classes.root, "add-captain-form")}
        noValidate
        autoComplete="off"
        style={{}}
      >
        <div className="add-car-form-header">
          <h1>Add New Car</h1>
          <Grid container justify="space-around">
            <FormControl className={classes.formControl}>
              <TextField
                id="carNumber"
                label="car Number"
                variant="outlined"
                type="text"
                onChange={(e) =>
                  setCarNumber(e.target.value.replace(/\s+/g, " ").trim())
                }
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <TextField
                id="carModel"
                label="Car Model"
                variant="outlined"
                onChange={(e) =>
                  setCarModel(e.target.value.replace(/\s+/g, " ").trim())
                }
                type="text"
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <TextField
                id="carYear"
                label="Car Year"
                variant="outlined"
                onChange={(e) =>
                  setCarYear(e.target.value.replace(/\s+/g, " ").trim())
                }
                type="number"
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <TextField
                id="carColor"
                label="Car Color"
                variant="outlined"
                type="text"
                onChange={(e) =>
                  setCarColor(e.target.value.replace(/\s+/g, " ").trim())
                }
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="carBrand"
                label="Car Brand"
                variant="outlined"
                type="text"
                onChange={(e) =>
                  setCarBrand(e.target.value.replace(/\s+/g, " ").trim())
                }
              />
            </FormControl>
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <DatePicker
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="License Expire Date"
                value={carLicinsExpireDate}
                onChange={(date) => {
                  setCarLicinsExpireDate(date);
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
          label="Upload Car Pic"
          buttonText="Car Pic"
          onChange={carImgUpload}
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
          onChange={licencesbackUploader}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg", ".jfif"]}
          maxFileSize={5242880}
          fileContainerStyle={{ background: "rgba(0,0,0,0.3)" }}
          withPreview={true}
        />

        <ImageUploader
          withIcon={true}
          label="Upload Car Check IMG"
          buttonText="Car Check"
          onChange={carCgeckUploader}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg", ".jfif"]}
          maxFileSize={5242880}
          fileContainerStyle={{ background: "rgba(0,0,0,0.3)" }}
          withPreview={true}
          singleImage={true}
        />

        <Button
          classname="addAdminBTN"
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            handleAddCar();
          }}
          color="primary"
          disableElevation
        >
          Add New Car
        </Button>
      </form>
      <CarsTable></CarsTable>
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
    </>
  );
}
