import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import swal from "sweetalert";
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
    root: {
        width: '100%',
        minWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        position: 'absolute',

        backgroundColor: theme.palette.background.paper,

        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function CheckboxList(datatoshow) {
    const [dataToShow, setDataToShow] = React.useState([])
    const [currentStations, setCurrentStations] = React.useState([])
    const [modalStyle] = React.useState(getModalStyle);
    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);
    const [stationName, setStationName] = React.useState("");
    const [stationLocation, setStationLocation] = React.useState("");




    /*MOdal and loading*/
    const [openStations, setOpenStations] = React.useState(false);
    const [openLoading, setOpenLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);


    React.useEffect(() => {
        setDataToShow(datatoshow.datatoshow)

    })
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseLoading = () => {
        setOpenLoading(false);
    };
    const handleToggle = (value) => () => {

        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };


    const handelOpenModal = (e) => {
        e.preventDefault();

    }
    const handelAddStations = (e) => {
        e.preventDefault();
        setOpenLoading(!openLoading);
        console.log(stationName, stationLocation)
    }


    return (
        <List className={classes.root}>
            {dataToShow.map((value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (

                    <Grid >


                        <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`Line number : ${value.id + 1} | Started At : ${value.startAd} | Ended At : ${value.endAt}`} />

                            <ListItemText primary={`Stations : [ ${value.stations.map(state => state + "  ,  ")} ]`} />



                            <ListItemSecondaryAction>
                                <Button variant="contained" onClick={handleOpen} color="primary" disableElevation>
                                    Add New Stations
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItem>

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >

                            <div className="container" key={value.id}>
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

                                        >

                                            <TextField label="Station Name" onChange={(e) => { setStationName(e.target.value) }} />
                                            <TextField label="Station location" onChange={(e) => { setStationLocation(e.target.value) }} />

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disableElevation
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setOpenLoading(!openLoading);

                                                    console.log(stationName, stationLocation)
                                                }}
                                            >
                                                Add
                                         </Button>

                                        </Grid>
                                    </form>
                                </Grid>
                                <Backdrop className={classes.backdrop} open={openLoading} onClick={handleCloseLoading}>
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                            </div>



                        </Modal>

                    </Grid>
                );
            })}
        </List>
    );
}
