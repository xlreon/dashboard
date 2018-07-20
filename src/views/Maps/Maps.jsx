import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import MenuButton from "./MenuButton";

const CustomSkinMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 12.9716, lng:  77.5946 }}
      defaultOptions={{
        scrollwheel: false,
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
      <Marker position={{ lat: 12.9716, lng: 77.5946 }} />
    </GoogleMap>
  ))
);

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  floatingButton : {
    zIndex:1,
    position: "absolute"
  },
  map : {
    zIndex:1,
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

function Maps({ ...props }) {
  const {classes } = props;
  return (
    <div>
      <Grid container spacing={12} className={classes.floatingButton}>
        <GridItem xs={2}>
          {/* <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={props.handleDrawerToggle}
            className={classNames(classes.menuButton, props.open && classes.hide)}
          > */}
          <Button variant="fab" color="secondary" aria-label="Add" onClick={props.handleDrawerToggle}
            className={classNames(classes.menuButton, props.open && classes.hide)}>
            <MenuIcon />
          </Button>
            
          {/* </IconButton> */}
        </GridItem>
        <GridItem xs={9}>
        </GridItem>
        <GridItem xs={1}>
            <MenuButton />
            {/* <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
              <MenuIcon />
            </Button>  */}
        </GridItem>
      </Grid>
        
      <CustomSkinMap
        className={classes.map}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDQxMINewEFxKj9fJgyFPuvykf5OCaMBOM"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

export default withStyles(styles)(Maps);
