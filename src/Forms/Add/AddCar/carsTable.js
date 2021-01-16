import React, { useEffect, useState } from "react";
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

import DateFnsUtils from "@date-io/date-fns";
import config from "../../../server/config";
const functions = config.app().functions("europe-west3");
const storage = config.storage();
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

const CarsTable = (props) => {
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

  const renderTable = (data) => {
    return (
      <Fragment>
        <Paper style={{ overflowX: "scroll" }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">NO.</StyledTableCell>
                <StyledTableCell align="center">Car Number</StyledTableCell>
                <StyledTableCell align="center">
                  Current Captain
                </StyledTableCell>
                <StyledTableCell align="center">Car Profile</StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>

                {/* <StyledTableCell align="center">Enter Time</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((record, index) => {
                return (
                  <StyledTableRow key={record.id}>
                    <StyledTableCell
                      style={{ background: "#fff" }}
                      align="center"
                    >
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {record.carNumber}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ background: "#fff" }}
                      align="center"
                    >
                      {record.currentCaptainID === "" ? null : (
                        <IconButton
                          color="primary"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log(record.currentCaptainID);
                          }}
                        >
                          <AccountBoxIcon></AccountBoxIcon>
                        </IconButton>
                      )}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ background: "#fff" }}
                      align="center"
                    >
                      <IconButton
                        color="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            `/cars/car-profile/${record.id}`,
                            "_blank"
                          );
                        }}
                      >
                        <LocalTaxiIcon></LocalTaxiIcon>
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
                        }}
                      >
                        <EditIcon></EditIcon>
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ background: "#fff" }}
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
      </Fragment>
    );
  };

  return (
    <div className="car-table">
      {renderTable(cars)}
      {/* <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table
              stickyHeader
              aria-label="sticky table"
              className="table-cells"
            >
              <TableHead className="table-head">
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100, 1000, rows.length]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            //onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper> */}
    </div>
  );
};

export default CarsTable;
