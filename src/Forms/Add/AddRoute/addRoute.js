import * as React from "react";
import { Fragment } from "react";
import { DataGrid } from "@material-ui/data-grid";
import DataList from "../../../Components/assits/listest";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import "./addRoute.css";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import swal from "sweetalert";
import { confirmAlert } from "react-confirm-alert";

import config from "../../../server/config";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import Paper from "@material-ui/core/Paper";
import StreetviewIcon from "@material-ui/icons/Streetview";
const firestore = config.firestore();
// const functions = config.functions();
const functions = config.app().functions("europe-west3");

const addRout = functions.httpsCallable("addRout");
const addRoutStation = functions.httpsCallable("addRoutStation");
const deleteRoute = functions.httpsCallable("deleteRoute");
const deleteRoutStation = functions.httpsCallable("deleteRoutStation2");

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
  { field: "startAt", headerName: "Start At ", width: 130 },
  { field: "endAt", headerName: "End At ", width: 130 },
  { field: "actions", headerName: "Actions", width: 330 },
];
// baottot please read this rows from database as routes to show it at table

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
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [currentrouteID, setCurrentrouteID] = React.useState("");
  const [currentStations, setCurrentStations] = React.useState([]);
  const [openStations, setOpenStations] = React.useState(false);
  const [startAtName, setStartAtName] = React.useState("");
  const [startAtLocation, setStartAtLocation] = React.useState("");
  const [endAtName, setEndAtName] = React.useState("");
  const [endAtLocation, setEndAtLocation] = React.useState("");
  const [finalRoute, setFinalRoute] = React.useState({});
  const [routes, setRoutes] = React.useState([]);
  const [stationName, setStationName] = React.useState("");
  const [stationLocation, setStationLocation] = React.useState("");

  const [openLoading, setOpenLoading] = React.useState(false);

  const handleCloseLoading = () => {
    setOpenLoading(false);
  };
  const handleToggle = () => {
    setOpenLoading(!openLoading);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenstations = () => {
    setOpenStations(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    setFinalRoute({ startAtName, startAtLocation, endAtName, endAtLocation });
  }, [startAtLocation, startAtName, endAtName, endAtLocation]);
  React.useEffect(() => {
    firestore.collection("routes").onSnapshot((snaps) => {
      const routesList = snaps.docs.map((doc, index) => {
        return {
          id: index,
          startAtName: doc.data().startPoint.name,
          endAtName: doc.data().endPoint.name,
          stations: doc.data().stations,
          routeID: doc.id,
        };
      });
      setRoutes(routesList);
    });
  }, []);
  const renderTable = (data) => {
    return (
      <Fragment>
        <Paper style={{ overflowX: "scroll" }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">NO.</StyledTableCell>
                <StyledTableCell align="center">Start Point</StyledTableCell>
                <StyledTableCell align="center">End Point</StyledTableCell>
                <StyledTableCell align="center">Stations</StyledTableCell>
                <StyledTableCell align="center">Add Station</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>

                {/* <StyledTableCell align="center">Enter Time</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((record, index) => {
                return (
                  <StyledTableRow key={record.routeID}>
                    <StyledTableCell
                      style={{ background: "#fff" }}
                      align="center"
                    >
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {record.startAtName}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ background: "#fff" }}
                      align="center"
                    >
                      {record.endAtName}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ background: "#fff" }}
                      align="center"
                    >
                      <IconButton
                        color="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentStations(record.stations);
                          setCurrentrouteID(record.routeID);

                          setOpen3(true);
                        }}
                      >
                        <StreetviewIcon></StreetviewIcon>
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ background: "#fff" }}
                      align="center"
                    >
                      <IconButton
                        color="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentrouteID(record.routeID);
                          setOpen2(true);
                        }}
                      >
                        <AddLocationIcon></AddLocationIcon>
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ background: "#fff" }}
                      align="center"
                      onClick={(e) => {
                        e.preventDefault();
                        confirmAlert({
                          title: "Confirm Delete Route",
                          message: "Are you sure .",
                          buttons: [
                            {
                              label: "Yes",
                              onClick: () => {
                                setOpenLoading(true);

                                deleteRoute(record.routeID).then((res) => {
                                  if (res.data.message) {
                                    setOpenLoading(false);

                                    swal(res.data.message);
                                  } else {
                                    console.log(res.data);
                                  }
                                });
                              },
                            },
                            {
                              label: "No",
                              onClick: () => {},
                            },
                          ],
                        });
                      }}
                    >
                      <IconButton color="secondary">
                        <DeleteIcon></DeleteIcon>{" "}
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </Fragment>
    );
  };

  const handelAddRoute = (e) => {
    e.preventDefault();

    setOpenLoading(!openLoading);

    addRout({ startAtName, startAtLocation, endAtName, endAtLocation }).then(
      (res) => {
        setOpenLoading(false);
        console.log(res.data);
        swal(`Route Created `);
      }
    );
  };

  const handelAddStations = (pointName, pointLocation, id) => {
    setOpenLoading(true);
    addRoutStation({ pointName, pointLocation, id }).then((res) => {
      setOpenLoading(false);
      console.log(res.data);
      if (res.data === "updated") {
        swal("Station Added");
      }
    });
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
            spacing="6"
          >
            <Grid item>
              <h5> Start At</h5>
            </Grid>
            <Grid item>
              <TextField
                name="startAtName"
                id="AddRouteStartAtName"
                label="Naame"
                onChange={(e) => {
                  setStartAtName(e.target.value);
                }}
              />
              <TextField
                name="startAtLocation"
                id="AddRouteStartAtLocation"
                label="Location"
                onChange={(e) => {
                  setStartAtLocation(e.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <h5> End At</h5>
            </Grid>

            <Grid item>
              <TextField
                name="endAtName"
                id="AddRouteEndAtName"
                label="Name"
                onChange={(e) => {
                  setEndAtName(e.target.value);
                }}
              />
              <TextField
                name="endAtLocation"
                id="AddRouteEndAtLocation"
                label="Location"
                onChange={(e) => {
                  setEndAtLocation(e.target.value);
                }}
              />
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={handelAddRoute}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Backdrop className={classes.backdrop} open={openLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );

  const bodyForStations = (
    <div className="container">
      <Grid container direction="column" justify="center" alignItems="center">
        <form className="login-form" noValidate autoComplete="off">
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            direction="column"
            spacing="6"
          >
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={handelAddStations}
            >
              Submit
            </Button>
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
          <br />
          <Button
            classname="addAdminBTN"
            variant="contained"
            onClick={handleOpen}
            color="primary"
            disableElevation
          >
            Add New Route
          </Button>
          <br />
          <br />
          <br />
          {/* <DataList
            datatoshow={routes}
            columns={columns}
            addStation={handelAddStations}
            pageSize={5}
            checkboxSelection
          /> */}
          {renderTable(routes)}
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>

        <Modal
          open={openStations}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {bodyForStations}
        </Modal>
      </Grid>
      {/* <Modal
        open={open2}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="container" key={currentrouteID}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <form className="login-form" noValidate autoComplete="off">
              <Grid
                item
                container
                justify="center"
                alignItems="center"
                direction="column"
              >
                <TextField
                  label="Station Name"
                  onChange={(e) => {
                    setStationName(e.target.value);
                  }}
                />
                <TextField
                  label="Station location"
                  onChange={(e) => {
                    setStationLocation(e.target.value);
                  }}
                />

                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenLoading(!openLoading);

                    handelAddStations(
                      stationName,
                      stationLocation,
                      currentrouteID
                    );
                  }}
                >
                  Add
                </Button>
              </Grid>
            </form>
          </Grid>
        </div>
      </Modal> */}
      <Dialog open={open2} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Station</DialogTitle>
        <DialogContent>
          <TextField
            label="Station Name"
            onChange={(e) => {
              setStationName(e.target.value);
            }}
          />
          <TextField
            label="Station location"
            onChange={(e) => {
              setStationLocation(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setCurrentrouteID("");
              setOpen2(false);
            }}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setOpenLoading(true);

              handelAddStations(stationName, stationLocation, currentrouteID);
            }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
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
                {currentStations.map((record) => {
                  return (
                    <StyledTableRow key={record.stationID}>
                      <StyledTableCell
                        style={{ background: "#fff" }}
                        align="center"
                      >
                        {record.pointName}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        <IconButton
                          color="secondary"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpen3(false);
                            confirmAlert({
                              title: "Confirm Delete Route",
                              message: "Are you sure .",
                              buttons: [
                                {
                                  label: "Yes",
                                  onClick: () => {
                                    setOpenLoading(true);
                                    console.log({
                                      stationID: record.stationID,
                                      id: currentrouteID,
                                    });
                                    deleteRoutStation({
                                      stationID: record.stationID,
                                      id: currentrouteID,
                                    }).then((res) => {
                                      if (res.data.message) {
                                        setOpen3(true);
                                        setOpenLoading(false);

                                        swal(res.data.message);
                                      } else {
                                        console.log(res.data);
                                      }
                                    });
                                  },
                                },
                                {
                                  label: "No",
                                  onClick: () => {},
                                },
                              ],
                            });
                          }}
                        >
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
              setCurrentrouteID("");
              setCurrentStations([]);
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
