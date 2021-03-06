import React from "react";
import md5 from 'md5';
import withStyles from "@material-ui/core/styles/withStyles";
import { compose, withProps, lifecycle } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
    DirectionsService,
    Marker
} from "react-google-maps";


const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    floatingButton : {
      zIndex:1,
      position: "absolute"
    },
    map : {
      zIndex:0,
      position: "relative"
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 20,
    },
    hide: {
      display: 'none',
    },
  });

class Maps extends React.Component {

    render() {

        const {classes } = this.props;

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

                    // console.log(this.props.origin, this.props.location)
        
                    DirectionsService.route({
                        origin: this.props.origin,
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

        const CustomSkinMap = withScriptjs(
            withGoogleMap(props => (
              <GoogleMap
                defaultZoom={13}
                defaultCenter={this.props.location}
                defaultOptions={{
                  scrollwheel: true,
                  zoomControl: true,
                  styles: [
                    {
                      featureType: "water",
                      stylers: [
                        { saturation: 43 },
                        { lightness: -11 },
                        { hue: "#0088ff" }
                      ]
                    },
                    {
                      featureType: "road",
                      elementType: "geometry.fill",
                      stylers: [
                        { hue: "#ff0000" },
                        { saturation: -100 },
                        { lightness: 99 }
                      ]
                    },
                    {
                      featureType: "road",
                      elementType: "geometry.stroke",
                      stylers: [{ color: "#808080" }, { lightness: 54 }]
                    },
                    {
                      featureType: "landscape.man_made",
                      elementType: "geometry.fill",
                      stylers: [{ color: "#ece2d9" }]
                    },
                    {
                      featureType: "poi.park",
                      elementType: "geometry.fill",
                      stylers: [{ color: "#ccdca1" }]
                    },
                    {
                      featureType: "road",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#767676" }]
                    },
                    {
                      featureType: "road",
                      elementType: "labels.text.stroke",
                      stylers: [{ color: "#ffffff" }]
                    },
                    { featureType: "poi", stylers: [{ visibility: "off" }] },
                    {
                      featureType: "landscape.natural",
                      elementType: "geometry.fill",
                      stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
                    },
                    { featureType: "poi.park", stylers: [{ visibility: "on" }] },
                    {
                      featureType: "poi.sports_complex",
                      stylers: [{ visibility: "on" }]
                    },
                    { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
                    {
                      featureType: "poi.business",
                      stylers: [{ visibility: "simplified" }]
                    }
                  ]
                }}
              >
              <Marker position={this.props.location} />
                
              </GoogleMap>
            ))
        );

        return (
            md5(JSON.stringify(this.props.location)) !== md5(JSON.stringify(this.props.location)) ?
            <MapWithADirectionsRenderer location={this.props.location} origin={this.props.origin}/>
            :
            <CustomSkinMap
                location={this.props.location}
                className={classes.map}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDQxMINewEFxKj9fJgyFPuvykf5OCaMBOM"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100vh` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        );
    }

}

export default withStyles(styles)(Maps);