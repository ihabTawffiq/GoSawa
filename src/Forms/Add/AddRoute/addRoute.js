import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import DataList from "../../../Components/assits/listest";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import "./addRoute.css";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import swal from "sweetalert";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'startAt', headerName: 'Start At ', width: 130 },
    { field: 'endAt', headerName: 'End At ', width: 130 },
    { field: 'actions', headerName: 'Actions', width: 330 },


];
// baottot please read this rows from database as routes to show it at table
const rows = [
    { id: 1, endAt: 'Snow', startAd: 'Jon', stations: ["giza", "haram", "faisal", "giza", "haram", "faisal", "giza", "haram", "faisal", "giza", "haram", "faisal", "giza", "haram", "faisal", "giza", "haram", "faisal"] },
    { id: 2, endAt: 'Lannister', startAd: 'Cersei', stations: ["giza", "haram", "faisal"] },
    { id: 3, endAt: 'Lannister', startAd: 'Jaime', stations: ["giza", "haram", "faisal"] },
    { id: 4, endAt: 'Stark', startAd: 'Arya', stations: ["giza", "haram", "faisal"] },
    { id: 5, endAt: 'Targaryen', startAd: 'Daenerys', stations: ["giza", "haram", "faisal"] },
    { id: 6, endAt: 'Melisandre', startAd: null, stations: ["giza", "haram", "faisal"] },
    { id: 7, endAt: 'Clifford', startAd: 'Ferrara', stations: ["giza", "haram", "faisal"] },
    { id: 8, endAt: 'Frances', startAd: 'Rossini', stations: ["giza", "haram", "faisal"] },
    { id: 9, endAt: 'Roxie', startAd: 'Harvey', stations: ["giza", "haram", "faisal"] },
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
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function SimpleModal() {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [openStations, setOpenStations] = React.useState(false);
    const [startAtName, setStartAtName] = React.useState("")
    const [startAtLocation, setStartAtLocation] = React.useState("")
    const [endAtName, setEndAtName] = React.useState("")
    const [endAtLocation, setEndAtLocation] = React.useState("")
    const [finalRoute, setFinalRoute] = React.useState({})

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
    const handelAddRoute = (e) => {
        e.preventDefault();

        setOpenLoading(!openLoading);
        setFinalRoute(
            {
                ...finalRoute,
                startAtName,
                startAtLocation,
                endAtName,
                endAtLocation
            })
        console.log(finalRoute)
        //when u finish the request 
        let batotFInish = false
        if (batotFInish) {
            setOpenLoading(false);
            swal(`Route Created ${finalRoute}`);
        }
    }

    const handelAddStations = (e) => {
        e.preventDefault();
        setOpenLoading(!openLoading);
    }
    const body = (
        <div className="container"  >
            <Grid container
                direction="column"
                justify="center"
                alignItems="center"

            >
                <form className="login-form" noValidate autoComplete="off">
                    <Grid item container
                        justify="center"
                        alignItems="center"
                        direction="column"
                        spacing="6"

                    >
                        <Grid item >
                            <h5> Start At</h5>
                        </Grid>
                        <Grid item   >
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
                        <Grid item >
                            <h5> End At</h5>
                        </Grid>

                        <Grid item   >
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


                        <Grid item  >

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
            <Backdrop className={classes.backdrop} open={openLoading} onClick={handleCloseLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );

    const bodyForStations = (
        <div className="container"  >
            <Grid container
                direction="column"
                justify="center"
                alignItems="center"

            >
                <form className="login-form" noValidate autoComplete="off">
                    <Grid item container
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
            <Backdrop className={classes.backdrop} open={openLoading} onClick={handleCloseLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );

    return (
        <div>
            <Grid container
                direction="column"
                justify="center"
                alignItems="center"
                xs={12}
            >
                <div style={{ height: 400, width: '100%' }}>
                    <Button classname="addAdminBTN" variant="contained" onClick={handleOpen} color="primary" disableElevation>
                        Add New Route
                    </Button>


                    <DataList datatoshow={rows} columns={columns} pageSize={5} checkboxSelection />

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
        </div>
    );
}