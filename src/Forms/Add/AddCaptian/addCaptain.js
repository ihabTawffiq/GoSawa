import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { InputLabel } from "@material-ui/core";
import ImageUploader from "react-images-upload";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import swal from "sweetalert";
import DataList from "../../../Components/assits/captainLists";
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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
  const [phone, setPhone] = React.useState("");
  const [idNumber, setIdNumber] = React.useState("");
  const [licencesfront, setLicencesFront] = React.useState("");
  const [licencesBack, setLicencesBack] = React.useState("");
  const [idFront, setIdFront] = React.useState("");
  const [idBack, setIdBack] = React.useState("");
  const [fesh, setfesh] = React.useState("");
  const [brithDate, setBrithDate] = React.useState(new Date());
  const [newCaptain, setnewCaptain] = React.useState({});

  const [openLoading, setOpenLoading] = React.useState(false);

  const handleCloseLoading = () => {
    setOpenLoading(false);
  };
  const handleToggle = () => {
    setOpenLoading(!openLoading);
  };

  const handleChangeCar = (event) => {
    setCar(event.target.value);
  };
  const frontIDUploader = (picture) => {
    setIdFront(picture);
    setOpenLoading(!openLoading);
    console.log(picture);

    //lama t5alas el sho8l sha8al el case de
    let WorkDone = false;
    if (WorkDone == true) {
      setOpenLoading(false);
    }
  };
  const backIDUploader = (picture) => {
    setIdBack(picture);
    setOpenLoading(!openLoading);
    console.log(picture);

    //lama t5alas el sho8l sha8al el case de
    let WorkDone = false;
    if (WorkDone == true) {
      setOpenLoading(false);
    }
  };
  const licencesfrontUploader = (picture) => {
    setLicencesFront(picture);
    setOpenLoading(!openLoading);
    console.log(picture);

    //lama t5alas el sho8l sha8al el case de
    let WorkDone = false;
    if (WorkDone == true) {
      setOpenLoading(false);
    }
  };
  const licencesBackUploader = (picture) => {
    setLicencesBack(picture);
    setOpenLoading(!openLoading);
    console.log(picture);

    //lama t5alas el sho8l sha8al el case de
    let WorkDone = false;
    if (WorkDone == true) {
      setOpenLoading(false);
    }
  };
  const feshUploader = (picture) => {
    setfesh(picture);
    setOpenLoading(!openLoading);
    console.log(picture);

    //lama t5alas el sho8l sha8al el case de
    let WorkDone = false;
    if (WorkDone == true) {
      setOpenLoading(false);
    }
  };

  const handelAddCaptain = (e) => {
    e.preventDefault();
    setOpenLoading(!openLoading);
    setnewCaptain({
      ...newCaptain,
      name,
      phone,
      idNumber,
      licencesfront,
      licencesBack,
      idFront,
      idBack,
      fesh,
    });
    console.log(newCaptain);
    //when u finish the request
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
          <TextField id="name" label="Captain Name" variant="outlined" />
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField id="Phone" label="Captain Phone" variant="outlined" />
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            id="idNumber"
            label="Captain ID number"
            variant="outlined"
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Select The Car</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={car}
            onChange={handleChangeCar}
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
          buttonText="ID Front Face"
          label="Upload ID Front IMG"
          onChange={frontIDUploader}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
          maxFileSize={5242880}
          fileContainerStyle={{ background: "rgba(255,255,255,0.3)" }}
        />

        <ImageUploader
          withIcon={true}
          label="Upload ID Back IMG"
          buttonText="ID Front Face"
          onChange={backIDUploader}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
          maxFileSize={5242880}
          fileContainerStyle={{ background: "rgba(255,255,255,0.3)" }}
        />

        <ImageUploader
          withIcon={true}
          label="Upload Licences Front IMG"
          buttonText="ID Front Face"
          onChange={licencesfrontUploader}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
          maxFileSize={5242880}
          fileContainerStyle={{ background: "rgba(255,255,255,0.3)" }}
        />

        <ImageUploader
          withIcon={true}
          label="Upload Licences Back IMG"
          buttonText="ID Front Face"
          onChange={feshUploader}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
          maxFileSize={5242880}
          fileContainerStyle={{ background: "rgba(255,255,255,0.3)" }}
        />

        <ImageUploader
          withIcon={true}
          label="Upload Criminal newspaper IMG"
          buttonText="ID Front Face"
          onChange={licencesBackUploader}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
          maxFileSize={5242880}
          fileContainerStyle={{ background: "rgba(255,255,255,0.3)" }}
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
    </div>
  );
}
