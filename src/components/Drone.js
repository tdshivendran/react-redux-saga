import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../store/actions";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class DroneData extends Component {
    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.daysDiff = this.daysDiff.bind(this);
    }

    fetchData() {
        this.props.onLoad();
    }

    componentDidMount() {
        setInterval(this.fetchData, 2000);
    }

    daysDiff ( date1, date2 ) {

        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;
        //take out milliseconds
        difference_ms = difference_ms/1000;
        var seconds = Math.floor(difference_ms % 60);
        difference_ms = difference_ms/60;
        var minutes = Math.floor(difference_ms % 60);
        difference_ms = difference_ms/60;
        var hours = Math.floor(difference_ms % 24);
        var days = Math.floor(difference_ms/24);

        if (days > 0) {
            if(days === 1) { return days + ' day ago'}
            return days + ' days ago'
        }
        if (hours > 0) {
            if(hours === 1) { return hours + ' hour ago'}
            return hours + ' hours ago'
        }
        if (minutes > 0) {
            if(minutes === 1) { return minutes + ' minute ago'}
            return minutes + ' minutes ago'
        }
        if (seconds > 0) {
            if(seconds === 1) { return seconds + ' second ago'}
            return seconds + ' seconds ago'
        }
    }

    render() {
        const {current_data, error} = this.props;

        if(error){
            return (
                <div>Error fetching drone data!</div>
            )
        }

        if(Object.getOwnPropertyNames(current_data).length){

            var date_now = new Date();
            var data_time = new Date(current_data.timestamp );

            var diff = this.daysDiff(data_time,date_now);
            var last_updated = data_time.toLocaleDateString() + ' ' + data_time.toLocaleTimeString() + ' (' + diff + ')';

            return (
                <div>
                    <div style={{textAlign: "center"}}>
                        {!error && <span> Data being fetched every 2 seconds</span>}
                        {error && <span> Error Fetching Drone Data</span>}
                    </div>
                    <List style={{textAlign: "center"}}>

                        <ListItem>
                            <ListItemText
                                primary="Temperature (°F)"
                                secondary = {current_data.metric}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Latitude"
                                secondary = {current_data.latitude}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Longitude"
                                secondary = {current_data.longitude}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Last Received"
                                secondary = {last_updated}
                            />
                        </ListItem>
                    </List>
                </div>
            );
        }

        return (
            <div style={{textAlign: "center"}}>
                Fetching Data
            </div>
        );

    }
}

const mapState = (state, ownProps) => {
    const {loading, drone_data, metric, current_data, error} = state.droneData;
    return {loading, drone_data, metric, current_data, error};
};

const mapDispatch = dispatch => ({
    onLoad: () =>
        dispatch({
            type: actions.FETCH_DRONE_DATA,
            payload: null
        })
});

export default connect(
    mapState,
    mapDispatch
)(DroneData);
