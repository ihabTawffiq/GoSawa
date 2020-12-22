import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import "./addRoute.css"
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'startAt', headerName: 'Start At ', width: 130 },
    { field: 'endAt', headerName: 'End At ', width: 130 },
    { field: 'actions', headerName: 'Actions', width: 330 },


];

const rows = [
    { id: 1, endAt: 'Snow', startAd: 'Jon', },
    { id: 2, endAt: 'Lannister', startAd: 'Cersei', },
    { id: 3, endAt: 'Lannister', startAd: 'Jaime', },
    { id: 4, endAt: 'Stark', startAd: 'Arya', },
    { id: 5, endAt: 'Targaryen', startAd: 'Daenerys', },
    { id: 6, endAt: 'Melisandre', startAd: null, },
    { id: 7, endAt: 'Clifford', startAd: 'Ferrara', },
    { id: 8, endAt: 'Frances', startAd: 'Rossini', },
    { id: 9, endAt: 'Roxie', startAd: 'Harvey', },
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
}));

export default function SimpleModal() {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                        <Grid item   >
                            <TextField name="startAt" id="AddRouteStartAt" label="Start At" />
                        </Grid>
                        <Grid item   >
                            <TextField name="endAt" id="AddRouteEndAt" label="End At" />
                        </Grid>


                        <Grid item  >

                            <Button variant="contained" color="primary" disableElevation>
                                Submit
                        </Button>

                        </Grid>

                    </Grid>
                </form>
            </Grid>

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
                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
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