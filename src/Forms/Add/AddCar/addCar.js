import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import { TableRow, Button } from '@material-ui/core';
import ImageUploader from "react-images-upload";
import "./addCar.css";

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
import Dialog from "@material-ui/core/Dialog";
// import ProgressBar from "@ramonak/react-progress-bar";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";




const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },

];

function createData(name, code, population, size) {

    return { name, code, population, size };
}

const rows = [
    createData('India', 'IN', 1324171354, <Button color="primary" variant="out">teest</Button>),
    createData('China', 'CN', 1403500365, <Button color="primary" variant="out">teest</Button>),
    createData('Italy', 'IT', 60483973, <Button color="primary" variant="out">teest</Button>),
    createData('United States', 'US', 327167434, <Button color="primary" variant="out">teest</Button>),
    createData('Canada', 'CA', <Button color="primary" variant="out">teest</Button>, 9984670),
    createData('Australia', 'AU', 25475400, <Button color="primary" variant="out">teest</Button>),
    createData('Germany', 'DE', <Button color="primary" variant="out">teest</Button>, 357578),
    createData('Ireland', 'IE', <Button color="primary" variant="out">teest</Button>, 70273),
    createData('Mexico', 'MX', <Button color="primary" variant="out">teest</Button>, 1972550),
    createData('Japan', 'JP', <Button color="primary" variant="out">teest</Button>, 377973),
    createData('France', 'FR', <Button color="primary" variant="out">teest</Button>, 640679),
    createData('United Kingdom', 'GB', <Button color="primary" variant="out">teest</Button>, 242495),
    createData('Russia', 'RU', <Button color="primary" variant="out">teest</Button>, 17098246),
    createData('Nigeria', 'NG', <Button color="primary" variant="out">teest</Button>, 923768),
    createData('Brazil', 'BR', 210147125, <Button color="primary" variant="out">teest</Button>),
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);
    const [car, setCar] = React.useState({});
    const [carNumber, setCarNumber] = React.useState("");
    const [carColor, setCarColor] = React.useState("");
    const [carModel, setCarModel] = React.useState("");
    const [carYear, setCarYear] = React.useState();
    const [carImg, setCarImg] = React.useState(null);
    const [carLicenceFront, setCarLicenceFront] = React.useState(null);
    const [carLicenceBack, setCarLicenceBack] = React.useState(null);
    const [carCheckImg, setCarCheckImg] = React.useState(null);
    const [carLicinsExpireDate, setCarLicinsExpireDate] = React.useState(new Date());

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
                    <h1>Add New Captain</h1>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="carNumber"
                            label="car Number"
                            variant="outlined"
                            type="text"
                            onChange={(e) => setCarNumber(e.target.value)}
                        />
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <TextField
                            id="carModel"
                            label="Car Model"
                            variant="outlined"
                            onChange={(e) => setCarModel(e.target.value)}
                            type="text"
                        />
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <TextField
                            id="carYear"
                            label="Car Year"
                            variant="outlined"
                            onChange={(e) => setCarYear(e.target.value)}
                            type="number"
                        />
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <TextField
                            id="carColor"
                            label="Car Color"
                            variant="outlined"
                            type="text"
                            onChange={(e) => setCarColor(e.target.value)}
                        />
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
                    imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
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
                    imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
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
                    imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                    maxFileSize={5242880}
                    fileContainerStyle={{ background: "rgba(0,0,0,0.3)" }}
                    withPreview={true}
                />

                <ImageUploader
                    withIcon={true}
                    label="Upload Car Check IMG"
                    buttonText="Car Check"
                    onChange={carCgeckUploader}
                    imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                    maxFileSize={5242880}
                    fileContainerStyle={{ background: "rgba(0,0,0,0.3)" }}
                    withPreview={true}
                    singleImage={true}
                />

                <Button
                    classname="addAdminBTN"
                    variant="contained"
                    onClick={
                        console.log(carNumber, carModel, carColor)
                    }
                    color="primary"
                    disableElevation
                >
                    Add New Car
        </Button>
            </form>


            <div className="car-table">
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table" className="table-cells">
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
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}

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
                </Paper>
            </div>
        </>
    );
}
