import React from "react";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import {withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import DroneData from "./DroneData";
import MapView from "./MapView";
import ChartView from "./ChartView";

const section = {
    height: "100%",
    paddingTop: 5,
    backgroundColor: "#fff"
};

const cardStyles = theme => ({
    root: {
        background: theme.palette.primary.main
    },
    title: {
        color: "white"
    }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = theme => ({
    card: {
        height: '100%',
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

const DashCard = props => {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={12} lg={3}>
                    <div style={section}>
                        <Card className={classes.card}>
                            <CardHeader title="Current Drone Data"/>
                            <CardContent style={{
                                textAlign: "center",
                                margin: 0
                            }}>
                                <DroneData/>
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={9}>
                    <div style={section}>
                        <Card className={classes.card}>
                            <CardHeader title="Position of the Drone"/>
                            <CardContent style={{textAlign: "center"}}>
                                <MapView/>
                            </CardContent>
                        </Card>
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <div style={section}>
                        <Card className={classes.card}>
                            <CardHeader title="Metric Chart"/>
                            <CardContent style={{textAlign: "center"}}>
                                <ChartView/>
                            </CardContent>
                        </Card>
                    </div>
                </Grid>

            </Grid>


        </div>
    );
};

export default withStyles(styles)(DashCard);
