import { compose, withProps, lifecycle } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
    DirectionsService
} from "react-google-maps";
import React from "react";



class Maps extends React.Component {

    render() {

        const MapWithADirectionsRenderer = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDQxMINewEFxKj9fJgyFPuvykf5OCaMBOM&v=3.exp&libraries=geometry,drawing,places",
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div style={{ height: `100vh` }} />,
                mapElement: <div style={{ height: `100%` }} />,
            }),
            withScriptjs,
            withGoogleMap,
            lifecycle({
                componentDidMount() {
                    const google = window.google;
                    const DirectionsService = new google.maps.DirectionsService();
        
                    var origin = JSON.parse(localStorage.getItem("initialLoc"));
                    if(origin) {
                        origin.lat = parseFloat(origin.lat);
                        origin.lng = parseFloat(origin.lng);
                    }
        
                    console.log(origin)
                    console.log(this.props.location)
        
                    DirectionsService.route({
                        origin: origin,
                        destination: this.props.location,
                        travelMode: google.maps.TravelMode.DRIVING,
                    }, (result, status) => {
        
                        if (status === google.maps.DirectionsStatus.OK) {
                        this.setState({
                            directions: result,
                        });
                        } else {
                        console.error(`error fetching directions ${result}`);
                        }
                    });
                }
          })
        )(props =>
          <GoogleMap
            defaultZoom={13}
            defaultCenter={props.location}
          >
            {props.directions && <DirectionsRenderer directions={props.directions} />}
          </GoogleMap>
        );
        
        return (
            <MapWithADirectionsRenderer location={this.props.location}/>
        );
    }

}

export default Maps;