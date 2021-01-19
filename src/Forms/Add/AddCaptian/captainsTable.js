import React, { useEffect, useState } from "react";
import config from "../../../server/config";
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
import { confirmAlert } from "react-confirm-alert";
import DateFnsUtils from "@date-io/date-fns";
import { isFuture } from "date-fns/esm";
import "react-confirm-alert/src/react-confirm-alert.css";
import TablePagination from '@material-ui/core/TablePagination';
const functions = config.app().functions("europe-west3");
const storage = config.storage();
const deleteCaptain = functions.httpsCallable("deleteCaptain");

const firestore = config.firestore();
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

const CaptainsTable = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderTable = (data) => {


    return (
      <Fragment>
        <Paper style={{ overflowX: "scroll" }}>
          <Table stickyHeader  >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">NO.</StyledTableCell>
                <StyledTableCell align="center">Captain Name</StyledTableCell>
                <StyledTableCell align="center">Captain Phone</StyledTableCell>
                <StyledTableCell align="center">Captain Email</StyledTableCell>
                <StyledTableCell align="center">
                  Captain Profile
                </StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>

                {/* <StyledTableCell align="center">Enter Time</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record, index) => {
                return (
                  <StyledTableRow key={record.id + Math.random()}>
                    <StyledTableCell
                      style={{ background: "#fff" }}
                      align="center"
                    >
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {record.name}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ background: "#fff" }}
                      align="center"
                    >
                      {record.phoneNumber}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ background: "#fff" }}
                      align="center"
                    >
                      {record.email}
                    </StyledTableCell>

                    <StyledTableCell
                      style={{ background: "#fff" }}
                      align="center"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(
                          `/captains/captain-profile/${record.id}`,
                          "_blank"
                        );
                      }}
                    >
                      <IconButton color="secondary">
                        <AccountBoxIcon></AccountBoxIcon>
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ background: "#fff" }}
                      align="center"
                      onClick={(e) => {
                        e.preventDefault();
                        confirmAlert({
                          title: "Confirm Delete Captain",
                          message: "Are you sure .",
                          buttons: [
                            {
                              label: "Yes",
                              onClick: () => {
                                setOpen2(true);
                                setLodingMs("Deleting Captain Profile..");
                                console.log(record.id);
                                deleteCaptain(record.id).then((res) => {
                                  if (res.data.message) {
                                    setOpen2(false);
                                    swal(res.data.message);
                                  } else {
                                    console.log(res.data);
                                  }
                                });
                              },
                            },
                            {
                              label: "No",
                              onClick: () => { },
                            },
                          ],
                        });
                      }}
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
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Fragment>
    );
  };
  const [lodingms, setLodingMs] = React.useState("");

  const [captains, setCaptains] = React.useState([]);
  const [open2, setOpen2] = React.useState(false);
  React.useEffect(() => {
    firestore
      .collection("captains")
      .get()
      .then(async (docs) => {
        const newCaptains = await docs.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setCaptains(newCaptains);
      });
  }, []);
  return (
    <div className="car-table">
      {renderTable(captains)}

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
};

export default CaptainsTable;
