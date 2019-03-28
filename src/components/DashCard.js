import React from "react";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import DroneData from "./Drone";

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = {
  card: {
    margin: "5% 25%"
  }
};

const DashCard = props => {
  const { classes } = props;
  return (
    <Card className={classes.card}>
        <CardHeader title="Current Drone Data"/>
        <CardContent style={{textAlign: "center"}}>
            <DroneData />
        </CardContent>
    </Card>
  );
};

export default withStyles(styles)(DashCard);
