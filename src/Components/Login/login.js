import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import "./login.css";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function BasicTextFields() {
    const classes = useStyles();

    return (
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

                            <h1>Login Now</h1>
                        </Grid>
                        <Grid item   >

                            <TextField name="username" id="loginUserName" label="Username" />
                        </Grid>
                        <Grid item  >

                            <TextField name="password" id="loginPassword" label="Password" />
                        </Grid>
                        <Grid item  >

                            <Button variant="contained" color="primary" disableElevation>
                                Login Now
                            </Button>

                        </Grid>

                    </Grid>
                </form>
            </Grid>

        </div>
    );
}