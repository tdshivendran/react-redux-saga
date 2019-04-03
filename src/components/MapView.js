import React from "react"
import {compose, withProps} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import connect from "react-redux/es/connect/connect";

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAEAPlYDbuC1VC6UUQuJmUT8Ei_plhLwiI&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `400px`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={4}
        defaultCenter={{lat: 29.761993, lng: -95.366302}}
    >
        {props.isMarkerShown &&
        <Marker position={{lat: props.latitude, lng: props.longitude}} onClick={props.onMarkerClick}/>}
    </GoogleMap>
);

class MapData extends React.PureComponent {
    state = {
        isMarkerShown: false,
        latitude: 29.761993,
        longitude: -95.366302
    };

    componentDidMount() {
        this.delayedShowMarker()
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({isMarkerShown: true})
        }, 3000)
    };

    handleMarkerClick = () => {
        this.setState({isMarkerShown: false});
        this.delayedShowMarker()
    };

    render() {

        const {loading, current_data, error} = this.props;

        return (
            <MyMapComponent
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
                latitude={(loading || error) ? Number(current_data.latitude) : Number(current_data.latitude)}
                longitude={(loading || error) ? Number(current_data.longitude) : Number(current_data.longitude)}
            />
        )
    }
}


const mapState = (state, ownProps) => {
    const {loading, current_data, error} = state.droneData;
    return {loading, current_data, error};
};

export default connect(
    mapState
)(MapData);