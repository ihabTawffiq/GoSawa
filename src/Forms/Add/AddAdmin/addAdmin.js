import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import "./addAdmin.css";
import swal from "sweetalert";
import config from "../../../server/config";
const firestore = config.firestore();

const functions = config.app().functions("europe-west3");
const addAdmin = functions.httpsCallable("addAdmin");
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },

  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue("firstName") || ""} ${
        params.getValue("lastName") || ""
      }`,
  },
  { field: "email", headerName: "Email", width: 250 },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon" },
  { id: 2, lastName: "Lannister", firstName: "Cersei" },
  { id: 3, lastName: "Lannister", firstName: "Jaime" },
  { id: 4, lastName: "Stark", firstName: "Arya" },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys" },
  { id: 6, lastName: "Melisandre", firstName: null },
  { id: 7, lastName: "Clifford", firstName: "Ferrara" },
  { id: 8, lastName: "Frances", firstName: "Rossini" },
  { id: 9, lastName: "Roxie", firstName: "Harvey" },
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

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [adminsList, setAdminsList] = React.useState([]);
  React.useEffect(() => {
    firestore.collection("admins").onSnapshot((snaps) => {
      const admins = snaps.docs.map((doc, index) => {
        return {
          ...doc.data(),
          uid: doc.id,
          id: index + 1,
        };
      });
      console.log(admins);
      setAdminsList(admins);
    });
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openLoading, setOpenLoading] = React.useState(false);

  const handleCloseLoading = () => {
    setOpenLoading(false);
  };
  const handleToggle = () => {
    setOpenLoading(!openLoading);
  };

  const body = (
    <div className="container">
      <Grid container direction="column" justify="center" alignItems="center">
        <form className="login-form" noValidate autoComplete="off">
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            direction="column"
            spacing="1"
          >
            <Grid xs={12} sm={12} item>
              <TextField
                name="firstname"
                id="AddAdminFirstName"
                label="First Name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                name="lastname"
                id="AddAdminLastName"
                label="Last Name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                name="username"
                id="AddAdminUserName"
                label="Phone Number"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                name="email"
                id="AddAdminUserName"
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenLoading(!openLoading);
                  addAdmin({
                    phoneNumber: phoneNumber,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                  }).then((res) => {
                    setOpenLoading(false);
                    if (res.data.errorInfo) swal(res.data.errorInfo.code);
                    else {
                      console.log(res.data);
                      swal(`admin password is ${res.data.password}`);
                    }
                  });
                }}
                color="primary"
                disableElevation
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Backdrop
        className={classes.backdrop}
        open={openLoading}
        onClick={handleCloseLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );

  return (
    <div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        xs={12}
      >
        <div style={{ height: 400, width: "100%" }}>
          <br />
          <br />
          <Button
            classname="addAdminBTN"
            variant="contained"
            onClick={handleOpen}
            color="primary"
            disableElevation
          >
            Add New Admin
          </Button>
          <br />
          <br />
          <DataGrid
            rows={adminsList}
            columns={columns}
            pageSize={5}
            checkboxSelection
          />
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </Grid>
    </div>
  );
}
